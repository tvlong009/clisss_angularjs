/**
 * Created by longtranvu on 3/27/17.
 */
(function (__clisss) {
  var Image = (function () {
    return {
      iconComponent : "fa fa-picture-o",
      type:"image",
      label:"Image",
      resource: {
        attributes: {
          image: {
            url: ""
          }
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
          { name: "width", value: "100%"},
          { name: "height", value:"auto"}
        ]
      },
      privacy:[]
    };
  }());
  __clisss.Image = Image;
})(__clisss || (__clisss = {}));