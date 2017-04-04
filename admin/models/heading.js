/**
 * Created by longtranvu on 3/15/17.
 */
(function (__clisss) {
  var Heading = (function () {
    return {
      iconComponent : "fa fa-header",
      data:{
        table: "default",
        column: "default"
      },
      type:"heading",
      label:"heading",
      content:"Example Text Here",
      model:"",
      isDB:false,
      properties: {
        heading: "h1",
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
          { name: "margin-top", value: "20px"},
          { name: "margin-bottom", value: "10px"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Heading = Heading;
})(__clisss || (__clisss = {}));