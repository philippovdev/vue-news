<template>
  <div class="single-post-page">
    <section class="post" >
      <div class="post__ad ad--top"></div>
      <h1 class="post__title" v-html="loadedPost.title"></h1>
      <div class="post__bg" :style="{backgroundImage: 'url(' + loadedPost.image + ')'}"></div>
      <div class="post__details">
        <!--<div class="post-detail">Last updated on {{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>-->
      </div>
      <div class="post__content" v-html="loadedPost.text" ></div>
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
          loadedPost: context.store.getters.getSinglePost
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
  .single-post-page {
    width: 800px;
    margin: 0 auto;
  }
  .post {
    margin-top: 3rem;
    &__title {
      text-align: center;
    }
    &__bg {
      height: 400px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center bottom;
    }
    &__content {
      text-align: left;
      padding: 3rem;
      line-height: 1.6rem;
    }
  }
</style>
