package com.wgy.flowershopserver.pojo;

import java.util.List;

/** 单个商品数据 */
public class GoodsItemBean {
  private int id;

  /** 所属的类别 * */
  private int categoryId;
  /** 主页类别，如果为-1表示不在首页展示 */
  private int campaignId;

  private String name;
  private String imgUrl;
  /** 价格 */
  private double price;
  /** 销量 */
  private double sale;
  /** 主页详细信息图片列表 */
  List<GoodsItemRImg> detailInfosImgUrl;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(int categoryId) {
    this.categoryId = categoryId;
  }

  public int getCampaignId() {
    return campaignId;
  }

  public void setCampaignId(int campaignId) {
    this.campaignId = campaignId;
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

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public double getSale() {
    return sale;
  }

  public void setSale(double sale) {
    this.sale = sale;
  }

  public List<GoodsItemRImg> getDetailInfosImgUrl() {
    return detailInfosImgUrl;
  }

  public void setDetailInfosImgUrl(List<GoodsItemRImg> detailInfosImgUrl) {
    this.detailInfosImgUrl = detailInfosImgUrl;
  }
}
