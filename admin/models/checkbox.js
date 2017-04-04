/**
 * Created by longtranvu on 3/16/17.
 */
(function (__clisss) {
  var Checkbox = (function () {
    return {
      iconComponent : "fa fa-check-square-o",
      data:{
        table: "default",
        column: "default"
      },
      type:"checkbox",
      label:"checkbox",
      content:"Example Text Here",
      model:"",
      isDB:false,
      properties: {
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
          { name:"margin-top", value: "10px"},
          { name: "margin-bottom", value: "10px"},
          { name: "color", value:"black"},
          { name: 'font-size', value: "16px"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Checkbox = Checkbox;
})(__clisss || (__clisss = {}));