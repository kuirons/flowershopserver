package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.mapper.CategoryMapper;
import com.wgy.flowershopserver.pojo.CategoryBean;
import com.wgy.flowershopserver.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
  @Autowired CategoryMapper categoryMapper;

  @Override
  public List<CategoryBean> getAllInfos() {
    return categoryMapper.selectAll();
  }

  @Override
  public void delete() {
    categoryMapper.deleteAll();
  }

  @Override
  public void baseInsert(CategoryBean categoryBean) {
    categoryMapper.baseInsert(categoryBean);
  }

  @Override
  public void deleteById(int id) {
    categoryMapper.deleteById(id);
  }
}
