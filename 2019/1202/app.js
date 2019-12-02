var vm = new Vue({
  el: '#app',
  data: {
    APP_KEY: 'val_ews_credential',  // アクセスキー保存用のlocalStorageキー
    ews_access_key: '',             // 駅すぱあとWebサービスのアクセスキー
    store_ews_access_key: false,    // アクセスキーをlocalStorageに保存するかどうかのチェック用
    ews_access_key_errmsg: '\n',

    mymap: undefined,
    resultApp: null,
    viaLists: [
      { 'lat': 35.70606813177083, 'lng': 139.651624325722,  'marker': null },
      { 'lat': 35.68042009453629, 'lng': 139.7690262983716, 'marker': null },
    ],
  },
  mounted: function() {
    let json_str = localStorage.getItem(this.APP_KEY);
    if (json_str != null) {
      try {
        this.ews_access_key = JSON.parse(json_str).ews.access_key;
        this.store_ews_access_key = true;
      } catch (e) {
        console.log('JSON parse error.');
      }
    }

    this.mymap = L.map('map').setView([35.6800328,139.7692996], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                   '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                   'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(this.mymap);

    this.mymap.on('click', function(e) {
      console.log(e.latlng.lat);
      console.log(e.latlng.lng);

      vm.mymap.removeLayer(vm.viaLists[0].marker);

      vm.viaLists[0].lat = vm.viaLists[1].lat;
      vm.viaLists[0].lng = vm.viaLists[1].lng;
      vm.viaLists[0].marker = vm.viaLists[1].marker;

      vm.viaLists[1].lat = e.latlng.lat;
      vm.viaLists[1].lng = e.latlng.lng;
      vm.viaLists[1].marker = L.marker([vm.viaLists[1].lat, vm.viaLists[1].lng]); 
      vm.viaLists[1].marker.addTo(vm.mymap);

      let searchWord = `viaList=${vm.viaLists[0].lat},${vm.viaLists[0].lng},2000:${vm.viaLists[1].lat},${vm.viaLists[1].lng},2000`;

      vm.resultApp.search(searchWord, vm.resultApp.PRICE_TEIKI,null);
    });

    this.resultApp = new expGuiCourse(document.getElementById("result"));
    this.resultApp.setConfigure("key", this.ews_access_key);

    this.viaLists[0].marker = L.marker([this.viaLists[0].lat, this.viaLists[0].lng]); 
    this.viaLists[1].marker = L.marker([this.viaLists[1].lat, this.viaLists[1].lng]); 
    this.viaLists[0].marker.addTo(this.mymap);
    this.viaLists[1].marker.addTo(this.mymap);

    let searchWord = `viaList=${this.viaLists[0].lat},${this.viaLists[0].lng},2000:${this.viaLists[1].lat},${this.viaLists[1].lng},2000`;
    // 探索を実行
    this.resultApp.search(searchWord,this.resultApp.PRICE_TEIKI,null);
  },
  methods: {
    closeDialog: function() {
      $('#modal1').modal('hide');
    },
    keySetup: function() {  // アクセスキーの設定を行う
      if (this.store_ews_access_key == true) {
          let obj = {
              'ews': {
                  'access_key': this.ews_access_key
              }
          };
          localStorage.setItem(this.APP_KEY, JSON.stringify(obj));
      } else {
          localStorage.removeItem(this.APP_KEY);
      }
      $('#modal1').modal('hide');
    },
    checkAccessKey: function() {
        if (this.ews_access_key == '') {
            this.ews_access_key_errmsg = 'アクセスキーが設定されていません。';
            return false;
        }

        fetch(`https://api.ekispert.jp/v1/json/dataversion?key=${this.ews_access_key}`)
        .then((response) => { return response.json(); })
        .catch((error) => {
            this.ews_access_key_errmsg = 'チェックに失敗しました。アクセスキーが間違っていないか確認してみてください。';
        })
        .then((json) => {
            alert(`チェックOK：${json.ResultSet.engineVersion}版を使用しています。`);
        });
        return true;
    }
  }
})

