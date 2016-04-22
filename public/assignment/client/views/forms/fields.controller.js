(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController);

    function fieldsController($scope, $location, $routeParams, FieldService, FormService, UserService) {

        $scope.currentUser = UserService.getCurrentUser();

        //constant variables
        var formId = $routeParams.formId;
        var formTitle = $routeParams.formTitle;
        $scope.title = formTitle;
        $scope.getKey = getKey;

        function init(){
            if (!$scope.currentUser) {
                $location.url("/home");
                return;
            }

            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    $scope.fields = response.data;
                });
            FormService
                .findAllFormsForUser($scope.currentUser._id)
                .then(function(response){
                    for(var u in response.data){
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
            if(fieldType == null){
                return "TEXT";
            }
            for (var k in Map) {
                if (Map[k].key == fieldType){
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
            $scope.efield = field;
            var isOption = !(field.type === 'TEXT' || field.type === 'TEXTAREA' || field.type == 'DATE');

            if (isOption) {
                var optionList = [];
                var ol = field.options;
                for (var o in ol) {
                    optionList.push(ol[o].label + ":" + ol[o].value)
                }
                $scope.efield.optionText = optionList.join("\n");
            }
        }

        $scope.commitEdit = function (field){

            var isOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA' || field.type == 'DATE');

            var optionArray = [];
            if (isOption) {
                var text = field.optionText + '';
                //console.log("Text is:");
                //console.log(text);
                if(text != null){
                    var textArray = text.split("\n");
                    for(var a in textArray){
                        var option = textArray[a].split(":");
                        //console.log("options is");
                        //console.log(option);
                        optionArray.push({
                            label: option[0],
                            value: option[1]
                        });
                    }
                }
                field.options = optionArray;
            }

            FieldService
                .updateField(formId, field._id, field)
                .then(init);
        }


        $scope.deleteField = function(field){
            FieldService
                .deleteFieldForForm(formId, field._id)
                .then(init);
        }

    }
})();