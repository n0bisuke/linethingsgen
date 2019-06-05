<template>
  <div id="app" class="container">
    <section>

      <b-field label="accesstoken">
        <b-input v-model="accesstoken"></b-input>
      </b-field>
      
      <b-field label="liffId">
        <b-input v-model="liffId"></b-input>
      </b-field>

      <b-field label="Name">
        <b-input v-model="name"></b-input>
      </b-field>

      <b-field label="ProductId">
        <b-input v-model="productId"></b-input>
      </b-field>

      <b-field label="serviceUuid">
        <b-input v-model="serviceUuid"></b-input>
      </b-field>
      
      <b-button type="is-success" @click="getProducs">確認</b-button>
      <b-button type="is-success" @click="createProducs">作成</b-button>
      <b-button type="is-success" @click="setScenarioset">シナリオセット登録</b-button>

    </section>

</div>
            
</template>

<script>
import Card from '~/components/Card'
import axios from 'axios'

export default {
  name: 'HomePage',
  data () {
    return {
      accesstoken: '',
      liffId: '',
      name: '',
      baseUrl: 'https://ev2-prod-node-red-fe7bce69-69d.herokuapp.com',
      productId: '',
      serviceUuid: ''
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

    //
    getProducs: async function(){
      console.log('click!');
      const path = `https://api.line.me/things/v1/trial/products`
      const config = this._createConf(path,'GET');
      try {
        const res = await axios.request(config);
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    },

    //プロダクト作成
    createProducs: async function(){
      console.log('click!');
      const path = `https://api.line.me/things/v1/trial/products`
      const data = {
        name: this.name,
        liffId: this.liffId
      };
      const config = this._createConf(path,'POST',data);
      try {
        const res = await axios.request(config);
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    },

    //シナリオセット作成
    setScenarioset: async function() {
      console.log('click!');
      const path = `https://api.line.me/things/v1/products/${this.productId}/scenario-set`;
      const data = {
        autoClose: false,
        suppressionInterval: 0,
        scenarios: [{
          trigger: {
            type: "BLE_NOTIFICATION",
            serviceUuid: this.serviceUuid,
            characteristicUuid: "62FBD229-6EDD-4D1A-B554-5C4E1BB29169"
          },
          actions: []
        }],
        productId: `${this.productId}`
      };
      const config = this._createConf(path,'PUT',data);
      try {
        const res = await axios.request(config);
        console.log(res.data);
        console.log(JSON.stringify(res.data));
      } catch (error) {
        console.log(error)
      }
    }

  },

  mounted: async () =>{}
}
</script>
