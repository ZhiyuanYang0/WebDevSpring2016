(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234}
        ];

        var service = {
            createFormForUser : createFormForUser,
            findAllFormsForUser : findAllFormsForUser,
            deleteFormById : deleteFormById,
            updateFormById : updateFormById
        }
        return service;

        function createFormForUser(userId, form, callback) {
            var newForm = {
                _id : (new Date).getTime(),
                title : form.title,
                userId : userId
            };
            froms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback) {
            var userForms = [];
            console.log(userId);
            for (var i = 0; i < forms.length; i++) {
                console.log(forms[i]._id);
                if (forms[i].userId == userId) {
                    userForms.push(forms[i]);
                }
            }
            callback(userForms);
        }

        function deleteFormById(formId, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms.splice(i, 1);//remove forms[i]
                }
            }
            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            for(var i = 0; i < forms.length; i++) {
                if(forms[i]._id == formId) {
                    forms[i] = {
                        _id: formId,
                        title: newForm.title,
                        userId: newForm.userId
                    };
                    callback(forms[i]);
                }
            }
        }

    }
})();