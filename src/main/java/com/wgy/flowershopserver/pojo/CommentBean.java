package com.wgy.flowershopserver.pojo;

/** 首页轮播图bean */
public class CommentBean {
  /** id 自增 */
  private Integer id;
  /** 商品id */
  private Integer goodsId;
  /** 评论 */
  private String comment;
  /** 创建时间，时间戳 */
  private String createTime;
  /** 创建者 */
  private String createUser;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getGoodsId() {
    return goodsId;
  }

  public void setGoodsId(Integer goodsId) {
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
