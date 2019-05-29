package com.wgy.flowershopserver.serviceimpl;

import com.wgy.flowershopserver.dto.ConsigneeMsg;
import com.wgy.flowershopserver.dto.OrderItems;
import com.wgy.flowershopserver.dto.OrderMsgDto;
import com.wgy.flowershopserver.dto.WareItem;
import com.wgy.flowershopserver.mapper.OrderMapper;
import com.wgy.flowershopserver.pojo.GoodsItemBean;
import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.ShoppingCartBean;
import com.wgy.flowershopserver.pojo.UserBean;
import com.wgy.flowershopserver.service.OrderService;
import com.wgy.flowershopserver.utils.JsonUtil;
import com.wgy.flowershopserver.utils.MathUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
  @Autowired private OrderMapper orderMapper;
  @Autowired private UserServiceImpl userService;
  @Autowired private GoodsItemServiceImpl goodsItemService;

  @Override
  public int baseInsert(OrderBean orderBean) {
    return orderMapper.baseInsert(orderBean);
  }

  @Override
  public List<OrderBean> selectByUserName(String userName) {
    return orderMapper.selectByUserName(userName);
  }

  @Override
  public List<OrderBean> selectAll() {
    return orderMapper.selectAll();
  }

  @Override
  public int pay(int amount, String userName) {
    UserBean userBean = userService.selectByUserName(userName);
    if (userBean.getMoney() < amount) return -2;
    userBean.setMoney(MathUtil.safeAdd(userBean.getMoney(), -amount));
    userService.updateMoney(userBean);
    return 1;
  }

  @Override
  public List<OrderMsgDto> selectByNameStatus(String userName, String status) {
    List<OrderMsgDto> result = new ArrayList<>();

    List<OrderBean> orderBeans;
    if ("2".equals(status)) orderBeans = orderMapper.selectByUserName(userName);
    else orderBeans = orderMapper.selectByNameStatus(userName, status);
    for (OrderBean o : orderBeans) {
      OrderMsgDto orderMsgDto = new OrderMsgDto();
      orderMsgDto.setId(o.getId());
      orderMsgDto.setOrderNum(String.valueOf(o.getId()));
      orderMsgDto.setCreatedTime(o.getCreateTime());
      orderMsgDto.setAmount(o.getAmount());
      orderMsgDto.setStatus(Integer.valueOf(o.getStatus()));
      orderMsgDto.setConsigneeMsg(new ConsigneeMsg());
      orderMsgDto.setDeliveryStatus(o.getDeliveryStatus());
      String goodsJson = o.getItems();
      List<WareItem> wareItems = JsonUtil.getInstance().toList(goodsJson, WareItem.class);
      List<OrderItems> orderItems = new ArrayList<>();
      for (WareItem wareItem : wareItems) {
        OrderItems oi = new OrderItems();
        List<GoodsItemBean> goodsItemBeans = goodsItemService.selectById(wareItem.getWare_id());
        if (goodsItemBeans.size() <= 0) return null;
        GoodsItemBean goodsItemBean = goodsItemBeans.get(0);
        oi.setListBean(goodsItemBean);
        orderItems.add(oi);
      }
      orderMsgDto.setItems(orderItems);
      result.add(orderMsgDto);
    }
    return result;
  }

  @Override
  public void updateDeliverySatatus(int id, String deliveryStatus) {
    orderMapper.updateDeliverySatatus(id, deliveryStatus);
  }

  @Override
  public List<OrderBean> selectById(int id) {
    return orderMapper.selectById(id);
  }

  @Override
  public List<ShoppingCartBean> changeOrder2ShoppingCar(List<OrderBean> orderBeans) {
    List<ShoppingCartBean> shoppingCartBeans = new ArrayList<>();
    // 这里orderbean只可能有一个
    if (orderBeans == null || orderBeans.size() <= 0) return null;
    OrderBean orderBean = orderBeans.get(0);
    String items = orderBean.getItems();
    List<WareItem> wareItems = JsonUtil.getInstance().toList(items, WareItem.class);
    for (WareItem wareItem : wareItems) {
      List<GoodsItemBean> goodsItemBeans = goodsItemService.selectById(wareItem.getWare_id());
      if (goodsItemBeans.size() <= 0) return null;
      GoodsItemBean goodsItemBean = goodsItemBeans.get(0);
      shoppingCartBeans.add(ShoppingCartBean.getInstance(goodsItemBean, wareItem.getAmount()));
    }
    return shoppingCartBeans;
  }

  @Override
  public void updateSatatus(int id) {
    orderMapper.updateSatatus(id);
  }
}
