<template>
  <PostList :posts="loadedPosts"/>
</template>

<script>
  import PostList from '@/components/Posts/PostList'

  export default {
    name: 'index',
    components: { PostList },
    asyncData (context) {
      if (context.payload) {
        return {
          loadedPosts: context.payload.postData
        }
      }
      return context.app.$axios.$get('/news/100/')
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
    },
  }
</script>

<style scoped>

</style>
