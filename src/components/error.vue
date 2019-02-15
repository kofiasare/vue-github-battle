<template>
  <div id="error">
    <p>{{errorMsg}}</p>
    <p>
      <a @click="reset">Reset</a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    errorMsg: { type: String, required: true }
  },

  methods: {
    reset() {
      this.$emit("reset");
    }
  }
};
</script>

<style lang="scss" scoped>
#error {
  p {
    margin: 20px;
    a {
      cursor: pointer;
    }
  }
}
</style>
