module.exports = function(app, models){

    var widgetModel = models.widgetModel;
    /*var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">What on earth is a dome skid, and why is it such a big deal? Well, for one, we haven’t seen the kind of <a href="http://blackflag.jalopnik.com/racers-keep-flipping-at-indy-500-practice-1704586085">massive airborne crashes</a> at this year’s Indianapolis 500 like we did last year. <a href="http://www.racer.com/indycar/item/129612-indy-500-a-look-at-dome-skids-beam-flaps-and-new-safety-features" rel="noopener" target="_blank"><em>Racer</em></a> caught up with polesitter James Hinchcliffe ahead of the race for a quick, clear run-down of IndyCar’s new safety gear. <br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];*/
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);





    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        if (myFile == null){
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        // for(var i in widgets){
        //     if(widgets[i]._id === widgetId){
        //         widgets[i].url = "/uploads/" + filename;
        //     }
        // }
        var widget = {url: "/uploads/" + filename};

        widgetModel
            .updateWidget(widgetId,widget)
            .then(
                function(stats){
                    res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );



    }

    function createWidget(req, res){
        var widget = req.body;
        var pageId = req.params.pageId;
        console.log(widget);
        widgetModel
            .createWidget(pageId,widget)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        
        // widgets.push(widget);
        // res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // var result= [];
        // for(var i in widgets){
        //     if(widgets[i].pageId === pageId){
        //         result.push(widgets[i]);
        //     }
        // }
        // res.json(result);   //to return json header correctly
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget){
                    res.json(widget);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // for(var w in widgets){
        //     if(widgets[w]._id === widgetId){
        //         res.json(widgets[w]);
        //         return;
        //     }
        // }
        // res.send();
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        console.log(newWidget);
        widgetModel
            .updateWidget(widgetId,newWidget)
            .then(
                function(stats){
                    res.send(200);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // for (var w in widgets){
        //     if(widgets[w]._id === widgetId){
        //         widgets[w] = newWidget;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(400);
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(stats){
                    res.send(200);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            );
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         widgets.splice(w, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
};
