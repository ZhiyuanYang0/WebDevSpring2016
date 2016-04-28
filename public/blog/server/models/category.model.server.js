module.exports = function(db, mongoose) {

    var CategorySchema = require("./category.schema.server.js")(mongoose);
    var CategoryModel = mongoose.model('Category', CategorySchema);

    var api = {
        findAllCategories: findAllCategories,
        createCategory: createCategory
    }

    return api;

    function findAllCategories() {
        return CategoryModel.find();
    }

    function createCategory(category) {
        return CategoryModel.create(category);
    }

};