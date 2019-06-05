<template>

  <section class="section">
    <h1 class="title is-3 has-text-grey">
      "1.トライアルプロダクトを作成します。
      <b-icon icon="pencil" size="is-large"/>"
    </h1>
    
    <section class="hero is-light">
      <div class="hero-body">

      <!--LIFF App選択-->
      <b-field label="LIFFアプリを選択 (※LIFFアプリの作成はMessaging APIの管理画面から行ってください。)" >
         <b-tooltip :label="(liffId === '')?'LIFFアプリを選択してください。': `${liffId}を選択中`" position="is-right" always>
          <b-select placeholder="Select a character" v-model="liffId" rounded>   
            <option
              v-for="liffapp in liffApps.apps"
              :key="liffapp.liffId"
              :value="liffapp.liffId">
              {{liffapp.description}}({{liffapp.liffId}})
              </option>
          </b-select>
        </b-tooltip>
      </b-field>

      <b-field label="LIFF ID">
        <b-input :placeholder="liffId" disabled></b-input>
      </b-field>

      <!--トライアルプロダクト名-->
      <b-field label="トライアルプロダクトの名前">
        <b-input v-model="productName"></b-input>
      </b-field>

      <!--作成ボタン-->
      <b-button type="is-success" @click="createProducs">作成</b-button>
  
    </div>
  </section>

  <!--結果表示-->
  <section class="hero is-success" v-if="createdProduct.id">
    <div class="hero-body">
      作成成功
      <div class="container">
        <h2 class="title">
          トライアルプロダクト名: {{createdProduct.name}}
        </h2>
        <h2 class="subtitle">
          プロダクトID: {{createdProduct.id}}
        </h2>
      </div>
    </div>
  </section>

</section>

</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {
      accesstoken: '',
      liffId: '',
      productName: '',
      baseUrl: 'https://ev2-prod-node-red-fe7bce69-69d.herokuapp.com',
      productId: '',
      liffApps: [],
      createdProduct: {}
    }
  },

  methods: {
    //axiosのconfigを作成
    _createConf: function(path, method, data={}){
      return {
        baseURL: this.baseUrl,
        url: `/?url=${path}`,
        method: method,
        headers: {
          Authorization: `Bearer ${this.accesstoken}`,
        },
        data: data
      };
    },

    //LIFFアプリ一覧
    getLiffApps: async function(){
      console.log('click!');
      const path = `https://api.line.me/liff/v1/apps`
      const config = this._createConf(path,'GET');
      try {
        const res = await axios.request(config);
        console.log(res.data);
        this.liffApps = res.data;
      } catch (error) {
        console.log(error)
      }
    },

    //プロダクト作成
    createProducs: async function(){
      console.log('click!');
      const path = `https://api.line.me/things/v1/trial/products`
      const data = {
        name: this.productName,
        liffId: this.liffId
      };
      const config = this._createConf(path,'POST',data);
      try {
        const res = await axios.request(config);
        console.log(res.data);
        this.createdProduct = res.data
      } catch (error) {
        console.log(error)
      }
    }
  },

  //アクセストークン
  mounted: function() {
    if (localStorage.accesstoken) {
      this.accesstoken = localStorage.accesstoken;
    }

    this.getLiffApps();
  },
  watch: {
    accesstoken(newAccesstoken) {
      localStorage.accesstoken = newAccesstoken;
    }
  }
}
</script>

