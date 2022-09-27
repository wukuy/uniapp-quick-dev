/**
 * 获取app、小程序状态栏高度
 * @returns statusBarHeight
 */
export default function getStatusBarHeight() {
    const systemInfo = uni.getSystemInfoSync()

    return systemInfo.statusBarHeight
}
