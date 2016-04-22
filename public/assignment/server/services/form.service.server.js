module.exports = function(app, formModel) {

    //create RESTful api
    app.get('/api/assignment/user/:userId/form', findFormByUserId);
    app.get('/api/assignment/form/:formId', findFormByFormId);
    app.delete('/api/assignment/form/:formId', deleteFormByFormId);
    app.post('/api/assignment/user/:userId/form', createFormForUser);
    app.put('/api/assignment/form/:formId', updateFormById);

    function findFormByUserId(req, res) {
        var userId = req.params.userId;
        formModel
            .findFormByUserId(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormByFormId(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        //console.log("I am in the create form service side.")
        var userId = req.params.userId;
        var form = req.body;
        form.userId = userId;
        //console.log(userId);
        //console.log("The form is:");
        //console.log(form);
        formModel
            .createForm(userId, form)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel
            .updateFormById(formId, form)
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