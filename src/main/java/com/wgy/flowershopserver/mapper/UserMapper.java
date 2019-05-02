package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {
  void baseInsert(UserBean userBean);

  void deleteByUserName(String userName);

  UserBean selectByUserName(String userName);

  void updateMoney(UserBean userBean);
}
