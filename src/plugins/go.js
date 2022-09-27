export default {
    install(app, options) {
        app.config.globalProperties.$go = (url) => uni.navigateTo({ url })
    }
}
