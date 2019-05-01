package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.UserMapper;
import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.pojo.UserBean;
import com.wgy.flowershopserver.service.BannerService;
import com.wgy.flowershopserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
}
