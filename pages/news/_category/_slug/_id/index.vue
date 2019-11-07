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
      this.scroll()
      this.addPostAd()

      let fixedAd = document.querySelector('.post__ad-1-3.ad--side')

      let lastScrollTop = 0

      window.addEventListener('scroll', () => {
        this.setFixed()
        let st = window.pageYOffset || document.documentElement.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop) {
          // downscroll code
          fixedAd.classList.remove('up')
        } else {
          // upscroll code
          fixedAd.classList.add('up')
        }
        lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
      }, false)

      window.addEventListener('resize', () => {
        if (window.innerWidth > 844) {
          this.setFixed()
        } else {
          fixedAd.classList.remove('fixed')
          fixedAd.style.top = 'initial'
          fixedAd.style.left = 'initial'
          fixedAd.style.bottom = 'initial'
          fixedAd.style.position = 'initial'
          fixedAd.style.width = 'initial'
          fixedAd.style.height = '100%'
        }
      })
      window.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth > 844) {
          this.setFixed()
        }
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
    components: {
      SinglePost
    },
    methods: {
      setFixed () {

        if (window.innerWidth > 844) {
          let navHeight = document.querySelector('.the-header').offsetHeight
          let fixedAd = document.querySelector('.post__ad-1-3.ad--side')
          let adPosition = fixedAd.getBoundingClientRect()
          let adTop = adPosition.top
          let adLeft = adPosition.left
          let adWidth = adPosition.width
          let adHeight = adPosition.height
          let adBottom = adPosition.bottom
          let bg = document.querySelector('.post__bg')
          let bgPosition = bg.getBoundingClientRect()
          let bgTop = bgPosition.top - navHeight
          let postBottom = document.querySelector('.post__content').getBoundingClientRect().bottom
          let isUnderBottom = postBottom <= adBottom
          let scrollUp = fixedAd.classList.contains('up')
          let isAbsolute = fixedAd.style.position === 'absolute'
          let isRelative = fixedAd.style.position === 'relative'
          let isInitial = fixedAd.style.position === 'initial'
          let isFixed = fixedAd.classList.contains('fixed')

          console.log({
            'isAbsolute': isAbsolute,
            'isFixed': isFixed,
            'isRelative': isRelative,
            'adTop': adTop,
            'position': fixedAd.style.position
          })

          const setFixed = () => {
            let getCurrentLeft = adLeft + 'px'
            let getCurrentWidth = adWidth + 'px'
            let getCurrentHeight = adHeight + 'px'
            fixedAd.style.position = 'fixed'
            fixedAd.classList.add('fixed')
            fixedAd.style.top = navHeight + 25 + 'px'
            fixedAd.style.left = getCurrentLeft
            fixedAd.style.width = getCurrentWidth
            fixedAd.style.height = getCurrentHeight
          }

          const setAbsolute = () => {
            let getCurrentTop = postBottom + window.pageYOffset - adHeight + 'px'
            let getCurrentLeft = adLeft + 'px'
            let getCurrentWidth = adWidth + 'px'
            let getCurrentHeight = adHeight + 'px'
            fixedAd.classList.remove('fixed')
            fixedAd.style.position = 'absolute'
            fixedAd.style.top = getCurrentTop
            fixedAd.style.left = getCurrentLeft
            fixedAd.style.width = getCurrentWidth
            fixedAd.style.height = getCurrentHeight
          }

          const setInitial = () => {
            fixedAd.classList.remove('fixed')
            fixedAd.style.top = 'initial'
            fixedAd.style.left = 'initial'
            fixedAd.style.bottom = 'initial'
            fixedAd.style.position = 'initial'
            fixedAd.style.width = 'initial'
            fixedAd.style.height = '100%'
          }

          if (bgTop >= 25 && isInitial && scrollUp) {
            fixedAd.style.position = 'relative'
          }

          if (bgTop <= 25 && !isFixed && !isUnderBottom && !isAbsolute && !scrollUp) {
            setFixed()
          }

          if (isUnderBottom && !isAbsolute) {
            setAbsolute()
          }

          if (adTop > 85 && scrollUp && isAbsolute) {
            setFixed()
          }
          if (bgTop >= 25 && isFixed && !isUnderBottom && !isAbsolute && scrollUp) {
            setInitial()
          }
        }
      },
      addPostAd () {
        const ps = document.querySelectorAll('p')
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
