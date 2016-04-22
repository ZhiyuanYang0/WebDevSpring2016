(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($http, $scope, $location, $rootScope, FormService, UserService) {
        var currentUser = UserService.getCurrentUser();
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.message = null;
        $scope.forms = [];

        $scope.getForms = getForms;
        if (currentUser != null) {
            getForms(currentUser._id);
        }

        function getForms(userId){
            FormService
                .findAllFormsForUser(userId)
                .then(function(response) {
                    console.log("response.data=");
                    console.log(response.data);
                    $scope.forms = response.data;
                });
        }

        function addForm(form) {
            console.log("I am in addForm controller.")
            if (form) {
                form.fields = [];
                FormService
                    .createFormForUser(currentUser._id, form)
                    .then(function (response) {
                        console.log("response :");
                        console.log(response.data);
                        $scope.forms = response.data;
                    });
            }
        }


        function deleteForm(form) {
            var index = $scope.forms.indexOf(form);
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    $scope.forms.splice(index, 1);
                });
        };

        function selectForm(index) {
            console.log("index=" + index);
            document.getElementById('formTitle').value = $scope.forms[index].title;
            $scope.currentForm = $scope.forms[index];
            $scope.isSelected = true;
        }

        function updateForm() {
            if($scope.currentForm != null) {
                $scope.currentForm.title = $scope.form.title;
                FormService
                    .updateFormById($scope.currentForm._id, $scope.currentForm)
                    .then(function(updatedForm) {

                    });
                $scope.currentForm = null;
            }
            getForms(currentUser._id);
        }
    }
})();