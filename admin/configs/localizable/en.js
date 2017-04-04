/**
 * Created by GUMI-QUANG on 6/24/16.
 */
(function () {
  angular
      .module('app')
      .config([
        '$translateProvider',
        function ($translateProvider) {
          $translateProvider
              .translations('en', {
                titles: {
                  data: "data",
                  pages:"pages",
                  components: "components",
                  cssStyle: "CSS Style",
                  flexStyle:"Flex Style",
                  style: "Style",
                  value: "Value",
                  content: "Content",
                  placeHolder: "Place Holder",
                  listType: "List Type (default :ul)",
                  label: "Label",
                  column: "Column",
                  row: "Row",
                  groupName: "Group Name",
                  getFromDB: "Use database",
                  chooseImage: "Choose Image",
                  chooseBgImage: "Choose Background Image",
                  inputType: "Input Type",
                  inputMethod: "Input Method"
                },
                flex: {
                  title: {
                    direction: "Direction",
                    wrap: " Wrap",
                    justifyContent: "Justify Content",
                    alignItem: "Align Item",
                    alignContent: "Align Content",
                    alignSelf: "Align Self"
                  },
                  auto: "auto",
                  baseline: "baseline",
                  stretch: "stretch",
                  row: "row",
                  column: "column",
                  columnReverse: "column reverse",
                  rowReverse: "row reverse",
                  wrap: "wrap",
                  nowrap: "no wrap",
                  wrapReverse: "wrap reverse",
                  start: "start",
                  end: "end",
                  center: "center",
                  spaceBetween: "space between",
                  spaceAround: "space around"
                },
                inputMethod: {
                  get: "get",
                  post: "post"
                },
                inputType: {
                  email: "email",
                  text: "text",
                  number: "number",
                  password: "password",
                  tel: "tel"
                },
                table : {
                  id: "ID",
                  name : "name",
                  type : "type",
                  action : "action",
                  columnName : "column name",
                  columnType : "column type",
                  condition : "condition",
                  require : "require",
                  addNew : "add new table",
                  insTableName: "Instance Table Name"
                },
                configuration: {
                  title: {
                    table: "Tables",
                    dataAlias: "Database Variable",
                    operationName: "Operation Name",
                    stage: "Stage",
                    operationType: "Operation Type",
                    condition: "Condition"
                  }
                },
                localVar: {
                  title: {
                    localVar: "Local Variable",
                    localVarName: "Local Variable Name",
                    localVarType: "Local Variable Type",
                    localVarValue: "Local Variable Value"
                  },
                  type: {
                    string: "string",
                    number: "number",
                    object: "object",
                    array: "array"
                  }
                },
                insTable: {
                  title: {
                    chooseTable: "Choose Table",
                    setInsTableName: "Set instance table name",
                    init: "init",
                    active: "active",
                    get: "get",
                    processing: "processing"
                  }
                },
                buttons:{
                  save: "save",
                  signIn:"sign in",
                  create: "create",
                  createNew: "create new",
                  update: "update",
                  delete: "delete",
                  more: "more",
                  add: "add",
                  addNew: "add new",
                  back: "back",
                  copy: "copy",
                  clear: "clear"
                },
                error: {
                  pattern: 'pattern incorrect',
                  email: 'Please input a valid email.',
                  password: 'your password must be at least 8 characters.',
                  mismatch: 'your confirm password is not match with password.',
                  require: "Please input this field"
                }
              });
        }]);
})();