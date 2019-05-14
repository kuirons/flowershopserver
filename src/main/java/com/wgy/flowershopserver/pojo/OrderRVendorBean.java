package com.wgy.flowershopserver.pojo;

public class OrderRVendorBean {
  // 这里没有记录时间字段，对于订单来说时间字段是很重要的一个字段，也是复杂功能必须的一个字段
  private int id;
  private int orderId;
  private String vendor;
  private int status = -1;
  private String buyUser;
  private String address;
  private int amount;
  private String payChannel;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public String getVendor() {
    return vendor;
  }

  public void setVendor(String vendor) {
    this.vendor = vendor;
  }

  public int getStatus() {
    return status;
  }

  public void setStatus(int status) {
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

  public int getAmount() {
    return amount;
  }

  public void setAmount(int amount) {
    this.amount = amount;
  }

  public String getPayChannel() {
    return payChannel;
  }

  public void setPayChannel(String payChannel) {
    this.payChannel = payChannel;
  }
}
