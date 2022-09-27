/**
 * 获取页面query参数
 * @returns options
 */

export default function getPageOptions() {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]

    if(page) {
        // #ifdef H5
        return page.$page.options || {}
        // #endif

        // #ifndef H5
        // eslint-disable-next-line no-unreachable
        return page.options || {}
        // #endif
    }
}
