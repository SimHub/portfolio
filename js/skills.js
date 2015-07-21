// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).


    var style =
        "<style>"+
        "ul._skills_{display:inline}" +

        " ul._skills_ li{" +
        " float : left;" +
        " margin-right: 0.2%;" +
        " width: 10%;" +
        "opacity: 0;" +
        "-webkit-animation-duration: 1s;"+
        "animation-duration: 1s;"+
        "-webkit-animation-fill-mode: both;"+
        "animation-fill-mode: both;"+
        " }" +



        "@keyframes skills_bounce {"+
        "0% {"+
        "transform: scale3d(1, 1, 1);"+
        "}"+
        "30% {"+
        "transform: scale3d(1.25, 0.75, 1);"+
        "}"+
        "40% {"+
        "transform: scale3d(0.75, 1.25, 1);"+
        "}"+
        "50% {"+
        "transform: scale3d(1.15, 0.85, 1);"+
        "}"+
        "65% {"+
        "transform: scale3d(.95, 1.05, 1);"+
        "}"+
        "75% {"+
        "transform: scale3d(1.05, .95, 1);"+
        "}"+
        "100% {"+
        "transform: scale3d(1, 1, 1);"+
        "}"+
        "}"+

        ".skills_bounce {"+
        "animation-name: skills_bounce;"+
        "}"+


        " ._skills_start{" +
        " border-collapse: collapse;" +
        " color: rgb(101, 115, 128);" +
        " cursor: default;" +
        " display: block;" +
        " height: 15px;" +
        " position: relative;" +
        " text-align: right;" +
        " text-decoration: none;" +
        " width: 92px;" +
        " perspective-origin: 46px 7.5px;" +
        " transform-origin: 46px 7.5px;" +
        " background: gray none repeat scroll 0% 0% / auto padding-box border-box;" +
        " border: 0px none rgb(101, 115, 128);" +
        " border-radius: 15px 0 0 15px;" +
        " font: normal normal 500 normal 10px/8px 'Gotham Rounded A', 'Gotham Rounded B', 'Helvetica Neue', Helvetica, Arial, sans-serif;" +
        " outline: rgb(101, 115, 128) none 0px;" +
        " overflow: hidden;" +
        " }" +
        " ._skills_next{" +
        " border-collapse: collapse;" +
        " color: rgb(101, 115, 128);" +
        " cursor: default;" +
        " display: block;" +
        " height: 15px;" +
        " position: relative;" +
        " text-align: right;" +
        " text-decoration: none;" +
        " width: 92px;" +
        " perspective-origin: 46px 7.5px;" +
        " transform-origin: 46px 7.5px;" +
        " background: gray none repeat scroll 0% 0% / auto padding-box border-box;" +
        " border: 0px none rgb(101, 115, 128);" +
        " /*border-radius: 15px 0 0 15px;*/" +
        " font: normal normal 500 normal 10px/8px 'Gotham Rounded A', 'Gotham Rounded B', 'Helvetica Neue', Helvetica, Arial, sans-serif;" +
        " outline: rgb(101, 115, 128) none 0px;" +
        " overflow: hidden;" +
        " }" +
        " ._skills_end{" +
        " border-collapse: collapse;" +
        " color: rgb(101, 115, 128);" +
        " cursor: default;" +
        " display: block;" +
        " height: 15px;" +
        " position: relative;" +
        " text-align: right;" +
        " text-decoration: none;" +
        " width: 92px;" +
        " perspective-origin: 46px 7.5px;" +
        " transform-origin: 46px 7.5px;" +
        " background: gray none repeat scroll 0% 0% / auto padding-box border-box;" +
        " border: 0px none rgb(101, 115, 128);" +
        " border-radius: 0 15px 15px 0;" +
        " font: normal normal 500 normal 10px/8px 'Gotham Rounded A', 'Gotham Rounded B', 'Helvetica Neue', Helvetica, Arial, sans-serif;" +
        " outline: rgb(101, 115, 128) none 0px;" +
        " overflow: hidden;" +
        " }"+
        "</style>";

    $('head').append(style);


    var badgeStyle =
        " font-size: 1.2em;" +
        " font-weight: 300;" +
        " text-decoration: inherit;" +
        " color: rgba(18, 18, 18, 0.75);" +
        "  margin: 20px 20px 10px 20px;" +
        " padding: 3px 18px;"

    // Create the defaults once
    var pluginName = "skills",
        defaults = {
            BadgeName: "badge",
            BadgeStyle: badgeStyle,
            ColorStart: "green",
            ColorNext: "gray",
            ColoNextNum: [{num: 0, color: ""}],
            ColorEnd: "gray",
            NextSum: 1,
            Duration: 60
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.settings).
            var that = this.settings;
            var thatElem = this.element;
            var duration = that.Duration;

            //append style
            //$('head').append(this.style(that.ColorStart, that.ColorNext, that.ColorEnd));

            //merge style tag
            //var styleCheck = $('head').find('style#_skills_');

            //console.log(styleCheck.length);

            //for (var rm = 1; rm < styleCheck.length; rm += 1) {
            //    $('style#_skills_').eq(rm).remove();
            //}

            var Badge = $('<div style="' + that.BadgeStyle + '">' + that.BadgeName + '</div>');
            var ul = $('<ul class="_skills_ " ></ul>');
            var li = ['<li class="_skills_start skills_bounce" ></li>', this.lNext(that), '<li class="_skills_end" ></li>'];


            //this.element.html(ul.html(li));

            //add badges
            thatElem.html(ul.html(li)).prepend(Badge);


            this.animation(that, li, thatElem, duration);

            console.log(ul);


            this.StartColor(that, thatElem);

            this.NextColor(that, thatElem);

            this.specifyNextColor(that, thatElem);

            this.EndColor(that, thatElem);


            console.log("xD");
        },


        lNext: function (that) {
            var c = [];

            for (var i = 0; i < that.NextSum; i += 1) {
                    c += ["<li class='_skills_next num_" + i + " skills_bounce'></li>"];
            }
            return c;
        },

        specifyNextColor: function (that, thatElem) {
            for (var x = 0; x < that.ColoNextNum.length; x += 1) {
                thatElem.find($('ul ._skills_next.num_' + that.ColoNextNum[x].num)).css({'background': that.ColoNextNum[x].color});
            }
        },

        StartColor: function (that, thatElem) {

            thatElem.find($('ul ._skills_start')).css({'background': that.ColorStart});

        },

        NextColor: function (that, thatElem) {
            //if(that.ColorNext !=="gray")
            //{
            thatElem.find($('ul ._skills_next')).css({'background': that.ColorNext});
            //}
        },

        EndColor: function (that, thatElem) {
            //if(that.ColorEnd !=="gray")
            //{
            thatElem.find($('ul ._skills_end')).css({'background': that.ColorEnd});

            //}
        },

        animation: function (that, li, thatElem, duration) {
            var count = 0;
            var li_length = li.length;
            var li_sum = that.NextSum;


            function step() {

                thatElem.find($('li')).eq(count++).animate({opacity: 1}, duration);

                //$('ul.just_chart_it li').eq(count++).animate({opacity: 1}, 100);
                setTimeout(next, duration);
            }

            function next() {
                if (that.NextSum !== 1) {
                    if (count <= li_sum) {

                        setTimeout(step, duration);
                    } else {
                        thatElem.find($('li._skills_end')).animate({opacity: 1}, duration);
                    }
                } else {
                    if (count < li_length) {
                        setTimeout(step, duration);
                    }
                }

            }

            step();

            //for (var s=0 ;s < li.length ; s +=1){
            //    console.log($('ul.just_chart_it li').eq(s));
            //    $('ul.just_chart_it li').eq(s).animate({opacity: 1},2000);
            //}
        }


    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);