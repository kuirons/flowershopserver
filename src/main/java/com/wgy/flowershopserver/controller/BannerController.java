package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.serviceimpl.BannerServiceImpl;
import com.wgy.flowershopserver.utils.CustomConfig;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
  public BannerBean insert(HttpServletRequest request) {
    String infoJson = request.getParameter("bannerInfo");
    MultipartFile multipartFile = ((MultipartHttpServletRequest) request).getFile("file");
    // 反序列化
    BannerBean bannerBean = JsonUtil.getInstance().toObject(infoJson, BannerBean.class);
    bannerService.dealFile(multipartFile);
    bannerBean.setImgUrl(
        CustomConfig.attributeMap.get("ffsaddress") + "/" + multipartFile.getOriginalFilename());
    bannerService.baseInsert(bannerBean);
    return bannerBean;
  }
}
