(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

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


        
        function WidgetService(){
            var api = {
                findWidgetsForPageId: findWidgetsForPageId,
                createWidget: createWidget,
                findWidgetsById: findWidgetsById,
                updateWidget: updateWidget,
                deleteWidget: deleteWidget
            };
            return api;
            
            function findWidgetsForPageId(pageId){
                var resultSet = [];
                for(var i in widgets){
                    if(widgets[i].pageId === pageId){
                        resultSet.push(widgets[i]);
                    }
                }
                return resultSet;
            }

            function createWidget(pageId, widget){

                widgets.push(widget);
                return widget;
            }

            function findWidgetsById(widgetId){
                for (var i in widgets){
                    if(widgets[i]._id === widgetId){
                        return widgets[i];
                    }
                }
                return null;
            }

            function updateWidget(widgetId, widget){
                for (var i in widgets){
                    if(widgets[i]._id === widgetId){
                        widgets[i] = widget;

                        return true;
                    }
                }
                return false;
            }

            function deleteWidget(widgetId){
                for(var i in widgets){
                    if(widgets[i]._id === widgetId){
                        widgets.splice(i,1);
                        return true;
                    }
                }
                return false;
            }


        }


})();
