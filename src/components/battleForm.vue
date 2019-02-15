<template>
  <div>
    <div id="battle-grounds">
      <!-- Player One -->
      <div>
        <form v-if="!players.playerOne.submitted" class="player">
          <label>Player One</label>
          <input type="text" placeholder="github username" v-model="players.playerOne.username">
          <button
            class="button"
            :disabled="players.playerOne.username === ''"
            @click.prevent="getProfile(players.playerOne)"
          >Submit</button>
        </form>

        <!-- user avatar -->
        <div v-if="players.playerOne.submitted" class="player">
          <img :src="players.playerOne.avatar">
          <h2>@{{players.playerOne.username}}</h2>
          <button class="button reset" @click="reset('playerOne')">Reset</button>
        </div>
      </div>
      <!-- End Of Player One -->
      <!-- Player Two -->
      <div>
        <form v-if="!players.playerTwo.submitted" class="player">
          <label>Player Two</label>
          <input type="text" placeholder="github username" v-model="players.playerTwo.username">
          <button
            class="button"
            :disabled="players.playerTwo.username === ''"
            @click.prevent="getProfile(players.playerTwo)"
          >Submit</button>
        </form>

        <!-- user avatar -->
        <div v-if="players.playerTwo.submitted" class="player">
          <img :src="players.playerTwo.avatar">
          <h2>@{{players.playerTwo.username}}</h2>
          <button class="button reset" @click="reset('playerTwo')">Reset</button>
        </div>
      </div>
      <!--End Of Player Two -->
    </div>

    <div id="battle-ready-button" v-if="battleReady">
      <router-link class="button" :to="resultsUrl" exact>Battle</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: { type: Function, required: true }
  },

  data() {
    return {
      players: {
        playerOne: new this.player(),
        playerTwo: new this.player()
      }
    };
  },

  methods: {
    getProfile(player) {
      this.$http
        .get(`https://api.github.com/users/${player.username}`)
        .then(data => {
          player.submitted = true;
          player.avatar = data.body.avatar_url;
        })
        .catch(err => {
          this.$emit("requestError", player.username);
          console.warn(`error: Invalid Github User => @${player.username}`);
        });
    },

    reset(playerType) {
      const player = this.players[playerType];
      player.username = "";
      player.avatar = "";
      player.submitted = false;
    }
  },

  computed: {
    battleReady() {
      return (
        this.players.playerOne.submitted && this.players.playerTwo.submitted
      );
    },

    resultsUrl() {
      return `/battle/results?playerOneName=${
        this.players.playerOne.username
      }&playerTwoName=${this.players.playerTwo.username}`;
    }
  }
};
</script>

<style>
</style>
