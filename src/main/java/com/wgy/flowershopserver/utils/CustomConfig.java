package com.wgy.flowershopserver.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource(value = "config.properties")
public class CustomConfig {
  @Value("${ffsaddress}")
  private String ffsaddress;

  @Value("${imgUrl}")
  private String imgUrl;

  public String getFfsaddress() {
    return ffsaddress;
  }

  public void setFfsaddress(String ffsaddress) {
    this.ffsaddress = ffsaddress;
  }

  public String getImgUrl() {
    return imgUrl;
  }

  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }
}
