<template>
  <div class="category-page container">
    <h1 class="heading--main">{{ category | firstUppercase }} News</h1>
    <div class="ad--top"></div>
    <PostList :posts="categoryPosts"/>
    <div class="btn-box">
<!--      <button class="btn btn__load" @click="loadNewPosts">Next Page</button>-->
      <span class="btn__load-more"></span>
    </div>
    <div class="ad--bottom"></div>
  </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList'

  export default {
    name: 'index',
    components: { PostList },
    async asyncData (context) {
      let category = await context.route.params.category
      let getInitialPosts = await context.app.$axios('https://admin.lova.news/news/10/' + category);
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
    mounted() {
      this.scroll();

      const postBlocks = document.querySelectorAll('.post-preview');
      for (const post in postBlocks) {
        const ad = document.createElement('div');
        ad.classList.add('ad--feed');
        if (+post !== 0 && +post % 4 === 0) {
          this.insertAfter(ad, postBlocks[post]);
        }
      }
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
      insertAfter (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
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
