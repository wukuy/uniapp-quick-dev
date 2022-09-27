<template>
    <scroll-view
        scroll-with-animation
        :scroll-into-view="scrollIntoView"
        :refresher-background="refresherBackground"
        :class="prefix"
        :lower-threshold="10"
        :refresher-triggered="refresher"
        :scroll-y="true"
        :refresher-enabled="refresherEnabled"
        @scroll="scroll"
        @scrolltolower="onLowerLoad"
        @refresherrefresh="onRefresh"
    >
        <slot :list="list" />
        <u-empty
            v-if="empty"
            :icon="emptyIcon"
            margin-top="100px"
            width="200"
            height="100"
            :text="emptyText"
            :mode="emptyMode"
        />
        <view v-else-if="!refresher" class="loading">
            <u-loadmore :status="status" icon-type="flower" :load-text="loadText" />
        </view>
    </scroll-view>
</template>

<script>
import NoData from 'assets/images/no_data.png'
const prefix = 'v-scroll'

export default {
    props: {
        refresherEnabled: {
            type: Boolean
        },
        initLoad: {
            type: Boolean,
            default: true
        },
        dataFun: {
            type: Function,
            default: () => {}
        },
        pageSize: {
            type: Number,
            default: 10
        },
        emptyMode: {
            type: String,
            default: 'list'
        },
        emptyIcon: {
            type: String,
            default: NoData
        },
        emptyText: {
            type: String,
            default: '暂无数据'
        },
        refresherBackground: {
            type: String,
            default: 'transparent'
        },
        scrollIntoView: {
            type: [String, Number],
            default: 0
        },
        scrollWithAnimation: Boolean
    },
    emits: ['scroll', 'dataChange'],
    data() {
        return {
            prefix,
            pageIndex: 1,
            loadFinish: false,
            loading: false,
            loadText: {
                loadmore: '轻轻上拉',
                loading: '努力加载中...',
                nomore: '没有内容了'
            },
            size: 1,
            empty: false,
            list: [],
            refresher: false
        }
    },
    computed: {
        status() {
            let status = 'loading'

            if(this.loadFinish) {
                status = 'nomore'
            }else if(this.loadFinish) {
                status = 'loading'
            }

            return status
        }
    },
    watch: {
        pageSize: {
            handler(val) {
                this.size = val
            },
            immediate: true
        }
    },
    mounted() {
        this.initLoad && this.onLowerLoad()
    },
    methods: {
        scroll(event) {
            this.$emit('scroll', 'event')
        },
        async getData(reload = true) {
            if(this.dataFun) {
                if(reload) {
                    this.empty = false
                    this.pageIndex = 1
                }
                if(this.loading) return
                if(this.loadFinish) return

                this.loading = true

                let data = []; let count = 0
                try {
                    const { data: list = [], count: total = 0 } = await this.dataFun.call(this.$parent.$parent, { pageIndex: this.pageIndex }) || {}

                    data = list
                    count = total
                } catch (error) {
                    console.error(error)
                    this.loading = false
                }

                if(this.pageIndex * this.size >= count || !count) {
                    this.loadFinish = true
                }else {
                    this.loadFinish = false
                    this.pageIndex++
                }

                if(reload) {
                    this.list = data
                }else {
                    this.list.push(...data)
                }

                if(count === 0) {
                    this.empty = true
                }

                this.$emit('dataChange', this.list)

                this.loading = false
            }
        },
        async onLowerLoad() {
            await this.getData(false)
        },
        async onRefresh() {
            if(this.refresher) return

            this.refresher = true
            this.loadFinish = false
            await this.getData(true)
            this.refresher = false
        }
    }
}
</script>

<style lang="scss">
$prefix: v-scroll;

.#{$prefix} {
    height: 100%;
    ::v-deep .uni-scroll-view-refresher {
        z-index: 1;
        .uni-scroll-view-refresh-inner {
            circle {
                color: #FF2120 !important;
            }
            svg {
                fill: #FF2120 !important;
            }
        }
    }
}
</style>
