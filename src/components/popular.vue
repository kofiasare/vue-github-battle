<template>
  <div id="popular">
    <!-- language menu -->
    <div id="lang-menu">
      <ul>
        <li
          v-for="(lang, i) in languages"
          :key="i"
          :class="{active: selected === lang}"
          @click="fetchPopularRepos(lang)"
        >{{lang}}</li>
      </ul>
    </div>

    <!-- loading -->
    <Loading v-if="loading" text="Loading" speed="200"/>

    <!-- search resuts -->
    <div v-if="!loading" id="results">
      <ul>
        <li class="item" v-for="(repo, i) in repos" :key="i">
          <div class="rank">#{{i+1}}</div>
          <ul>
            <li>
              <img :src="repo.owner.avatar_url">
            </li>
            <li>
              <a :href="repo.html_url" target="_blank">{{repo.name}}</a>
            </li>
            <li>@{{repo.owner.login}}</li>
            <li>{{repo.stargazers_count}} stars</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import staticData from "../static";
import Loading from "./loading.vue";

export default {
  components: { Loading },
  data() {
    return {
      loading: false,
      selected: "All",
      languages: staticData.languages,
      repos: []
    };
  },

  methods: {
    fetchPopularRepos(language) {
      this.selected = language;
      this.loading = true;
      this.$http
        .get(
          window.encodeURI(
            "https://api.github.com/search/repositories?q=stars:>1+language:" +
              language +
              "&sort=stars&order=desc&type=Repositories"
          )
        )
        .then(data => {
          this.loading = false;
          this.repos = data.body.items;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  },

  created() {
    this.fetchPopularRepos(this.selected);
  }
};
</script>

<style lang="scss" scoped>
#popular {
  text-align: center;
  ul {
    padding: 0;
    li {
      list-style-type: none;
      display: inline-block;
    }
  }

  #lang-menu {
    li {
      margin: 10px;
      font-weight: 700;
      cursor: pointer;
      &.active {
        color: #d0021b;
      }
    }
  }

  #results {
    margin: 16px 0;
    .item {
      margin: 20px;
      text-align: center;

      .rank {
        font-size: 20px;
        margin: 10px;
      }

      ul {
        margin-bottom: 7px;
        li {
          display: block;
          img {
            width: 150px;
            border-radius: 50%;
          }
          a {
            color: #d0021b;
          }
        }
      }
    }
  }
}
</style>
