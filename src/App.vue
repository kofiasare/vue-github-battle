<template>
  <div id="app">
    <Header :menu="menu"/>
    <router-view></router-view>
  </div>
</template>

<script>
import components from "./components";

export default {
  components: components,
  data() {
    return {
      menu: [
        { label: "Home", link: "/" },
        { label: "Battle", link: "/battle" },
        { label: "Popular", link: "/popular" }
      ]
    };
  }
};
</script>

<style lang='scss'>
body {
  margin: 0px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
    Ubuntu, Cantarell, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  a {
    color: #d0021b;
    text-decoration: none;
  }

  .button {
    background: #000;
    color: #e6e6e6;
    display: block;
    width: 200px;
    margin: 10px auto;
    padding: 7px 0;
    border: none;
    border-radius: 3px;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    text-align: center;
    &:hover {
      color: #fff;
    }

    &:disabled {
      color: #e6e6e6;
    }

    &.reset {
      background: transparent;
      color: #d0021b;
      font-size: 11px;
      font-weight: 400;
      cursor: pointer;
    }
  }

  #battle-grounds,
  #battle-results {
    display: flex;
    justify-content: space-around;
    .player {
      display: flex;
      flex-direction: column;
      width: 500px;
      align-items: center;
      label {
        text-align: center;
        font-size: 30px;
        font-weight: 200;
      }
      input {
        border-radius: 3px;
        margin: 10px 0;
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.43);
        font-size: 16px;
        width: 80%;
      }
      img {
        width: 150px;
        border-radius: 50%;
      }
    }
  }
}
</style>
