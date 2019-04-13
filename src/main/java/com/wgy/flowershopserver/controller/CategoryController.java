package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.CategoryBean;
import com.wgy.flowershopserver.service.CategoryService;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
  @Autowired private CategoryService categoryService;

  @RequestMapping("/allinfos")
  public List<CategoryBean> getAllInfos() {
    return categoryService.getAllInfos();
  }

  @RequestMapping("/operation")
  public void operation(@RequestParam(value = "allInfosJson") String allInfosJson) {
    // 反序列化
    List<CategoryBean> categoryBeans =
        JsonUtil.getInstance().toList(allInfosJson, CategoryBean.class);
    // 先清空表
    categoryService.delete();
    // 然后将所有数据插入
    categoryBeans.forEach(categoryBean -> categoryService.baseInsert(categoryBean));
  }
}
