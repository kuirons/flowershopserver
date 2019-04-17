package com.wgy.flowershopserver.pojo;

/** 维护商品详细信息图片与商品的关联关系 */
public class GoodsItemRImg {
  private int id;
  private int goodsItemId;
  private String imgUrl;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getGoodsItemId() {
    return goodsItemId;
  }

  public void setGoodsItemId(int goodsItemId) {
    this.goodsItemId = goodsItemId;
  }

  public String getImgUrl() {
    return imgUrl;
  }

  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }
}
