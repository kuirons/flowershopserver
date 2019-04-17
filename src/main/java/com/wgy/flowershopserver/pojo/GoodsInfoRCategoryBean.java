package com.wgy.flowershopserver.pojo;

/** 这个表是用来维护首页分类和title关系的 */
public class GoodsInfoRCategoryBean {
  private int id;
  private String title;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
