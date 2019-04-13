package com.wgy.flowershopserver.pojo;

import com.wgy.flowershopserver.utils.JsonUtil;

/** 首页轮播图bean */
public class BannerBean {
  /** id 自增 */
  private int id;
  /** 名称 */
  private String name;
  /** 图片地址 */
  private String imgUrl;

  private int type;

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

  public int getType() {
    return type;
  }

  public void setType(int type) {
    this.type = type;
  }

  public void setImgUrl(String imgUrl) {

    this.imgUrl = imgUrl;
  }

  public static void main(String[] args) {
    BannerBean bannerBean = new BannerBean();
    bannerBean.setName("teset");
    bannerBean.setImgUrl("aaaa");
    System.out.println(JsonUtil.getInstance().toString(bannerBean));
  }
}
