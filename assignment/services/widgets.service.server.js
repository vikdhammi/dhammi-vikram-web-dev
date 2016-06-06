module.exports = function(app){
    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">What on earth is a dome skid, and why is it such a big deal? Well, for one, we haven’t seen the kind of <a href="http://blackflag.jalopnik.com/racers-keep-flipping-at-indy-500-practice-1704586085">massive airborne crashes</a> at this year’s Indianapolis 500 like we did last year. <a href="http://www.racer.com/indycar/item/129612-indy-500-a-look-at-dome-skids-beam-flaps-and-new-safety-features" rel="noopener" target="_blank"><em>Racer</em></a> caught up with polesitter James Hinchcliffe ahead of the race for a quick, clear run-down of IndyCar’s new safety gear. <br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget",createWidget);
    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);

    function createWidget(req, res){
        var widget = req.body;
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var result= [];
        for(var i in widgets){
            if(widgets[i].pageId === pageId){
                result.push(widgets[i]);
            }
        }
        res.json(result);   //to return json header correctly
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                res.json(widgets[w]);
                return;
            }
        }
        res.send();
    }

    function updateWidget(req, res){
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for (var w in widgets){
            if(widgets[w]._id === widgetId){
                widgets[w] = newWidget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req, res){
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
}
