package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.CommentMapper;
import com.wgy.flowershopserver.pojo.CommentBean;
import com.wgy.flowershopserver.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
  @Autowired CommentMapper commentMapper;

  @Override
  public void baseInsert(CommentBean commentBean) {
    commentMapper.baseInsert(commentBean);
  }

  @Override
  public List<CommentBean> selectAll() {
    return commentMapper.selectAll();
  }

  @Override
  public List<CommentBean> selectByGoodsId(int goodsId) {
    return commentMapper.selectByGoodsId(goodsId);
  }
}
