package com.wgy.flowershopserver.dto;

import com.wgy.flowershopserver.pojo.GoodsItemBean;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class HotGoodsDto {
  private String copyright;
  private int totalCount;
  private int currentPage;
  private int totalPage;
  private int pageSize;
  private List<OrdersBean> orders;
  private List<ListBean> list;

  // 该方法用于将数据库表数据转化成app可识别数据结构
  public static HotGoodsDto getInstance(List<GoodsItemBean> goodsItemBeans) {
    HotGoodsDto hotGoodsDto = new HotGoodsDto();
    if (goodsItemBeans.size() <= 0) return hotGoodsDto;
    hotGoodsDto.setTotalCount(goodsItemBeans.size());
    // 未实现相关功能，所以该块功能参数先写死
    hotGoodsDto.setCopyright("");
    hotGoodsDto.setCurrentPage(1);
    hotGoodsDto.setPageSize(10);
    hotGoodsDto.setOrders(new ArrayList<>());
    hotGoodsDto.setList(
        goodsItemBeans.stream()
            .map(goodsItemBean -> ListBean.getInstance(goodsItemBean))
            .collect(Collectors.toList()));
    return hotGoodsDto;
  }

  public String getCopyright() {
    return copyright;
  }

  public void setCopyright(String copyright) {
    this.copyright = copyright;
  }

  public int getTotalCount() {
    return totalCount;
  }

  public void setTotalCount(int totalCount) {
    this.totalCount = totalCount;
  }

  public int getCurrentPage() {
    return currentPage;
  }

  public void setCurrentPage(int currentPage) {
    this.currentPage = currentPage;
  }

  public int getTotalPage() {
    return totalPage;
  }

  public void setTotalPage(int totalPage) {
    this.totalPage = totalPage;
  }

  public int getPageSize() {
    return pageSize;
  }

  public void setPageSize(int pageSize) {
    this.pageSize = pageSize;
  }

  public List<OrdersBean> getOrders() {
    return orders;
  }

  public void setOrders(List<OrdersBean> orders) {
    this.orders = orders;
  }

  public List<ListBean> getList() {
    return list;
  }

  public void setList(List<ListBean> list) {
    this.list = list;
  }

  public static class OrdersBean {
    /** orderType : DESC field : id */
    private String orderType;

    private String field;

    public String getOrderType() {
      return orderType;
    }

    public void setOrderType(String orderType) {
      this.orderType = orderType;
    }

    public String getField() {
      return field;
    }

    public void setField(String field) {
      this.field = field;
    }
  }

  public static class ListBean {
    private int id;

    private int categoryId;
    private int campaignId;
    private String name;
    private String imgUrl;
    private double price;
    private double sale;

    // 该函数将itembean转化未listbean
    public static ListBean getInstance(GoodsItemBean goodsItemBean) {
      ListBean listBean = new ListBean();
      listBean.setId(goodsItemBean.getId());
      listBean.setCategoryId(goodsItemBean.getCategoryId());
      listBean.setCampaignId(goodsItemBean.getCampaignId());
      listBean.setName(goodsItemBean.getName());
      listBean.setImgUrl(goodsItemBean.getImgUrl());
      listBean.setPrice(goodsItemBean.getPrice());
      listBean.setSale(goodsItemBean.getSale());
      return listBean;
    }

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
  }
}
