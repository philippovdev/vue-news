<template>
  <div class="home-page container">
    <h1 class="heading--main">Fresh News from Lova Source</h1>
    <div class="ad--top"></div>
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>
  export default {
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      },
    },
    methods: {
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + 1) >= document.documentElement.offsetHeight;
          if (bottomOfWindow) {
            this.$nuxt.$loading.start();
            this.loadNewPosts();
            this.$nuxt.$loading.finish();
          }
        };
      },
      loadNewPosts() { // Loading next page on click and commiting store actions with actual data
        this.$axios.get(this.$store.getters.nextPage)
          .then(res => {
              this.$store.commit('setPosts', [...this.$store.getters.loadedPosts, ...res.data.data])
              this.$store.commit('setNext', res.data['next_page_url'])
          });
      }
    },
    mounted() {
      this.scroll();
    },
    asyncData (context) { // Getting data for nav links
      return context.$axios.get('https://admin.lova.news/categories')
        .then((res) => {
          context.store.commit('setCategories', res.data)
        })
    }
  }
</script>


<style scoped>

</style>
