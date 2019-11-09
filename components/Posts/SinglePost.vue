<template>
  <section class="post">
    <div class="post__ad ad--top"></div>
    <h1 class="post__title" v-html="title"></h1>
    <div class="post__box">
      <article class="post__article">
        <div class="post__hero">
          <div class="post__bg" v-lazy:background-image="image"></div>
        </div>
        <div class="post__content" v-html="text"></div>
        <a :href="source" target="_blank" class="text-center">Source of origin: {{ sourceName }}</a>
      </article>
      <aside class="aside post__aside">
        <div class="post__ad-1-3 ad--side"></div>
      </aside>
    </div>
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
