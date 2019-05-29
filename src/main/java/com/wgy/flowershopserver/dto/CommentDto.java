package com.wgy.flowershopserver.dto;

public class CommentDto {
  /** id 自增 */
  private Integer id;
  /** 商品名称 */
  private String goodsName;
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

  public String getGoodsName() {
    return goodsName;
  }

  public void setGoodsName(String goodsName) {
    this.goodsName = goodsName;
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
