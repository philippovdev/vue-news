<template>
  <div class="category-page">
    <div class="ad--top"></div>
    <PostList :posts="categoryPosts"/>
    <button class="btn btn__load" @click="loadNewPosts">Next Page</button>
  </div>
</template>

<script>
  import PostList from '@/components/Posts/PostList'

  export default {
    name: 'index',
    components: { PostList },
    async asyncData(context) {
      let category = await context.route.params.category;
      let getInitialPosts = await context.app.$axios('http://admin.lova.news/news/12/' + category);
      let categories = await context.app.$axios('http://admin.lova.news/categories')
      context.store.commit('setPostsByCategory', []);
      context.store.commit('setPostsByCategory', getInitialPosts.data.data);
      context.store.commit('setNextCategoryPage', getInitialPosts.data['next_page_url'])
      context.store.commit('setCategories', categories.data)
      return {
        categoryPosts: context.store.getters.getPostsByCategory,

      }
    },
    methods: {
      loadNewPosts() {
        this.$axios.get(this.$store.getters.getNextCategoryPage)
          .then(res => {
            this.$store.commit('setPostsByCategory', [...this.$store.getters.getPostsByCategory, ...res.data.data])
            this.$store.commit('setNextCategoryPage', res.data['next_page_url']);
            this.categoryPosts = this.$store.getters.getPostsByCategory;
          });
      }
    }
  }
</script>

<style scoped>

</style>
