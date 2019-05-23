package com.wgy.flowershopserver.pojo;

public class OrderBean {
  private Integer id;
  private String userName;
  // 这里直接存json，避免另起一张表
  private String items;
  // 支付方式，alipay/wx/bfb
  private String payChannel;
  private String address;
  // 置空
  private String createTime = "";
  private Integer amount;
  // 1成功，-2失败，0，订单完成
  private String status;
  // 库存信息，默认字段，置空
  private String consigneeMsg = "";
  private String deliveryStatus = "未发货";

  public String getDeliveryStatus() {
    return deliveryStatus;
  }

  public void setDeliveryStatus(String deliveryStatus) {
    this.deliveryStatus = deliveryStatus;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getItems() {
    return items;
  }

  public void setItems(String items) {
    this.items = items;
  }

  public String getPayChannel() {
    return payChannel;
  }

  public void setPayChannel(String payChannel) {
    this.payChannel = payChannel;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getCreateTime() {
    return createTime;
  }

  public void setCreateTime(String createTime) {
    this.createTime = createTime;
  }

  public Integer getAmount() {
    return amount;
  }

  public void setAmount(Integer amount) {
    this.amount = amount;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getConsigneeMsg() {
    return consigneeMsg;
  }

  public void setConsigneeMsg(String consigneeMsg) {
    this.consigneeMsg = consigneeMsg;
  }
}
