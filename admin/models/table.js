/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Table = (function () {
    return {
      iconComponent : "fa fa-table",
      type:"table",
      label:"Table",
      dbTable: null,
      dbColumns: [
        { name: "Column DB 1", onFocus: false, operation: null},
        { name: "Column DB 2", onFocus: false, operation: null}
      ],
      columnNo: 2,
      rowNo: 2,
      columns: [
        { name: "Column Name 1"},
        { name: "Column Name 2"}
      ],
      rows: [
          {
            data: [
                { value: "Value column 1"},
                { value: "Value column 2"}
            ]
          },
          {
            data: [
                { value: "Value column 1"},
                { value: "Value column 2"}
            ]
          }
      ],
      model:"",
      isDB:false,
      properties: {
        listType:'ul',
        classes: [
          { name:"alignSelfAuto", value: true},
          { name:"selected", value: false}
        ],
        flexStyles: [
          { name: "flex-basis", value: "25%"},
          { name: "flex-grow", value: "0"},
          { name: "flex-shrink", value: "1"}
        ],
        styles: [
          { name: "margin-bottom", value:"5px"},
          { name: "text-align", value:"left"},
          { name: "color", value:"black"},
          { name: 'font-size', value: "16px"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Table = Table;
})(__clisss || (__clisss = {}));