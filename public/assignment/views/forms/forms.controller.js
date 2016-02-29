(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.$location = $location;
        $scope.currentForms = [];
        currentForms();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            FormService.createFormForUser($rootScope.user._id, $scope.form, function (newForm) {
                $scope.forms.push(newForm);
                console.log(newForm)
            })
        }

        function updateForm() {

        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.forms[index]._id, function(forms) {
                $scope.currentForms = forms;
            })
        }

        function selectForm(index) {


        }

        function currentForms() {
            console.log($rootScope.user);
            FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
                $scope.currentForms = forms;
                console.log(forms);
            })
        }


    }
})();