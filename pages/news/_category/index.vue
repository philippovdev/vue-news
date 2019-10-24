<template>
  <div class="category-page">
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
      let category = context.route.params.category;
      let getInitialPosts = await context.app.$axios('http://admin.lova.news/news/12/' + category)
      return {
        categoryPosts: getInitialPosts.data.data
      }
    },
    methods: {
      loadNewPosts() {

      }
    }
  }
</script>

<style scoped>

</style>
