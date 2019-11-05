<template>
  <div class="single-post-page">
    <SinglePost :title="loadedPost.title"
                :image="loadedPost.image"
                :text="loadedPost.text"
                :source="sourceLink"
                :sourceName="sourceName"
    />
  </div>
</template>

<script>
  import SinglePost from '@/components/Posts/SinglePost'
  export default {
    mounted () {
      this.scroll();
      this.addPostAd();

      window.addEventListener('scroll', () => {
        this.setFixed();
      })

    },
    async asyncData (context) {
      if (context.payload) {
        return {
          loadedPost: context.payload,
        }
      }
      const postId = await context.params.id
      const categories = await context.app.$axios('https://admin.lova.news/categories')
      const loadedPost = await context.app.$axios.$get('https://admin.lova.news/news/view/' + postId);
      const category = context.route.params.category;
      const source = await context.app.$axios.$get('https://admin.lova.news/news/1/' + category);
      const sourceName = source.data[0].source.name;
      const sourceSite = source.data[0].source.site;
      const sourceLink = source.data[0].link;
      const sourcePath = sourceSite + sourceLink;

      context.store.commit('setCategories', categories.data);
      context.store.commit('setSinglePost', loadedPost);
      context.store.commit('setSourceLink', sourcePath);
      context.store.commit('setSourceName', sourceName);

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
    components: {
      SinglePost
    },
    methods: {
      setFixed() {
        let navHeight = document.querySelector('.the-header').offsetHeight;
        let fixedAd = document.querySelector('.post__ad-1-3.ad--side');
        let adPosition = fixedAd.getBoundingClientRect();
        let adTop = adPosition.top;
        let adLeft = adPosition.left;
        let adWidth = adPosition.width;
        let adHeight = adPosition.height;
        let adBottom = adPosition.bottom;
        let bg = document.querySelector('.post__bg');
        let bgPosition = bg.getBoundingClientRect();
        let bgTop = bgPosition.top - navHeight;
        let postBottom = document.querySelector('.post__content').getBoundingClientRect().bottom;
        let isUnderBottom = postBottom <= adBottom;

        console.log(isUnderBottom);

        if (bgTop <= 25 && !fixedAd.classList.contains('fixed') && !isUnderBottom && fixedAd.style.position !== 'absolute') {
          let getCurrentLeft = adLeft + 'px';
          let getCurrentWidth = adWidth + 'px';
          let getCurrentHeight = adHeight + 'px';
          fixedAd.classList.add('fixed');
          fixedAd.style.top = navHeight + 25 + 'px';
          fixedAd.style.left = getCurrentLeft;
          fixedAd.style.width = getCurrentWidth;
          fixedAd.style.height = getCurrentHeight;
        }

        if (bgTop > 25 && fixedAd.classList.contains('fixed')) {
          fixedAd.classList.remove('fixed');
          fixedAd.style.top = 'initial';
          fixedAd.style.left = 'initial';
          fixedAd.style.bottom = 'initial';
          fixedAd.style.position = 'relative';
          fixedAd.style.width = 'initial';
          fixedAd.style.height = '100%';
        }


        if (isUnderBottom && fixedAd.style.position !== 'absolute') {
          let getCurrentTop = postBottom + window.pageYOffset - adHeight + 'px';
          let getCurrentLeft = adLeft + 'px';
          let getCurrentWidth = adWidth + 'px';
          let getCurrentHeight = adHeight + 'px';
          fixedAd.classList.remove('fixed');
          fixedAd.style.position = 'absolute';
          fixedAd.style.top = getCurrentTop;
          fixedAd.style.left = getCurrentLeft;
          fixedAd.style.width = getCurrentWidth;
          fixedAd.style.height = getCurrentHeight;
        }
      },
      addPostAd () {
        const ps = document.querySelectorAll('p');
        for (const p in ps) {
          const ad = document.createElement('div')
          ad.classList.add('ad--post-body')
          if (+p === 4 && ps.length >= 10) {
            this.insertAfter(ad, ps[p])
          }
        }
      },
      insertAfter (el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)
      },
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + 1) >= document.documentElement.offsetHeight
          if (bottomOfWindow) {
            this.$nuxt.$loading.start()
            this.addNextPost()
            this.$nuxt.$loading.finish()
          }
        }
      },
      addNextPost () {
        this.$axios.get(this.$store.getters.getNextPost)
          .then(res => {
            this.$store.commit('setPostsByCategory', [...this.$store.getters.getPostsByCategory, ...res.data.data])
            this.$store.commit('setNextCategoryPage', res.data['next_page_url'])
            this.categoryPosts = this.$store.getters.getPostsByCategory
          })
      },
    },
  }
</script>


<style scoped>
</style>
