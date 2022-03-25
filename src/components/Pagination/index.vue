<!--
 * @Description: 
 * @Author: superman
 * @Date: 2022-03-22 00:12:54
 * @LastEditors: superman
 * @LastEditTime: 2022-03-25 15:24:24
-->

<template>
    <div class="pagination">
        <!-- 上一页 -->
        <button :disabled="pageNo == 1" @click="$emit('currentPage', pageNo - 1)">上一页</button>
        <!-- 首页 -->
        <button v-if="startAndEndNum.start >= 2" @click="$emit('currentPage', 1)">1</button>

        <button v-if="startAndEndNum.start >= 3">···</button>
        <button
            v-for="page in startAndEndNum.end"
            :key="page"
            v-show="page >= startAndEndNum.start"
            :class="{active: pageNo == page}"
            @click="$emit('currentPage', page)"
        >{{page}}</button>
        <button v-if="startAndEndNum.end <= totalPage - 2">···</button>

        <!-- 尾页 -->
        <button
            v-if="startAndEndNum.end <= totalPage - 1"
            @click="$emit('currentPage', totalPage)"
        >{{ totalPage }}</button>
        <!-- 下一页 -->
        <button :disabled="pageNo == totalPage" @click="$emit('currentPage', pageNo + 1)">下一页</button>

        <!-- 总条数 -->
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ["pageNo", "pageSize", "total", "continues"],
    computed: {
        // 一共多少页
        totalPage() {
            return Math.ceil(this.total / this.pageSize);
        },
        // 计算出连续页码的数字 (开始数字|结束数字)【比如:8  6 7 8 9 10】
        startAndEndNum() {
            const { pageNo, continues, totalPage } = this;

            // 连续页码的 [开始数字]、[结束数字]
            let start = pageNo - parseInt(continues / 2);
            let end = pageNo + parseInt(continues / 2);

            // 当前页数 < 3 ( start 可能会 < 0 )
            if (start < 1) {
                start = 1;
                end = continues;
            }
            // 当前页数 > n-2 ( end 可能会 > n )
            if (end > totalPage) {
                end = totalPage;
                start = totalPage - continues + 1;
            }

            // 以对象的形式返回 [start, end]
            return { start, end };
        }
    }
};
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>