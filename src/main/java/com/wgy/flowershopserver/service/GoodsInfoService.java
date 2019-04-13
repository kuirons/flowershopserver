package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.dto.GoodsInfoDto;
import com.wgy.flowershopserver.pojo.GoodsInfoBean;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface GoodsInfoService {
  List<GoodsInfoBean> getAllGoodsInfos();

  void deleteById(int id);

  void baseInsert(GoodsInfoBean goodsInfoBean);

  void dealFile(List<MultipartFile> multipartFiles);

  List<GoodsInfoDto> mapGoodsInfos2Dto();

  void deleteByBelong2Title(String belong2Title);
}
