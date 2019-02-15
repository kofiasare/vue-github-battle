<template>
  <nav>
    <ul>
      <li v-for="(item,i) in menu" :key="i">
        <router-link :to="item.link" exact>{{item.label}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  ul {
    padding: 0;
    margin: 20px;
    li {
      list-style-type: none;
      display: inline;
      margin-right: 15px;
      a {
        &.router-link-active {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
