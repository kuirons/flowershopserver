package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.GoodsItemMapper;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.service.GoodsItemService;
import com.wgy.flowershopserver.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GoodsItemServiceImpl implements GoodsItemService {
  @Autowired private GoodsItemMapper goodsItemMapper;

  public static final int TAG_DEFAULT = 0; // tabLayout 默认
  public static final int TAG_SALE = 1; // tabLayout 价格
  public static final int TAG_PRICE = 2; // tabLayout 销量

  @Override
  public List<GoodsItemBean> selectByCampaignId(int campaignid) {
    return goodsItemMapper.selectByCampaignId(campaignid);
  }

  @Override
  public List<GoodsItemBean> selectByCategoryId(int categoryid) {
    return goodsItemMapper.selectByCategoryId(categoryid);
  }

  @Override
  public List<GoodsItemBean> sort(List<GoodsItemBean> goodsItemBeans, int orderBy) {
    List<GoodsItemBean> result = goodsItemBeans;
    if (orderBy == TAG_SALE)
      return result.stream()
          .sorted(Comparator.comparing(GoodsItemBean::getSale))
          .collect(Collectors.toList());
    if (orderBy == TAG_PRICE)
      return result.stream()
          .sorted(Comparator.comparing(GoodsItemBean::getPrice))
          .collect(Collectors.toList());
    return result;
  }

  @Override
  public List<GoodsItemBean> selectById(int id) {
    return goodsItemMapper.selectById(id);
  }

  @Override
  public List<GoodsItemBean> search(String searchContent) {
    return goodsItemMapper.search(searchContent);
  }

  @Override
  public void updateCampaignid(int campaignid) {
    goodsItemMapper.updateCampaignid(campaignid);
  }

  @Override
  public void updateCategoryid(int categoryid) {
    goodsItemMapper.updateCategoryid(categoryid);
  }

  @Override
  public void baseInsert(GoodsItemBean goodsItemBean) {
    goodsItemMapper.baseInsert(goodsItemBean);
  }

  @Override
  public void dealWithFiles(List<MultipartFile> multipartFiles) {
    multipartFiles.forEach(multipartFile -> FileUtil.writeFileToDir(multipartFile));
  }

  @Override
  public void deleteById(int id) {
    goodsItemMapper.deleteById(id);
  }

  @Override
  public void updateAll(GoodsItemBean goodsItemBean) {
    goodsItemMapper.updateAll(goodsItemBean);
  }

  @Override
  public List<GoodsItemBean> selectByVendor(String vendor) {
    return goodsItemMapper.selectByVendor(vendor);
  }
}
