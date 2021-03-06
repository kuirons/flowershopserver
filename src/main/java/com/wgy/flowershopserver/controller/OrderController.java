package com.wgy.flowershopserver.controller;

import com.sun.xml.internal.ws.server.sei.EndpointResponseMessageBuilder;
import com.wgy.flowershopserver.dto.MessageDto;
import com.wgy.flowershopserver.dto.OrderMsgDto;
import com.wgy.flowershopserver.pojo.OrderBean;
import com.wgy.flowershopserver.pojo.OrderRVendorBean;
import com.wgy.flowershopserver.pojo.ShoppingCartBean;
import com.wgy.flowershopserver.pojo.UserBean;
import com.wgy.flowershopserver.serviceimpl.OrderRVendorServiceImpl;
import com.wgy.flowershopserver.serviceimpl.OrderServiceImpl;
import com.wgy.flowershopserver.serviceimpl.UserServiceImpl;
import com.wgy.flowershopserver.utils.JsonUtil;
import com.wgy.flowershopserver.utils.MathUtil;
import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
  @Autowired private OrderServiceImpl orderService;
  @Autowired private OrderRVendorServiceImpl orderRVendorService;
  @Autowired private UserServiceImpl userService;

  @RequestMapping("/create")
  public String createOrder(
      String userName, String items, String payChannel, String amount, String addr) {
    int status = orderService.pay(Integer.valueOf(amount), userName);
    // 这里除了要再order表中记录之外，还需要讲order拆开，通知不同商家发货
    OrderBean orderBean = new OrderBean();
    orderBean.setAddress(addr);
    orderBean.setAmount(Integer.valueOf(amount));
    orderBean.setConsigneeMsg("");
    orderBean.setCreateTime("");
    orderBean.setItems(items);
    orderBean.setPayChannel(payChannel);
    orderBean.setStatus(String.valueOf(status));
    orderBean.setUserName(userName);
    orderService.baseInsert(orderBean);
    if (status == -2) return String.valueOf(status);
    // 开始拆分订单
    List<OrderRVendorBean> orderRVendorBeans = orderRVendorService.splitOrder(orderBean);
    orderRVendorBeans.forEach(orderRVendorService::baseInsert);
    return String.valueOf(status);
  }

  @RequestMapping("/queryinfos")
  public List<OrderMsgDto> queryInfos(String userName, String status) {
    return orderService.selectByNameStatus(userName, status);
  }

  @RequestMapping("/updatedeliverystatus")
  public void updateDeliveryStatus(String id, String deliveryStatus) {
    orderService.updateDeliverySatatus(Integer.valueOf(id), deliveryStatus);
  }

  @RequestMapping("/changeordertocarinfo")
  public List<ShoppingCartBean> changeOrder2Carinfo(String id) {
    List<OrderBean> orderBeans = orderService.selectById(Integer.valueOf(id));
    return orderService.changeOrder2ShoppingCar(orderBeans);
  }

  @RequestMapping("/selectVendorOrder")
  public List<OrderRVendorBean> slectVendorOrder(HttpServletRequest request) {
    String vendor = (String) request.getSession().getAttribute("userName");
    if (StringUtils.isEmpty(vendor)) vendor = "test";
    return orderRVendorService.selectByVendor(vendor);
  }

  // 卖家发货
  @RequestMapping(value = "/sendGoods", method = RequestMethod.POST)
  public MessageDto sendGoods(@RequestBody OrderRVendorBean orderRVendorBean) {
    // 先将当前订单状态改变
    orderRVendorService.updateStatusById(orderRVendorBean.getId());
    // 卖家发货后钱直接进卖家账户
    UserBean u = userService.selectByUserName(orderRVendorBean.getVendor());
    u.setMoney(MathUtil.safeAdd(u.getMoney(), orderRVendorBean.getAmount()));
    // 检查是否全部拆分订单已完成
    List<OrderRVendorBean> all = orderRVendorService.selectByOrderId(orderRVendorBean.getOrderId());
    boolean flag = true;
    for (OrderRVendorBean or : all) {
      if (or.getStatus() == -1) {
        flag = false;
        break;
      }
    }
    userService.updateMoney(u);
    // 如果全部发货，则更新未拆分订单的状态
    if (flag) {
      orderService.updateDeliverySatatus(orderRVendorBean.getOrderId(), "已发货");
      orderService.updateSatatus(orderRVendorBean.getOrderId());
    }
    MessageDto messageDto = new MessageDto();
    messageDto.setResult("success");
    return messageDto;
  }
}
