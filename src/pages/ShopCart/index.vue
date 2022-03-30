<!--
 * @Description: 购物车商品展示全部商品
 * @Author: superman
 * @Date: 2022-03-28 01:10:24
 * @LastEditors: superman
 * @LastEditTime: 2022-03-30 15:54:00
-->

<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <!-- 表头 -->
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <!-- 商品表格内容 -->
            <div class="cart-body">
                <ul
                    class="cart-list"
                    v-for="cart in cartInfoList"
                    :key="cart.id"
                >
                    <!-- 选中按钮 -->
                    <li class="cart-list-con1">
                        <input
                            type="checkbox"
                            name="chk_list"
                            :checked="cart.isChecked"
                            @click="
                                cart.isChecked = cart.isChecked == 1 ? 0 : 1
                            "
                            @change="updateChecked(cart, $event)"
                        />
                    </li>
                    <!-- 商品 -->
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl" />
                        <div class="item-msg">{{ cart.skuName }}</div>
                    </li>
                    <!-- 单价 -->
                    <li class="cart-list-con4">
                        <span class="price">{{ cart.cartPrice }}.00</span>
                    </li>
                    <!-- 数量 -->
                    <li class="cart-list-con5">
                        <a @click="handler('minus', -1, cart)" class="mins"
                            >-</a
                        >
                        <input
                            autocomplete="off"
                            type="text"
                            :value="cart.skuNum"
                            @change="
                                handler('change', $event.target.value * 1, cart)
                            "
                            minnum="1"
                            class="itxt"
                        />
                        <a @click="handler('add', 1, cart)" class="plus">+</a>
                    </li>
                    <!-- 小计 -->
                    <li class="cart-list-con6">
                        <span class="sum"
                            >{{ cart.skuNum * cart.cartPrice }}.00</span
                        >
                    </li>
                    <!-- 操作 -->
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteCartById(cart)"
                            >删除</a
                        >
                        <br />
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 结算栏 -->
        <div class="cart-tool">
            <!-- 全选 -->
            <div class="select-all">
                <input
                    id="allCheck"
                    class="chooseAll"
                    type="checkbox"
                    :checked="isAllCheck"
                    @change="updateAllCartChecked"
                />
                <label for="allCheck">全选</label>
            </div>
            <!-- 操作项 -->
            <div class="option">
                <a @click="deleteAllCheckedCart">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <!-- 右边 -->
            <div class="money-box">
                <!-- 商品总数 -->
                <div class="chosed">
                    已选择
                    <span>{{ totalNum }}</span>
                    件商品
                </div>
                <!-- 商品总价 -->
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" href="###" target="_blank">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
    name: "ShopCart",
    computed: {
        // 商品数据
        ...mapGetters("shopCart", ["cartList"]),
        cartInfoList() {
            // 这里套多一层，就是为了防止数据 cartInfoList 尚未返回
            // 以至于 cartInfoList 还不是数组
            return this.cartList.cartInfoList || [];
        },
        // 商品总价
        totalPrice() {
            let total = 0;
            for (const cart of this.cartInfoList) {
                total += cart.skuPrice * cart.skuNum;
            }
            return total;
        },
        // 全选按钮
        isAllCheck() {
            return this.cartInfoList.every((item) => item.isChecked);
        },
        // 商品总数
        totalNum() {
            let total = 0;
            this.cartInfoList.forEach((item) => {
                total += item.skuNum;
            });
            return total;
        },
    },
    methods: {
        getData() {
            this.$store.dispatch("shopCart/getCartList");
        },
        // 全选框
        updateAllCartChecked(e) {
            let isChecked = e.target.checked;
            this.$store
                .dispatch("shopCart/updateAllCartIsChecked", isChecked)
                .then(() => {
                    this.getData();
                })
                .catch(() => {
                    alert("checkAll error");
                });
        },
        // 修改产品个数，向服务器发请求（使用 lodash 的 throttle 节流）
        handler: throttle(function (type, disNum, cart) {
            // 算出改变的数量
            switch (type) {
                case "minus":
                    disNum = cart.skuNum > 1 ? -1 : 0;
                    break;
                case "change":
                    // 给用户输入的话，要注意 [小数]、[非正数]、[非法数]
                    if (isNaN(disNum) || disNum < 1) {
                        disNum = 0;
                        alert("好好写行不？");
                    } else {
                        disNum = Math.floor(disNum) - cart.skuNum;
                    }
                    break;
            }

            // 重新请求数据（因为是异步操作，所以要使用 async、await）
            this.$store
                .dispatch("detail/addOrUpdateShopCart", {
                    skuId: cart.skuId,
                    skuNum: disNum,
                })
                .then(
                    (_) => {
                        // 请求成功则刷新页面
                        this.getData();
                    },
                    (err) => {
                        alert(err);
                    }
                );
        }, 500),
        // 删除指定商品
        deleteCartById(cart) {
            this.$store
                .dispatch("shopCart/deleteCartListBySkuId", cart.skuId)
                .then(() => {
                    this.getData();
                })
                .catch((err) => {
                    alert(err);
                });
        },
        // 勾选商品
        updateChecked(cart, event) {
            this.$store
                .dispatch("shopCart/updateCheckedById", {
                    skuId: cart.skuId,
                    isChecked: +event.target.checked,
                })
                .then(
                    () => {
                        this.getData();
                    },
                    (err) => {
                        alert(err);
                    }
                );
        },
        // 删除所有选中的商品
        deleteAllCheckedCart() {
            this.$store.dispatch("shopCart/deleteAllCheckedCart").then(
                () => {
                    this.getData();
                },
                (err) => {
                    alert(err);
                }
            );
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>