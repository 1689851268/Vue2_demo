<!--
 * @Description: 三级联动标题
 * @Author: superman
 * @Date: 2022-03-26 10:12:24
 * @LastEditors: superman
 * @LastEditTime: 2022-03-26 10:42:18
-->

<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委托 -->
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级标题 -->
                            <div
                                class="item"
                                v-for="(c1, index) in categoryList"
                                :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }"
                            >
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                                </h3>
                                <!-- vue 实现 hover 显示效果 -->
                                <div
                                    class="item-list clearfix"
                                    :style="{
                                        display:
                                            currentIndex == index
                                                ? 'block'
                                                : 'none',
                                    }"
                                >
                                    <div class="subitem">
                                        <!-- 二级标题 -->
                                        <dl
                                            class="fore"
                                            v-for="c2 in c1.categoryChild"
                                            :key="c2.categoryId"
                                        >
                                            <dt>
                                                <a
                                                    :data-category2Id="
                                                        c2.categoryId
                                                    "
                                                >{{ c2.categoryName }}</a>
                                            </dt>
                                            <dd>
                                                <!-- 三级标题 -->
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-category3Id="
                                                            c3.categoryId
                                                        "
                                                    >{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>

            <!-- 导航栏 -->
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { throttle } from "lodash";

export default {
    name: "TypeNav",
    data() {
        return {
            currentIndex: -1,
            show: true
        };
    },
    methods: {
        // 鼠标移入标题（通过 lodash 的 throttle 设置节流）
        changeIndex: throttle(function(index) {
            this.currentIndex = index;
        }, 50),
        // 鼠标移出标题
        leaveShow() {
            this.currentIndex = -1;
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
        // 进行路由跳转
        goSearch(e) {
            let ele = e.target;
            // 点击里面的 a 标签
            if (ele.nodeName == "A") {
                // 区分三级标签
                let { category1id, category2id, category3id } = ele.dataset;
                let query = { categoryName: ele.innerText.trim() };
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }

                // 设置跳转参数
                let location = { name: "Search" };
                location.query = query;
                // 点击标题，只传递 query 参数
                // 但是，可能组件原本就带有 params 参数，所以需要判断是否有 params 参数，有则把 params 参数带上
                if (this.$route.params) location.params = this.$route.params;

                // 设置编程式导航跳转
                this.$router.push(location);
            }
        },
        enterShow() {
            if (this.$route.path != "/home") {
                this.show = true;
            }
        }
    },
    computed: {
        ...mapState({
            categoryList: state => {
                state.home.categoryList = state.home.categoryList.splice(0, 16);
                return state.home.categoryList;
            }
        })
    },
    // 组件挂载完后，向服务器发请求
    mounted() {
        // 除了 hone 页面，其他页面都不展开商品分类
        if (this.$route.path != "/home") {
            this.show = false;
        }
    }
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        _height: 200px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;
                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                    // 鼠标移入 → 显示子标题
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }

        // 过渡动画的样式
        .sort-enter,
        .sort-leave-to {
            height: 0;
        }
        .sort-leave,
        .sort-enter-to {
            height: 461px;
        }
        .sort-leave-active,
        .sort-enter-active {
            transition: all 0.1s linear;
        }
    }
}
</style>
