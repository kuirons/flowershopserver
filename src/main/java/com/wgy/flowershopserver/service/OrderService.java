package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.dto.OrderMsgDto;
import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.ShoppingCartBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface OrderService {
  void baseInsert(OrderBean orderBean);

  List<OrderBean> selectByUserName(String userName);

  List<OrderBean> selectAll();

  int pay(int amount, String userName);

  List<OrderMsgDto> selectByNameStatus(String userName, String status);

  void updateDeliverySatatus(int id, String deliveryStatus);

  List<OrderBean> selectById(@Param("id") int id);

  List<ShoppingCartBean> changeOrder2ShoppingCar(List<OrderBean> orderBeans);

  void updateSatatus(int id);
}
