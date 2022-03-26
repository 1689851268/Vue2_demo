<!--
 * @Description: 放大镜组件
 * @Author: superman
 * @Date: 2022-03-26 10:12:24
 * @LastEditors: superman
 * @LastEditTime: 2022-03-27 00:42:40
-->
<template>
    <div class="spec-preview">
        <!-- 展示的图片 -->
        <img :src="imgUrl" />
        <div class="event" @mousemove="handler"></div>
        <!-- 大图 -->
        <div class="big">
            <img :src="imgUrl" ref="big" />
        </div>
        <!-- 遮罩层 -->
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
    name: "Zoom",
    data() {
        return {
            // 默认显示第一张图片
            curImgIndex: 0
        };
    },
    props: ["skuImageList"],
    computed: {
        imgUrl() {
            return this.skuImageList[`${this.curImgIndex}`].imgUrl;
        }
    },
    mounted() {
        // 通过 [全局事件总线]，接收轮播图组件传递过来的数据
        this.$bus.$on("getIndex", index => {
            this.curImgIndex = index;
        });
    },
    methods: {
        handler(e) {
            let mask = this.$refs.mask;
            /* 只读属性 MouseEvent.offsetX 规定了 [事件对象] 与 [目标节点] 的内填充边（padding edge）在 X 轴方向上的偏移量 */
            /* 只读属性 MouseEvent.offsetY 规定了 [事件对象] 与 [目标节点] 的内填充边（padding edge）在 Y 轴方向上的偏移量 */
            // 只读属性 HTMLElement.offsetWidth 返回一个元素的布局宽度
            // 只读属性 HTMLElement.offsetHeight 返回一个元素的布局高度
            let left = e.offsetX - mask.offsetWidth / 2;
            let top = e.offsetY - mask.offsetHeight / 2;

            // 处理特殊情况，mask 超界情况
            if (left < 0) left = 0;
            if (left > mask.offsetWidth) left = mask.offsetWidth;
            if (top < 0) top = 0;
            if (top > mask.offsetHeight) top = mask.offsetHeight;

            // 修改元素的位置
            mask.style.left = left + "px";
            mask.style.top = top + "px";

            // 修改大图的显示内容
            let big = this.$refs.big;
            big.style.left = -2 * left + "px";
            big.style.top = -2 * top + "px";
        }
    }
};
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
        display: block;
    }
}
</style>