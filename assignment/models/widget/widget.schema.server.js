
module.exports = function(){

    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
       _page: {type: mongoose.Schema.ObjectId, ref: "Page"},
        type: {type: String, enum: ['HEADER','IMAGE','YOUTUBE','HTML','INPUT','TEXT']},
        name: {type: String, required: true},
        order: Number,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "assignment.widget"});

    return WidgetSchema;
};