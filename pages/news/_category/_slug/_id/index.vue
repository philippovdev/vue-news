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
      <p class="post__content" v-html="loadedPost.text" ></p>
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
  /*.single-post-page {
    padding: 30px;
    box-sizing: border-box;
    background-size: 100%;
    background-repeat: no-repeat;
  }

  .post {
    width: 100%;
    padding: 20px;
    background-color: rgba(255,255,255,.9);
  }

  @media (min-width: 768px) {
    .post {
      width: 600px;
      margin: auto;
    }
  }

  .post-title {
    text-align: center;
    margin: 0;
  }

  .post-details {
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 3px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .post-content {
    text-align: left;
  }

  @media (min-width: 768px) {
    .post-details {
      flex-direction: row;
    }
  }

  .post-detail {
    color: rgb(88, 88, 88);
    margin: 0 10px;
  }

  .post-feedback a {
    color: red;
    text-decoration: none;
  }

  .post-feedback a:hover,
  .post-feedback a:active {
    color: salmon;
  }*/
</style>
