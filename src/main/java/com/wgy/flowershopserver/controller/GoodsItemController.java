package com.wgy.flowershopserver.controller;

import com.jcraft.jsch.Session;
import com.wgy.flowershopserver.dto.HotGoodsDto;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.service.GoodsItemService;
import com.wgy.flowershopserver.serviceimpl.GoodsItemServiceImpl;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/goodsitem")
public class GoodsItemController {
  @Autowired private GoodsItemServiceImpl goodsItemService;

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
    GoodsItemBean goodsItemBean =
        JsonUtil.getInstance().toObject(goodsItemInfoJson, GoodsItemBean.class);
    goodsItemBean.setVendor(userName);
    goodsItemService.baseInsert(goodsItemBean);
    // 处理上传的文件
    MultipartFile multipartFile = ((MultipartHttpServletRequest) request).getFile("file");
  }
}
