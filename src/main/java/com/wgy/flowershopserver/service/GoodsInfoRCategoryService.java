package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.GoodsInfoRCategoryBean;

import java.util.List;

public interface GoodsInfoRCategoryService {
  List<GoodsInfoRCategoryBean> getAllBannerInfos();

  void deleteById(int id);

  void baseInsert(GoodsInfoRCategoryBean goodsInfoRCategoryBean);

  List<GoodsInfoRCategoryBean> selectByTitle(String title);
}
