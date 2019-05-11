package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.CommentBean;

import java.util.List;

public interface CommentService {
  void baseInsert(CommentBean commentBean);

  List<CommentBean> selectAll();

  List<CommentBean> selectByGoodsId(int goodsId);
}
