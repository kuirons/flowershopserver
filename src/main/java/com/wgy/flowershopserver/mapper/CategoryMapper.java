package com.wgy.flowershopserver.mapper;

import com.wgy.flowershopserver.pojo.CategoryBean;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CategoryMapper {
  void baseInsert(CategoryBean categoryBean);

  List<CategoryBean> selectAll();

  void deleteAll();

  void deleteById(int id);

  List<CategoryBean> selectById(int id);
}
