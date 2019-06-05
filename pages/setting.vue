<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "0.アクセストークン設定 <b-icon icon="sd" size="is-large"/>"
    </h2>
    
    <h3 class="subtitle is-6 has-text-grey">
      LINE BOTのチャンネルアクセストークンを指定して下さい。
      (ブラウザのローカルストレージに保存されます。)
    </h3>
    
    <b-field label="Channel Access Token">
      <b-input v-model="accesstoken"></b-input>
    </b-field>

    <b-button type="is-success" @click="save">
      保存
    </b-button>
  </section>
</template>

<script>

export default {
  name: 'HomePage',
  data () {
    return {
      accesstoken: '',
    }
  },

  methods: {
    save: function(){
      localStorage.accesstoken = this.accesstoken;
      this.$toast.open({
        message: 'セットしました。',
        type: 'is-success'
      })
    }
  },

  mounted: function() {
    if (localStorage.accesstoken) {
      this.accesstoken = localStorage.accesstoken;
    }
  }

}
</script>