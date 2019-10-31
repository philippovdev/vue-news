<template>
  <div class="single-post-page container">
    <section class="post" >
      <div class="post__ad ad--top"></div>
      <h1 class="post__title" v-html="loadedPost.title"></h1>
      <div class="post__bg" :style="{backgroundImage: 'url(' + loadedPost.image + ')'}"></div>
      <div class="post__details">
        <!--<div class="post-detail">Last updated on {{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>-->
      </div>
      <div class="post__content" v-html="loadedPost.text" ></div>
      <div class="post__ad ad--bottom"></div>
    </section>
    <section class="post-feedback">
    </section>
  </div>
</template>

<script>
  export default {
    async asyncData (context) {
      if (context.payload) {
        return {
          loadedPost: context.payload
        }
      }
      const postId = await context.params.id;
      const categories = await context.app.$axios('http://admin.lova.news/categories');
      const loadedPost = await context.app.$axios.$get('http://admin.lova.news/news/view/' + postId);
      context.store.commit('setCategories', categories.data);
      context.store.commit('setSinglePost', loadedPost);
        return {
          loadedPost: context.store.getters.getSinglePost,
        }
    },
    head () {
      return {
        title: this.loadedPost.title,
      }
    }
  }
</script>


<style scoped>
</style>
