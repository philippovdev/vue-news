<template>
  <div class="yad"></div>
</template>

<script>
  export default {
    name: "Yad",
    mounted () {
      const ad = document.createElement('script')
      const adId = document.createElement('div')
      adId.id = 'yandex_rtb_R-A-568097-1'

      const adBoxes = document.querySelectorAll('.yad')
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

      adBoxes.forEach(box => box.appendChild(ad))
      ad.parentNode.insertBefore(adId, ad)
    }
  }
</script>

<style scoped>

</style>
