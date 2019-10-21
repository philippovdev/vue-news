<template>
  <div class="home-page">
    <section class="intro">
      <h1>Fresh news from all over the World!</h1>
    </section>
    <PostList :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
};
</script>


<style scoped>
.intro {
  height: 400px;
  position: relative;
  box-sizing: border-box;
  background-image: url("~/assets/images/lova-home-background.jpg");
  background-position: center;
  background-size: cover;
  filter: sepia(1);
}

.intro h1 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 90%;
  margin: 0 5%;
  color: #fff;
  background-color: rgba(150,155,155,.6);
  padding: 10px 30px;
  border-radius: 8px;
  box-sizing: border-box;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 3rem;
    width: 50%;
    margin: 0 10%;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
