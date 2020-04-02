/* eslint-disable */
require("script-loader!file-saver");
require("script-loader!@/vendor/Blob");
require("script-loader!xlsx-style/dist/xlsx.core.min");
require("script-loader!xlsx-style/dist/xlsx.full.min");
export function exportJsonToExcelSheets(sheets, sheetNames) {
  let reserve = { topN: 3, bottomN: 3 };
  let wb = { SheetNames: sheetNames, Sheets: {}, Props: {} };
  sheetNames.forEach(sheetName =>
    export_json_to_excel(
      wb,
      sheets[sheetName].ExcTitle,
      sheets[sheetName].ExcData,
      sheets[sheetName].ExcHeader,
      sheets[sheetName].ExcFilterVal,
      sheets[sheetName].ExcColWid,
      sheets[sheetName].ExcSheetName,
      sheets[sheetName].ExcTimerange,
      sheets[sheetName].ExcSumLetter,
      reserve
    )
  );
  let wopts = { bookType: "xlsx", bookSST: false, type: "binary" };
  saveAs(
    new Blob([s2ab(XLSX.write(wb, wopts))], {
      type: "application/octet-stream"
    }),
    "绿免车辆统计报表.xlsx"
  );
}

function export_json_to_excel(
  wb,
  title,
  data,
  thead,
  filterVal,
  WidthArr,
  sheetName,
  Timerange,
  SumLetter,
  reserve
) {
  let topDataN = reserve.topN;
  let bottomDataN = reserve.bottomN;
  let borderBTStyle = {
    top: { style: "thin", color: "black" },
    bottom: { style: "thin", color: "black" },
    left: { style: "thin", color: "black" },
    right: { style: "thin", color: "black" }
  };
  let defaultFont = { fontsize: 14, fontfamily: "SimSun", fontcolor: "333333" };
  wb.Props = { Title: title };
  let _data = data.concat();
  for (let i = 0; i < topDataN; i++) {
    _data.unshift(Object.assign({}, thead));
  }
  for (let j = 0; j < bottomDataN; j++) {
    _data.push(Object.assign({}, thead));
  }
  let keyMap = filterVal;
  let tmpdata = [];
  _data
    .map((v, i) =>
      keyMap.map((k, j) =>
        Object.assign(
          {},
          {
            v: !v[k] ? "" : v[k],
            position:
              (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
          }
        )
      )
    )
    .reduce((prev, next) => prev.concat(next))
    .forEach(
      (v, i) =>
        (tmpdata[v.position] = {
          v: v.v,
          s: {
            font: {
              name: defaultFont.fontfamily,
              sz: defaultFont.fontsize,
              bold: false,
              color: { rgb: defaultFont.fontcolor }
            },
            alignment: { horizontal: "center" },
            border: borderBTStyle
          }
        })
    );
  tmpdata["A1"] = {};
  tmpdata["A1"].v = title;
  tmpdata["A1"].s = {
    font: {
      name: defaultFont.fontfamily,
      sz: 20,
      bold: true,
      color: { rgb: defaultFont.fontcolor }
    },
    alignment: { horizontal: "center" }
  };
  tmpdata["A2"] = {};
  tmpdata["A2"].v =
    "统计时间：" + Timerange.begin + " -- " + Timerange.end + "  ";
  tmpdata["A2"].s = {
    font: {
      name: defaultFont.fontfamily,
      sz: 12,
      bold: true,
      color: { rgb: "707070" }
    },
    alignment: { horizontal: "right" }
  };
  tmpdata["C" + (_data.length - (bottomDataN - 1))] = {};
  let _sum = 0;
  for (let i = topDataN, l = _data.length - bottomDataN; i < l; i++) {
    let _sheet = SumLetter + (i + 1);
    if (tmpdata[_sheet].v) _sum += parseFloat(tmpdata[_sheet].v);
  }
  tmpdata["C" + (_data.length - (bottomDataN - 1))].v = _sum;
  tmpdata["C" + (_data.length - (bottomDataN - 1))].s = {
    font: {
      name: defaultFont.fontfamily,
      sz: 15,
      bold: true,
      color: { rgb: defaultFont.fontcolor }
    },
    alignment: { horizontal: "center" },
    border: borderBTStyle
  };
  tmpdata["A" + (_data.length - (bottomDataN - 1))] = {};
  tmpdata["A" + (_data.length - (bottomDataN - 1))].v = "优惠金额合计";
  tmpdata["A" + (_data.length - (bottomDataN - 1))].s = {
    font: {
      name: defaultFont.fontfamily,
      sz: defaultFont.fontsize,
      bold: true,
      color: { rgb: defaultFont.fontcolor }
    },
    alignment: { horizontal: "center" },
    border: borderBTStyle
  };
  tmpdata["A" + (_data.length - (bottomDataN - 2))] = {};
  tmpdata["A" + (_data.length - (bottomDataN - 2))].v = "";
  tmpdata["A" + (_data.length - (bottomDataN - 2))].s = {
    font: {
      name: defaultFont.fontfamily,
      sz: defaultFont.fontsize,
      bold: true,
      color: { rgb: defaultFont.fontcolor }
    },
    alignment: { horizontal: "right" }
  };
  tmpdata["A" + _data.length] = {};
  tmpdata["A" + _data.length].v = "值班站长：                          ";
  tmpdata["A" + _data.length].s = {
    font: {
      name: defaultFont.fontfamily,
      sz: defaultFont.fontsize,
      bold: true,
      color: { rgb: defaultFont.fontcolor }
    },
    alignment: { horizontal: "right" }
  };
  for (let i = 0, l = keyMap.length; i < l; i++) {
    var _code = String.fromCodePoint(i + 1 + 64);
    tmpdata[_code + topDataN].s.font.bold = true;
    delete tmpdata[_code + 1].s.border;
    delete tmpdata[_code + 2].s.border;
    delete tmpdata[_code + (_data.length - 1)].s.border;
    delete tmpdata[_code + _data.length].s.border;
  }
  // for (let i = topDataN + 1, l = _data.length - bottomDataN + 1; i < l; i++) {
  //     // tmpdata['A' + i].s.font.bold = true;
  //     tmpdata['E' + i].t = 'n';
  //     tmpdata['G' + i].t = 'n';
  // }
  let outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10

  tmpdata["!merges"] = [];
  tmpdata["!merges"] = [
    {
      s: { c: 0, r: 0 },
      e: { c: keyMap.length - 1, r: 0 }
    },
    {
      s: { c: 0, r: 1 },
      e: { c: keyMap.length - 1, r: 1 }
    },
    {
      s: { c: 0, r: _data.length - bottomDataN },
      e: { c: 1, r: _data.length - bottomDataN }
    },
    {
      s: { c: 2, r: _data.length - bottomDataN },
      e: { c: keyMap.length - 1, r: _data.length - bottomDataN }
    },
    {
      s: { c: 0, r: _data.length - (bottomDataN - 1) },
      e: { c: keyMap.length - 1, r: _data.length - (bottomDataN - 1) }
    },
    {
      s: { c: 0, r: _data.length - (bottomDataN - 2) },
      e: { c: keyMap.length - 1, r: _data.length - (bottomDataN - 2) }
    }
  ];

  var sheetJson = Object.assign({}, tmpdata, {
    "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1]
  });
  wb.Sheets[sheetName] = sheetJson;
  wb.Sheets[sheetName]["!cols"] = [];
  let sheetWidthArr = WidthArr;
  for (let k = 0, kl = keyMap.length; k < kl; k++) {
    wb.Sheets[sheetName]["!cols"].push({
      wpx: sheetWidthArr[k]
    });
  }
  wb.header = ["A"];
}

function s2ab(s) {
  if (typeof ArrayBuffer !== "undefined") {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    var buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
}
