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
    /*asyncData (context) {
      if (context.payload) {
        return {
          loadedPosts: context.payload.postData
        }
      }
      return context.app.$axios.$get('/news/100')
        .then(data => {
          let categoryName = context.params.category;
          let newData = Array.from(data['data']).filter(key => {
            return key['category']['name'].toLowerCase() === categoryName
          })
          return {
            loadedPosts: newData,
          }
        })
        .catch(e => context.error(e))
    },*/
  }
</script>

<style scoped>

</style>
