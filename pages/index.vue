<template>
  <div id="app" class="container">
    <section>

      <b-field label="accesstoken">
        <b-input v-model="accesstoken"></b-input>
      </b-field>
      
      <b-field label="liffID">
        <b-input v-model="liffId"></b-input>
      </b-field>
      
      <b-button type="is-success" @click="getProducs">Success</b-button>

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
      liffId: ''
    }
  },

  components: {
    Card
  },

  methods: {
    getProducs: async function(){
      console.log('click!')
      const config = {
        baseURL: '/',
        url: '/thingsproducts',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accesstoken}`,
        }
      };
      
      try {
        const res = await axios.request(config);
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }
  },

  mounted: async () =>{

  }
}
</script>
