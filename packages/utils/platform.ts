/**
 * 平台判断工具函数
 */

/// <reference path="../types/uni-app.d.ts" />

/**
 * 判断当前运行平台
 */
export const platform = {
  /** H5 */
  isH5: process.env.UNI_PLATFORM === 'h5',
  
  /** 小程序 */
  isMp: process.env.UNI_PLATFORM === 'mp-weixin' || 
        process.env.UNI_PLATFORM === 'mp-alipay' || 
        process.env.UNI_PLATFORM === 'mp-baidu' || 
        process.env.UNI_PLATFORM === 'mp-toutiao',
  
  /** 微信小程序 */
  isWeixinMp: process.env.UNI_PLATFORM === 'mp-weixin',
  
  /** 支付宝小程序 */
  isAlipayMp: process.env.UNI_PLATFORM === 'mp-alipay',
  
  /** 百度小程序 */
  isBaiduMp: process.env.UNI_PLATFORM === 'mp-baidu',
  
  /** 头条小程序 */
  isToutiaoMp: process.env.UNI_PLATFORM === 'mp-toutiao',
  
  /** App */
  isApp: process.env.UNI_PLATFORM === 'app',
  
  /** iOS App */
  isIOS: uni.getSystemInfoSync().platform === 'ios',
  
  /** Android App */
  isAndroid: uni.getSystemInfoSync().platform === 'android',
  
  /** 微信公众号 */
  isWechat: () => {
    if (!platform.isH5) return false
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes('micromessenger')
  },
  
  /** 微博 */
  isWeibo: () => {
    if (!platform.isH5) return false
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes('weibo')
  },
  
  /** QQ */
  isQQ: () => {
    if (!platform.isH5) return false
    const ua = navigator.userAgent.toLowerCase()
    return ua.includes('qq')
  },
}

/**
 * 获取当前平台名称
 */
export function getPlatformName(): string {
  return process.env.UNI_PLATFORM || 'unknown'
}

/**
 * 根据平台执行不同的回调
 */
export function onPlatform<T>(callbacks: {
  h5?: () => T
  mp?: () => T
  app?: () => T
  default?: () => T
}): T | undefined {
  const platform = getPlatformName()
  
  if (platform === 'h5' && callbacks.h5) {
    return callbacks.h5()
  } else if (platform.startsWith('mp-') && callbacks.mp) {
    return callbacks.mp()
  } else if (platform === 'app' && callbacks.app) {
    return callbacks.app()
  } else if (callbacks.default) {
    return callbacks.default()
  }
  
  return undefined
}

/**
 * 检查是否支持某个 API
 */
export function hasAPI(apiName: string): boolean {
  return typeof uni[apiName as keyof typeof uni] === 'function'
}

/**
 * 安全调用 API，失败时不报错
 */
export function safeCallAPI<T extends keyof typeof uni>(
  apiName: T,
  ...args: Parameters<typeof uni[T]>
): Promise<ReturnType<typeof uni[T]>> {
  return new Promise((resolve) => {
    const api = uni[apiName]
    if (typeof api === 'function') {
      const result = api(...args)
      resolve(result)
    } else {
      console.warn(`API ${apiName} is not available`)
      resolve(undefined as any)
    }
  })
}
