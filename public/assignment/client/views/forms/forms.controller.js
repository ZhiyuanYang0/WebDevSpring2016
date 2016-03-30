(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;

        function addForm(form) {
            form.fields = [];
            FormService
                .createFormForUser($scope.currentUser._id, form)
                .then(init);
        }







    }
})();