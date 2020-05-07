<template>
  <div class="category-page container">
    <h1 class="heading--main">{{ category | firstUppercase }} News</h1>
    <div class="ad--top">
      <!-- Yandex.RTB R-A-568097-1 -->
      <div id="yandex_rtb_R-A-568097-1"></div>
      <script2 type="text/javascript">
        (function(w, d, n, s, t) {
          w[n] = w[n] || [];
          w[n].push(function() {
            Ya.Context.AdvManager.render({
              blockId: "R-A-568097-1",
              renderTo: "yandex_rtb_R-A-568097-1",
              async: true
            });
          });
          t = d.getElementsByTagName("script")[0];
          s = d.createElement("script");
          s.type = "text/javascript";
          s.src = "//an.yandex.ru/system/context.js";
          s.async = true;
          t.parentNode.insertBefore(s, t);
        })(this, this.document, "yandexContextAsyncCallbacks");
      </script2>
    </div>
    <PostList :posts="categoryPosts"/>
    <div class="btn-box">
      <!--      <button class="btn btn__load" @click="loadNewPosts">Next Page</button>-->
      <span class="btn__load-more"></span>
    </div>
  </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList'

  export default {
    name: 'index',
    components: {PostList},
    async asyncData (context) {
      let category = await context.route.params.category
      let getInitialPosts = await context.app.$axios('https://admin.lova.news/news/10/' + category)
      let nextPage = await context.app.$axios('https://admin.lova.news/news/12/' + category)
      let categories = await context.app.$axios('https://admin.lova.news/categories')
      context.store.commit('setPostsByCategory', [])
      context.store.commit('setPostsByCategory', getInitialPosts.data.data)
      context.store.commit('setNextCategoryPage', nextPage.data['next_page_url'])
      context.store.commit('setCategories', categories.data)
      return {
        categoryPosts: context.store.getters.getPostsByCategory,
        category: category
      }
    },
    mounted () {
      this.addAds()
      this.scroll()
    },
    methods: {
      addAds () {
        const postBlocks = document.querySelectorAll('.post-preview')
        for (const post in postBlocks) {
          const adBox = document.createElement('div')

          adBox.classList.add('ad--feed')
          adBox.insertAdjacentHTML('afterbegin', '<div id="yandex_rtb_R-A-568097-2"></div>')

          const ad = document.createElement('script')
          ad.type = 'text/javascript'
          ad.innerHTML = `
          (function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
            Ya.Context.AdvManager.render({
                blockId: "R-A-568097-2",
                renderTo: "rtb-2-${post}",
                async: true,
                pageNumber: ${post}
            });
        });
        t = d.getElementsByTagName("script")[0];
        s = d.createElement("script");
        s.type = "text/javascript";
        s.src = "//an.yandex.ru/system/context.js";
        s.async = true;
        t.parentNode.insertBefore(s, t);
    })(this, this.document, "yandexContextAsyncCallbacks");`

          adBox.appendChild(ad)

          if (+post !== 0 && +post % 3 === 0) {
            this.insertAfter(adBox, postBlocks[post])
          }
        }
      },
      clearAds () {
        const allAds = document.querySelectorAll('.ad--feed');
        for (let ad of allAds) {
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
      insertAfter (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
      },
      loadNewPosts () {
        this.$axios.get(this.$store.getters.getNextCategoryPage)
          .then(res => {
            this.$store.commit('setPostsByCategory', [...this.$store.getters.getPostsByCategory, ...res.data.data])
            this.$store.commit('setNextCategoryPage', res.data['next_page_url'])
            this.categoryPosts = this.$store.getters.getPostsByCategory
          })
      },
      firstUpper (value) {
        if (!value) {
          return ''
        }
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    head () {
      return {
        title: `${this.firstUpper(this.category)} News`,
      }
    }
  }
</script>

<style scoped>

</style>
