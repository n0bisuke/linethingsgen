<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">"LINE Things Scenario-Set Generator  <b-icon
      icon="rocket"
      size="is-large"
    />"</h2>

    <h3 class="subtitle is-6 has-text-grey">GitHub: <a href="https://github.com/n0bisuke/linethingsgen" target="_blank">n0bisuke/linethingsgen</a></h3>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">About</h2>
          <p>LINE Thingsの自動通信機能を作る際のシナリオセット周りの作成をWebからできます。</p>
          <p>LIFFアプリを作成したあとの、プロダクト作成とシナリオセットの登録が出来ます。</p>
          <p>ハンズオンなどでご活用ください。</p>
          <br/>

          <h2 class="subtitle">なぜ作ったか</h2>
          <p>
          LINE Thingsのプロダクト登録、シナリオセットの作成などがAPI経由で操作するため、ハンズオンなどでは少し手こずるポイントになっています。
          過去にやったハンズオンでもcurlやpostmanの使い方でハマるなど本質じゃないところで時間を取られがちでした。
          curlなどを使えててもIDのコピペなどが結構面倒だったりしたので、今回作ってみました。
          公式が対応してくれたら特に意味なくなるツールですが、個人的にNuxt.jsやenebularの勉強/復習モチベが強いです。
          </p>
          <br/>

          <h2 class="subtitle">使った技術など</h2>
          <p>裏側ではenebularを使ってプロキシサーバーを立てています。</p>
          <p>Nuxt.js+Buefyでサクッと作りました。</p>
          <p>あとはGitHub Pagesでホスティングしてます。</p>
        </div>
      </div>
    </section>

    <p>動かなかったら教えて下さい。->
      <a href="https://twitter.com/n0bisuke" target="_blank">@n0bisuke</a>
    </p>
  </section>
</template>
