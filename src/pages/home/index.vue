<template>
    <v-page title="uniapp 快速开发模版" class-name="home-page" :is-back="false">
        <view class="title">
            Vite + Vue3 + uView
        </view>
        <view class="desc">
            快速开发模版
        </view>
    </v-page>
</template>

<script>

export default {
    inheritAttrs: false,
    data() {
        return {
            title: 'Hello'
        }
    },
    onLoad() {
    },
    methods: {

    }
}

</script>

<style lang="scss">
::v-deep .home-page {
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
        font-size: 32rpx;
        font-weight: bold;
    }
    .desc {
        font-size: 28rpx;
        color: #666;
        margin-top: 40rpx;
    }
}
</style>
