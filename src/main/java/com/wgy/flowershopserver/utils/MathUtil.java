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

  /**
   * 安全相乘,越界返回long最大值
   *
   * @param x
   * @param y
   * @return
   */
  public static long safelyMulti(long x, long y) {
    long r = x * y;
    long ax = Math.abs(x);
    long ay = Math.abs(y);
    if (((ax | ay) >>> 31 != 0)) {
      if (((y != 0) && (r / y != x)) || (x == Long.MIN_VALUE && y == -1)) {
        return Long.MAX_VALUE;
      }
    }
    return r;
  }
  /**
   * @param x 除数
   * @param y 被除数
   * @return 向上取整的结果
   */
  public static int ceilDiv(int x, int y) {
    return x / y + ((x % y) > 0 ? 1 : 0);
  }

  public static int safeValue(int v, int min, int max) {
    return v > max ? max : v < min ? min : v;
  }

  public static long safeValue(long v, long min, long max) {
    return v > max ? max : v < min ? min : v;
  }

  public static int square(int v) {
    return Math.multiplyExact(v, v);
  }

  public static int proportionOf(int v, int proportion) {
    // TODO       return Math.multiplyExact(v, proportion) / 10000;
    return (int) (proportion * 0.0001D * v);
  }

  public static long proportionOf(long v, long proportion) {
    // TODO    return Math.multiplyExact(v, proportion) / 10000;
    return (long) (proportion * 0.0001D * v);
  }

  public static int proportion(int v, int total) {
    return (int) ((long) v * W / total);
  }

  public static int proportion(long v, long total) {
    return (int) (Math.multiplyExact(v, W) / total);
  }

  public static short sign(short v) {
    return (short) (v == 0 ? 0 : Math.abs(v) / v);
  }

  public static int sign(int v) {
    return v == 0 ? 0 : Math.abs(v) / v;
  }

  public static long sign(long v) {
    return v == 0 ? 0 : Math.abs(v) / v;
  }

  public static boolean between(int v, int min, int max) {
    return v >= min && v <= max;
  }
}
