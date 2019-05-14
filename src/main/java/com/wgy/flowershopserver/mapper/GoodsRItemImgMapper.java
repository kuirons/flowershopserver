package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.GoodsRItemImgBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface GoodsRItemImgMapper {
  void baseInsert(GoodsRItemImgBean goodsRItemImgBean);

  void deleteByGoodsItemId(int goodsitemid);
}
