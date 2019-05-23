package com.wgy.flowershopserver.pojo;

public class OrderRVendorBean {
  // 这里没有记录时间字段，对于订单来说时间字段是很重要的一个字段，也是复杂功能必须的一个字段
  private Integer id;
  private Integer orderId;
  private String vendor;
  private Integer status = -1;
  private String buyUser;
  private String address;
  private Integer amount;
  private String payChannel;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getOrderId() {
    return orderId;
  }

  public void setOrderId(Integer orderId) {
    this.orderId = orderId;
  }

  public String getVendor() {
    return vendor;
  }

  public void setVendor(String vendor) {
    this.vendor = vendor;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public String getBuyUser() {
    return buyUser;
  }

  public void setBuyUser(String buyUser) {
    this.buyUser = buyUser;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public Integer getAmount() {
    return amount;
  }

  public void setAmount(Integer amount) {
    this.amount = amount;
  }

  public String getPayChannel() {
    return payChannel;
  }

  public void setPayChannel(String payChannel) {
    this.payChannel = payChannel;
  }
}
