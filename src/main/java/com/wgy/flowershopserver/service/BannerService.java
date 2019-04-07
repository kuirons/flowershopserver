package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.BannerBean;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BannerService {
  List<BannerBean> getAllBannerInfos();

  void deleteById(int id);

  void baseInsert(BannerBean bannerBean);

  void dealFile(MultipartFile multipartFile);
}


