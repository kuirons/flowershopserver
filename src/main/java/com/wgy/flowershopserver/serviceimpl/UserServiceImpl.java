package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.UserMapper;
import com.wgy.flowershopserver.pojo.UserBean;
import com.wgy.flowershopserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
  @Autowired private UserMapper userMapper;

  @Override
  public void baseInsert(UserBean userBean) {
    userMapper.baseInsert(userBean);
  }

  @Override
  public void deleteByUserName(String userName) {
    userMapper.deleteByUserName(userName);
  }

  @Override
  public UserBean selectByUserName(String userName) {
    return userMapper.selectByUserName(userName);
  }

  @Override
  public void updateMoney(UserBean userBean) {
    userMapper.updateMoney(userBean);
  }

  @Override
  public List<UserBean> selectAll() {
    return userMapper.selectAll();
  }

  @Override
  public void updateUserInfo(UserBean userBean) {
    userMapper.updateUserInfo(userBean);
  }
}
