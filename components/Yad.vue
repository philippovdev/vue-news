<template>
  <div class="y-ad ad--top">
    <div id="yandex_rtb_R-A-568097-1"></div>
  </div>
</template>

<script>
    export default {
        name: "Yad",
      mounted () {
        const ad = document.createElement('script')
        ad.type = 'text/javascript'
        ad.innerHTML = `
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
            })(this, this.document, "yandexContextAsyncCallbacks");`
        const adBox = document.getElementById('yandex_rtb_R-A-568097-1')
        adBox.parentNode.insertBefore(ad, adBox)
      }
    }
</script>

<style scoped>

</style>
