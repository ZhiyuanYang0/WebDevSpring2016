module.exports = function(app, formModel) {

    //create RESTful api
    app.get('/api/assignment/form/:formId/field', findFieldsByFormId);
    app.get('/api/assignment/form/:formId/field/:fieldId', findField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);

    function findFieldsByFormId(req, res)
    {
        var formId = req.params.formId;
        var fields = formModel.findFieldsByFormId(formId);
        res.json(fields);
    }

    function findField(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findField(formId, fieldId);
        res.json(field);
    }

    function deleteField(req, res)
    {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var forms = formModel.deleteField(formId, fieldId);
        res.json(forms);
    }

    function createField(req, res)
    {
        var formId = req.params.formId;
        var field = req.body;
        field = formModel.createField(formId, field);
        res.json(field);
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        field = formModel.updateField(formId, fieldId, field);
        res.json(field);
    }

}