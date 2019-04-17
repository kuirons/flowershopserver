package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.GoodsInfoRCategoryMapper;
import com.wgy.flowershopserver.pojo.GoodsInfoRCategoryBean;
import com.wgy.flowershopserver.service.GoodsInfoRCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoodsInfoRCategoryServiceImpl implements GoodsInfoRCategoryService {
  @Autowired private GoodsInfoRCategoryMapper goodsInfoRCategoryMapper;

  @Override
  public List<GoodsInfoRCategoryBean> getAllBannerInfos() {
    return goodsInfoRCategoryMapper.selectAll();
  }

  @Override
  public void deleteById(int id) {
    goodsInfoRCategoryMapper.deleteById(id);
  }

  @Override
  public void baseInsert(GoodsInfoRCategoryBean goodsInfoRCategoryBean) {
    goodsInfoRCategoryMapper.baseInsert(goodsInfoRCategoryBean);
  }

  @Override
  public List<GoodsInfoRCategoryBean> selectByTitle(String title) {
    return goodsInfoRCategoryMapper.selectByTitle(title);
  }
}
