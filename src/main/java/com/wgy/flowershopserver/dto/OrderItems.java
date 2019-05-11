package com.wgy.flowershopserver.dto;

import com.wgy.flowershopserver.pojo.GoodsItemBean;

public class OrderItems {

  private int id=1;
  private float amount=0;
  private int orderId=0;
  // 仓库id
  private int ware_id = 0;
  private GoodsItemBean listBean;

  public int getOrderId() {
    return orderId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public int getWare_id() {
    return ware_id;
  }

  public void setWare_id(int ware_id) {
    this.ware_id = ware_id;
  }

  public GoodsItemBean getListBean() {
    return listBean;
  }

  public void setListBean(GoodsItemBean listBean) {
    this.listBean = listBean;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public float getAmount() {
    return amount;
  }

  public void setAmount(float amount) {
    this.amount = amount;
  }
}
