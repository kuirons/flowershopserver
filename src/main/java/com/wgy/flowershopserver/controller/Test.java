package com.wgy.flowershopserver.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
  @RequestMapping("/hello")
  public String say() {
    return "hello world";
  }
}
