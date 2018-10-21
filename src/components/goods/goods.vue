<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
          {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc" v-show="food.description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">${{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScorll from 'better-scroll'
  const ERR_OK = 0;
  export default {
    props: {
      seller: Object
    },
    data() {
      return {
        goods: [],
        listHeight: []
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScorll(this.$refs.menuWrapper);
        this.foodScroll = new BScorll(this.$refs.foodWrapper);
      },
      _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i=0;i<foodList.length;i++){
          let item = foodList[i];
        }
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$axios.get("/api/goods").then(res => {
        res = res.data;
        if (res.errno === ERR_OK) {
          this.goods = res.data;
          this.$nextTick(function () {
            this._initScroll();

          })
        }
      });
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/less/base.styl"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px (rgba(7, 17, 27, 0.1))
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 2px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        border-1px (rgba(7, 17, 27, 0.1))
        padding-bottom 18px
        &:last-child
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            display inline-block
            height 10px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)
</style>
