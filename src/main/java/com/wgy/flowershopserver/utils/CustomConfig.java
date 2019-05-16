package com.wgy.flowershopserver.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class CustomConfig {
  public static Map<String, String> attributeMap = initAttribute();

  private static Map<String, String> initAttribute() {
    Map<String, String> result = new HashMap<>();
    Properties properties = new Properties();
    Resource resource = new ClassPathResource("config.properties");
    try (InputStream in = resource.getInputStream()) {
      properties.load(in);

      result.put("ffsaddress", properties.getProperty("ffsaddress"));
      result.put("imgUrl", properties.getProperty("imgUrl"));
    } catch (IOException e) {
      e.printStackTrace();
    }
    return result;
  }
}
