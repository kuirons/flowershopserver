package com.wgy.flowershopserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// dao层使用mapper进行注解
@SpringBootApplication
@MapperScan("com.wgy.flowershopserver.mapper")
public class FlowershopserverApplication {
  public static void main(String[] args) {
    SpringApplication.run(FlowershopserverApplication.class, args);
  }
}
