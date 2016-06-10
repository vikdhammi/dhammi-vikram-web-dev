module.exports = function(app, models){

    var pageModel = models.pageModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.delete("/api/page/:pageId",deletePage);

    function createPage(req, res){
        var page = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, page)
            .then(
                function(page){
                    res.json(page);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // pages.push(page);
        // res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(website){
                    res.json(website);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // var result= [];
        // for(var i in pages){
        //     if(pages[i].websiteId === websiteId){
        //         result.push(pages[i]);
        //     }
        // }
        // res.json(result);   //to return json header correctly
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;

        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.json(page);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
        // for(var w in pages){
        //     if(pages[w]._id === pageId){
        //         res.json(pages[w]);
        //         return;
        //     }
        // }
        // res.send();
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(pageId, newPage)
            .then(
                function(stats){
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
        // for (var w in pages){
        //     if(pages[w]._id === pageId){
        //         pages[w] = newPage;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;

        pageModel
            .deletePage(pageId)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(err){
                    res.statusCode(400).send(err);
                }
            );
        // for (var w in pages) {
        //     if (pages[w]._id === pageId) {
        //         pages.splice(w, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
};
