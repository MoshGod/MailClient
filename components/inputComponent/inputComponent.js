// components/inputComponent/inputComponent.js
Component({
  behaviors: ['wx://form-field'], //wx://form-field 代表一个内置 behavior ，它使得这个自定义组件有类似于表单控件的行为。
  /**
   * 组件的属性列表
   */
  properties: {
    title_name: {
      type: String,
    },
    isPassword: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: 'input框的置位字'
    }
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
    getInputValue (e) {
      this.setData({
        value: e.detail.value // behaviors: ['wx://form-field']里面就有设置value属性，所以我们可以直接拿来设置value
      })
    }
  }
})
