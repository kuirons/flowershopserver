package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.dto.OrderMsgDto;
import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.ShoppingCartBean;
import com.wgy.flowershopserver.serviceimpl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

  @RequestMapping("/queryinfos")
  public List<OrderMsgDto> queryInfos(String userName, String status) {
    return orderService.selectByNameStatus(userName, status);
  }

  @RequestMapping("/updatedeliverystatus")
  public void updateDeliveryStatus(String id, String deliveryStatus) {
    orderService.updateDeliverySatatus(Integer.valueOf(id), deliveryStatus);
  }

  @RequestMapping("/changeordertocarinfo")
  public List<ShoppingCartBean> changeOrder2Carinfo(String id) {
    List<OrderBean> orderBeans = orderService.selectById(Integer.valueOf(id));
    return orderService.changeOrder2ShoppingCar(orderBeans);
  }
}
