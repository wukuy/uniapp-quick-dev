<template>
    <v-page class-name="demo-page" :is-back="false" title="DEMO">
        <v-scroll>
            <view class="text-area">
                <text class="title">
                    {{ title }}
                </text>
            </view>
            <button @click="getList">
                获取数据
            </button>
            <button class="update-btn" @click="upload">
                文件上传
            </button>
        </v-scroll>
    </v-page>
</template>

<script>
import { getList, upload } from '@/models/home.js'

export default {
    data() {
        return {
            title: 'Hello',
            img: ''
        }
    },
    async onLoad() {
    },
    methods: {
        async getList() {
            console.log(await getList())
        },
        async upload() {
            uni.chooseImage({
                count: 10,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success: async(res) => {
                    const urls = []

                    for(let idx = 0; idx < res.tempFilePaths.length; idx++) {
                        const item = res.tempFilePaths[idx]

                        const { data: { url } } = await upload(item, {
                            businessId: 'text',
                            mainType: 'payCredentials'
                        })

                        urls.push(url)
                    }

                    console.log(urls)
                }
            })
        }
    }
}

</script>

<style lang="scss" src="./index.scss"></style>
