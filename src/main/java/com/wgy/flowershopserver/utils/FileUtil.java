package com.wgy.flowershopserver.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/** 待补全，先用commons.io的fileutil */
public class FileUtil {
  public static void writeFileToDir(MultipartFile file) {
    String fileName = file.getOriginalFilename();
    String path = CustomConfig.attributeMap.get("imgUrl") + fileName;
    File dest = new File(path);
    if (!dest.getParentFile().exists()) {
      dest.getParentFile().mkdirs();
    }
    try {
      file.transferTo(dest);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void deleteFile() {}
}
