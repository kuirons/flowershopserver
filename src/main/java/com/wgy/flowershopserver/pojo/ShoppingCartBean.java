package com.wgy.flowershopserver.pojo;

/** Describe: 购物车商品信息.数据来源于商品数据.但多了数量、是否选中两个 属性 */
public class ShoppingCartBean extends GoodsItemBean {

  private int count;
  private boolean isChecked = true;

  public int getCount() {
    return count;
  }

  public void setCount(int count) {
    this.count = count;
  }

  public boolean isChecked() {
    return isChecked;
  }

  public void setIsChecked(boolean isChecked) {
    this.isChecked = isChecked;
  }

  public static ShoppingCartBean getInstance(GoodsItemBean goodsItemBean, int count) {
    ShoppingCartBean bean = new ShoppingCartBean();
    bean.setCount(count);
    bean.setIsChecked(false);
    bean.setId(goodsItemBean.getId());
    bean.setCampaignId(goodsItemBean.getCampaignId());
    bean.setCampaignId(goodsItemBean.getCampaignId());
    bean.setName(goodsItemBean.getName());
    bean.setImgUrl(goodsItemBean.getImgUrl());
    bean.setPrice(goodsItemBean.getPrice());
    bean.setSale(goodsItemBean.getSale());
    bean.setDetailInfosImgUrl(goodsItemBean.getDetailInfosImgUrl());
    return bean;
  }
}
