package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.dto.GoodsInfoDto;
import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.pojo.GoodsInfoBean;
import com.wgy.flowershopserver.serviceimpl.BannerServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsInfoServiceImpl;
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
@RequestMapping("/goodsinfo")
public class GoodsInfoController {
  @Autowired private GoodsInfoServiceImpl goodsInfoService;

  @RequestMapping("/allinfos")
  public List<GoodsInfoBean> getAllGoodsInfos() {
    return goodsInfoService.getAllGoodsInfos();
  }

  @RequestMapping("/allinfosdto")
  public List<GoodsInfoDto> getAllGoodsInfosToDto() {
    return goodsInfoService.mapGoodsInfos2Dto();
  }

  /**
   * 一般不要用这个方法，会造成数据不完整，按blongtitle比较稳
   *
   * @param id
   */
  @RequestMapping("/deleteById")
  public void deleteById(@RequestParam(value = "bannerId") int id) {
    goodsInfoService.deleteById(id);
  }

  @RequestMapping("/insert")
  public void insert(HttpServletRequest request) {
    String insertObjectsJson = request.getParameter("inertObjectsJson");
    // 这里做反序列化
    List<GoodsInfoBean> goodsInfoBeans =
        JsonUtil.getInstance().toList(insertObjectsJson, GoodsInfoBean.class);
    List<MultipartFile> multipartFiles = ((MultipartHttpServletRequest) request).getFiles("file");
    goodsInfoService.dealFile(multipartFiles);
    goodsInfoBeans.forEach(
        goodsInfoBean -> {
          goodsInfoBean.setImgUrl(
              CustomConfig.attributeMap.get("ffsaddress") + "/" + goodsInfoBean.getImgUrl());
          goodsInfoService.baseInsert(goodsInfoBean);
        });
  }
}
