<template lang="html">
  <div class="uk-container">
    <h1>40<span>4</span></h1>
    <p>Not Found</p>
    <router-link :to='{ name: "Home" }' class="uk-button uk-button-primary">Go to home page</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="less" scoped>
  .uk-container {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    min-height: 100vh;
  }

  h1 {
    font-size: 10rem;
    line-height: 1;
    margin-bottom: 0;
    margin-top: 0;

    span {
      display: inline-block;
      transform: rotate(10deg);
    }
  }

  p {
    font-size: 2rem;
  }
</style>
