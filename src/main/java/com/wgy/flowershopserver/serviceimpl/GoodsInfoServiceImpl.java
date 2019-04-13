package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.dto.GoodsInfoDto;
import com.wgy.flowershopserver.mapper.GoodsinfoMapper;
import com.wgy.flowershopserver.pojo.GoodsInfoBean;
import com.wgy.flowershopserver.service.GoodsInfoService;
import com.wgy.flowershopserver.utils.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class GoodsInfoServiceImpl implements GoodsInfoService {
  @Autowired private GoodsinfoMapper goodsinfoMapper;

  @Override
  public List<GoodsInfoBean> getAllGoodsInfos() {
    List<GoodsInfoBean> allInfos = goodsinfoMapper.selectAll();
    return allInfos;
  }

  @Override
  public void deleteById(int id) {
    goodsinfoMapper.deleteById(id);
  }

  @Override
  public void baseInsert(GoodsInfoBean goodsInfoBean) {
    goodsinfoMapper.baseInsert(goodsInfoBean);
  }

  @Override
  public void dealFile(List<MultipartFile> multipartFiles) {
    multipartFiles.forEach(file -> FileUtil.writeFileToDir(file));
  }

  @Override
  public List<GoodsInfoDto> mapGoodsInfos2Dto() {
    List<GoodsInfoBean> goodsInfoBeans = getAllGoodsInfos();
    Map<String, List<GoodsInfoBean>> infosByTitle =
        goodsInfoBeans.stream().collect(Collectors.groupingBy(GoodsInfoBean::getBelong2Title));
    // 注意这里要用线程安全的计数器
    AtomicInteger counter = new AtomicInteger(1);
    // 这里要过滤一下长度不为3的
    List<GoodsInfoDto> goodsInfoDtos =
        infosByTitle.entrySet().stream()
            .filter(
                entry -> {
                  if (entry.getValue().size() < 3) return false;
                  return true;
                })
            .map(entry -> GoodsInfoDto.getInstance(entry.getValue(), counter.getAndIncrement()))
            .collect(Collectors.toList());
    return goodsInfoDtos;
  }
}
