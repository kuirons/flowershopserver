package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.CommentBean;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.serviceimpl.CommentServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsItemServiceImpl;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/comment")
public class CommentController {
  @Autowired private CommentServiceImpl commentService;
  @Autowired private GoodsItemServiceImpl goodsItemService;

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

  // 前端妖艳得要求，好，满足他
  // 非连表查询
  @RequestMapping("/queryByVendor")
  public List<CommentBean> queryByVendor(HttpServletRequest request) {
    String vendor = (String) request.getSession().getAttribute("userName");
    vendor = StringUtils.isEmpty(vendor) ? "test" : vendor;
    List<GoodsItemBean> goodsItemBeans = goodsItemService.selectByVendor(vendor);
    List<CommentBean> commentBeans = new ArrayList<>();
    for (GoodsItemBean bean : goodsItemBeans) {
      commentBeans.addAll(commentService.selectByGoodsId(bean.getId()));
    }
    return commentBeans;
  }
}
