<template>
  <div>
    <!-- Loading -->
    <Loading v-if="loading" text="Loading" speed="200"/>

    <!-- Battle Results -->
    <div v-if="!loading" id="battle-results">
      <!-- Winner -->
      <div>
        <div class="player">
          <label>Winner</label>
          <h3>Score: {{players.winner.score}}</h3>
          <div>
            <div class="player">
              <img :src="players.winner.profile.body.avatar_url">
              <h2>@{{players.winner.profile.body.login}}</h2>
            </div>
            <ul>
              <li v-if="players.winner.profile.body.name">{{players.winner.profile.body.name}}</li>
              <li
                v-if="players.winner.profile.body.location"
              >{{players.winner.profile.body.location}}</li>
              <li v-if="players.winner.profile.body.company">{{players.winner.profile.body.company}}</li>
              <li>Followers: {{players.winner.profile.body.followers}}</li>
              <li>Following: {{players.winner.profile.body.following}}</li>
              <li>Public Repos: {{players.winner.profile.body.public_repos}}</li>
              <li v-if="players.winner.profile.body.blog">
                <a :href="players.winner.profile.body.blog">{{players.winner.profile.body.blog}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- End Winner -->
      <!--Loser -->
      <div>
        <div class="player">
          <label>Loser</label>
          <h3>Score: {{players.loser.score}}</h3>
          <div>
            <div class="player">
              <img :src="players.loser.profile.body.avatar_url">
              <h2>@{{players.loser.profile.body.login}}</h2>
            </div>
            <ul>
              <li v-if="players.loser.profile.body.name">{{players.loser.profile.body.name}}</li>
              <li v-if="players.loser.profile.body.location">{{players.loser.profile.body.location}}</li>
              <li v-if="players.loser.profile.body.company">{{players.loser.profile.body.company}}</li>
              <li>Followers: {{players.loser.profile.body.followers}}</li>
              <li>Following: {{players.loser.profile.body.following}}</li>
              <li>Public Repos: {{players.loser.profile.body.public_repos}}</li>
              <li v-if="players.loser.profile.body.blog">
                <a :href="players.loser.profile.body.blog">{{players.loser.profile.body.blog}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- End Loser -->
    </div>
  </div>
</template>

<script>
import Loading from "./loading";

export default {
  components: { Loading },
  data() {
    return {
      loading: true,
      players: {}
    };
  },

  methods: {
    fetchProfile(player) {
      return this.$http.get(`https://api.github.com/users/${player}`);
    },

    fetchRepos(player) {
      return this.$http.get(
        `https://api.github.com/users/${player}/repos?per_page=100`
      );
    },

    calcScore(player) {
      // (player followers * 3) + player stars
      [player.profile, player.repos] = player;
      return (
        player.profile.body.followers * 3 +
        player.repos.body.reduce((acc, repo) => {
          return acc + repo.stargazers_count;
        }, 0)
      );
    },

    handleErr(err) {
      console.warn(err);
      this.loading = false;
    }
  },

  created() {
    Promise.all(
      Object.values(this.$route.query).map(player => {
        return Promise.all([
          this.fetchProfile(player),
          this.fetchRepos(player)
        ]);
      })
    )
      .then(players => {
        players.forEach(player => (player.score = this.calcScore(player)));
        players.sort((loser, winner) => {
          return winner.score - loser.score;
        });

        [this.players.winner, this.players.loser] = players;
        this.loading = false;
      })
      .catch(err => this.handleErr("Error"));
  }
};
</script>

<style lang="scss" scoped>
.player {
  ul {
    margin-bottom: 7px;
    padding: 0;
    li {
      list-style-type: none;
    }
  }
}
</style>

