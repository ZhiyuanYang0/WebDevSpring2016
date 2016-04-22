(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $rootScope) {
        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldFormForm: getFieldFormForm,
            deleteFieldForForm: deleteFieldForForm,
            updateField: updateField
        };
        return service;

        function createFieldForForm(formId, field)
        {
            return $http.post('/api/assignment/form/'+formId+'/field', field);
        }

        function getFieldsForForm(formId)
        {
            console.log("I am at getFieldsForForm");
            console.log(formId);
            return $http.get('/api/assignment/form/'+formId+'/field');
        }

        function getFieldFormForm(formId, fieldId)
        {
            return $http.get('/api/assignment/form/'+formId+'/field/' + fieldId);
        }

        function deleteFieldForForm(formId, fieldId)
        {
            return $http.delete('/api/assignment/form/'+formId+'/field/' + fieldId);
        }

        function updateField(formId, fieldId, field)
        {
            return $http.put('/api/assignment/form/'+formId+'/field/' + fieldId, field);
        }
    }
})();