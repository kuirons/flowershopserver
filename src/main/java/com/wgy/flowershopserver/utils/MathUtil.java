package com.wgy.flowershopserver.utils;

public class MathUtil {
  public static final int W = 10000;
  public static final int K = 1000;

  /**
   * 去除末尾的0，同时使用String.valueOf,不要使用Object.toString
   *
   * @param v
   * @return
   */
  public static String stringValue(double v) {
    if (Math.round(v) - v == 0) return String.valueOf((long) v);
    return String.valueOf(v);
  }

  /**
   * 安全加，如果溢出，返回最大整形
   *
   * @param x
   * @param y
   * @return
   */
  public static int safeAdd(int x, int y) {
    int r = x + y;
    if (((x ^ r) & (y ^ r)) < 0) return Integer.MAX_VALUE;
    return r;
  }

  /**
   * 安全减，如果溢出，返回最小整形
   *
   * @param x
   * @param y
   * @return
   */
  public static int safeSub(int x, int y) {
    int r = x - y;
    if (((x ^ y) & (x ^ r)) < 0) return Integer.MIN_VALUE;
    return r;
  }

  /**
   * 安全相加,如果越界返回long最大值
   *
   * @param x
   * @param y
   * @return
   */
  public static long safeAdd(long x, long y) {
    long r = x + y;
    if (((x ^ r) & (y ^ r)) < 0) {
      return Long.MAX_VALUE;
    }
    return r;
  }

  /**
   * 安全相减,如果越界返回long最小值
   *
   * @param x
   * @param y
   * @return
   */
  public static long safeSub(long x, long y) {
    long r = x - y;
    if (((x ^ y) & (x ^ r)) < 0) {
      return Long.MIN_VALUE;
    }
    return r;
  }

  /**
   * 安全相乘,越界返回int最大值
   *
   * @param x
   * @param y
   * @return
   */
  public static int safelyMulti(int x, int y) {
    long r = (long) x * (long) y;
    if ((int) r != r) {
      return Integer.MAX_VALUE;
    }
    return (int) r;
  }
}
