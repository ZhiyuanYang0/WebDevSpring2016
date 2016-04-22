module.exports = function(app, fieldModel) {

    //create RESTful api
    app.get('/api/assignment/form/:formId/field', getFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        fieldModel
            .getFieldsByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .findFormByFormIdAndFieldId(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel
            .deleteField(formId, fieldId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel
            .createField(formId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel
            .updateField(formId, fieldId, field)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

}