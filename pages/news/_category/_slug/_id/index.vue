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
    components: {
      SinglePost
    },
    methods: {
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
      /*      scroll () {
              window.onscroll = () => {
                let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight + 1) >= document.documentElement.offsetHeight
                if (bottomOfWindow) {
                  this.$nuxt.$loading.start()
                  this.addNextPost()
                  this.$nuxt.$loading.finish()
                }
              }*/
    },
    addNextPost () {
      this.$axios.get(this.$store.getters.getNextPost)
        .then(res => {
          this.$store.commit('setPostsByCategory', [...this.$store.getters.getPostsByCategory, ...res.data.data])
          this.$store.commit('setNextCategoryPage', res.data['next_page_url'])
          this.categoryPosts = this.$store.getters.getPostsByCategory
        })
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
