package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.serviceimpl.BannerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/banner")
public class BannerController {
  @Autowired private BannerServiceImpl bannerService;

  @RequestMapping("/allinfos")
  public List<BannerBean> getAllBannerInfos() {
    return bannerService.getAllBannerInfos();
  }

  @RequestMapping("/deleteById")
  public void deleteById(@RequestParam(value = "bannerId") int id) {
    bannerService.deleteById(id);
  }

  @RequestMapping("/insert")
  public void insert(HttpServletRequest request) {
    String name = request.getParameter("name");
    String imgUrl = request.getParameter("imgUrl");

  }
}
