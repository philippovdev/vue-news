<template>
  <nuxt-link :to="postLink" class="post-preview">
      <article>
        <div
          class="post-thumbnail"
          :style="{backgroundImage: 'url(' + image + ')'}"></div>
        <div class="post-content">
          <h1 v-html="title"></h1>
          <div v-html="description"></div>
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
  }
</script>


<style scoped>
  .post-preview {
    border: 1px solid #ccc;
    box-shadow: 0 2px 2px #ccc;
    background-color: white;
    width: 90%;
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (min-width: 850px) {
    .post-preview {
      width: 400px;
      margin: 10px;
    }
  }

  .post-thumbnail {
    width: 100%;
    height: 200px;
    background-position: center;
    background-size: cover;
  }

  .post-content {
    padding: 10px;
    text-align: center;
  }

  a:hover .post-content,
  a:active .post-content {
    background-color: #ccc;
  }
</style>
