package com.wgy.flowershopserver.service;

import com.wgy.flowershopserver.pojo.CategoryBean;

import java.util.List;

public interface CategoryService {
  List<CategoryBean> getAllInfos();

  void delete();

  void baseInsert(CategoryBean categoryBean);

  void deleteById(int id);
}
