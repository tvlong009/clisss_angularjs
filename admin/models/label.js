/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Label = (function () {
      return {
          iconComponent : "fa fa-tag",
          data:{
            table: "default",
            column: "default"
          },
          type:"label",
          label:"label",
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
              { name: "color", value:"black"},
              { name: 'font-size', value: "15px"},
              { name: 'display', value: "inline-block"},
              { name: "max-width", value: "100%"},
              { name: "margin-bottom", value:"5px"},
              { name: "font-weight", value:"700"}
            ]
          },
          privacy:[]
      };
  }());
  __clisss.Label = Label;
})(__clisss || (__clisss = {}));