<template>
  <nuxt-link :to="postLink" class="post-preview">
      <article>
        <div
          class="post-preview__thumbnail"
          :style="{backgroundImage: 'url(' + image + ')'}">
          <span class="post__category-box">{{ category }}</span>
          <span class="post__category-overlay"></span>
        </div>
        <div class="post-preview__content">
          <h2 class="post-preview__title" v-html="limitText(title, 44)"></h2>
          <div class="post-preview__description" v-html="limitText(description, 110)"></div>
        </div>
      </article>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'PostPreview',
    props: {
      id: {
        type: Number,
        required: true
      },
      // isAdmin: {
      //   type: Boolean,
      //   required: true
      // },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      }
    },
    computed: {
      postLink () {
        return /* this.isAdmin ? '/admin/' + this.id :*/ `/news/${this.category.toLowerCase()}/${this.slug}/${this.id}`
      },
    },
    methods: {
      limitText (text, limit = 25) {
        const newText = [];
        if (text.length > limit) {
          text.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
              newText.push(cur);
            }
            return acc += cur.length
          }, 0);
          return `${newText.join(' ')} ...`;
        }
        return text;
      }
    }
  }
</script>


<style scoped>

</style>
