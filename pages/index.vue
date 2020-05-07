<template>
  <div class="home-page container">
    <div class="ad ad--top yad">
      <!-- Yandex.RTB R-A-568097-1 -->
      <div id="yandex_rtb_R-A-568097-1"></div>
      <script2 type="text/javascript">
        (function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
        Ya.Context.AdvManager.render({
        blockId: "R-A-568097-1",
        renderTo: "yandex_rtb_R-A-568097-1",
        async: true,
        pageNumber: 0
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
    <h1 class="heading--main">Fresh News from Lova Source</h1>
    <PostList :posts="loadedPosts"/>
  </div>
</template>

<script>

  export default {
    computed: {
      loadedPosts () {
        return this.$store.getters.loadedPosts
      },
    },
    methods: {
      insertAfter (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
      },
      clearAds () {
        const allAds = document.querySelectorAll('.ad--feed.ad--feed');
        for (let ad of allAds) {
          ad.remove();
        }
      },
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + 1) >= document.documentElement.offsetHeight
          if (bottomOfWindow) {
            this.$nuxt.$loading.start()
            this.loadNewPosts()
            this.clearAds()
            this.addAds()
            this.$nuxt.$loading.finish()
          }
        }
      },
      loadNewPosts () {
        this.$axios.get(this.$store.getters.nextPage)
          .then(res => {
            this.$store.commit('setPosts', [...this.$store.getters.loadedPosts, ...res.data.data])
            this.$store.commit('setNext', res.data['next_page_url'])
          })
      },
      addAds () {
        const postBlocks = document.querySelectorAll('.post-preview')
        for (const post in postBlocks) {
          const adBox = document.createElement('div')

          adBox.classList.add('ad--feed')
          adBox.insertAdjacentHTML('afterbegin', '<div id="yandex_rtb_R-A-568097-2"></div>')

          const ad = document.createElement('script')
          ad.type = 'text/javascript'
          ad.innerHTML = `
          (function(w, d, n, s, t) {
        w[n] = w[n] || [];
        w[n].push(function() {
            Ya.Context.AdvManager.render({
                blockId: "R-A-568097-2",
                renderTo: "yandex_rtb_${post}",
                async: true,
                pageNumber: ${post}
            });
        });
        t = d.getElementsByTagName("script")[0];
        s = d.createElement("script");
        s.type = "text/javascript";
        s.src = "//an.yandex.ru/system/context.js";
        s.async = true;
        t.parentNode.insertBefore(s, t);
    })(this, this.document, "yandexContextAsyncCallbacks");`

          adBox.appendChild(ad)

          if (+post !== 0 && +post % 3 === 0) {
            this.insertAfter(adBox, postBlocks[post])
          }
        }
      }
    },
    mounted () {
      this.addAds()
      this.scroll()
    },
    asyncData (context) { // Getting data for nav links
      return context.$axios.get('https://admin.lova.news/categories')
        .then((res) => {
          context.store.commit('setCategories', res.data)
        })
    }
  }
</script>


<
style
scoped >
< /style>
