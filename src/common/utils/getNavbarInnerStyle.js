import getStatusBarHeight from './getStatusBarHeight'

// 导航栏内部盒子的样式
export default function navbarInnerStyle() {
    const systemInfo = uni.getSystemInfoSync()
    let menuButtonInfo = {}
    // 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
    // #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
    menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    // #endif

    const style = {}
    // 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
    style.height = getStatusBarHeight() || undefined
    // // 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
    // #ifdef MP
    const rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
    style.marginRight = rightButtonWidth + 'px'
    // #endif

    return style
}
