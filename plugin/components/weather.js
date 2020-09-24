import util from '../index.js';
Component({
  properties: {
    localtion: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath) {
        this.setData({ ...newVal });
      }
    }
  },
  lifetimes: {
    ready: function() {
      this.getLocation();
    },
  },
  data: {
    city: '',
    county: '',
    province: '',
    latitude: '',
    longitude: '',
    mapPageUrl: '',
    weather: {
    }
  },
  methods: {
    // 通过坐标设置城市以及 城市code,
    setAddreByLoca({latitude, longitude}) {
      util.getAddreByLocal({latitude, longitude}).then(res => {
          const city = res.ad_info.city;
          const province = res.ad_info.province;
          const county = res.ad_info.district;
          this.setData({
            province,
            city,
            county,
          })
          this.setWeather(res.ad_info.adcode);
      })
    },
    // 定位获取位置坐标
    getLocation:function(){
      var that = this;
      // wx.getLocation({
      //   isHighAccuracy: true,
      //   success: function(res) {
      //     let latitude = that.data.latitude || res.latitude || 31.35246;
      //     let longitude = that.data.longitude || res.longitude || 118.43313;
      //     that.setAddreByLoca({
      //       latitude: latitude,
      //       longitude: longitude,
      //     });
      //   },
      //   fail() {
      //     that.setAddreByLoca({
      //       latitude: this.latitude,
      //       longitude: this.longitude,
      //     });
      //   }
      // })
    },
    // 点击打开内置地图，选择位置
    goMapPage() {
      const that = this;
      wx.chooseLocation({
        latitude: this.data.latitude, 
        longitude: this.data.longitude, 
        success: function(res) {
          that.setAddreByLoca({
            latitude: res.latitude,
            longitude: res.longitude
          });
        }});
    },
    // 通过城市code 设置天气
    setWeather(cityCode) {
      util.getWeather({cityCode, type: 'base'}).then(weather => {
        this.setData({
          weather
        });
      })
    }
  }
})
