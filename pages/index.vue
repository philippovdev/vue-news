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
      loadedPosts () {
        return this.$store.getters.loadedPosts
      },
    },
    methods: {
      insertAfter (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
      },
      clearAds () {
        const allAds = document.querySelectorAll('.ad--feed');
        for (let ad of allAds) {
          console.log(allAds);
          ad.remove();
        }
      },
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + 1) >= document.documentElement.offsetHeight
          if (bottomOfWindow) {
            this.$nuxt.$loading.start()
            this.loadNewPosts()
            this.clearAds()
            this.addAds()
            this.$nuxt.$loading.finish()
          }
        }
      },
      loadNewPosts () {
        this.$axios.get(this.$store.getters.nextPage)
          .then(res => {
            this.$store.commit('setPosts', [...this.$store.getters.loadedPosts, ...res.data.data])
            this.$store.commit('setNext', res.data['next_page_url'])
          })
      },
      addAds () {
        const postBlocks = document.querySelectorAll('.post-preview')
        for (const post in postBlocks) {
          const ad = document.createElement('div')
          ad.classList.add('ad--feed')
          if (+post !== 0 && +post % 4 === 0) {
            this.insertAfter(ad, postBlocks[post])
          }
        }
      }
    },
    mounted () {
      this.addAds()
      this.scroll()
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
