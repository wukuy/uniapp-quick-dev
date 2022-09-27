<template>
    <view :id="`page-footer_${id}`">
        <slot />
    </view>
</template>

<script>
import { getCurrentPage } from '@/common/utils'
export default {
    emits: ['bottomHeightChange'],
    data() {
        return {
            id: getCurrentPage().route.replace(/\//g, '-') + '_' + Math.round(Math.random() * 1000000)
        }
    },
    updated() {
        this.setBottomHeight()
    },
    mounted() {
        this.setBottomHeight()
    },
    methods: {
        setBottomHeight() {
            const query = uni.createSelectorQuery().in(this)

            query.select(`#page-footer_${this.id}`).boundingClientRect(data => {
                if(data) {
                    setTimeout(() => {
                        this.$emit('bottomHeightChange', data.height)
                    }, 0)
                }
            }).exec()
        }
    }
}
</script>

<style lang="scss">
    #page-footer {
        overflow: hidden;
    }
</style>
