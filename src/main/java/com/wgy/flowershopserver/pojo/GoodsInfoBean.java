package com.wgy.flowershopserver.pojo;

/** 首页商品信息 */
public class GoodsInfoBean {
  private String id;
  private String title;
  private String imgUrl;
  private String belong2Title;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getImgUrl() {
    return imgUrl;
  }

  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }

  public String getBelong2Title() {
    return belong2Title;
  }

  public void setBelong2Title(String belong2Title) {
    this.belong2Title = belong2Title;
  }
}
