package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.dto.RegisterMessage;
import com.wgy.flowershopserver.pojo.UserBean;
import com.wgy.flowershopserver.serviceimpl.UserServiceImpl;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/ffsuser")
public class UserController {
  @Autowired private UserServiceImpl userService;

  @RequestMapping("/create")
  public RegisterMessage register(@RequestParam(value = "userinfo") String userinfo) {
    RegisterMessage result = new RegisterMessage();
    UserBean userBean = JsonUtil.getInstance().toObject(userinfo, UserBean.class);
    if (userService.selectByUserName(userBean.getUserName()) != null) {
      result.setResult("failed");
      result.setMessage("当前用户已存在");
      return result;
    }
    userService.baseInsert(userBean);
    result.setResult("success");
    return result;
  }

  @RequestMapping("/login")
  public RegisterMessage login(
      HttpServletRequest request, @RequestParam(value = "userinfo") String userinfo) {
    RegisterMessage result = new RegisterMessage();
    UserBean userBean = JsonUtil.getInstance().toObject(userinfo, UserBean.class);
    UserBean queryUser = userService.selectByUserName(userBean.getUserName());
    if (queryUser == null) {
      result.setResult("failed");
      result.setMessage("当前用户未注册");
      return result;
    }
    if (!userBean.getPassword().equals(queryUser.getPassword())) {
      result.setResult("failed");
      result.setMessage("用户名或密码错误");
      return result;
    }
    if (userBean.getType() != queryUser.getType()) {
      result.setResult("failed");
      result.setMessage("当前登陆用户类型错误");
      return result;
    }
    request.getSession().setAttribute("userName", queryUser.getUserName());
    result.setResult("success");
    return result;
  }

  @RequestMapping(value = "/getAllUser")
  public List<UserBean> getAllUser() {
    return userService.selectAll();
  }

  @RequestMapping(value = "/deleteUserByName")
  public void deleteUserByName(String userName) {
    userService.deleteByUserName(userName);
  }

  @RequestMapping(value = "/updateUserInfo")
  public void updateUserInfo(String userInfoJson) {
    UserBean userBean = JsonUtil.getInstance().toObject(userInfoJson, UserBean.class);
    userService.baseInsert(userBean);
  }
}
