<template>
<div class="header-container">
  <header class="the-header">
    <div class="logo">
      <nuxt-link to="/"><b>LOVA</b> News</nuxt-link>
    </div>
    <div class="spacer"></div>
    <div class="navigation-items">
      <ul class="nav-list">
        <li v-for="link in links" class="nav-item" ><nuxt-link :to="link.to">{{ link.text | firstUppercase }}</nuxt-link></li>
      </ul>
    </div>
    <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
  </header>
</div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle
  },
  computed: {
    links() {
      return this.$store.getters.links
    }
  }
};
</script>


<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 100%;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  box-shadow: 2px 0 5px #7f828b;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: #47494e;
}
.logo img {
  width: 100px;
  display: flex;
  align-self: center
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: flex;
    height: 100%;
    align-items: center;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: #47494e;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-exact-active-link{
  color: #25272c;
}


</style>
