package com.wgy.flowershopserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

// dao层使用mapper进行注解
@SpringBootApplication
@MapperScan("com.wgy.flowershopserver.mapper")
public class FlowershopserverApplication extends SpringBootServletInitializer {
  public static void main(String[] args) {
    SpringApplication.run(FlowershopserverApplication.class, args);
  }

  @Override
  protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    return application.sources(FlowershopserverApplication.class);
  }
}
