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

        //reminder message
        $scope.error = null;
        $scope.message = null;

        $scope.access = access;
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        $scope.access($rootScope);

        function access($rootScope) {
            if (!$rootScope.user) {
                $location.url("/home");
            } else {
                currentForms();
            }
        }

        function addForm() {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            FormService.createFormForUser($rootScope.user._id, $scope.form, function (newForm) {
                if (newForm) {
                    $scope.message = "Add form successfully";
                    $scope.currentForms.push(newForm);
                } else {
                    $scope.error = "Unable to add form";
                }
            })
        }

        function updateForm() {
            if($scope.selectedForm) {
                // same validation as register
                $scope.error = null;
                $scope.message = null;

                $scope.newForm.title = $scope.form.title;
                console.log("id= " + $scope.selectedForm._id)
                FormService.updateFormById($scope.selectedForm._id, $scope.newForm, function (form) {
                    if (form) {
                        $scope.message = "Form updated successfully";
                        currentForms();
                    } else {
                        $scope.error = "Unable to update form";
                    }
                });
            }
        }

        function deleteForm(index) {
            // same validation as register
            $scope.error = null;
            $scope.message = null;

            FormService.deleteFormById($scope.currentForms[index]._id, function(forms) {
                if (forms) {
                    $scope.message = "Deleted form successfully";
                    currentForms();
                } else {
                    $scope.error = "Unable to delete form";
                }
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