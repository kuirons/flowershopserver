package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.OrderRVendorBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderRVendorMapper {
  void baseInsert(OrderRVendorBean orderRVendorBean);

  List<OrderRVendorBean> selectByVendor(String vendor);

  List<OrderRVendorBean> selectByOrderId(int orderId);

  void updateStatusById(int id);
}
