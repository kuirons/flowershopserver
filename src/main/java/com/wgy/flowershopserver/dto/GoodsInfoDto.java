package com.wgy.flowershopserver.dto;

import com.wgy.flowershopserver.pojo.Campaign;
import com.wgy.flowershopserver.pojo.GoodsInfoBean;

import java.util.List;
import java.util.stream.Collectors;

/** 这里需要对商品信息做一下转化，变成app可识别格式数据 */
public class GoodsInfoDto {
  private Campaign cpOne;
  private Campaign cpTwo;
  private Campaign cpThree;
  private int id;
  private String title;

  // 你只能传三个GoodsBean来构建一个用于app端显示的结构
  public static GoodsInfoDto getInstance(List<GoodsInfoBean> goodsInfoBeans, int id) {
    if (goodsInfoBeans.size() > 3 || goodsInfoBeans.size() <= 0) return null;
    GoodsInfoDto goodsInfoDto = new GoodsInfoDto();
    goodsInfoDto.setId(id);
    goodsInfoDto.setTitle(goodsInfoBeans.get(0).getBelong2Title());
    List<Campaign> campaigns =
        goodsInfoBeans.stream()
            .map(
                item -> {
                  Campaign campaign = new Campaign();
                  campaign.setId(item.getId());
                  campaign.setImgUrl(item.getImgUrl());
                  campaign.setTitle(item.getTitle());
                  return campaign;
                })
            .collect(Collectors.toList());
    goodsInfoDto.setCpOne(campaigns.get(0));
    goodsInfoDto.setCpOne(campaigns.get(1));
    goodsInfoDto.setCpOne(campaigns.get(2));
    return goodsInfoDto;
  }

  public Campaign getCpOne() {
    return cpOne;
  }

  public void setCpOne(Campaign cpOne) {
    this.cpOne = cpOne;
  }

  public Campaign getCpTwo() {
    return cpTwo;
  }

  public void setCpTwo(Campaign cpTwo) {
    this.cpTwo = cpTwo;
  }

  public Campaign getCpThree() {
    return cpThree;
  }

  public void setCpThree(Campaign cpThree) {
    this.cpThree = cpThree;
  }

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
