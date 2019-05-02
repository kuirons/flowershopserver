package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.serviceimpl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
public class OrderController {
  @Autowired private OrderServiceImpl orderService;

  @RequestMapping("/create")
  public String createOrder(
      String userName, String items, String payChannel, String amount, String addr) {
    int status = orderService.pay(Integer.valueOf(amount), userName);
    OrderBean orderBean = new OrderBean();
    orderBean.setAddress(addr);
    orderBean.setAmount(Integer.valueOf(amount));
    orderBean.setConsigneeMsg("");
    orderBean.setCreateTime("");
    orderBean.setItems(items);
    orderBean.setPayChannel(payChannel);
    orderBean.setStatus(String.valueOf(status));
    orderBean.setUserName(userName);
    orderService.baseInsert(orderBean);
    return String.valueOf(status);
  }
}
