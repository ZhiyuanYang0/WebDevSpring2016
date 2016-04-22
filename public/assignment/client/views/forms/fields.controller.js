(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($scope, $routeParams, FieldService, FormService) {

        //constant variables
        var formId = $routeParams.formId;
        var formTitle = $routeParams.formTitle;
        $scope.title = formTitle;
        $scope.getKey = getKey;

        function init(){
            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    console.log(response.data);
                    $scope.fields = response.data;
                });
            FormService
                .findAllFormsForUser($scope.currentUser._id)
                .then(function(response){
                    for(var u in response.data){
                       // console.log(response.data[u]._id);
                    }
                    $scope.forms = response.data;
                })
        }
        init();

        var Map =[
            {key: "Single Line Text Field", value: "TEXT"},
            {key: "Multi Line Text Field", value: "TEXTAREA"},
            {key: "Date Field", value: "DATE"},
            {key: "Dropdown Field", value: "OPTIONS"},
            {key: "Checkboxes Field", value: "CHECKBOXES"},
            {key: "Radio Buttons Field", value: "RADIOS"}
        ];

        function getFieldType(fieldType) {
            console.log("I am at getFieldType.");
            if(fieldType == null){
                return "TEXT";
            }
            console.log(fieldType);
            for (var k in Map) {
                if (Map[k].key == fieldType){
                    console.log("The type is:");
                    console.log(Map[k].value);
                    return Map[k].value;
                }
            }
        }

        function getKey(value) {
            if (value == "TEXT") {
                return "Single Line Field";
            } else if (value == "TEXTAREA") {
                return "Multi Line Field";
            }

            for (var i in Map) {
                if (Map[i].value == value) {
                    return Map[i].key;
                }
            }
        }

        $scope.addField = function(fieldType){
            console.log('I am at addField controller' + formId);
            //initialize the new field
            var type = getFieldType(fieldType);
            var label = null;
            var options = null;
            var field = null;
            if (type == "TEXT" || type == "TEXTAREA") {
                label = "New Text Field";
                field = {"label": label, "type": type, "placeholder": "New Field"};
            } else if (type == "DATE") {
                label = "New Date Field";
                field = {"label": label, "type": type};
            } else if (type == "OPTIONS") {
                label = "New Dropdown";
                options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
                field = {"label": label, "type": type, "options": options};
            } else if (type == "CHECKBOXES") {
                label = "New Checkboxes";
                options = [ {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
                field = {"label": label, "type": type, "options": options};
            } else if (type == "RADIOS") {
                label = "New Radio Buttons";
                options = [ {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
                field = {"label": label, "type": type, "options": options};
            }
            FieldService
                .createFieldForForm(formId, field)
                .then(init);
        }

        $scope.editField=function(field){
            console.log(field.type + ' '+field.label);
            $scope.efield = field;
            var isOption = !(field.type === 'TEXT' || field.type === 'TEXTAREA' || field.type == 'DATE');

            if (isOption) {
                var optionList = [];
                var ol = field.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                console.log(optionList);
                $scope.efield.optionText = optionList.join("\n");
                console.log(field.optionText);
            }
        }

        $scope.commitEdit = function (field){

            var hasOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

            var optionArray = [];
            if (hasOption) {
                console.log(field.optionText);
                var text = field.optionText;
                for (var o in text) {
                    console.log(o);
                    var a = text[o].split(":");
                    optionArray.push({
                        label: a[0],
                        value: a[1]
                    });
                }
                field.options = optionArray;
            }
            console.log(field._id);
            FieldService
                .updateField(formId, field._id, field)
                .then(init);
        }

        $scope.deleteField = function(field){
            console.log('delete field ' + field._id + ' of form ' + formId);
            FieldService
                .deleteFieldForForm(formId, field._id)
                .then(init);
        }

    }
})();