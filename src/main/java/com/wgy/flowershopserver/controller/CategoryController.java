package com.wgy.flowershopserver.controller;

import com.wgy.flowershopserver.pojo.CategoryBean;
import com.wgy.flowershopserver.service.CategoryService;
import com.wgy.flowershopserver.serviceimpl.GoodsItemServiceImpl;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {
  @Autowired private CategoryService categoryService;
  @Autowired private GoodsItemServiceImpl goodsItemService;

  @RequestMapping("/allinfos")
  public List<CategoryBean> getAllInfos() {
    return categoryService.getAllInfos();
  }

  // 删除需要重置该类下的相关商品，重置为-1，
  @RequestMapping("/deletebyid")
  public void deleteById(@RequestParam(value = "id") int id) {
    goodsItemService.updateCategoryid(id);
    categoryService.deleteById(id);
  }

  @RequestMapping("/create")
  public void create(@RequestParam(value = "infosJosn") String infosJson) {
    CategoryBean categoryBean = JsonUtil.getInstance().toObject(infosJson, CategoryBean.class);
    categoryService.baseInsert(categoryBean);
  }

  @RequestMapping("/queryById")
  public List<CategoryBean> queryById(int id) {
    return categoryService.selectById(id);
  }
}
