<template>
  <div class="errPage-container base-card">
    <el-row class="row-401">
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          401错误!
        </h1>
        <h2>您没有访问权限！</h2>
        <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
        <el-button type="primary" @click="toHome">回到首页</el-button>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428">
      </el-col>
    </el-row>
  </div>
</template>

<script  setup>
defineOptions({
  name: '401View',
});
import errGif from '@/assets/images/common/401.gif'
import useRouter from '@/hooks/useRouter';
const { toHome } = useRouter()
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 100px;
  box-sizing: border-box;

  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .pan-gif {
    margin: 0 auto;
    display: block;
  }

  .row-401 {
    width: 800px;
    margin: 0 auto;
  }

  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
