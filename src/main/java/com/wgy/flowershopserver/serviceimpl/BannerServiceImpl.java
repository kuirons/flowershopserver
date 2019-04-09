package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.BannerMapper;
import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.service.BannerService;
import com.wgy.flowershopserver.utils.CustomConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.applet.Main;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {
  @Autowired private BannerMapper bannerMapper;
  @Autowired private CustomConfig customConfig;

  @Override
  public List<BannerBean> getAllBannerInfos() {
    List<BannerBean> allInfos = bannerMapper.selectAll();
    return allInfos;
  }

  @Override
  public void deleteById(int id) {
    bannerMapper.deleteById(id);
  }

  @Override
  public void baseInsert(BannerBean bannerBean) {
    bannerMapper.baseInsert(bannerBean);
  }

  @Override
  public void dealFile(MultipartFile multipartFile) {
    String fileName = multipartFile.getOriginalFilename();
    String path = customConfig.getImgUrl() + fileName;
    File dest = new File(path);
    if (!dest.getParentFile().exists()) {
      dest.getParentFile().mkdirs();
    }
    try {
      multipartFile.transferTo(dest);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
