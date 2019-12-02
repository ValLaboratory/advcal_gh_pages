var vm = new Vue({
  el: '#app',
  data: {
    APP_KEY: 'val_ews_credential',  // アクセスキー保存用のlocalStorageキー
    ews_access_key: '',             // 駅すぱあとWebサービスのアクセスキー
    store_ews_access_key: false,    // アクセスキーをlocalStorageに保存するかどうかのチェック用
    ews_access_key_errmsg: '\n',
    condition: '',  // APIで取得した探索条件文字列
    conditions: [
      {
        "name":"shinkansen",
        "description":"新幹線",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"利用する"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"shinkansenNozomi",
        "description":"特急料金が加算される一部の新幹線",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"利用する"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"sleeperTrain",
        "description":"寝台列車",
        "value":"never",
        "default":"never",
        "options":[
          {
            "value":"possible",
            "description":"極力利用する"
          },{
            "value":"normal",
            "description":"普通に利用"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"limitedExpress",
        "description":"有料特急",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"利用する"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"highwayBus",
        "description":"高速バス",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"light",
            "description":"気軽に利用"
          },{
            "value":"normal",
            "description":"普通に利用"
          },{
            "value":"bit",
            "description":"極力利用しない"
          }
        ]
      },{
        "name":"connectionBus",
        "description":"連絡バス",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"light",
            "description":"気軽に利用"
          },{
            "value":"normal",
            "description":"普通に利用"
          },{
            "value":"bit",
            "description":"極力利用しない"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"localBus",
        "description":"路線バス",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"利用する"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"midnightBus",
        "description":"深夜急行バス",
        "value":"never",
        "default":"never",
        "options":[
          {
            "value":"normal",
            "description":"利用する"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"ship",
        "description":"船",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"light",
            "description":"気軽に利用"
          },{
            "value":"normal",
            "description":"普通に利用"
          },{
            "value":"bit",
            "description":"極力利用しない"
          }
        ]
      },{
        "name":"liner",
        "description":"ライナー",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"利用する"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"walk",
        "description":"駅間徒歩",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"気にならない"
          },{
            "value":"little",
            "description":"少し気になる"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"useJR",
        "description":"ＪＲ路線",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"light",
            "description":"気軽に利用"
          },{
            "value":"normal",
            "description":"普通に利用"
          },{
            "value":"bit",
            "description":"極力利用しない"
          }
        ]
      },{
        "name":"transfer",
        "description":"乗換え",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"気にならない"
          },{
            "value":"little",
            "description":"少し気になる"
          },{
            "value":"never",
            "description":"利用しない"
          }
        ]
      },{
        "name":"waitAverageTime",
        "description":"出発駅乗車待ち平均時間の利用",
        "value":"true",
        "default":"true",
        "options":[
          {
            "value":"true",
            "description":"平均待ち時間を利用する"
          },{
            "value":"false",
            "description":"待ち時間なし"
          }
        ]
      },{
        "name":"expressStartingStation",
        "description":"特急始発駅",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"possible",
            "description":"なるべく利用"
          },{
            "value":"normal",
            "description":"普通に利用"
          }
        ]
      },{
        "name":"localBusOnly",
        "description":"路線バスのみ探索",
        "value":"false",
        "default":"false",
        "options":[
          {
            "value":"true",
            "description":"する"
          },{
            "value":"false",
            "description":"しない"
          }
        ]
      },{
        "name":"transferTime",
        "description":"乗換え時間",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"「駅すぱあと」の規定値"
          },{
            "value":"moreMargin",
            "description":"規定値より少し余裕をみる"
          },{
            "value":"mostMargin",
            "description":"規定値より余裕をみる"
          },{
            "value":"lessMargin",
            "description":"規定値より短い時間にする"
          }
        ]
      },{
        "name":"fuzzyLine",
        "description":"固定平均路線の名称リストにおける平均路線名あいまい指定",
        "value":"false",
        "default":"false",
        "options":[
          {
            "value":"true",
            "description":"あいまいに行う（部分一致）"
          },{
            "value":"false",
            "description":"厳格に行う（完全一致）"
          }
        ]
      },{
        "name":"entryPathBehavior",
        "description":"経路を加工する際に、経由駅を継承する",
        "value":"false",
        "default":"false",
        "options":[
          {
            "value":"true",
            "description":"する"
          },{
            "value":"false",
            "description":"しない"
          }
        ]
      },{
        "name":"surchargeKind",
        "description":"特急料金種別希望初期値",
        "value":"free",
        "default":"free",
        "options":[
          {
            "value":"free",
            "description":"自由席"
          },{
            "value":"reserved",
            "description":"指定席"
          },{
            "value":"green",
            "description":"グリーン"
          }
        ]
      },{
        "name":"teikiKind",
        "description":"定期券種別初期値",
        "value":"bussiness",
        "default":"bussiness",
        "options":[
          {
            "value":"bussiness",
            "description":"通勤"
          },{
            "value":"university",
            "description":"通学 (大学)"
          },{
            "value":"highSchool",
            "description":"通学 (高校)"
          },{
            "value":"juniorHighSchool",
            "description":"通学 (中学)"
          }
        ]
      },{
        "name":"JRSeasonalRate",
        "description":"ＪＲ季節料金",
        "value":"true",
        "default":"true",
        "options":[
          {
            "value":"true",
            "description":"繁忙期・閑散期の季節料金を考慮する"
          },{
            "value":"false",
            "description":"無視する"
          }
        ]
      },{
        "name":"JRReservation",
        "description":"ＪＲ予約サービス。studentDiscountと同時指定は不可",
        "value":"none",
        "default":"none",
        "options":[
          {
            "value":"none",
            "description":"計算しない"
          },{
            "value":"exYoyaku",
            "description":"ＥＸ予約"
          },{
            "value":"exETokkyu",
            "description":"ＥＸ予約(ｅ特急券)"
          },{
            "value":"exHayatoku",
            "description":"ＥＸ予約(ＥＸ早特)"
          },{
            "value":"exHayatoku21",
            "description":"ＥＸ予約(ＥＸ早特２１)"
          },{
            "value":"exGreenHayatoku",
            "description":"ＥＸ予約(ＥＸグリーン早特)"
          },{
            "value":"smartEx",
            "description":"スマートＥＸ"
          },{
            "value":"smartExHayatoku",
            "description":"スマートＥＸ(ＥＸ早特)"
          },{
            "value":"smartExHayatoku21",
            "description":"スマートＥＸ(ＥＸ早特２１)"
          },{
            "value":"smartExGreenHayatoku",
            "description":"スマートＥＸ(ＥＸグリーン早特)"
          }
        ]
      },{
        "name":"studentDiscount",
        "description":"学割乗車券。JRReservationと同時指定は不可",
        "value":"false",
        "default":"false",
        "options":[
          {
            "value":"true",
            "description":"計算する"
          },{
            "value":"false",
            "description":"計算しない"
          }
        ]
      },{
        "name":"ticketSystemType",
        "description":"乗車券計算のシステム",
        "value":"normal",
        "default":"normal",
        "options":[
          {
            "value":"normal",
            "description":"普通乗車券のみ計算する"
          },{
            "value":"ic",
            "description":"ICカード乗車券も計算する"
          }
        ]
      },{
        "name":"preferredTicketOrder",
        "description":"優先する乗車券の順序。乗車券計算のシステムに\"ic\"を設定した場合のみ有効",
        "value":"none",
        "default":"none",
        "options":[
          {
            "value":"none",
            "description":"指定なし"
          },{
            "value":"normal",
            "description":"普通乗車券を優先する"
          },{
            "value":"ic",
            "description":"ICカード乗車券を優先する"
          },{
            "value":"cheap",
            "description":"安い乗車券を優先する"
          }
        ]
      },{
        "name":"nikukanteiki",
        "description":"二区間定期券の利用",
        "value":"false",
        "default":"false",
        "options":[
          {
            "value":"true",
            "description":"利用する"
          },{
            "value":"false",
            "description":"利用しない"
          }
        ]
      }
    ]
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
    },
    update: function() {
      setTimeout(function() { vm.update2(); }, 100);
    },
    update2: function() {
      var params = '';
      for (var i in this.conditions) {
        // 見やすさのため、デフォルト値と異なる場合のみパラメータとして指定する。
        if (this.conditions[i].default != this.conditions[i].value) {
          params += `&${this.conditions[i].name}=${this.conditions[i].value}`
        }
      }

      let url = `https://api.ekispert.jp/v1/json/toolbox/course/condition?key=${this.ews_access_key}${params}`;
      console.log(url);

      fetch(url)
      .then((response) => { return response.json(); })     
      .then((json) => {
        if (json.ResultSet.Error != undefined) {
          alert(`Error: ${json.ResultSet.Error.Message}`);
          this.condition = '';
        } else {
          this.condition = json.ResultSet.Condition;
        }
      })
      .catch((error) => {
        // エラー処理
      });
    },
    reset: function() {
      for (var i in this.conditions) {
        this.conditions[i].value = this.conditions[i].default;
      }
      this.update();
    }
  }
})
