package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.UserBean;

public interface UserService {
  void baseInsert(UserBean userBean);

  void deleteByUserName(String userName);

  UserBean selectByUserName(String userName);

  void updateMoney(UserBean userBean);
}
