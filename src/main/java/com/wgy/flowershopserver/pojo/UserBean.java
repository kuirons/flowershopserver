package com.wgy.flowershopserver.pojo;

import com.wgy.flowershopserver.utils.JsonUtil;

public class UserBean {
  /** 方便起见，直接作为主键 */
  private String userName;
  /** 一般来说密码是要非对称加密的 */
  private String password;
  /** 用户类型 1.普通用户 2.卖家 */
  private int type;
  // 模拟货币
  private int money = 10000;

  private String logo_url;

  public String getLogo_url() {
    return logo_url;
  }

  public void setLogo_url(String logo_url) {
    this.logo_url = logo_url;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public int getMoney() {
    return money;
  }

  public void setMoney(int money) {
    this.money = money;
  }

  public static void main(String[] args) {
    UserBean test = new UserBean();
    test.setUserName("username");
    test.setPassword("password");
    test.setType(1);
    test.setLogo_url("logurl");
    System.out.println(JsonUtil.getInstance().toString(test));
  }
}
