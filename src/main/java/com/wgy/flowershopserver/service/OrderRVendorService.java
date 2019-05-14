package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.OrderRVendorBean;

import java.util.List;

public interface OrderRVendorService {
  void baseInsert(OrderRVendorBean orderRVendorBean);

  List<OrderRVendorBean> selectByVendor(String vendor);

  List<OrderRVendorBean> splitOrder(OrderBean orderBean);

  List<OrderRVendorBean> selectByOrderId(int orderId);

  void updateStatusById(int id);
}
