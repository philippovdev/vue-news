<template>
  <PostList :posts="loadedPosts" />
</template>

<script>
  export default {
    name: 'index',
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      }
    }
  }
</script>

<style scoped>

</style>
