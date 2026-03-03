/**
 * 商品卡片组件类型定义
 */

export interface ProductInfo {
  id: string | number
  title: string
  description?: string
  price: number
  originalPrice?: number
  image: string
  sales?: number
  tags?: string[]
}

export interface ProductCardProps {
  /** 商品信息 */
  product?: ProductInfo
  /** 显示原价 */
  showOriginalPrice?: boolean
  /** 显示销量 */
  showSales?: boolean
  /** 显示标签 */
  showTags?: boolean
  /** 自定义类名 */
  className?: string
  /** 自定义样式 */
  customStyle?: string
}

export interface ProductCardEmits {
  (e: 'click', product: ProductInfo): void
}
