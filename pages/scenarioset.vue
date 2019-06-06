<template>
  <section class="section">
    <h1 class="title is-3 has-text-grey">
      "2.シナリオセットの登録をします。
      <b-icon icon="video-input-component" size="is-large"/>"
    </h1>
    
    <section class="hero is-light">
      <div class="hero-body">

      <!--トライアルプロダクトを選択-->
      <b-field label="トライアルロダクトの選択" >
         <b-tooltip :label="(productId==='')?'プロダクトを選択して下さい':`${productId}を選択中`" position="is-right" always>
          <b-select placeholder="Select a character" v-model="productId" rounded>
            <option
                v-for="(product,i) in products"
                :key="i"
                :value="product.id"
                >
                {{`${i+1}: ${product.name}`}}({{product.id}})
              </option>
          </b-select>
        </b-tooltip>
      </b-field>

      <b-field label="Product ID">
        <b-input :placeholder="productId" disabled></b-input>
      </b-field>

      <!--オートクローズ-->
      <div class="columns">
        <!--オートクローズ再接続ON/OFF-->
        <div class="field column is-half">
          <b-field label="自動切断(Auto Close)">
            <b-switch
              v-model="autoClose" size="is-large">ON/OFF</b-switch>
          </b-field>
        </div>
        <!--オートクローズ再接続時間-->
        <div class="field column is-half">
          <b-field label="自動切断後の再接続までの間隔">
            <b-numberinput v-model="suppressionInterval" step="250" :disabled="!autoClose">
            </b-numberinput>
          </b-field>
        </div>
      </div>

      <!--トリガー-->
      <b-field label="トリガー">
        <div class="block">
          <b-radio v-model="triggerType" native-value="IMMEDIATE">
            IMMEDIATE
          </b-radio>
          <b-radio v-model="triggerType" native-value="BLE_NOTIFICATION">
            BLE_NOTIFICATION
          </b-radio>
        </div>
      </b-field>

      <b-field label="Service UUID">
        <b-input :placeholder="serviceUuid" disabled></b-input>
      </b-field>

      <!--アクション-->
      <b-field label="アクション">
        <div class="block">
          <b-checkbox v-model="actionTypes" native-value="SLEEP">SLEEP</b-checkbox>
          <b-checkbox v-model="actionTypes" native-value="GATT_READ">GATT_READ</b-checkbox>
          <b-checkbox v-model="actionTypes" native-value="GATT_WRITE">GATT_WRITE</b-checkbox>
        </div>
      </b-field>

      <!-- <b-field label="トライアルプロダクトの名前">
        <b-input v-model="productId"></b-input>
      </b-field> -->

      <!--作成ボタン-->
      <b-button type="is-success" @click="setScenarioset">シナリオセットの登録/更新</b-button>
      <b-button type="is-info" @click="getScenarioSed">登録済みのシナリオセットの確認</b-button>
  
    </div>
  </section>

    <!--シナリオセット登録結果表示-->
    <section class="hero is-success" v-if="createdScenarioSet.productId">
      <div class="hero-body">
        登録成功
        <div class="container">
          <h2 class="title">プロダクトID: {{productId}}</h2>
          
          <h2 class="subtitle"> Auto Close: 
            {{createdScenarioSet.autoClose}}
            / {{createdScenarioSet.suppressionInterval}}ミリ秒
          </h2>
          <div class="column" v-for="(scenario,i) in createdScenarioSet.scenarios" :key="i">
            <h2 class="subtitle">シナリオID: {{scenario.id}}</h2>
            <h2 class="subtitle"> アクション
              <!-- <b-tag>Tag label</b-tag> -->
              {{scenario.actions}}
            </h2>
            <h2 class="subtitle"> トリガー
              {{scenario.trigger}}
            </h2>
          </div>
        </div>
      </div>
    </section>

    <!--既存のシナリオセット取得結果表示-->
    <section class="hero is-info " aria-close-label="Close notification" v-if="getScenarioSet.productId">
      <div class="hero-body">
        取得成功
        <div class="container">
          <h2 class="title">プロダクトID: {{productId}}</h2>
          <div class="column" v-for="(scenario,i) in getScenarioSet.scenarios" :key="i">
            <h2 class="subtitle">シナリオID: {{scenario.id}}</h2>
            <h2 class="subtitle"> アクション
              <!-- <b-tag>Tag label</b-tag> -->
              {{scenario.actions}}
            </h2>
            <h2 class="subtitle"> トリガー
              {{scenario.trigger}}
            </h2>
          </div>
        </div>
      </div>
    </section>

</section>

</template>

<script>
import Card from '~/components/Card'
import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {
      accesstoken: '',
      baseUrl: 'https://ev2-prod-node-red-fe7bce69-69d.herokuapp.com',
      productId: '',
      serviceUuid: '',
      products: [],
      triggerType: 'BLE_NOTIFICATION',
      actionTypes: [],
      actionsBody: [],
      autoClose: false, //オートクローズ
      suppressionInterval: 0, //オートクローズ後に再接続
      createdScenarioSet: {},
      getScenarioSet: {} //既存のシナリオセット取得
    }
  },

  components: {
    Card
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
    //UUID
    generateUuid: function() {
      let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
      for (let i = 0, len = chars.length; i < len; i++) {
          switch (chars[i]) {
              case "x":
                  chars[i] = Math.floor(Math.random() * 16).toString(16);
                  break;
              case "y":
                  chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                  break;
          }
      }
      return chars.join("");
    },

    //プロダクト一覧
    getProducts: async function(){
      console.log('click!');
      const path = `https://api.line.me/things/v1/trial/products`
      const config = this._createConf(path,'GET');
      try {
        const res = await axios.request(config);
        console.log(res.data);
        this.products = res.data;
      } catch (error) {
        console.log(error)
        this.$toast.open({
            duration: 5000,
            message: `リクエストが失敗しました。 ${error}`,
            position: 'is-bottom',
            type: 'is-danger'
        })
      }
    },

    //シナリオセット作成
    setScenarioset: async function() {
      console.log('click!');
      const path = `https://api.line.me/things/v1/products/${this.productId}/scenario-set`;
      const data = {
        autoClose: this.autoClose,
        suppressionInterval: this.suppressionInterval,
        scenarios: [{
          trigger: {
            type: this.triggerType,
            serviceUuid: this.serviceUuid,
            characteristicUuid: this.generateUuid()
            // characteristicUuid: "62FBD229-6EDD-4D1A-B554-5C4E1BB29169"
          },
          actions: this.actionsBody
        }],
        productId: `${this.productId}`
      };
      const config = this._createConf(path,'PUT',data);
      try {
        const res = await axios.request(config);
        console.log(res.data);
        this.createdScenarioSet = res.data;
        
        this.$toast.open({
          message: 'シナリオセットの登録に成功しました。',
          type: 'is-success'
        });

      } catch (error) {
        console.log(error.message,error.stack);
        this.$toast.open({
            duration: 5000,
            message: `リクエストが失敗しました。 ${error}`,
            position: 'is-bottom',
            type: 'is-danger'
        })
      }
    },

    //シナリオセット取得
    getScenarioSed: async function() {
      console.log('click!');
      const path = `https://api.line.me/things/v1/products/${this.productId}/scenario-set`
      const config = this._createConf(path,'GET');
      try {
        const res = await axios.request(config);
        console.log(res.data);
        this.getScenarioSet = res.data;
      } catch (error) {
        console.log(error)
        this.$toast.open({
            duration: 3000,
            message: `リクエストが失敗しました。シナリオセットがまだ登録されていない可能性があります。 ${error}`,
            position: 'is-bottom',
            type: 'is-danger'
        })
      }
    }

  },

  //アクセストークン
  mounted: function() {
    if (localStorage.accesstoken) {
      this.accesstoken = localStorage.accesstoken;
    }

    this.getProducts();
  },
  watch: {
    accesstoken(newAccesstoken) {
      localStorage.accesstoken = newAccesstoken;
    },

    //productIdの選択が変わるたびに他の値も連動させる
    productId(newProductId){
      this.products.forEach(element => {
        //サービスUUIDを連動
        if(element.id === newProductId) this.serviceUuid = element.serviceUuid;        
      })
    },

    triggerType(newTriggerType){
      if(newTriggerType === 'BLE_NOTIFICATION'){
        this.autoClose = false;
      }
    },

    //オートクローズ設定をウォッチ
    autoClose(newAutoClose){
      if(newAutoClose === false){
        this.suppressionInterval = 0;
      }else if(newAutoClose === true && this.suppressionInterval === 0){
        this.suppressionInterval = 1000;
      }

      //オートクローズ設定とBLE_NOTIFICATIONは両立できないっぽい?
      if(newAutoClose === true && this.triggerType==='BLE_NOTIFICATION'){
        this.triggerType='IMMEDIATE'
      }
      // console.log(newAutoClose);
      // this.autoClose = (newAutoClose === 'true')? true:false;
      console.log(newAutoClose,typeof(newAutoClose))
    },

    //アクションのウォッチャ - actionsのリクエスト作成
    actionTypes(newActionTypes){
      //see https://qiita.com/hktechno/items/12781e38b09e10c20da2
      console.log('--')
      console.log(newActionTypes)
      if(newActionTypes.indexOf('SLEEP')>=0){
        this.actionsBody.push({
          type: "SLEEP",
          sleepMillis: 5000
        });
      }

      if(newActionTypes.indexOf('GATT_READ')>=0){
        this.actionsBody.push({
          type: "GATT_READ",
          serviceUuid: this.generateUuid(),
          characteristicUuid: this.generateUuid()
        })
      }

      if(newActionTypes.indexOf('GATT_WRITE')>=0){
        this.actionsBody.push({
          type: "GATT_WRITE",
          serviceUuid: this.generateUuid(),
          characteristicUuid: this.generateUuid(),
          data: "6AMAAA=="
        })
      }

      //チェック無し
      if(newActionTypes.length <= 0){
        this.actionsBody = [];
      }

      console.log(this.actionsBody)

    }

  }
}
</script>

