var q = require("q");

module.exports = function(db, mongoose) {
    var FormSchema = require('./form.schema.server.js')(mongoose);
    var fieldModel = mongoose.model("fieldModel", FormSchema);
    var formModel = mongoose.model("formModel2", FormSchema);

    var api = {
        getFieldsByFormId: getFieldsByFormId,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function getFieldsByFormId(formId){
        var deferred = q.defer();
        fieldModel.find({_id: formId},{"fields": 1}, function(err, doc){
            if(err){
                deferred.reject(err);
            }else{
                //console.log(doc[0].fields);
                deferred.resolve(doc[0].fields);
            }
        });
        return deferred.promise;
    }

    function deleteField(formId, fieldId){
        var deferred = q.defer();
        formModel.findOne({_id: formId},
            function(err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    for (var i = 0; i < doc.fields.length; i++) {
                        if (doc.fields[i]._id == fieldId) {
                            doc.fields.splice(i, 1);
                        }
                    }
                    doc.save();
                    deferred.resolve(doc.fields);
                }
            }
        );

        return deferred.promise;
    }

    function createField(formid, field){
        console.log("I am at createField model.");
        console.log(formid);
        console.log(field);
        var deferred = q.defer();
        formModel.update(
            {_id: formid},
            {$push: {fields: field}},
            {upsert: true, new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field){
        var deferred = q.defer();
        var ObjectId = mongoose.Types.ObjectId;
        formModel.update(
            {_id: formId, 'fields._id': new ObjectId(fieldId)},
            {$set: {'fields.$': field}},
            {new: true},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                }else{
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};