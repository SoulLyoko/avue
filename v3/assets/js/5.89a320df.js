(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{512:function(e,t,i){},598:function(e,t,i){"use strict";i(512)},608:function(e,t,i){"use strict";i.r(t);i(101),i(97);var n={name:"AvueMap",props:{size:String,placeholder:String,disabled:{type:Boolean,default:!1},value:{type:Object,default:function(){return{}}}},data:function(){return{address:"",poi:{},marker:null,map:null,box:!1}},watch:{value:{handler:function(e){this.poi=e},deep:!0,immediate:!0},poi:{handler:function(e){this.$emit("input",e)},deep:!0},text:{handler:function(e){this.address=e},deep:!0,immediate:!0},box:{handler:function(){var e=this;this.box&&this.$nextTick((function(){return e.init((function(){e.longitude&&e.latitude&&(e.addMarker(e.longitude,e.latitude),e.getAddress(e.longitude,e.latitude))}))}))},immediate:!0}},computed:{longitude:function(){return this.poi.longitude},latitude:function(){return this.poi.latitude},text:function(){return this.poi.formattedAddress},title:function(){return this.disabled?"查看坐标":"选择坐标"},textTitle:function(){return this.disabled?this.title:void 0===this.poi.name?"选择坐标":"重新选择"}},methods:{addMarker:function(e,t){this.clearMarker(),this.marker=new window.AMap.Marker({position:[e,t]}),this.marker.setMap(this.map)},clearMarker:function(){this.marker&&(this.marker.setMap(null),this.marker=null)},getAddress:function(e,t){var i=this;new window.AMap.service("AMap.Geocoder",(function(){new window.AMap.Geocoder({}).getAddress([e,t],(function(n,a){if("complete"===n&&"OK"===a.info){var o=a.regeocode;i.poi=Object.assign(o,{longitude:e,latitude:t});var r=document.createElement("div"),s=document.createElement("img");s.src="//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",r.appendChild(s);var d=document.createElement("span");d.className="avue-map__marker",d.innerHTML=i.text,r.appendChild(d),i.marker.setContent(r)}}))}))},handleClose:function(){window.poiPicker.clearSearchResults()},addClick:function(){var e=this;this.map.on("click",(function(t){var i=t.lnglat,n=i.P||i.Q,a=i.R;e.addMarker(a,n),e.getAddress(a,n)}))},init:function(e){var t=this;this.map=new window.AMap.Map("map__container",{zoom:13,center:function(){if(t.longitude&&t.latitude)return[t.longitude,t.latitude]}()}),this.initPoip(),this.addClick(),e()},initPoip:function(){var e=this;window.AMapUI.loadUI(["misc/PoiPicker"],(function(t){var i=new t({input:"map__input",placeSearchOptions:{map:e.map,pageSize:10},searchResultsContainer:"map__result"});e.poiPickerReady(i)}))},poiPickerReady:function(e){var t=this;window.poiPicker=e,e.on("poiPicked",(function(i){t.clearMarker();var n=i.source,a=i.item;t.poi=Object.assign(a,{formattedAddress:a.name,longitude:a.location.R,latitude:a.location.P}),"search"!==n&&e.searchByKeyword(a.name)}))}}},a=(i(598),i(37)),o=Object(a.a)(n,(function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"avue-map"},[i("el-input",{attrs:{readonly:"",size:e.size,placeholder:e.placeholder},model:{value:e.text,callback:function(t){e.text=t},expression:"text"}},[i("el-button",{attrs:{slot:"append"},on:{click:function(t){e.box=!0}},slot:"append"},[e._v(e._s(e.textTitle))])],1),e._v(" "),i("el-dialog",{staticClass:"avue-map__dialog",attrs:{width:"80%","append-to-body":"","modal-append-to-body":"",title:e.title,visible:e.box},on:{close:e.handleClose,"update:visible":function(t){e.box=t}}},[e.box?i("div",{staticClass:"avue-map__content"},[i("el-input",{staticClass:"avue-map__content-input",attrs:{id:"map__input",readonly:e.disabled,clearable:"",placeholder:"输入关键字选取地点"},model:{value:e.address,callback:function(t){e.address=t},expression:"address"}}),e._v(" "),i("div",{staticClass:"avue-map__content-box"},[i("div",{staticClass:"avue-map__content-container",attrs:{id:"map__container",tabindex:"0"}}),e._v(" "),i("div",{staticClass:"avue-map__content-result",attrs:{id:"map__result"}})])],1):e._e()])],1)}),[],!1,null,null,null).exports;o.install=function(e){e.component(o.name,o)};var r=o,s=i(0);const d=[r];function l(e){d.map(t=>{e.component(t.name,t)})}window.Vue?l(window.Vue):l(s.default);t.default=l}}]);