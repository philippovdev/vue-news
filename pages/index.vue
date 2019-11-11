<template>
  <div class="home-page container">
    <h1 class="heading--main">Fresh News from Lova Source</h1>
    <div class="ad--top">
      <a href="http://s.click.aliexpress.com/e/3Z5NU1KC?bz=300*250" target="_parent"><img width="300" height="250" src="https://ae01.alicdn.com/kf/HTB1fopbov9TBuNjy1zb760pepXaT/EN_300_250.png"/></a>
    </div>
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
          ad.innerHTML = '<a href="http://s.click.aliexpress.com/e/NLNcKs5S?bz=120*600" target="_parent"><img width="300" height="250" src="https://ae01.alicdn.com/kf/HTB1fvntX7yWBuNjy0Fp761ssXXad/EN_300_250.png"/></a></div>';
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
