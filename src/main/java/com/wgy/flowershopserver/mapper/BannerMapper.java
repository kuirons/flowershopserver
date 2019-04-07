package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.BannerBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface BannerMapper {
  void baseInsert(BannerBean bannerBean);

  List<BannerBean> selectAll();

  void deleteById(int id);
}
