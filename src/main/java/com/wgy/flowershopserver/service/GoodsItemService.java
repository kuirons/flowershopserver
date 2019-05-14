package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.GoodsItemBean;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GoodsItemService {
  List<GoodsItemBean> selectByCampaignId(int campaignid);

  List<GoodsItemBean> selectByCategoryId(int categoryid);

  List<GoodsItemBean> sort(List<GoodsItemBean> goodsItemBeans, int orderBy);

  List<GoodsItemBean> selectById(int id);

  List<GoodsItemBean> search(String searchContent);

  void updateCampaignid(int campaignid);

  void updateCategoryid(int categoryid);

  void baseInsert(GoodsItemBean goodsItemBean);

  void dealWithFiles(List<MultipartFile> multipartFiles);

  void deleteById(int id);

  void updateAll(GoodsItemBean goodsItemBean);

  List<GoodsItemBean> selectByVendor(String vendor);
}
