export const mixMethods = {
  methods: {
    //转化label提取数值
    parseTextArray(obj, arr){
      let listArr = [];
      arr.forEach(item=>{
        listArr.push({
          'key': item.zh,
          'value': obj[item.en]
        })
      })
      return listArr
    },
    parsePicArray(prefix, obj, arr){
      let listArr = [];
      arr.forEach(i => {
        if (obj[i]){
          let subArr = obj[i].split(';')
          subArr.forEach(j => {
            listArr.push(prefix + j + "?sign=" + obj['sign']+ Math.random())
          })
        }
      })
      return listArr
    },
    parseTimeArray(obj){
      if (obj['verifyUserName'] || obj['verifyTime']){
        return [{
          'timelineList': {
            '审核时间': obj['verifyUserName'],
            '审核人员': obj['verifyTime']
          },
          'listKeyData': {},
          'iscomplete': true
        }]
      } else {
        return [];
      }
    },
    covertStatus(arr){
      //1 未查验  2：未通过  3：通过
      if(arr != null) {
        let newArr = arr.filter(i=>{
          if (i.carVerifyStatus == 1) i.carVerifyStatus = '未查验';
          if (i.carVerifyStatus == 2) i.carVerifyStatus = '未通过';
          if (i.carVerifyStatus == 3) i.carVerifyStatus = '通过';
          return i
        })
        return newArr
      }else{
        return []
      }
    }
  }
}