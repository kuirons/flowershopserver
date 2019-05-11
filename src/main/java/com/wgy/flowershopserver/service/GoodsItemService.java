package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.GoodsItemBean;

import java.util.List;

public interface GoodsItemService {
  List<GoodsItemBean> selectByCampaignId(int campaignid);

  List<GoodsItemBean> selectByCategoryId(int categoryid);

  List<GoodsItemBean> sort(List<GoodsItemBean> goodsItemBeans, int orderBy);

  List<GoodsItemBean> selectById(int id);

  List<GoodsItemBean> search(String searchContent);
}
