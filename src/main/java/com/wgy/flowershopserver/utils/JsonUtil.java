package com.wgy.flowershopserver.utils;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Nullable;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/** 主要用来做序列化和反序列化 使用jackson而不是fastjson的原因是jackson可定制化功能更强大而且代码质量更高 单例 */
public class JsonUtil {
  private static Logger logger = LoggerFactory.getLogger(JsonUtil.class);
  public static JsonUtil instance = new JsonUtil();

  public static JsonUtil getInstance() {
    return instance;
  }

  private ObjectMapper mapper = new ObjectMapper();

  private JsonUtil() {
    // 设置可用单引号
    mapper
        .configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true)
        // 非注解可被序列化
        .configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false)
        // 屏蔽不可映射属性抛出的异常
        .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        // 过滤空属性值
        .setSerializationInclusion(JsonInclude.Include.NON_NULL)
        .setVisibility(
            mapper
                .getVisibilityChecker()
                // 序列化所有字段
                .withFieldVisibility(JsonAutoDetect.Visibility.ANY)
                // 忽略setter、getter
                .withSetterVisibility(JsonAutoDetect.Visibility.NONE)
                .withGetterVisibility(JsonAutoDetect.Visibility.NONE)
                .withIsGetterVisibility(JsonAutoDetect.Visibility.NONE));
  }

  public @Nullable String toString(Object object) {
    try {
      return mapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      logger.error("序列化错误，错误为：" + e);
      return null;
    }
  }

  public byte[] toBytes(Object object) {
    try {
      return mapper.writeValueAsBytes(object);
    } catch (JsonProcessingException e) {
      logger.error("序列化错误，错误为：" + e);
      return null;
    }
  }

  public @Nullable <T> T toObject(byte[] bytes, Class<T> clazz) {
    try {
      return mapper.readValue(bytes, clazz);
    } catch (IOException e) {
      logger.error("序列化错误，错误为：" + e);
      return null;
    }
  }

  public @Nullable <T> T toObject(String json, Class<T> clazz) {
    try {
      return mapper.readValue(json, clazz);
    } catch (IOException e) {
      logger.error("序列化错误，错误为：" + e);
      return null;
    }
  }

  public <T> List<T> toList(String json, Class<T> clazz) {
    JavaType type = mapper.getTypeFactory().constructParametricType(ArrayList.class, clazz);
    try {
      return mapper.readValue(json, type);
    } catch (IOException e) {
      logger.error("序列化错误，错误为：" + e);
      return null;
    }
  }

}
