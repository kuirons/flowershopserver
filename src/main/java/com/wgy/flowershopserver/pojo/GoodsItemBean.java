package com.wgy.flowershopserver.pojo;

import java.util.List;

/** 单个商品数据 */
public class GoodsItemBean {
  private Integer id;

  /** 所属的类别 * */
  private Integer categoryId;
  /** 主页类别，如果为-1表示不在首页展示 */
  private Integer campaignId;

  private String name;
  private String imgUrl;
  /** 价格 */
  private double price;
  /** 销量 */
  private double sale;
  /** 所属商家 */
  private String vendor;
  /** 主页详细信息图片列表 */
  List<GoodsRItemImgBean> detailInfosImgUrl;

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }

  public Integer getCampaignId() {
    return campaignId;
  }

  public void setCampaignId(Integer campaignId) {
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

  public List<GoodsRItemImgBean> getDetailInfosImgUrl() {
    return detailInfosImgUrl;
  }

  public void setDetailInfosImgUrl(List<GoodsRItemImgBean> detailInfosImgUrl) {
    this.detailInfosImgUrl = detailInfosImgUrl;
  }

  public String getVendor() {
    return vendor;
  }

  public void setVendor(String vendor) {
    this.vendor = vendor;
  }
}
