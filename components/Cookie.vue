<template>
  <div v-if="isOpen" class="cookie">
          <slot name="message">
            We use cookies to provide our services and for analytics and
            marketing. To find out more about our use of cookies, please see our
            <nuxt-link class="cookie__link" to="/privacy-policy">Privacy Policy</nuxt-link>. Click accept for the best user experience on our app.
          </slot>
        <div class="cookie__buttons">
          <button class="btn btn__cookie btn__cookie--accept" @click="accept">{{ buttonTextAccept }}</button>
          <button class="btn btn__cookie btn__cookie--deny" text @click="deny">{{ buttonTextDeny }}</button>
        </div>
  </div>
</template>

<script>
  export default {
    name: "CookieMessage",
    props: {
      buttonTextAccept: {
        type: String,
        default: "Accept"
      },
      buttonTextDeny: {
        type: String,
        default: "Deny"
      },
      message: {
        type: String,
        default:
          "We use cookies to provide our services and for analytics and marketing. To find out more about our use of cookies, please see our Privacy Policy. By continuing to browse our website, you agree to our use of cookies."
      },
      position: {
        type: String,
        default: "top"
      }
    },
    data() {
      return {
        isOpen: false
      };
    },
    computed: {
      containerPosition() {
        return `cookie--${this.position}`;
      }
    },
    created() {
      if (!this.getGDPR() === true) {
        this.isOpen = true;
      }
    },
    methods: {
      getGDPR() {
        if (process.browser) {
          return localStorage.getItem("GDPR:accepted", true);
        }
      },
      accept() {
        if (process.browser) {
          this.isOpen = false;
          localStorage.setItem("GDPR:accepted", true);
        }
      },
      deny() {
        if (process.browser) {
          this.isOpen = false;
          localStorage.setItem("GDPR:accepted", false);
        }
      }
    }
  };
</script>

<style lang="sass" scoped>
  .cookie
    z-index: 1
    position: fixed
    bottom: 15px
    right: 15px
    border-radius: 6px
    width: 400px
    color: #ffffff
    background-color: #5e5af5
    padding: 15px
    font-size: 14px
    text-align: left
    line-height: 1.4
    @media (max-width: 992px)
      width: unset
      border-radius: 0
      right: 0
      bottom: 0
      left: 0
    &__link
      color: #cccccc
      text-decoration: underline
      transition: all .25s
      &:hover
        text-decoration: none
    &__buttons
      margin-top: 15px
      display: flex
      justify-content: center
      & .btn__cookie
        margin: 0
        &:first-of-type
          margin-right: 20px
        &--accept
          background-color: #ffffff
          color: #443f52
          border: 2px solid #fff
        &--deny
          background-color: transparent
          color: #ffffff
          border: 2px solid #ffffff
</style>
