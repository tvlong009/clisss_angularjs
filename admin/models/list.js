/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var List = (function () {
    return {
      iconComponent : "fa fa-bars",
      data:{
        table: "default",
        column: "default"
      },
      type:"list",
      label:"List",
      items:[
          { text: "Item 1" },
          { text: "Item 2" },
          { text: "Item 3" }
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
  __clisss.List = List;
})(__clisss || (__clisss = {}));