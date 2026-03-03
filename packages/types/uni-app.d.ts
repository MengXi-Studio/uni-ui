/**
 * uni-app 全局类型声明
 */

interface UniApp {
  // 系统信息
  getSystemInfoSync(): {
    platform: 'ios' | 'android' | 'devtools'
    system: string
    pixelRatio: number
    screenWidth: number
    screenHeight: number
    windowWidth: number
    windowHeight: number
    statusBarHeight: number
    language: string
    version: string
    SDKVersion: string
    brand: string
    model: string
    [key: string]: any
  }
  
  // 基础 API
  [key: string]: any
}

declare const uni: UniApp

