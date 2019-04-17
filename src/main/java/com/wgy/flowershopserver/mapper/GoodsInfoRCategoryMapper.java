package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.GoodsInfoRCategoryBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface GoodsInfoRCategoryMapper {
  void baseInsert(GoodsInfoRCategoryBean goodsInfoRCategoryBean);

  List<GoodsInfoRCategoryBean> selectAll();

  void deleteById(int id);

  List<GoodsInfoRCategoryBean> selectByTitle(String title);
}
