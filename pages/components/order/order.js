// pages/components/order/order.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    reportArray:{
      type: Array,
      value: [],
      observer:'totail'
    },
    reportAllN:{
      type: String,
      value:'',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tradeQtyAll:'',
    noExpQtyAll:'',
    scanQtyAll:'',
    sendedQtyAll:''
  },

  attached(){
  },
  /**
   * 组件的方法列表
   */
  methods: {
    totail(val){
      let tradeQtyA=0;
      let noExpQtyA = 0;
      let scanQtyA = 0;
      let sendedQtyA = 0;
      val.forEach(function(item){
        tradeQtyA += item.tradeQty;
        noExpQtyA += item.noExpQty;
        scanQtyA += item.scanQty;
        sendedQtyA += item.sendedQty
      })
      this.setData({
        tradeQtyAll: tradeQtyA,
        noExpQtyAll: noExpQtyA,
        scanQtyAll: scanQtyA,
        sendedQtyAll: sendedQtyA
      })
    }
  }
})
