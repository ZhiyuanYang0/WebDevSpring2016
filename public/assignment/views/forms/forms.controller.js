(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $location, $rootScope, FormService) {
        $scope.$location = $location;
        $scope.selectedForm = {};
        $scope.newForm = {};
        $scope.currentForms = [];
        $scope.form = {
            title: null
        }
        currentForms();

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm() {
            FormService.createFormForUser($rootScope.user._id, $scope.form, function (newForm) {
                $scope.currentForms.push(newForm);
            })
        }

        function updateForm() {
            if($scope.selectedForm) {
                $scope.newForm.title = $scope.form.title;
                console.log("id= " + $scope.selectedForm._id)
                FormService.updateFormById($scope.selectedForm._id, $scope.newForm, function (form) {
                    currentForms();
                });
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById($scope.currentForms[index]._id, function(forms) {
                currentForms();
            })
        }

        function selectForm(index) {
            $scope.selectedForm = $scope.currentForms[index];
            $scope.form.title = $scope.selectedForm.title;
        }

        function currentForms() {
            FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
                $scope.currentForms = forms;
                console.log(forms);
            })
        }

    }
})();