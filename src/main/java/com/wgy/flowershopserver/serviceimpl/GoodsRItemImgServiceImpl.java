package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.GoodsRItemImgMapper;
import com.wgy.flowershopserver.pojo.GoodsRItemImgBean;
import com.wgy.flowershopserver.service.GoodsRItemImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoodsRItemImgServiceImpl implements GoodsRItemImgService {
  @Autowired GoodsRItemImgMapper goodsRItemImgMapper;

  @Override
  public void baseInsert(GoodsRItemImgBean goodsRItemImgBean) {
    goodsRItemImgMapper.baseInsert(goodsRItemImgBean);
  }

  @Override
  public void deleteByGoodsItemId(int goodsitemid) {
    goodsRItemImgMapper.deleteByGoodsItemId(goodsitemid);
  }
}
