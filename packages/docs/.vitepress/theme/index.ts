import DefaultTheme from 'vitepress/theme'
import './style.css'
// 引入组件库全局样式：声明 --mx-* 主题变量/reset，保证在线 Demo 的主题色与圆角生效
import '@mengxi/uni-ui/src/styles/index.scss'
import DemoLive from './demo-live.vue'
import { View, Text, Image, ScrollView, Swiper, SwiperItem } from './uni-shims'
import DemoScreenSwitch from './demos/demo-switch.vue'
import DemoScreenRate from './demos/demo-rate.vue'
import DemoScreenStepper from './demos/demo-stepper.vue'
import DemoScreenTabs from './demos/demo-tabs.vue'

// 在线 Demo 用到的组件（均为 SSR 安全、不依赖 uni.* 的基础组件）
import MxButton from '@mengxi/uni-ui/src/components/mx-button/mx-button.vue'
import MxIcon from '@mengxi/uni-ui/src/components/mx-icon/mx-icon.vue'
import MxCell from '@mengxi/uni-ui/src/components/mx-cell/mx-cell.vue'
import MxCellGroup from '@mengxi/uni-ui/src/components/mx-cell-group/mx-cell-group.vue'
import MxTag from '@mengxi/uni-ui/src/components/mx-tag/mx-tag.vue'
import MxBadge from '@mengxi/uni-ui/src/components/mx-badge/mx-badge.vue'
import MxDivider from '@mengxi/uni-ui/src/components/mx-divider/mx-divider.vue'
import MxSpace from '@mengxi/uni-ui/src/components/mx-space/mx-space.vue'
import MxSkeleton from '@mengxi/uni-ui/src/components/mx-skeleton/mx-skeleton.vue'
import MxLoading from '@mengxi/uni-ui/src/components/mx-loading/mx-loading.vue'
import MxSwitch from '@mengxi/uni-ui/src/components/mx-switch/mx-switch.vue'
import MxRow from '@mengxi/uni-ui/src/components/mx-row/mx-row.vue'
import MxCol from '@mengxi/uni-ui/src/components/mx-col/mx-col.vue'
import MxRate from '@mengxi/uni-ui/src/components/mx-rate/mx-rate.vue'
import MxStepper from '@mengxi/uni-ui/src/components/mx-stepper/mx-stepper.vue'
import MxSearch from '@mengxi/uni-ui/src/components/mx-search/mx-search.vue'
import MxProgress from '@mengxi/uni-ui/src/components/mx-progress/mx-progress.vue'
import MxEmpty from '@mengxi/uni-ui/src/components/mx-empty/mx-empty.vue'
import MxField from '@mengxi/uni-ui/src/components/mx-field/mx-field.vue'
import MxNavBar from '@mengxi/uni-ui/src/components/mx-nav-bar/mx-nav-bar.vue'
import MxTabs from '@mengxi/uni-ui/src/components/mx-tabs/mx-tabs.vue'
import MxTabPane from '@mengxi/uni-ui/src/components/mx-tab-pane/mx-tab-pane.vue'
import MxGrid from '@mengxi/uni-ui/src/components/mx-grid/mx-grid.vue'
import MxGridItem from '@mengxi/uni-ui/src/components/mx-grid-item/mx-grid-item.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // uni 标签 shim（仅官网演示用）
    app.component('view', View)
    app.component('text', Text)
    app.component('image', Image)
    app.component('scroll-view', ScrollView)
    app.component('swiper', Swiper)
    app.component('swiper-item', SwiperItem)

    // 演示容器 + 交互示例包装
    app.component('demo-live', DemoLive)
    app.component('demo-switch', DemoScreenSwitch)
    app.component('demo-rate', DemoScreenRate)
    app.component('demo-stepper', DemoScreenStepper)
    app.component('demo-tabs', DemoScreenTabs)

    // mx-* 组件（在线 Demo 渲染）
    app.component('mx-button', MxButton)
    app.component('mx-icon', MxIcon)
    app.component('mx-cell', MxCell)
    app.component('mx-cell-group', MxCellGroup)
    app.component('mx-tag', MxTag)
    app.component('mx-badge', MxBadge)
    app.component('mx-divider', MxDivider)
    app.component('mx-space', MxSpace)
    app.component('mx-skeleton', MxSkeleton)
    app.component('mx-loading', MxLoading)
    app.component('mx-switch', MxSwitch)
    app.component('mx-row', MxRow)
    app.component('mx-col', MxCol)
    app.component('mx-rate', MxRate)
    app.component('mx-stepper', MxStepper)
    app.component('mx-search', MxSearch)
    app.component('mx-progress', MxProgress)
    app.component('mx-empty', MxEmpty)
    app.component('mx-field', MxField)
    app.component('mx-nav-bar', MxNavBar)
    app.component('mx-tabs', MxTabs)
    app.component('mx-tab-pane', MxTabPane)
    app.component('mx-grid', MxGrid)
    app.component('mx-grid-item', MxGridItem)
  },
}
