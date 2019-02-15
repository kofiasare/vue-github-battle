<template>
  <div>
    <component
      :is="currentComponent"
      v-bind="currentProps"
      @requestError="toggleErrorPage"
      @reset="reset"
    ></component>
  </div>
</template>

<script>
import staticData from "../static";
import BattleForm from "./battleForm.vue";
import Error from "./error.vue";

export default {
  components: {
    BattleForm,
    Error
  },

  data() {
    return {
      currentComponent: "BattleForm"
    };
  },

  methods: {
    toggleErrorPage(payload) {
      this.currentComponent = "Error";
    },

    reset() {
      this.currentComponent = "BattleForm";
    }
  },

  computed: {
    currentProps() {
      switch (this.currentComponent) {
        case "BattleForm":
          return { player: staticData.player };
        case "Error":
          return staticData.errors;
      }
    }
  }
};
</script>