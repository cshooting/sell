<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overView">
        <div class="overView-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overView-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
                    :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item border-1px">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | dateFormat}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import Star from "../star/star";
  import Split from "../split/split";
  import Ratingselect from "../ratingselect/ratingselect";
  import BScroll from "better-scroll"
  import {dateFormat} from "../../common/date"
  const ALL = 2
  const ERR_OK = 0

  export default {
    name: "ratings",
    components: {
      Ratingselect,
      Split,
      Star
    },
    props:{
      seller:Object
    },
    data(){
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    created(){
      this.$axios.get("/api/ratings").then(res => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.ratings = res.data;
          console.log(this.ratings);
          this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.ratings,{
              click: true
            })
          })
        }
      });
    },
    methods:{
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters:{
      dateFormat(time) {
        let date = new Date(time);
        return dateFormat(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style scoped lang="stylus">
  .ratings
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .ratings-content
      position: absolute;
      top 0
      left 0
      width 100%
      .overView
        display flex
        padding 18px 0
        .overView-left
          flex 0 0 137px
          padding-bottom 6px 0
          width 137px
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.2);
          @media only screen and (max-width : 320px)
            flex 0 0 120px
            width 120px
          .score
            margin-bottom 6px
            line-height 28px
            font-size 24px
            color rgb(255,153,0)
          .title
            margin-bottom 8px
            line-height 12px
            font-size 12px
            color rgb(7,17,27)
          .rank
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
        .overView-right
          flex 1
          padding 6px 0 6px 24px
          @media only screen and (max-width : 320px)
            padding-left 6px
          .score-wrapper
            margin-bottom 8px
            font-size 0
            .title
              display inline-block
              vertical-align top
              font-size 12px
              line-height 18px
              color rgb(7,17,27)
            .star
              display inline-block
              vertical-align top
              margin 0 12px
            .score
              display inline-block
              vertical-align top
              font-size 12px
              line-height 18px
              color rgb(255,153,0)
          .delivery-wrapper
            font-size 0
            .title
              font-size 12px
              line-height 18px
              color rgb(7,17,27)
            .delivery
              font-size 12px
              color rgb(147,153,159)
              margin-left 12px
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      border-1px (rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
