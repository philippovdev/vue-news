<template>
  <div class="single-post-page">
    <div class="ad--post ad--top yad">
      <!-- Yandex.RTB R-A-568097-1 -->
      <div id="yandex_rtb_R-A-568097-1"></div>
      <script2 type="text/javascript">
        (function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
        Ya.Context.AdvManager.render({
        blockId: "R-A-568097-1",
        renderTo: "yandex_rtb_R-A-568097-1",
        async: true
        });
        });
        t = d.getElementsByTagName("script")[0];
        s = d.createElement("script");
        s.type = "text/javascript";
        s.src = "//an.yandex.ru/system/context.js";
        s.async = true;
        t.parentNode.insertBefore(s, t);
        })(this, this.document, "yandexContextAsyncCallbacks");
      </script2>
    </div>
    <section class="post">
      <h1 class="post__title" v-html="loadedPost.title"></h1>
      <div class="post__box">
        <article class="post__article">
          <div class="post__hero">
            <div class="post__bg" v-lazy:background-image="loadedPost.image"></div>
          </div>
          <div class="post__content" v-html="loadedPost.text"></div>
          <a :href="sourceLink" target="_blank" class="text-center">Source of origin: {{ sourceName }}</a>
        </article>
        <aside class="aside post__aside">
          <div class="post__ad-1-3 ad--side yad">
            <!-- Yandex.RTB R-A-568097-2 -->
            <div id="yandex_rtb_R-A-568097-2"></div>
            <script2 type="text/javascript">
              (function(w, d, n, s, t) {
              w[n] = w[n] || [];
              w[n].push(function() {
              Ya.Context.AdvManager.render({
              blockId: "R-A-568097-2",
              renderTo: "yandex_rtb_R-A-568097-2",
              async: true
              });
              });
              t = d.getElementsByTagName("script")[0];
              s = d.createElement("script");
              s.type = "text/javascript";
              s.src = "//an.yandex.ru/system/context.js";
              s.async = true;
              t.parentNode.insertBefore(s, t);
              })(this, this.document, "yandexContextAsyncCallbacks");
            </script2>
          </div>
        </aside>
      </div>
    </section>
    <div class="ad--bottom">
      <!-- Yandex.RTB R-A-568097-2 -->
      <div id="yandex_rtb_R-A-568097-2"></div>
      <script2 type="text/javascript">
        (function(w, d, n, s, t) {
          w[n] = w[n] || [];
          w[n].push(function() {
            Ya.Context.AdvManager.render({
              blockId: "R-A-568097-2",
              renderTo: "yandex_rtb_R-A-568097-2",
              async: true
            });
          });
          t = d.getElementsByTagName("script")[0];
          s = d.createElement("script");
          s.type = "text/javascript";
          s.src = "//an.yandex.ru/system/context.js";
          s.async = true;
          t.parentNode.insertBefore(s, t);
        })(this, this.document, "yandexContextAsyncCallbacks");
      </script2>
    </div>
  </div>
</template>

<script>

  export default {
    mounted () {
      this.createText()
      this.addPostAd()
    },
    async asyncData (context) {
      if (context.payload) {
        return {
          loadedPost: context.payload,
        }
      }
      const postId = await context.params.id
      const categories = await context.app.$axios('https://admin.lova.news/categories')
      const loadedPost = await context.app.$axios.$get('https://admin.lova.news/news/view/' + postId)
      const category = context.route.params.category
      const source = await context.app.$axios.$get('https://admin.lova.news/news/1/' + category)
      const sourceName = source.data[0].source.name
      const sourceSite = source.data[0].source.site
      const sourceLink = source.data[0].link
      const sourcePath = sourceSite + sourceLink

      context.store.commit('setCategories', categories.data)
      context.store.commit('setSinglePost', loadedPost)
      context.store.commit('setSourceLink', sourcePath)
      context.store.commit('setSourceName', sourceName)

      return {
        loadedPost: context.store.getters.getSinglePost,
        sourceLink: context.store.getters.getSourceLink,
        sourceName: context.store.getters.getSourceName
      }
    },
    head () {
      return {
        title: this.loadedPost.title,
      }
    },
    methods: {
      createText () {
        const text = this.loadedPost.text.replace(/<div>([\w\W]*?)<\/div>/gi, '<p>$1</p>')
        this.loadedPost.text = text
      },
      addPostAd () {
        const ps = document.querySelectorAll('p')
        const adBox = document.createElement('div')
        adBox.classList.add('ad--post-body')
        const adId = document.createElement('div')
        const ad = document.createElement('script')
        ad.type = 'text/javascript'
        ad.innerHTML = `
          (function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
            Ya.Context.AdvManager.render({
                blockId: "R-A-568097-2",
                renderTo: "yandex_rtb_R-A-568097-2",
                async: true
            });
        });
        t = d.getElementsByTagName("script")[0];
        s = d.createElement("script");
        s.type = "text/javascript";
        s.src = "//an.yandex.ru/system/context.js";
        s.async = true;
        t.parentNode.insertBefore(s, t);
    })(this, this.document, "yandexContextAsyncCallbacks");`

        adId.id = 'yandex_rtb_R-A-568097-2'
        adBox.appendChild(ad)
        ad.parentNode.insertBefore(adId, ad)
        for (const p in ps) {
          if (+p === 4 && ps.length >= 10) {
            this.insertAfter(adBox, ps[p])
          }
        }
      },
      insertAfter (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
      },
    },
    addNextPost () {
      this.$axios.get(this.$store.getters.getNextPost)
        .then(res => {
          this.$store.commit('setPostsByCategory', [...this.$store.getters.getPostsByCategory, ...res.data.data])
          this.$store.commit('setNextCategoryPage', res.data['next_page_url'])
          this.categoryPosts = this.$store.getters.getPostsByCategory
        })
    },
  }
</script>


<style scoped>
</style>
