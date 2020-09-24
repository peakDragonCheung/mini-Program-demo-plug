module.exports = {
  sayHello: function () {
    console.log('Hello plugin!')
  },
  answer: 42,
  // 通过城市code 获取天气
  getWeather({cityCode, type = 'base'}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=51adc643168e769fe36846ab5f9a1bbf&extensions=${type}`,
        header: {
          'Content-Type': 'application/json;charset=UTF-8'
          },
        success:res => {
          resolve(res.data.lives[0]);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },
  // 通过坐标获取地址和城市code
  getAddreByLocal({latitude, longitude}) {
    return new Promise((reslove, reject) => {
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=TNEBZ-UGACP-F3ZDT-LQDAJ-MQ44H-D5FYQ&get_poi=1`,
          success:res => {
            reslove(res.data.result);
          },
          fail: res => {
            reject(res)
          }
        })
    })
    
  }
}