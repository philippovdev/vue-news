<template>
  <section class="post">
    <div class="post__ad ad--top">
      <a href="http://s.click.aliexpress.com/e/3Z5NU1KC?bz=300*250" target="_parent"><img width="300" height="250" src="https://ae01.alicdn.com/kf/HTB1fopbov9TBuNjy1zb760pepXaT/EN_300_250.png"/></a>
    </div>
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
        <div class="post__ad-1-3 ad--side">
          <a href="http://s.click.aliexpress.com/e/s2HErNWu?bz=300*250" target="_parent"><img width="300" height="250" src="https://ae01.alicdn.com/kf/HTB13jH6J4TpK1RjSZFKq6y2wXXaP/EN_300_250.jpg"/></a>
        </div>
      </aside>
    </div>
    <div class="post__ad ad--bottom">
      <a href="http://s.click.aliexpress.com/e/NLNcKs5S?bz=120*600" target="_parent"><img width="300" height="250" src="https://ae01.alicdn.com/kf/HTB1fvntX7yWBuNjy0Fp761ssXXad/EN_300_250.png"/></a>
    </div>
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
