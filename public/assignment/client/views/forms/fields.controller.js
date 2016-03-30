/**
 * Created by ceres on 2/17/16.
 */
(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", fieldController);

    function fieldController($scope, $routeParams, FieldService, FormService) {

        //constant variables
        var formId = $routeParams.formId;
        var formTitle = $routeParams.formTitle;
        console.log(formTitle);
        $scope.title = formTitle;
        //find all the fields for form
        console.log('I am in field controller');
        function init(){
            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    $scope.fields = response.data;
                });
            FormService
                .findAllFormsForUser($scope.currentUser._id)
                .then(function(response){
                    for(var u in response.data){
                        console.log(response.data[u]._id);
                    }
                    $scope.forms = response.data;
                })
        }
        init();

        var typeMap =[
            {key: "Single Line Text Field", value: "TEXT"},
            {key: "Multi Line Text Field", value: "TEXTAREA"},
            {key: "Date Field", value: "DATE"},
            {key: "Dropdown Field", value: "OPTIONS"},
            {key: "Checkboxes Field", value: "CHECKBOXES"},
            {key: "Radio Buttons Field", value: "RADIOS"}
        ];

        function getFieldType(fieldType) {
            if(fieldType == null){
                return "DATE";
            }
            for (var k in typeMap) {
                console.log(typeMap[k].key + " " + typeMap[k].value);
                if (typeMap[k].key == fieldType){
                    return typeMap[k].value;
                }
            }
        }

        $scope.addField = function(fieldType){
            console.log('add field for form ' + formId);
            var type = getFieldType(fieldType);
            var field = {"label":"", "type": type, "placeholder": "","options" : null};
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

            var isOption = !(field.type == 'TEXT' || field.type == 'TEXTAREA');

            var optionArray = [];
            if (isOption) {
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

        $scope.cloneField = function(field){
            console.log('clone field ' + field.label);
            field._id =
                FieldService
                    .createFieldForForm(formId, field)
                    .then(init);
        }
        $scope.deleteField = function(field){
            console.log('delete field ' + field._id + ' of form ' + formId);
            FieldService
                .deleteFieldForForm(formId, field._id)
                .then(init);
        }

        $scope.orderField = function(){
            var form = $scope.form.fields;
            FormService
                .updateFormById(formId, form)
                .then(init);
        }

    }
})();