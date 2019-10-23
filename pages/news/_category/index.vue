<template>
  <PostList :posts="categoryPosts"/>
</template>

<script>
  import PostList from '@/components/Posts/PostList'
  import PostPreview from '@/components/Posts/PostPreview'

  export default {
    name: 'index',
    components: { PostPreview, PostList },

    asyncData(context) {
        return {
          async loadNewPosts() {
            await context.$axios.get(context.store.getters.nextPage)
              .then(res => {
                  context.store.commit('setPosts', [...context.store.state.loadedPosts, ...res.data['data']])
                  context.store.commit('setNext', res.data['next_page_url'])
              })
              .catch(e => context.error(new Error()))
          }
        }
      },
    /*computed: {
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
    }*/
  }
</script>

<style scoped>

</style>
