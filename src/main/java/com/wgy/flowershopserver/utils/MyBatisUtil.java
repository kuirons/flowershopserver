package com.wgy.flowershopserver.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;

public class MyBatisUtil {
  // 线程隔离
  private static ThreadLocal<SqlSession> threadLocal = new ThreadLocal<>();
  private static SqlSessionFactory sqlSessionFactory;
  // 加载配置文件
  static {
    try {
      Reader reader = Resources.getResourceAsReader("mybatis/config/mybatis-config.xml");
      sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException("mybatis连接获取失败啦啦啦啦~~~~~~,为啥呢？？？？？" + e);
    }
  }

  // 单例
  private MyBatisUtil() {}

  public static SqlSession getInstance() {
    // 从当前线程获取sqlsession
    SqlSession sqlSession = threadLocal.get();
    if (sqlSession == null) {
      sqlSession = sqlSessionFactory.openSession();
      threadLocal.set(sqlSession);
    }
    return sqlSession;
  }

  public static void closeSqlSession() {
    SqlSession sqlSession = threadLocal.get();
    if (sqlSession != null) {
      sqlSession.close();
      threadLocal.remove();
    }
  }
}
