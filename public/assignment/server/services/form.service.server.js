module.exports = function(app, formModel) {

    //create RESTful api
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormByFormId);
    app.delete('/api/assignment/form/:formId', deleteFormByFormId);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findFormByUserId(userId);
        res.json(forms);
    }

    function findFormByFormId(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormByFormId(formId);
        res.json(form);
    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        var forms = formModel.deleteFormByFormId(formId);
        res.json(forms);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form = formModel.createFormForUser(userId, form);
        res.json(form);
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.updateFormById(formId, form);
        res.json(form);
    }

}