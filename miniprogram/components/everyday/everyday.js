// components/everyday/everyday.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreviewImage(event){

      wx.previewImage({
        urls:['cloud://cwx-t0m9v.6377-cwx-t0m9v-1302672746/每日一句.png'],
      })
    }
  }
})
