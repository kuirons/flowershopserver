package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.dto.WareItem;
import com.wgy.flowershopserver.mapper.OrderRVendorMapper;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.OrderRVendorBean;
import com.wgy.flowershopserver.service.OrderRVendorService;
import com.wgy.flowershopserver.utils.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderRVendorServiceImpl implements OrderRVendorService {
  @Autowired OrderRVendorMapper orderRVendorMapper;
  @Autowired GoodsItemServiceImpl goodsItemService;

  @Override
  public void baseInsert(OrderRVendorBean orderRVendorBean) {
    orderRVendorMapper.baseInsert(orderRVendorBean);
  }

  @Override
  public List<OrderRVendorBean> selectByVendor(String vendor) {
    return orderRVendorMapper.selectByVendor(vendor);
  }

  @Override
  public List<OrderRVendorBean> splitOrder(OrderBean orderBean) {
    List<OrderRVendorBean> result = new ArrayList<>();
    List<WareItem> wareItems = JsonUtil.getInstance().toList(orderBean.getItems(), WareItem.class);
    for (WareItem w : wareItems) {
      List<GoodsItemBean> goodsItemBeans = goodsItemService.selectById(w.getWare_id());
      if (goodsItemBeans == null || goodsItemBeans.size() <= 0) return new ArrayList<>();
      OrderRVendorBean orderRVendorBean = new OrderRVendorBean();
      GoodsItemBean goodsItemBean = goodsItemBeans.get(0);
      // 这里应该用浮点数，但是为了方便，直接整数吧
      int amount = (int) (goodsItemBean.getPrice() * w.getAmount());
      orderRVendorBean.setOrderId(orderBean.getId());
      orderRVendorBean.setVendor(goodsItemBean.getVendor());
      orderRVendorBean.setBuyUser(orderBean.getUserName());
      orderRVendorBean.setAddress(orderBean.getAddress());
      orderRVendorBean.setAmount(amount);
      orderRVendorBean.setPayChannel(orderBean.getPayChannel());
      result.add(orderRVendorBean);
    }
    return result;
  }

  @Override
  public List<OrderRVendorBean> selectByOrderId(int orderId) {
    return orderRVendorMapper.selectByOrderId(orderId);
  }

  @Override
  public void updateStatusById(int id) {
    orderRVendorMapper.updateStatusById(id);
  }
}
