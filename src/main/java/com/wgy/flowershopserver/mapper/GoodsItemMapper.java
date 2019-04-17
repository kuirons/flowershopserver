package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.GoodsItemBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface GoodsItemMapper {
  //  void baseInsert(BannerBean bannerBean);
  //
  //  List<BannerBean> selectAll();
  //
  //  void deleteById(int id);
  List<GoodsItemBean> selectByCampaignId(int campaignid);

  List<GoodsItemBean> selectByCategoryId(int categoryid);

  List<GoodsItemBean> selectById(int id);

}
