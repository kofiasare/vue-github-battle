<template>
  <div>
    <p>{{loadText}}</p>
  </div>
</template>

<script>
export default {
  props: {
    speed: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      loadText: this.text,
      maxText: this.text + "..."
    };
  },

  created() {
    setInterval(() => {
      if (this.loadText === this.maxText) return (this.loadText = this.text);
      this.loadText += ".";
    }, this.speed);
  }
};
</script>

<style <style lang="scss" scoped>
p {
  font-size: 35px;
  text-align: center;
}
</style>
