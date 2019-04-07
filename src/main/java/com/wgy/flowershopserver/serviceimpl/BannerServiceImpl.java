package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.BannerMapper;
import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {
  @Autowired private BannerMapper bannerMapper;

  @Override
  public List<BannerBean> getAllBannerInfos() {
    List<BannerBean> allInfos = bannerMapper.selectAll();
    return allInfos;
  }
}