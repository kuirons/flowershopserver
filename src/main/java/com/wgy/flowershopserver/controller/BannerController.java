package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.serviceimpl.BannerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BannerController {
  @Autowired private BannerServiceImpl bannerService;

  @RequestMapping("/allinfos")
  public List<BannerBean> getAllBannerInfos() {
    return bannerService.getAllBannerInfos();
  }

  @RequestMapping("/test")
  public String test() {
    return "test";
  }
}
