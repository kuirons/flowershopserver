package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.OrderBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderMapper {
  void baseInsert(OrderBean orderBean);

  List<OrderBean> selectByUserName(String userName);

  List<OrderBean> selectAll();
}
