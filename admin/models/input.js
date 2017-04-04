/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Input = (function () {
    return {
      iconComponent : "fa fa-pencil-square-o",
      data:{
        table: "default",
        column: "default"
      },
      type:"input",
      label:"input",
      content:"",
      inputMethod: "post",
      placeHolder:"Please input your text",
      inputType: 'text',
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
          { name: "padding", value:"6px 12px"},
          { name: "height", value: "34px"},
          { name: "text-align", value:"left"},
          { name: "color", value:"black"},
          { name: 'font-size', value: "16px"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Input = Input;
})(__clisss || (__clisss = {}));