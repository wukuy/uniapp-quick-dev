/**
 * 兼容h5回退
 * @param { delta: number } options
 */
export default function navigateBack(options = { delta: 1 }) {
    // #ifdef H5
    history.go(-options.delta)
    // #endif

    // #ifndef H5
    uni.navigateBack(options)
    // #endif
}
