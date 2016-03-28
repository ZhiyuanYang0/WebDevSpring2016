var forms = require("./form.mock.json");

module.exports = function(app) {

    var api = {
        //general request
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateFormById,
        deleteForm: deleteFormById,

        //specific request
        findFormByTitle: findFormByTitle,

        //helper functions
        createFormForUser: createFormForUser,

        //functions for fields
        findFieldsByFormId: findFieldsByFormId,
        findField: findField,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    }
    return api;

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        forms.push(form);
        return forms;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(id) {
        for (var i in forms) {
            if (forms[i]._id == id) {
                return forms[i];
            }
        }
        return null;
    }

    function updateFormById(id, updateForm) {
        for (var i in forms) {
            if (forms[i]._id == id) {
                forms[i] = updateForm;
                return forms[i];
            }
        }
        return null;
    }

    function deleteFormById(id) {
        for (var i in forms) {
            if (forms[i]._id == id) {
                forms.splice(i, 1);
            }
        }
        return forms;
    }

    function findFormByTitle(title) {
        for (var i in forms) {
            if(forms[i].title == title) {
                return forms[i];
            }
        }
        return null;
    }

    //helper funcitons
    function createFormForUser(userId, form) {
        form._id = "ID_" + (new Date()).getTime();
        form.userId = userId;
        forms.push(form);
        return form;
    }

    //funcitons for fields
    function findFieldsByFormId(formId) {
        var fields = [];
        for (var i in forms) {
            if (forms[i]._id == formId) {
                fields = forms[i].fields;
            }
        }
        return fields;
    }

    function findField(formId, fieldId) {
        for (var i in forms) {
            if (forms[i]._id == formId){
                var fields = forms[i].fields;
                for (var j in fields) {
                    if (fields[j]._id == fieldId) {
                        return fields[j];
                    }
                }
            }
        }
        return null;
    }

    function deleteField(formId, fieldId) {
        for (var i in forms) {
            if (forms[i]._id == formId){
                var fields = forms[i].fields;
                for (var j in fields) {
                    if (fields[j]._id == fieldId) {
                        fields.splice(j, 1);
                    }
                }
                return fields;
            }
        }
        return null;
    }

    function createField(formId, field) {
        field._id = "ID_" + (new Date()).getTime();
        for (var i in forms) {
            if (forms[i]._id == formId) {
                forms[i].fields.push(field);
                return field;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        for (var i in forms) {
            if (forms[i]._id == formId) {
                var fields = forms[i].fields;
                for (var j in fields) {
                    if (fields[j]._id == fieldId) {
                        fields[j] = field;
                        break;
                    }
                }
            }
        }
        return field;
    }
}