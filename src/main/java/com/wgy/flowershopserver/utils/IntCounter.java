package com.wgy.flowershopserver.utils;

import com.google.common.base.Preconditions;

/** 注意，NotThreadSafe，不要跨线程使用,线程安全计数器请使用AtomicInteger */
public class IntCounter {
  private int count;

  public IntCounter() {}

  public IntCounter(int initVal) {
    Preconditions.checkArgument(initVal >= low() && initVal <= high(), "值不在合法范围");
    setCount(initVal);
  }

  protected int high() {
    return Integer.MAX_VALUE;
  }

  protected int low() {
    return 0;
  }

  /**
   * 直接设置当前值
   *
   * @param value
   * @return
   */
  public int setCount(int value) {
    return this.count = MathUtil.safeValue(value, low(), high());
  }

  /** 归零 */
  public void zero() {
    setCount(0);
  }

  public void setHigh() {
    setCount(high());
  }

  public void setLow() {
    setCount(low());
  }

  public int getCount() {
    return this.count;
  }

  /**
   * 增加并获取
   *
   * @param delta
   * @return
   */
  public int addAndGet(int delta) {
    return setCount(MathUtil.safeAdd(getCount(), delta));
  }

  /**
   * 获取并增加
   *
   * @param delta
   * @return
   */
  public int getAndAdd(int delta) {
    int old = getCount();
    setCount(MathUtil.safeAdd(getCount(), delta));
    return old;
  }

  /**
   * 加1并获取
   *
   * @return
   */
  public int incrementAndGet() {
    return addAndGet(1);
  }

  /**
   * 获取并加1
   *
   * @return
   */
  public int getAndIncrement() {
    return getAndAdd(1);
  }

  /**
   * 减1并获取
   *
   * @return
   */
  public int decrementAndGet() {
    return addAndGet(-1);
  }

  /**
   * 获取并减1
   *
   * @return
   */
  public int getAndDecrement() {
    return getAndAdd(-1);
  }

  /**
   * 是否达到下界
   *
   * @return
   */
  public boolean isReachLow() {
    return getCount() == low();
  }

  /**
   * 是否达到上界
   *
   * @return
   */
  public boolean isReachHigh() {
    return getCount() == high();
  }
}
