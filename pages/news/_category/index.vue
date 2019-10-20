<template>
  <PostList :posts="categoryPosts"/>
</template>

<script>
  import PostList from '@/components/Posts/PostList'
  import PostPreview from '@/components/Posts/PostPreview'

  export default {
    name: 'index',
    components: { PostPreview, PostList },
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts;
      },
      categoryPosts() {
        const postsByCategory = [];

        for (const singleNews of this.loadedPosts) {
          if (singleNews.category.name.toLowerCase() === this.$route.params.category) {
            postsByCategory.push(singleNews)
          }
        }
        return postsByCategory;
      }
    }
  }
</script>

<style scoped>

</style>
