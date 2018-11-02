<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="foodContent">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" class="image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="shopping">
          <div class="name">{{food.name}}</div>
          <div class="sell">
            <span class="sellCount">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="currPrice">￥{{food.price}}</span>
            <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="shopCart">
            <cartcontrol :food="food"></cartcontrol>
          </div>
        </div>
        <split v-show="food.info"></split>
        <div class="info-wrapper" v-show="food.info">
          <div class="title">商品介绍</div>
          <div class="info">{{food.info}}</div>
        </div>
        <split></split>
        <div class="ratings-wrapper">
          <div class="title">商品评价</div>
          <div class="btn-type">
            <div class="all" :class="{'active':selectType === 0}">
              <span class="type">全部</span>
              <span class="num"></span>
            </div>
            <div class="recommed" :class="{'active':selectType === 'RECOMMED'}">
              <span class="type">推荐</span>
              <span class="num"></span>
            </div>
            <div class="complain" :class="{'active':selectType === 'COMPLAIN'}">
              <span class="type">吐槽</span>
              <span class="num"></span>
            </div>
          </div>
          <div class="rating-list">
            <div v-show="!food.ratings">暂无评价</div>
            <ul>
              <li v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>
                <div class="rating-time">{{rating.rateTime | dateFormat}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  import Cartcontrol from "../cartcontrol/cartcontrol";
  import BScroll from "better-scroll"
  import {dateFormat} from "../../common/date"
  import Split from "../split/split";
  export default {
    components: {
      Split,
      Cartcontrol
    },
    props:{
      food:Object
    },
    data(){
      return{
        showFlag: false,
        selectType : 0
      }
    },
    methods:{
      show(){
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll){
            this.scroll = new BScroll(this.$refs.foodContent,{
              click:true
            });
          }else {
            this.scroll.refresh();
          }
        })
      },
      hide(){
        this.showFlag = false
      }
    },
    computed:{
      count(){
        this.num = food.ratings.length
        return this.num;
      }
    },
    filters:{
      dateFormat(time){
        let date = new Date(time);
        return dateFormat(date,"yyyy-MM-dd hh:mm");
      }
    },
    created(){

    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/less/base.styl"
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 10
    width 100%
    background #fff
    transition all 0.3s linear
    &.move-enter-active,&.fade-leave-active
      transform translate3d(0,0,0)
    &.move-enter,&.move-leave-to
      transform translate3d(100%,0,0)
    .food-content
      position relative
      left 0
      top 0
      .image-header
        position relative
        width 100%
        height 0
        padding-bottom 100%
        .image
          position absolute
          top 0
          left 0
          width 100%
          height 100%
        .back
          position absolute
          top 10px
          left 0
          .icon-arrow_lift
            display inline-block
            padding 10px
            font-size 20px
            color #fff
      .shopping
        position relative
        left 0
        top 0
        padding-left 18px
        .name
          margin 18px 0 8px 0
          font-size 14px
          line-height 14px
          font-weight 700
          color rgb(7,17,27)
        .sell
          font-size 0
          .sellCount
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
          .rating
            padding-left 12px
            font-size 10px
            color rgb(147,153,159)
            line-height 10px
        .price
          padding 18px 0
          font-size 0
          .currPrice
            font-size 14px
            line-height 24px
            font-weight 700
            color rgb(240,20,20)
          .oldPrice
            margin-left 12px
            font-size 10px
            line-height 24px
            font-weight 700
            color rgb(147,153,159)
            text-decoration line-through
        .shopCart
          position absolute
          right 18px
          bottom 10px
      .info-wrapper
        margin 18px
        .title
          font-size 14px
          line-height 14px
          font-weight 700
          color rgb(7,17,27)
        .info
          margin 6px 8px 0
          font-size 12px
          line-height 24px
          font-weight 200
          color rgb(77,85,93)
      .ratings-wrapper
        margin 18px
        .title
          font-size 14px
          line-height 14px
          font-weight 700
          color rgb(7,17,27)
        .btn-type
          display flex
          justify-content flex-start  //左对齐
          margin-top 18px
          font-size 12px
          color rgb(77,85,93)
          .active
            background-color black
          .all
            padding 8px 12px
            line-height 16px
            background-color rgb(0,160,220)
            border-radius 4px
          .recommed
            margin-left 8px
            padding 8px 12px
            line-height 16px
            background-color rgb(204,236,248)
            border-radius 4px
          .complain
            margin-left 8px
            padding 8px 12px
            line-height 16px
            background-color rgba(77,85,93,0.2)
            border-radius 4px
        .rating-item
          position: relative
          padding 16px 0
          border-1px (rgba(7,17,27,0.1))
          .user
            position absolute
            right 0
            top 16px
            .name
              font-size 10px
              line-height 12px
              color rgb(147,153,159)
            .avatar
              margin-left 6px
              border-radius 50%
          .rating-time
            font-size 10px
            line-height 12px
            color rgb(147,153,159)
          .text
            margin-top 6px
            font-size 12px
            line-height 16px
            color rgb(7,17,27)
            .icon-thumb_up
              padding-right 4px
              font-size 12px
              line-height 16px
              color rgb(0,160,220)
            .icon-thumb_down
              padding-right 4px
              font-size 12px
              line-height 16px
              color rgb(147,153,159)







</style>
