/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Button = (function () {
    return {
      iconComponent : "fa fa-square-o",
      type: "button",
      label: "Button",
      buttonType: "button",
      icon: "lock",
      action: {
          type: "login",
          data: {
            idTableToCheck:"",
            dataToCheck:{}
          },
          todoTrue: {
            type: "alert",
            data: {}
          },
          todoFalse: {
            type: "alert",
            data: {}
          }
      },
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
          { name: "text-align", value:"left"},
          { name: "color", value:"black"},
          { name: 'font-size', value: "16px"},
          { name: "background", value:"gray"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Button = Button;
})(__clisss || (__clisss = {}));
