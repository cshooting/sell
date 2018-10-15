<template>
  <div id="app">
    <headerMsg :seller="seller"></headerMsg>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import headerMsg from "@/components/headerMsg/headerMsg"
  export default {
    name: 'App',
    components:{
      headerMsg
    },
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$axios.get("/api/seller").then(res=>{
        res = res.data;
        this.seller = res.data;
        console.log(res);
        console.log(this.seller);
      });
    }
  }
</script>

<style scoped lang="stylus">
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
        /*align-items: center;*/
        /*vertical-align: middle;垂直居中*/
        font-size: 14px
        line-height: 40px
        color: #4D555D
        .active
          color: #F01414
</style>
