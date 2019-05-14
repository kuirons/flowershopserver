package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.OrderBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderMapper {
  void baseInsert(OrderBean orderBean);

  List<OrderBean> selectByUserName(String userName);

  List<OrderBean> selectAll();

  List<OrderBean> selectByNameStatus(String userName, String status);

  void updateDeliverySatatus(@Param("id") int id, @Param("deliveryStatus") String deliveryStatus);

  List<OrderBean> selectById(@Param("id") int id);

  void updateSatatus(int id);
}
