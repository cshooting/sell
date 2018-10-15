<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods">
          <span></span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
  export default {
    props:{
      seller: Object
    },
    data(){
      return {
        goods : []
      }
    },
    created(){
      this.$axios.get("/api/goods").then(res=>{
        res = res.data;
        this.goods = res.data;
        console.log(this.goods);
      });
    }
  }
</script>

<style scoped lang="stylus">
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
    .foods-wrapper
      flex 1


</style>
