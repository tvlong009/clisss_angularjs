(function (__clisss) {
  var Paragraph = (function () {
      return {
          iconComponent : "fa fa-paragraph",
          data:{
            table: "default",
            column: "default"
          },
          type:"paragraph",
          label:"Paragraph",
          content: "Paragraph Text",
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
              { name: "margin", value:"0 0 10px"},
              { name: "text-align", value:"left"},
              { name: "color", value:"black"},
              { name: 'font-size', value: "16px"}
            ]
          },
          privacy:[]
      };
  }());
  __clisss.Paragraph = Paragraph;
})(__clisss || (__clisss = {}));