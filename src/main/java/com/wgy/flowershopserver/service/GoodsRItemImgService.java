package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.GoodsRItemImgBean;

public interface GoodsRItemImgService {
  void baseInsert(GoodsRItemImgBean goodsRItemImgBean);

  void deleteByGoodsItemId(int goodsitemid);
}
