<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" class="image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>

        </div>
      </div>
    </div>
  </transition>

</template>

<script>
  export default {
    props:{
      food:Object
    },
    data(){
      return{
        showFlag: false
      }
    },
    methods:{
      show(){
        this.showFlag = true
      },
      hide(){
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 10
    width 100%
    background #fff
    transition all 0.5s linear
    &.move-enter-active,&.fade-leave-active
      transform translate3d(0,0,0)
    &.move-enter,&.move-leave-to
      transform translate3d(100%,0,0)
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

</style>
