package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.dto.GoodsInfoDto;
import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.pojo.GoodsInfoBean;
import com.wgy.flowershopserver.pojo.GoodsInfoRCategoryBean;
import com.wgy.flowershopserver.serviceimpl.BannerServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsInfoRCategoryServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsInfoServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsItemServiceImpl;
import com.wgy.flowershopserver.utils.CustomConfig;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/goodsinfo")
public class GoodsInfoController {
  @Autowired private GoodsInfoServiceImpl goodsInfoService;
  @Autowired private GoodsItemServiceImpl goodsItemService;
  @Autowired private GoodsInfoRCategoryServiceImpl goodsInfoRCategoryService;

  @RequestMapping("/allinfos")
  public List<GoodsInfoBean> getAllGoodsInfos() {
    return goodsInfoService.getAllGoodsInfos();
  }

  @RequestMapping("/allinfosdto")
  public List<GoodsInfoDto> getAllGoodsInfosToDto() {
    return goodsInfoService.mapGoodsInfos2Dto();
  }

  //  /**
  //   * 一般不要用这个方法，会造成数据不完整，按blongtitle比较稳
  //   *
  //   * @param id
  //   */
  //  @RequestMapping("/deleteById")
  //  public void deleteById(@RequestParam(value = "bannerId") int id) {
  //    goodsInfoService.deleteById(id);
  //  }

  // 这个三个一组进行插入，后台没有做相关设置，请前端校验
  // 这个信息是通过两张表进行维护的，所以需要对两张表进行操作
  @RequestMapping("/insert")
  public void insert(HttpServletRequest request) {
    String insertObjectsJson = request.getParameter("inertObjectsJson");
    // 这里做反序列化
    List<GoodsInfoBean> goodsInfoBeans =
        JsonUtil.getInstance().toList(insertObjectsJson, GoodsInfoBean.class);
    List<MultipartFile> multipartFiles = ((MultipartHttpServletRequest) request).getFiles("file");
    goodsInfoService.dealFile(multipartFiles);
    // 将相关具体信息插入category表
    goodsInfoBeans.forEach(
        goodsInfoBean -> {
          goodsInfoBean.setImgUrl(
              CustomConfig.attributeMap.get("ffsaddress") + "/" + goodsInfoBean.getImgUrl());
          goodsInfoService.baseInsert(goodsInfoBean);
        });
    // 将新的belong2Title插入goodsrcategory表
    String title = goodsInfoBeans.get(0).getBelong2Title();
    GoodsInfoRCategoryBean goodsInfoRCategoryBean = new GoodsInfoRCategoryBean();
    goodsInfoRCategoryBean.setTitle(title);
    goodsInfoRCategoryService.baseInsert(goodsInfoRCategoryBean);
  }

  // 同样需要对两张表进行操作
  // 同样还要重置与该大类相关的商品信息
  @RequestMapping("/deleteByBelong2Title")
  public void deleteByBelong2Title(@RequestParam("belong2Title") String belong2Title) {
    // todo 清理相关静态资源
    // 更新相关商品
    List<GoodsInfoRCategoryBean> goodsInfoRCategoryBeans =
        goodsInfoRCategoryService.selectByTitle(belong2Title);
    if (goodsInfoRCategoryBeans == null || goodsInfoRCategoryBeans.size() <= 0) return;
    int campaignid = goodsInfoRCategoryBeans.get(0).getId();
    goodsItemService.updateCampaignid(campaignid);
    // 删除两张表信息
    goodsInfoRCategoryService.deleteById(campaignid);
    goodsInfoService.deleteByBelong2Title(belong2Title);
  }
}
