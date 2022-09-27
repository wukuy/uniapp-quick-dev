<template>
    <view :id="`page-top_${id}`">
        <slot />
    </view>
</template>

<script>
import { getCurrentPage } from '@/common/utils'
export default {
    emits: ['topHeightChange'],
    data() {
        return {
            id: getCurrentPage().route.replace(/\//g, '-') + '_' + Math.round(Math.random() * 1000000)
        }
    },
    updated() {
        this.setTopHeight()
    },
    mounted() {
        this.setTopHeight()
    },
    methods: {
        setTopHeight() {
            const query = uni.createSelectorQuery().in(this)

            query.select(`#page-top_${this.id}`).boundingClientRect(data => {
                if(data) {
                    setTimeout(() => {
                        this.$emit('topHeightChange', data.height)
                    }, 0)
                }
            }).exec()
        }
    }
}
</script>
