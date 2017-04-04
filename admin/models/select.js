/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Select = (function () {
    return {
      iconComponent : "fa fa-caret-square-o-down",
      data:{
        table: "default",
        column: "default"
      },
      type:"select",
      label:"Select",
      options: [
          {value: "Options 1"},
          {value: "Options 2"}
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
          { name: "height", value:"34px"},
          { name: "background", value:"#fff"},
          { name: "color", value:"black"},
          { name: 'font-size', value: "15px"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Select = Select;
})(__clisss || (__clisss = {}));