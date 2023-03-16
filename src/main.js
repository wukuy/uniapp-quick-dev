import { createSSRApp } from 'vue'
import App from './App.vue'
import uViewPlus from 'uview-plus'
import go from '@/plugins/go'

export function createApp() {
    const app = createSSRApp(App)

    app.use(uViewPlus)
    app.use(go)

    return {
        app
    }
}
