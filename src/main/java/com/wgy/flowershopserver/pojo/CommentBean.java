package com.wgy.flowershopserver.pojo;

/** 首页轮播图bean */
public class CommentBean {
  /** id 自增 */
  private int id;
  /** 商品id */
  private int goodsId;
  /** 评论 */
  private String comment;
  /** 创建时间，时间戳 */
  private String createTime;
  /** 创建者 */
  private String createUser;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getGoodsId() {
    return goodsId;
  }

  public void setGoodsId(int goodsId) {
    this.goodsId = goodsId;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public String getCreateTime() {
    return createTime;
  }

  public void setCreateTime(String createTime) {
    this.createTime = createTime;
  }

  public String getCreateUser() {
    return createUser;
  }

  public void setCreateUser(String createUser) {
    this.createUser = createUser;
  }
}
