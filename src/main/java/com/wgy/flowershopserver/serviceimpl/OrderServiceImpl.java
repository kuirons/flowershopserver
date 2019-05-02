package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.OrderMapper;
import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.UserBean;
import com.wgy.flowershopserver.service.OrderService;
import com.wgy.flowershopserver.utils.MathUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
  @Autowired private OrderMapper orderMapper;
  @Autowired private UserServiceImpl userService;

  @Override
  public void baseInsert(OrderBean orderBean) {
    orderMapper.baseInsert(orderBean);
  }

  @Override
  public List<OrderBean> selectByUserName(String userName) {
    return orderMapper.selectByUserName(userName);
  }

  @Override
  public List<OrderBean> selectAll() {
    return orderMapper.selectAll();
  }

  @Override
  public int pay(int amount, String userName) {
    UserBean userBean = userService.selectByUserName(userName);
    if (userBean.getMoney() < amount) return -2;
    userBean.setMoney(MathUtil.safeAdd(userBean.getMoney(), -amount));
    userService.updateMoney(userBean);
    return 1;
  }
}
