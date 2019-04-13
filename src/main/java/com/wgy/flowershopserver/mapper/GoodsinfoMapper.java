package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.GoodsInfoBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface GoodsinfoMapper {
  void baseInsert(GoodsInfoBean goodsInfoBean);

  List<GoodsInfoBean> selectAll();

  void deleteById(int id);
}
