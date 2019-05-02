package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.OrderBean;

import java.util.List;

public interface OrderService {
  void baseInsert(OrderBean orderBean);

  List<OrderBean> selectByUserName(String userName);

  List<OrderBean> selectAll();

  int pay(int amount,String userName);
}
