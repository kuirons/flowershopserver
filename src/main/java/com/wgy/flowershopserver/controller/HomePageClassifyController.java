package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.BannerBean;
import com.wgy.flowershopserver.pojo.GoodsInfoRCategoryBean;
import com.wgy.flowershopserver.serviceimpl.BannerServiceImpl;
import com.wgy.flowershopserver.serviceimpl.GoodsInfoRCategoryServiceImpl;
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
@RequestMapping("/homepageclassify")
public class HomePageClassifyController {
  @Autowired private GoodsInfoRCategoryServiceImpl goodsInfoRCategoryService;

  @RequestMapping("/allinfos")
  public List<GoodsInfoRCategoryBean> getAllrInfos() {
    return goodsInfoRCategoryService.getAllBannerInfos();
  }

  @RequestMapping("/deleteById")
  public void deleteById(@RequestParam(value = "bannerId") int id) {
    goodsInfoRCategoryService.deleteById(id);
  }

  @RequestMapping("/insert")
  public void insert(@RequestParam(value = "classinfos") String classinfosJson) {
    GoodsInfoRCategoryBean goodsInfoRCategoryBean =
        JsonUtil.getInstance().toObject(classinfosJson, GoodsInfoRCategoryBean.class);
    goodsInfoRCategoryService.baseInsert(goodsInfoRCategoryBean);
  }
}
