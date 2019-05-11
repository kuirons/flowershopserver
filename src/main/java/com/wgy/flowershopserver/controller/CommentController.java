package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.CommentBean;
import com.wgy.flowershopserver.serviceimpl.CommentServiceImpl;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
  @Autowired private CommentServiceImpl commentService;

  @RequestMapping("/queryByGoodsId")
  public List<CommentBean> queryByGoodsId(String goodsId) {
    int gId = Integer.valueOf(goodsId);
    return commentService.selectByGoodsId(gId);
  }

  @RequestMapping("/create")
  public void insert(String commentJson) {
    List<CommentBean> commentBeans = JsonUtil.getInstance().toList(commentJson, CommentBean.class);
    commentBeans.forEach(commentBean -> commentService.baseInsert(commentBean));
  }
}
