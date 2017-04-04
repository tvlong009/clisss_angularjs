/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Textarea = (function () {
    return {
      iconComponent : "fa fa-newspaper-o",
      data:{
        table: "default",
        column: "default"
      },
      type:"textarea",
      label:"textarea",
      content:"",
      isDB:false,
      placeHolder:"Please input your text",
      model:"",
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
          { name: "height", value:"64px"},
          { name: "padding", value:"6px 12px"},
          { name: "text-align", value:"left"},
          { name: "color", value:"black"},
          { name: 'font-size', value: "16px"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Textarea = Textarea;
})(__clisss || (__clisss = {}));