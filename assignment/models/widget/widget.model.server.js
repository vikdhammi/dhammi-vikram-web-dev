
module.exports = function(){
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget",WidgetSchema);

    var api = {
      createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    return api;

    function createWidget(pageId, widget){
        return Widget
            .find({_page: widget._page})
            .then(
                function(widgets){
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function(error){
                    return null;
                }
            );
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page": pageId});
    }

    function findWidgetById(widgetId){
        return Widget.findById(widgetId);
    }

    function updateWidget(widgetId, widget){
        delete widget._id;
        return Widget.update({_id: widgetId},{
            $set: widget
        });
    }

    function deleteWidget(widgetId){
        return Widget.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        return Widget
            .find({_page: pageId},
                function (error, widgets) {
                    widgets.forEach(
                        function (widget) {
                            if (start < end) {
                                if (widget.order === start) {
                                    widget.order = end;
                                    widget.save();
                                    console.log(start+" " +end);
                                }
                                else if (widget.order > start && widget.order <= end) {
                                    widget.order--;
                                    widget.save();
                                    console.log(start+" "+end);
                                }
                            }
                            else {
                                if (widget.order === start) {
                                    widget.order = end;
                                    widget.save();
                                }
                                else if (widget.order < start && widget.order >= end) {
                                    widget.order++;
                                    widget.save();
                                    console.log(start+" "+end);
                                }
                            }
                        }
                    );

                });
    }
};