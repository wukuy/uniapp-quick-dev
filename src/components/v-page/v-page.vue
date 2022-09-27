<template>
    <view :class="classPrefix" :style="styles">
        <view :class="classPrefix + '-top'" :style="{ backgroundColor: backgroundColor}">
            <PageTop @top-height-change="topHeightChange">
                <u-navbar
                    v-if="showNavbar"
                    :border="isBorder"
                    :title-style="titleStyle"
                    :fixed="fixed"
                    :left-icon-size="leftIconSize"
                    :bg-color="backgroundColor"
                    :left-icon-color="leftIconColor"
                    :left-icon="isBack ? 'arrow-left' : ''"
                    back-text=" "
                    @left-click="backClick"
                >
                    <template #left>
                        <slot name="navbarLeft" />
                    </template>
                    <template #center>
                        {{ title }}
                        <slot name="navbarCenter" />
                    </template>
                    <template #right>
                        <slot name="navbarRight" />
                    </template>
                </u-navbar>
                <slot name="top" />
            </PageTop>
        </view>
        <view :class="`${classPrefix}-content ${className}`">
            <slot />
        </view>
        <view :class="classPrefix + '-footer'" :style="footerStyles">
            <PageFooter @bottom-height-change="botomHeightChange">
                <slot name="footer" />
            </PageFooter>
        </view>
    </view>
</template>

<script>
import { navigateBack } from '@/common/utils'
import PageFooter from './v-page-footer.vue'
import PageTop from './v-page-top.vue'
const classPrefix = 'v-page'

export default {
    components: { PageFooter, PageTop },
    props: {
        title: {
            type: String,
            default: ''
        },
        showNavbar: {
            type: Boolean,
            default: true
        },
        isBack: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: '#fff'
        },
        bottomSafeArea: {
            type: Boolean,
            default: true

        },
        bottomBackgroundColor: {
            type: String,
            default: '#fff'
        },
        leftIconColor: {
            type: String,
            default: '#333'
        },
        leftIconSize: {
            type: Number,
            default: 24
        },
        fixed: {
            type: Boolean,
            default: false
        },
        titleStyle: {
            type: String,
            default: ''
        },
        isBorder: {
            type: Boolean
        },
        className: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            classPrefix,
            bottomHeight: 0,
            topHeight: 0
        }
    },
    computed: {
        styles() {
            return `padding-bottom: ${this.$slots.footer && this.bottomSafeArea ? `calc(${this.bottomHeight}px + env(safe-area-inset-bottom))` : this.bottomHeight};padding-top: ${this.topHeight}px`
        },
        footerStyles() {
            return `padding-bottom: ${this.$slots.footer && this.bottomSafeArea ? 'env(safe-area-inset-bottom)' : 0}; background: ${this.bottomBackgroundColor}`
        }
    },
    mounted() {
        console.log(this.title)
    },
    methods: {
        bottomHeightChange(val) {
            this.bottomHeight = val
        },
        topHeightChange(val) {
            this.topHeight = val
        },
        backClick() {
            if(this.isBack) {
                navigateBack()
            }
        }
    }
}
</script>

<style lang="scss">
$prefix: v-page;

.#{$prefix} {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    &-top {
        z-index: 99;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }

    &-content {
        flex: 1;
        overflow: auto;
    }

    &-footer {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
    }

    ::v-deep .v-page-top .u-navbar {
        .u-navbar__content {
            border-bottom-color: #E2E2E2 !important;
        }
    }
}
</style>
