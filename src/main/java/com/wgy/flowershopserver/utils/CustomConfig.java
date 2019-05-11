package com.wgy.flowershopserver.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class CustomConfig {
  public static Map<String, String> attributeMap = initAttribute();

  private static Map<String, String> initAttribute() {
    Map<String, String> result = new HashMap<>();
    Properties properties = new Properties();
    try (FileInputStream in = new FileInputStream("src/main/resources/config.properties")) {
      properties.load(in);

      result.put("ffsaddress", properties.getProperty("ffsaddress"));
      result.put("imgUrl", properties.getProperty("imgUrl"));
    } catch (IOException e) {
      e.printStackTrace();
    }
    return result;
  }
}
