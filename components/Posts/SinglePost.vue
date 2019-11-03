<template>
  <section class="post">
    <div class="post__ad ad--top"></div>
    <h1 class="post__title" v-html="title"></h1>
    <div class="post__hero">
      <div class="post__bg" :style="{backgroundImage: 'url(' + image + ')'}"></div>
      <div class="post__ad-1-3 ad--side"></div>
    </div>
    <div class="post__details">
      <!--<div class="post-detail">Last updated on {{ loadedPost.updatedDate | date }}</div>
      <div class="post-detail">Written by {{ loadedPost.author }}</div>-->
    </div>
    <div class="post__content" v-html="text"></div>
    <a :href="source" target="_blank" class="text-center">Source of origin: {{ sourceName }}</a>
    <div class="post__ad ad--bottom"></div>
  </section>
</template>

<script>
  export default {
    props: [
      'title',
      'image',
      'text',
      'source',
      'sourceName'
    ],
    name: 'SinglePost',
  }
</script>

<style scoped>

</style>
