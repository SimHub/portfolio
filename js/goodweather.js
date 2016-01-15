/**
 * settings:
 * forecast: [false - default], [true - inside element], [[DOMElementName] - inside Dom element name]
 */
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

    var weatherAPI = 'http://api.openweathermap.org/data/2.5/weather';
    var weatherIcon = 'http://openweathermap.org/img/w/';
    var forecast = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    var key = '&appid=10d1d7abaa49b932d8ef3ced41d05c68';
    //var key ='&appid=2de143494c0b295cca9337e1e96b00e0';

    var iconsBase64 = {
        temp: 'iVBORw0KGgoAAAANSUhEUgAAAL4AAADBCAYAAABxAAqJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDM4Q0ZCMTU4RjREMTFFMjhFNzRCMjIzOTVFRTQwMzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDM4Q0ZCMTY4RjREMTFFMjhFNzRCMjIzOTVFRTQwMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGMjczRDFGODhGNEMxMUUyOEU3NEIyMjM5NUVFNDAzMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MzhDRkIxNDhGNEQxMUUyOEU3NEIyMjM5NUVFNDAzMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pgf3hoUAAA68SURBVHja7J3fcds4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',
        wind: 'iVBORw0KGgoAAAANSUhEUgAAAMwAAAC1CAYAAAATDxD7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkJCNEEyRDg4RjRFMTFFMjhFNzRCMjIzOTVFRTQwMzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkJCNEEyRDk4RjRFMTFFMjhFNzRCMjIzOTVFRTQwMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2QkI0QTJENjhGNEUxMUUyOEU3NEIyMjM5NUVFNDAzMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2QkI0QTJENzhGNEUxMUUyOEU3NEIyMjM5NUVFNDAzMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpfkVfoAABEZSURBVHja7F3bcdvI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',
        cloud: 'iVBORw0KGgoAAAANSUhEUgAAAMwAAAB4CAYAAAC+eR2RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjJGRDkyRTQ4RjREMTFFMjhFNzRCMjIzOTVFRTQwMzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjJGRDkyRTU4RjREMTFFMjhFNzRCMjIzOTVFRTQwMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MkZEOTJFMjhGNEQxMUUyOEU3NEIyMjM5NUVFNDAzMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MkZEOTJFMzhGNEQxMUUyOEU3NEIyMjM5NUVFNDAzMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtRf+0EAAAl9SURBVHja7J3fcds4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'
    };

    var cssSetting =
        {
            list: "list-style: none",
            textShadow: "text-shadow : 2px 2px 3px black",
            wordWrap: "word-wrap: break-word"
        }
        ;

    // Create the defaults once
    var pluginName = "goodweather",
        defaults = {
            q: 'London',
            units: "metric",
            //materialize:false,
            search: false,
            bgPic: false,
            forecast: false,
            base64: true,
            ulAttrs: {
                class: "goodweather_gallery_wrapper",
                id: ''
            },
            css:{
                img:'',
                button:''
            },
            icons: {
                temp: '',
                wind: '',
                cloud: ''
            }
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

            var settings = this.settings;
            var weather;
            var self = this.element;

            //if(settings.materialize ===true){
            //    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css"/>');
            //}
            var formHtml =
                '<div class="error-message"></div>' +
                '<div class="weatherInfo"></div>' +
                '</p>' +
                '</h3>' +
                '<br>' +
                '<br>' +
                '<div class="goodWeather_Forecast"></div>' +
                '<form class="my-weather-form">' +
                '<div class="ui transparent icon input">' +
                '<input class="country-input" type="text" name="country" placeholder="Search">' +
                '<button class="'+settings.css.button+'"  type="submit" name="sub" value="send">send</button>' +
                ' </div>' +
                '</form>';


            //if search default is true
            if (settings.search === true) {

                //console.log("Typeof forecast: " + typeof settings.forecast);
                //
                //if (typeof settings.forecast === 'string') {
                //    $(settings.forecast).html(forecastHtml);
                //} else {
                //    //self.find(goodWeather_Forecast).html(forecastHtml);
                //    self.prepend(formHtml);
                //
                //}
                //init search form
                self.prepend(formHtml);

                self.find($('form.my-weather-form')).submit(function (e) {
                    e.preventDefault();

                    var searchTerm = self.find($('.country-input')).val();

                    console.log('start!');

                    //self.find($('.error-message')).html('<img src="svg-loaders/rings.svg" width="160" alt="loader">');

                    //HIDE WEATHER LABEL
                    //self.find($('.my-weather-label')).hide();

                    settings.q = searchTerm;
                    //console.log(weatherAPI + '?q=' + settings.q + key);

                    weather = $.getJSON(weatherAPI + '?q=' + settings.q + "&units=metric" + key, function (data) {

                        try {

                            console.log(data);

                            self.find($('.weatherInfo')).html(weatherHtml(settings, data));
                            self.find($('.country-input')).val('');
                            self.find($('.error-message')).html('');


                            self.find($('button.goodweather_Degree')).click(function () {
                                if (typeof settings.forecast === 'string') {
                                    var forecastTag =settings.forecast;
                                    $(forecastTag).find($('.goodweather_viewTemp')).html(data.main.temp + "&deg;C ");
                                    $(forecastTag).find($('.forecast_temp1')).html(data.main.temp + "&deg;C ");
                                    $(forecastTag).find($('.forecast_temp2')).html(data.main.temp + "&deg;C ");
                                    $(forecastTag).find($('.forecast_temp3')).html(data.main.temp + "&deg;C ");
                                }else {
                                    self.find($('.goodweather_viewTemp')).html(data.main.temp + "&deg;C ");
                                    self.find($('.forecast_temp1')).html(data.main.temp + "&deg;C ");
                                    self.find($('.forecast_temp2')).html(data.main.temp + "&deg;C ");
                                    self.find($('.forecast_temp3')).html(data.main.temp + "&deg;C ");
                                }
                            });

                            self.find($('button.goodweather_Fahrenheit')).on('click', function () {
                                if (typeof settings.forecast === 'string') {
                                    var forecastTag = settings.forecast;
                                    $(forecastTag).find($('.goodweather_viewTemp')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                    $(forecastTag).find($('.forecast_temp1')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                    $(forecastTag).find($('.forecast_temp2')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                    $(forecastTag).find($('.forecast_temp3')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                }else {
                                    self.find($('.goodweather_viewTemp')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                    self.find($('.forecast_temp1')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                    self.find($('.forecast_temp2')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                    self.find($('.forecast_temp3')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(data.main.temp)) + "&deg;F ");
                                }
                            });


                        } catch (err) {
                            console.log("Sorry no match! " + err.message);
                            self.find($('.error-message')).html('<div class="ui negative message">' +
                                ' Sorry no match!  <br>' +
                                '<em><small>try again ;)</small></em>' +
                                '</div>');
                            //HIDE WEATHER INFO IF EXISTS
                            self.find($('.weatherInfo')).hide();
                        }
                    });


                });

            }
            else {
                weatherPrev();
            }

//========HELPER FUNC ==========================//
            function weatherPrev() {

                $.get("http://ipinfo.io", function (location) {
                    var lat = location.loc.split(",")[0], //.toString();
                        lon = location.loc.split(",")[1],//.toString();
                        countryCode = location.country,
                        city = location.city;

                    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon +

                        "&units=metric" + key;

                    self.append('<div class="error-message"></div>');

                    //$('.error-message').html('<img src="svg-loaders/rings.svg" width="160" alt="loader">');

                    $.get(weatherApiUrl, function (weather) {

                        $('.error-message').html('');
                        var tempMin = parseFloat((weather.main.temp_min).toFixed(1)),
                            tempMax = parseFloat((weather.main.temp_max).toFixed(1)),
                            main = weather.weather[0].main,
                            windSpeed = weather.wind.speed,
                            description = weather.weather[0].description;


                        if (settings.forecast === true || typeof settings.forecast === 'string')forecast(lat, lon);
                        if (settings.bgPic !== false) pictureBackground(main);


                        for (var j in weather)console.log(weather[j]);

                        self.append("<div style='width: 100%'><ul>" +
                            "<li style='float: left;margin-right: 5%;'>" +
                            "<img class='"+settings.css.img+"' src='http://openweathermap.org/img/w/" +
                            weather.weather[0].icon + ".png'></li><li><h5>" + weather.name + " " + countryCode + "</h5></li>" +
                            "<li style='margin-left: 5%'><span class='goodweather_viewTemp_min' style='font-size: 1.5em'>" +
                            tempMin + " - </span><span class='goodweather_viewTemp_max' style='font-size: 1.5em'> " +
                            tempMax + "&deg;C </span>" +
                            "<li style='text-align: center'><button class='"+settings.css.button+"'>&deg;C</button>" +
                            "<button class='"+settings.css.button+"'>&deg;F</button></li>" +
                            "<li><span class='btn-flat disabled' > " + description + "</span></li></ul>"
                            + "</div>" +
                            '<div class="goodWeather_Forecast"></div>');

                        self.find($('.goodweather_Degree')).click(function () {
                            self.find($('.goodweather_viewTemp_min')).html(tempMin);
                            self.find($('.goodweather_viewTemp_max')).html(" - " + tempMax + "&deg;C");
                        });
                        self.find($('.goodweather_Fahrenheit')).on('click', function () {
                            self.find($('.goodweather_viewTemp_min')).html(parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(tempMin)));
                            self.find($('.goodweather_viewTemp_max')).html(" - " + parseInt(toggleDegreeFahrenheit.converttDegreeToFahrenheit(tempMax)) + "&deg;F");
                        });

                    }, "jsonp");
                    //
                }, "jsonp");
            }

            function weatherHtml(settings, data) {

                var weatherHtml_Lat = data.coord.lat,
                    weatherHtml_Lon = data.coord.lon;

                var showWeather = "<ul " +
                    "class='" + settings.ulAttrs.class + "' style='" + cssSetting.list  +"'>"+
                        //form relevant
                    "<h2 style='" + cssSetting.wordWrap + "'>" + data.name + "</h2>" +
                    "<p class='loader'></p>" +
                    "<li><img class='"+settings.css.img+"' src='" + weatherIcon + data.weather[0].icon + ".png'  alt='icon'/> " +
                    " <span class='goodweather_viewTemp' style='font-size: 1.5em' >  " + data.main.temp +
                    " &deg;C </span>" +
                    "<button class='"+settings.css.button+"'>&deg;C</button>" +
                    "<button class='"+settings.css.button+"'>&deg;F</button></li><br>" +
                    "<li><img src='data:image/png;base64," + iconsBase64.wind + "' width='30'  alt='icon'/>  " +
                    "<span >| </span> " + data.wind.speed + " m/s</li><br>" +
                    "<li><img src='data:image/png;base64," + iconsBase64.cloud + "' width='30'  alt='icon'/> " +
                    "<span >| </span> " + data.clouds.all + " %</li>" +
                    "</ul>";

                if (settings.forecast === true || typeof settings.forecast === 'string') forecast(weatherHtml_Lat, weatherHtml_Lon);
                if (settings.bgPic !== false) pictureBackground(data.main.temp);
                //forecast(weatherHtml_Lat, weatherHtml_Lon);
                //
                //if (settings.bgPic === true) pictureBackground(data.main.temp);
                return showWeather;
            }

            var forecast = function (lat, lon) {
                var foreCast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric' + key;
                var imgSrc = 'http://openweathermap.org/img/w/';


                $.get(foreCast, function (fc) {
                    var fcList = fc.list;
                    var goodWeather_Forecast = $('.goodWeather_Forecast');

                    goodWeather_Forecast.remove('img.fc_preloader');

                    function fcParseFloat(i) {
                        return parseFloat((i).toFixed(1));
                    }

                    var fcDate = {
                        fcDate1: fcList[0].dt_txt,
                        fcDate2: fcList[1].dt_txt,
                        fcDate3: fcList[2].dt_txt
                    };
                    var fcIcon = {
                        fcIcon1: fcList[0].weather[0].icon,
                        fcIcon2: fcList[1].weather[0].icon,
                        fcIcon3: fcList[2].weather[0].icon
                    };
                    var Temp = {
                        temp1: fcParseFloat(fcList[0].main.temp),
                        temp2: fcParseFloat(fcList[1].main.temp),
                        temp3: fcParseFloat(fcList[2].main.temp)
                    };

                    var forecastHtml = '<h5><em>Forecast</em></h5>' +
                        '<table>' +
                        '<thead>' +
                        '<tr>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>' +
                        '<tr>' +
                        '<td class="goodWeather_date1"><em>' + fcDate.fcDate1 + '</em></td>' +
                        '<td class="goodWeather_icon1">' +
                        '<img class="'+settings.css.img+'"' +
                        'src= ' + imgSrc + fcIcon.fcIcon1 + '.png' + '>' +
                        '</td>' +
                        '<td class="goodWeather_temp1"><em class="forecast_temp1">' + Temp.temp1 + '&deg;C</em></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="goodWeather_date2"><em>' + fcDate.fcDate2 + '</em></td>' +
                        '<td class="goodWeather_icon2">' +
                        '<img class="'+settings.css.img+'"' +
                        'src= ' + imgSrc + fcIcon.fcIcon2 + '.png' + '>' + '</td>' +
                        '<td class="goodWeather_temp2"><em class="forecast_temp2">' + Temp.temp2 + '&deg;C</em></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="goodWeather_date3"><em>' + fcDate.fcDate3 + '</em></td>' +
                        '<td class="goodWeather_icon3"><em>' +
                        '<img class="'+settings.css.img+'"' +
                        'src= ' + imgSrc + fcIcon.fcIcon3 + '.png' + '>' +
                        '</td>' +
                        '<td class="goodWeather_temp3"><em class="forecast_temp3">' + Temp.temp3 + '&deg;C</em></td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>';


                    console.log("Typeof forecast: " + typeof settings.forecast);

                    if (typeof settings.forecast === 'string') {
                        $(settings.forecast).html(forecastHtml);
                        console.log(settings.forecast);
                    } else {
                        self.find(goodWeather_Forecast).html(forecastHtml);
                    }

                });

            };

            var pictureBackground = function (tempInfo) {
                var tempPic = {
                    temp: function () {
                        if (tempInfo == 'Clouds') {
                            return 'cloud';
                        }
                        if (tempInfo == 'Rain') {
                            return 'drop';
                        }
                        return 'sun';
                    }
                };
                var UnsplashpicSearch = 'http://www.splashbase.co/api/v1/images/search?query=';
                var query = tempPic.temp();
                $.get(UnsplashpicSearch + query, function (pic) {
                    var imgUrl;
                    var randomPic;
                    for (var pics in pic) {
                        var piclength = pic[pics].length;
                        randomPic = Math.floor(Math.random() * (piclength - 1) + 1);
                        imgUrl = pic[pics][randomPic].url;
                    }
                    ;
                    if (settings.bgPic === 'body') {
                        $('body').css({
                            'background': 'url(' + imgUrl + ') no-repeat center center fixed',
                            'background-size': 'cover',
                            '-webkit-background-size': 'cover',
                            '-moz-background-size': 'cover'
                        });
                    }
                    else if (settings.bgPic === 'self') {
                        self.css({
                            'background': 'url(' + imgUrl + ') no-repeat center center fixed',
                            'background-size': 'cover',
                            '-webkit-background-size': 'cover',
                            '-moz-background-size': 'cover'
                        })
                    }
                    else {
                        document.querySelector(settings.bgPic).setAttribute('style',
                            'background: url(' + imgUrl + ') no-repeat center center fixed;background-size : cover;' +
                            '-webkit-background-size : cover ; -moz-background-size : cover')
                    }
                });
            };

            var toggleDegreeFahrenheit = {
                converttDegreeToFahrenheit: function (f) {
                    var fahrenheit = f * 1.8 + 32;
                    //var fahrenheit = Math.round(f * 9 / 5 + 32);
                    return fahrenheit;
                }
            };
            //console.log("xD");
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