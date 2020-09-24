var plugin = requirePlugin("son-of-weather");
Page({
  data: {
    items: [],
    currentItem: 0,
    localtion: {
      latitude: 39.935297,
      longitude: 116.418642
    }
  },
  onLoad: function () {
    plugin.sayHello();
    var world = plugin.answer;
    plugin.getAddreByLocal(this.data.localtion).then(res => {
      console.log('小程序中', res);
    })
  },
  addItem: function () {
    this.data.items.push(this.data.currentItem++);
    this.setData({
      items: this.data.items,
      currentItem: this.data.currentItem
    });
  }
});