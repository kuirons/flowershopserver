package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.CommentBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CommentMapper {
  void baseInsert(CommentBean commentBean);

  List<CommentBean> selectAll();

  List<CommentBean> selectByGoodsId(int goodsId);
}
