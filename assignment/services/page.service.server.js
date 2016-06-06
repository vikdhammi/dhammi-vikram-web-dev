module.exports = function(app){
    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.post("/api/page/:pageId",deletePage);

    function createPage(req, res){
        var page = req.body;
        pages.push(page);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        var result= [];
        for(var i in pages){
            if(pages[i].websiteId === websiteId){
                result.push(pages[i]);
            }
        }
        res.json(result);   //to return json header correctly
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        for(var w in pages){
            if(pages[w]._id === pageId){
                res.json(pages[w]);
                return;
            }
        }
        res.send();
    }

    function updatePage(req, res){
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var w in pages){
            if(pages[w]._id === pageId){
                pages[w] = newPage;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req, res){
        var pageId = req.params.pageId;
        for (var w in pages) {
            if (pages[w]._id === pageId) {
                pages.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
}
