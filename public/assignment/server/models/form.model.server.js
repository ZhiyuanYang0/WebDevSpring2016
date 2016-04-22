var q = require("q");

module.exports = function(db, mongoose) {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var formModel = mongoose.model("formModel", FormSchema);

    var api = {
        //general request
        createForm: createForm,
        findAllForms: findAllForms,
        findFormByFormId: findFormByFormId,
        updateFormById: updateFormById,
        deleteFormByFormId: deleteFormByFormId,

        //specific request
        findFormByUserId: findFormByUserId,
        findFormByTitle: findFormByTitle,

        //helper functions
        //createFormForUser: createFormForUser,
    }
    return api;

    function createForm(userId, form) {
        //console.log("I am at create Form model.");
        var deferred = q.defer();
        formModel.create(form, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                formModel.find({userId: userId}, function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }else {
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        return formModel;
    }

    function findFormByFormId(formId) {
        var deferred = q.defer();
        formModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        formModel.update(
            {_id: formId}, {$set: form},
            function(err, doc) {
                if(err){
                    deferred.reject(err);
                } else{
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function deleteFormByFormId(formId) {
        var deferred = q.defer();
        formModel.remove(
            {_id: formId},
            function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            }
        );
        return deferred.promise;
    }

    function findFormByUserId(userId){
        var deferred = q.defer();
        formModel.find({userId: userId}, function(err, forms){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(forms);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        formModel.find({title: title}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    ////helper funcitons
    //function createFormForUser(userId, form) {
    //    form._id = "ID_" + (new Date()).getTime();
    //    form.userId = userId;
    //    forms.push(form);
    //    return form;
    //}

}