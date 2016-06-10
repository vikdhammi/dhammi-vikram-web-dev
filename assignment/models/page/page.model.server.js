
module.exports = function(){

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
      createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    return api;

    function createPage(websiteId, newPage){
        newPage._website = websiteId;
        return Page.create(newPage);
    }

    function findAllPagesForWebsite(websiteId){
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId){
        return Page.findById(pageId);
    }

    function updatePage(pageId, newPage){
        delete newPage._id;
        return Page.update({_id: pageId},{
            $set: {
                name: newPage.name
            }
        });
    }

    function deletePage(pageId){
        return Page.remove({_id: pageId});
    }
};