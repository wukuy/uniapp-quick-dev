import { createSSRApp } from 'vue'
import App from './App.vue'
import uviewPlus, { setConfig } from 'uview-plus'
import go from '@/plugins/go'

setConfig({})

export function createApp() {
    const app = createSSRApp(App)

    app.use(uviewPlus)
    app.use(go)

    return {
        app
    }
}
