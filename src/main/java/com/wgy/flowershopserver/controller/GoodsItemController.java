package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.dto.HotGoodsDto;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.pojo.GoodsRItemImgBean;
import com.wgy.flowershopserver.serviceimpl.GoodsItemServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsRItemImgServiceImpl;
import com.wgy.flowershopserver.utils.CustomConfig;
import com.wgy.flowershopserver.utils.FileUtil;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/goodsitem")
public class GoodsItemController {
  @Autowired private GoodsItemServiceImpl goodsItemService;
  @Autowired private GoodsRItemImgServiceImpl goodsRItemImgService;

  @RequestMapping("/campaignid")
  public HotGoodsDto getHotGoodDtoByCampaignId(
      @RequestParam(value = "campaignId") int campaignId,
      @RequestParam(value = "orderBy") int orderBy) {
    List<GoodsItemBean> goodsItemBeans = goodsItemService.selectByCampaignId(campaignId);
    goodsItemBeans = goodsItemService.sort(goodsItemBeans, orderBy);
    return HotGoodsDto.getInstance(goodsItemBeans);
  }

  @RequestMapping("/categoryid")
  public HotGoodsDto getHotGoodDtoByCategoryId(@RequestParam(value = "categoryId") int categoryId) {
    List<GoodsItemBean> goodsItemBeans = goodsItemService.selectByCategoryId(categoryId);
    return HotGoodsDto.getInstance(goodsItemBeans);
  }

  @RequestMapping("/queryById")
  public GoodsItemBean getHotGoodDtoById(@RequestParam(value = "id") int id) {
    List<GoodsItemBean> goodsItemBeans = goodsItemService.selectById(id);
    if (goodsItemBeans.size() <= 0) return null;
    return goodsItemBeans.get(0);
  }

  @RequestMapping("/search")
  public HotGoodsDto search(String searchContent) {
    List<GoodsItemBean> goodsItemBeans = goodsItemService.search(searchContent);
    if (goodsItemBeans == null || goodsItemBeans.size() <= 0) return null;
    return HotGoodsDto.getInstance(goodsItemBeans);
  }

  // 创建一个商品，商家操作入口
  // 创建商品的时候需要指定category，不能指定campaign
  // 前端不好拿用户信息该字段直接置空即可
  @RequestMapping("/create")
  public void create(HttpServletRequest request, String goodsItemInfoJson) {
    // todo 整个登陆、权限控制、校验等逻辑应该使用spring security来实现，现在先使用自己实现的
    // 从session中拿用户信息
    HttpSession session = request.getSession();
    String userName = (String) session.getAttribute("userName");
    // 商品展示图片
    MultipartFile goodsItemFile = ((MultipartHttpServletRequest) request).getFile("goodsitemfile");
    FileUtil.writeFileToDir(goodsItemFile);
    GoodsItemBean goodsItemBean =
        JsonUtil.getInstance().toObject(goodsItemInfoJson, GoodsItemBean.class);
    // 处理下imgurl
    String gooditemImg =
        CustomConfig.attributeMap.get("ffsaddress")
            + File.separator
            + goodsItemFile.getOriginalFilename();
    goodsItemBean.setVendor(userName);
    goodsItemBean.setImgUrl(gooditemImg);
    goodsItemService.baseInsert(goodsItemBean);
    // 插入后当前记录对应的主键
    int id = goodsItemBean.getId();
    // 处理上传的商品详细信息图片
    List<MultipartFile> detailsInfos =
        ((MultipartHttpServletRequest) request).getFiles("detailsInfos");
    goodsItemService.dealWithFiles(detailsInfos);
    detailsInfos.stream()
        .map(
            multipartFile -> {
              String detailurl =
                  CustomConfig.attributeMap.get("ffsaddress")
                      + File.separator
                      + multipartFile.getOriginalFilename();
              GoodsRItemImgBean goodsRItemImgBean = new GoodsRItemImgBean();
              goodsRItemImgBean.setGoodsitemid(id);
              goodsRItemImgBean.setImgurl(detailurl);
              return goodsRItemImgBean;
            })
        .forEach(goodsRItemImgService::baseInsert);
  }

  // 还是要操作两张表
  @RequestMapping("/delete")
  public void deleteById(String id) {
    // todo 清除静态资源
    // 清除goodsitem表
    goodsItemService.deleteById(Integer.valueOf(id));
    // 清除goodsritemimg表
    goodsRItemImgService.deleteByGoodsItemId(Integer.valueOf(id));
  }

  // 把全部信息传递过来
  @RequestMapping("/update")
  public void updateById(HttpServletRequest request, String itemjson) {
    // todo 资源清理
    GoodsItemBean goodsItemBean = JsonUtil.getInstance().toObject(itemjson, GoodsItemBean.class);
    MultipartFile goodsItemFile = ((MultipartHttpServletRequest) request).getFile("goodsitemfile");
    if (goodsItemFile != null) {
      String gooditemImg =
          CustomConfig.attributeMap.get("ffsaddress")
              + File.separator
              + goodsItemFile.getOriginalFilename();
      goodsItemBean.setImgUrl(gooditemImg);
    }
    goodsItemService.updateAll(goodsItemBean);
    // 更新关联的goodsritemimg表
    List<GoodsRItemImgBean> goodsRItemImgBeans = goodsItemBean.getDetailInfosImgUrl();
    // 先删除再插入(这个逻辑肯定是要修改的)
    goodsRItemImgService.deleteByGoodsItemId(goodsItemBean.getId());
    goodsRItemImgBeans.forEach(goodsRItemImgService::baseInsert);
  }

  // 查询商家已发布产品
  @RequestMapping("/selectByVendor")
  public List<GoodsItemBean> selectByVendor(HttpServletRequest request) {
    String userName = (String) request.getSession().getAttribute("userName");
    return goodsItemService.selectByVendor(userName);
  }
}
