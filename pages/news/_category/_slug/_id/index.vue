<template>
  <div class="single-post-page" :style="{backgroundImage: 'url(' + loadedPost.image + ')'}">
    <section class="post" >
      <h1 class="post-title" v-html="loadedPost.title"></h1>
      <div class="post-details">
        <!--<div class="post-detail">Last updated on {{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by {{ loadedPost.author }}</div>-->
      </div>
      <p class="post-content" v-html="loadedPost.text" ></p>
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
      let postId = await context.params.id;
      let categories = await context.app.$axios('http://admin.lova.news/categories');
      let loadedPost = await context.app.$axios.$get('http://admin.lova.news/news/view/' + postId);
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
  }
</style>
