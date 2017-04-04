/**
 * Created by longtranvu on 4/3/17.
 */
(function (__clisss) {
  var Form = (function () {
    return {
      iconComponent : "fa fa-object-group",
      type: "form",
      action: "",
      method: "",
      bgImageSrc: '',
      children: [
        {
          "children":[]
        }
      ],
      model:"",
      properties: {
        classes: [
          { name:"directionColumn", value: true },
          { name:"nowrapFlex", value: true },
          { name:"flexStartContent", value: true},
          { name:"alignItemStretch", value: true },
          { name:"alignContentStretch", value: true},
          { name:"alignSelfAuto", value: true},
          { name:"selected", value: false}
        ],
        flexStyles: [
          { name: "flex-basis", value: "25%"},
          { name: "flex-grow", value: "0"},
          { name: "flex-shrink", value: "1"}
        ],
        styles: [
          { name: "border", value:"1px dotted #ccc"},
          { name: "background-image", value:""}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Form = Form;
})(__clisss || (__clisss = {}));