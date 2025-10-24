<template>
  <div>
    <div>
      <DefaultMenu/>
      <div class="app-container">
        <div class="layout">
          <div class="main-content">
            <slot/>
          </div>
          <div class="page-section">
            <Search/>
            <GoogleAd/>
          </div>
        </div>
      </div>
      <ClientOnly>
        <el-backtop :bottom="100"/>
      </ClientOnly>
    </div>
    <Footer/>
  </div>
</template>
<script lang="ts" setup>
import Search from '~~/components/section/Search.vue';
import GoogleAd from '~/components/section/GoogleAd.vue';

useHead({
  script: [
    {
      async: true,
      src: '/sence.js',
      crossorigin: 'anonymous',
    },
    {
      async: true,
      src: "https://fundingchoicesmessages.google.com/i/pub-3208634444966567?ers=1",
      nonce: "vcvsX_7R-_sJtK2gpysclg",
    },
    {
    nonce: "vcvsX_7R-_sJtK2gpysclg",
    children: `(function () {
      function signalGooglefcPresent() {
        if (!window.frames['googlefcPresent']) {
          if (document.body) {
            const iframe = document.createElement('iframe');
            iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
            iframe.style.display = 'none';
            iframe.name = 'googlefcPresent';
            document.body.appendChild(iframe);
          } else {
            setTimeout(signalGooglefcPresent, 0);
          }
        }
      }

      signalGooglefcPresent();
    })();` }]
});
</script>

<style lang="less" scoped>
.layout {
  margin: auto;
  padding-bottom: 20px;
  width: 70%;
  display: flex;

  .main-content {
    width: 0;
    flex: 1;
  }

  .page-section {
    width: 300px;
    padding: 20px;
  }
}

@media (max-aspect-ratio: 14/9) {
  .layout {
    width: 96vw;
    font-size: 12px;
  }
}

@media (max-aspect-ratio: 10/9) {
  .layout {
    flex-direction: column;

    > .main-content {
      width: auto;
    }

    > .page-section {
      width: auto;
    }
  }
}
</style>
