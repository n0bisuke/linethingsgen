(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{172:function(t,e,n){"use strict";n.r(e);var o=n(26),r=(n(19),n(3)),c=(n(105),n(106),n(16),n(104),{props:{title:{type:String,required:!0},icon:{type:String,required:!0}}}),l=n(20),d=Object(l.a)(c,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"column"},[e("div",{staticClass:"card"},[e("header",{staticClass:"card-header"},[e("p",{staticClass:"card-header-title has-text-grey"},[this._v("\n        "+this._s(this.title)+"\n      ")])]),this._v(" "),e("div",{staticClass:"card-content"},[e("div",{staticClass:"content has-text-centered"},[e("b-icon",{attrs:{icon:this.icon,size:"is-large",type:"is-primary"}})],1)]),this._v(" "),e("footer",{staticClass:"card-footer"},[e("div",{staticClass:"card-footer-item"},[e("span",[this._t("default")],2)])])])])},[],!1,null,null,null).exports,v=n(65),h=n.n(v),_={name:"HomePage",data:function(){return{accesstoken:"",baseUrl:"https://ev2-prod-node-red-fe7bce69-69d.herokuapp.com",productId:"",serviceUuid:"",products:[],triggerType:"BLE_NOTIFICATION",actionTypes:[],actionsBody:[],autoClose:!1,suppressionInterval:0,createdScenarioSet:{},getScenarioSet:{}}},components:{Card:d},methods:{_createConf:function(path,t){var data=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return{baseURL:this.baseUrl,url:"/?url=".concat(path),method:t,headers:{Authorization:"Bearer ".concat(this.accesstoken)},data:data}},generateUuid:function(){for(var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split(""),i=0,e=t.length;i<e;i++)switch(t[i]){case"x":t[i]=Math.floor(16*Math.random()).toString(16);break;case"y":t[i]=(Math.floor(4*Math.random())+8).toString(16)}return t.join("")},getProducts:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("click!"),"https://api.line.me/things/v1/trial/products",e=this._createConf("https://api.line.me/things/v1/trial/products","GET"),t.prev=3,t.next=6,h.a.request(e);case 6:n=t.sent,console.log(n.data),this.products=n.data,t.next=15;break;case 11:t.prev=11,t.t0=t.catch(3),console.log(t.t0),this.$toast.open({duration:5e3,message:"リクエストが失敗しました。 ".concat(t.t0),position:"is-bottom",type:"is-danger"});case 15:case"end":return t.stop()}},t,this,[[3,11]])}));return function(){return t.apply(this,arguments)}}(),setScenarioset:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var path,data,e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("click!"),path="https://api.line.me/things/v1/products/".concat(this.productId,"/scenario-set"),data={autoClose:this.autoClose,suppressionInterval:this.suppressionInterval,scenarios:[{trigger:{type:this.triggerType,serviceUuid:this.serviceUuid,characteristicUuid:this.generateUuid()},actions:this.actionsBody}],productId:"".concat(this.productId)},e=this._createConf(path,"PUT",data),t.prev=4,t.next=7,h.a.request(e);case 7:n=t.sent,console.log(n.data),this.createdScenarioSet=n.data,this.$toast.open({message:"シナリオセットの登録に成功しました。",type:"is-success"}),t.next=17;break;case 13:t.prev=13,t.t0=t.catch(4),console.log(t.t0.message,t.t0.stack),this.$toast.open({duration:5e3,message:"リクエストが失敗しました。 ".concat(t.t0),position:"is-bottom",type:"is-danger"});case 17:case"end":return t.stop()}},t,this,[[4,13]])}));return function(){return t.apply(this,arguments)}}(),getScenarioSed:function(){var t=Object(r.a)(regeneratorRuntime.mark(function t(){var path,e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("click!"),path="https://api.line.me/things/v1/products/".concat(this.productId,"/scenario-set"),e=this._createConf(path,"GET"),t.prev=3,t.next=6,h.a.request(e);case 6:n=t.sent,console.log(n.data),this.getScenarioSet=n.data,t.next=15;break;case 11:t.prev=11,t.t0=t.catch(3),console.log(t.t0),this.$toast.open({duration:3e3,message:"リクエストが失敗しました。シナリオセットがまだ登録されていない可能性があります。 ".concat(t.t0),position:"is-bottom",type:"is-danger"});case 15:case"end":return t.stop()}},t,this,[[3,11]])}));return function(){return t.apply(this,arguments)}}()},mounted:function(){localStorage.accesstoken&&(this.accesstoken=localStorage.accesstoken),this.getProducts()},watch:{accesstoken:function(t){localStorage.accesstoken=t},productId:function(t){var e=this;this.products.forEach(function(element){element.id===t&&(e.serviceUuid=element.serviceUuid)})},triggerType:function(t){"BLE_NOTIFICATION"===t&&(this.autoClose=!1)},autoClose:function(t){!1===t?this.suppressionInterval=0:!0===t&&0===this.suppressionInterval&&(this.suppressionInterval=1e3),!0===t&&"BLE_NOTIFICATION"===this.triggerType&&(this.triggerType="IMMEDIATE"),console.log(t,Object(o.a)(t))},actionTypes:function(t){console.log("--"),console.log(t),t.indexOf("SLEEP")>=0&&this.actionsBody.push({type:"SLEEP",sleepMillis:5e3}),t.indexOf("GATT_READ")>=0&&this.actionsBody.push({type:"GATT_READ",serviceUuid:this.generateUuid(),characteristicUuid:this.generateUuid()}),t.indexOf("GATT_WRITE")>=0&&this.actionsBody.push({type:"GATT_WRITE",serviceUuid:this.generateUuid(),characteristicUuid:this.generateUuid(),data:"6AMAAA=="}),t.length<=0&&(this.actionsBody=[]),console.log(this.actionsBody)}}},f=Object(l.a)(_,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"section"},[n("h1",{staticClass:"title is-3 has-text-grey"},[t._v('\n      "2.シナリオセットの登録をします。\n      '),n("b-icon",{attrs:{icon:"video-input-component",size:"is-large"}}),t._v('"\n    ')],1),t._v(" "),n("section",{staticClass:"hero is-light"},[n("div",{staticClass:"hero-body"},[n("b-field",{attrs:{label:"トライアルロダクトの選択"}},[n("b-tooltip",{attrs:{label:""===t.productId?"プロダクトを選択して下さい":t.productId+"を選択中",position:"is-right",always:""}},[n("b-select",{attrs:{placeholder:"Select a character",rounded:""},model:{value:t.productId,callback:function(e){t.productId=e},expression:"productId"}},t._l(t.products,function(e,i){return n("option",{key:i,domProps:{value:e.id}},[t._v("\n                "+t._s(i+1+": "+e.name)+"("+t._s(e.id)+")\n              ")])}),0)],1)],1),t._v(" "),n("b-field",{attrs:{label:"Product ID"}},[n("b-input",{attrs:{placeholder:t.productId,disabled:""}})],1),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"field column is-half"},[n("b-field",{attrs:{label:"自動切断(Auto Close)"}},[n("b-switch",{attrs:{size:"is-large"},model:{value:t.autoClose,callback:function(e){t.autoClose=e},expression:"autoClose"}},[t._v("ON/OFF")])],1)],1),t._v(" "),n("div",{staticClass:"field column is-half"},[n("b-field",{attrs:{label:"自動切断後の再接続までの間隔"}},[n("b-numberinput",{attrs:{step:"250",disabled:!t.autoClose},model:{value:t.suppressionInterval,callback:function(e){t.suppressionInterval=e},expression:"suppressionInterval"}})],1)],1)]),t._v(" "),n("b-field",{attrs:{label:"トリガー"}},[n("div",{staticClass:"block"},[n("b-radio",{attrs:{"native-value":"IMMEDIATE"},model:{value:t.triggerType,callback:function(e){t.triggerType=e},expression:"triggerType"}},[t._v("\n            IMMEDIATE\n          ")]),t._v(" "),n("b-radio",{attrs:{"native-value":"BLE_NOTIFICATION"},model:{value:t.triggerType,callback:function(e){t.triggerType=e},expression:"triggerType"}},[t._v("\n            BLE_NOTIFICATION\n          ")])],1)]),t._v(" "),n("b-field",{attrs:{label:"Service UUID"}},[n("b-input",{attrs:{placeholder:t.serviceUuid,disabled:""}})],1),t._v(" "),n("b-field",{attrs:{label:"アクション"}},[n("div",{staticClass:"block"},[n("b-checkbox",{attrs:{"native-value":"SLEEP"},model:{value:t.actionTypes,callback:function(e){t.actionTypes=e},expression:"actionTypes"}},[t._v("SLEEP")]),t._v(" "),n("b-checkbox",{attrs:{"native-value":"GATT_READ"},model:{value:t.actionTypes,callback:function(e){t.actionTypes=e},expression:"actionTypes"}},[t._v("GATT_READ")]),t._v(" "),n("b-checkbox",{attrs:{"native-value":"GATT_WRITE"},model:{value:t.actionTypes,callback:function(e){t.actionTypes=e},expression:"actionTypes"}},[t._v("GATT_WRITE")])],1)]),t._v(" "),n("b-button",{attrs:{type:"is-success"},on:{click:t.setScenarioset}},[t._v("シナリオセットの登録/更新")]),t._v(" "),n("b-button",{attrs:{type:"is-info"},on:{click:t.getScenarioSed}},[t._v("登録済みのシナリオセットの確認")])],1)]),t._v(" "),t.createdScenarioSet.productId?n("section",{staticClass:"hero is-success"},[n("div",{staticClass:"hero-body"},[t._v("\n        登録成功\n        "),n("div",{staticClass:"container"},[n("h2",{staticClass:"title"},[t._v("プロダクトID: "+t._s(t.productId))]),t._v(" "),n("h2",{staticClass:"subtitle"},[t._v(" Auto Close: \n            "+t._s(t.createdScenarioSet.autoClose)+"\n            / "+t._s(t.createdScenarioSet.suppressionInterval)+"ミリ秒\n          ")]),t._v(" "),t._l(t.createdScenarioSet.scenarios,function(e,i){return n("div",{key:i,staticClass:"column"},[n("h2",{staticClass:"subtitle"},[t._v("シナリオID: "+t._s(e.id))]),t._v(" "),n("h2",{staticClass:"subtitle"},[t._v(" アクション\n              "),t._v("\n              "+t._s(e.actions)+"\n            ")]),t._v(" "),n("h2",{staticClass:"subtitle"},[t._v(" トリガー\n              "+t._s(e.trigger)+"\n            ")])])})],2)])]):t._e(),t._v(" "),t.getScenarioSet.productId?n("section",{staticClass:"hero is-info ",attrs:{"aria-close-label":"Close notification"}},[n("div",{staticClass:"hero-body"},[t._v("\n        取得成功\n        "),n("div",{staticClass:"container"},[n("h2",{staticClass:"title"},[t._v("プロダクトID: "+t._s(t.productId))]),t._v(" "),t._l(t.getScenarioSet.scenarios,function(e,i){return n("div",{key:i,staticClass:"column"},[n("h2",{staticClass:"subtitle"},[t._v("シナリオID: "+t._s(e.id))]),t._v(" "),n("h2",{staticClass:"subtitle"},[t._v(" アクション\n              "),t._v("\n              "+t._s(e.actions)+"\n            ")]),t._v(" "),n("h2",{staticClass:"subtitle"},[t._v(" トリガー\n              "+t._s(e.trigger)+"\n            ")])])})],2)])]):t._e()])},[],!1,null,null,null);e.default=f.exports}}]);