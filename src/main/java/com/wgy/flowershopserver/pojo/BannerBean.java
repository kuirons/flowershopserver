package com.wgy.flowershopserver.pojo;

/** 首页轮播图bean */
public class BannerBean {
  /** id 自增 */
  private int id;
  /** 名称 */
  private String name;
  /** 图片地址 */
  private String imgUrl;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getImgUrl() {
    return imgUrl;
  }

  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }
}
