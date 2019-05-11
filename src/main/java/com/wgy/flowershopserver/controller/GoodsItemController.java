package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.dto.HotGoodsDto;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.serviceimpl.GoodsItemServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
