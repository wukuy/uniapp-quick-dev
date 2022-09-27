import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslint from 'vite-plugin-eslint'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
        eslint()
    ],
    resolve: {
        alias: {
            images: path.join(__dirname, 'src/assets/images'),
            utils: path.join(__dirname, 'src/common/utils'),
            assets: path.join(__dirname, 'src/assets')
        }
    }
})
