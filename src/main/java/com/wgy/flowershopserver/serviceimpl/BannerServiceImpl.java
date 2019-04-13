package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.BannerMapper;
import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.service.BannerService;
import com.wgy.flowershopserver.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {
  @Autowired private BannerMapper bannerMapper;

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
    FileUtil.writeFileToDir(multipartFile);
  }
}
