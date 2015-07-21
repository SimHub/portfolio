   /**===================================/
  / window scroll activate skill effect /
 /====================================*/
$(window).scroll(function () {
    //when window is scrolled
    var navHeight = $('.navbar-collapse.collapse').height();//nav height
    var log = ($(window).scrollTop()); //position of the ele w.r.t window
    var eTopH = ($('h1#scroll_to_about').offset().top) - navHeight; //get the offset top of the element

    if (log >= eTopH) {

           /**=================/
          / skills.js plugin  /
         / by simon lackmann /
        / =================*/
        $('.skill-javascript').skills({
            //set badge name
            BadgeName: "javascript",
            // set badge style
            BadgeStyle: " font-size: 1.2em;" +
            " font-weight: 300;" +
            " color: rgba(18, 18, 18, 0.75);" +
            " background: none;" +
            " display: block;" +
            " width:100px;" +
            " position: relative;" +
            " text-align: left;" +
            " border: 2px solid rgba(255, 255, 255, 0.74902);" +
            " border-radius: 100px 100px 100px 100px;" +
            " margin: 20px 20px 10px 20px;" +
            " outline: rgba(255, 255, 255, 0.74902) none 0px;" +
            " padding: 3px 18px;",

            // set start color
            ColorStart: "rgb(95, 207, 128)",
            // set next color
            ColorNext: 'rgb(95, 207, 128)',
            // specify next color
            ColoNextNum: [{num: 3, color: 'lightgreen'}, {num: 4, color: 'lightgray'}, {num: 5, color: 'grey'}],
            // set end color
            ColorEnd: "white",
            //sum next chart block without start & end block
            NextSum: 5,
            Duration: 60
        });

        $('.skill-php').skills({
            //set badge name
            BadgeName: "php",
            // set start color
            ColorStart: "rgb(95, 207, 128)",
            // set next color
            ColorNext: 'rgb(95, 207, 128)',
            // specify next color
            ColoNextNum: [{num: 4, color: 'lightgray'}, {num: 5, color: 'grey'}],
            // set end color
            ColorEnd: "white",
            //sum next chart block without start & end block
            NextSum: 5,
            Duration: 100
        });

        $('.skill-nodejs').skills({
            //set badge name
            BadgeName: "nodejs",
            // set start color
            ColorStart: "rgb(95, 207, 128)",
            // set next color
            ColorNext: 'rgb(95, 207, 128)',
            // specify next color
            ColoNextNum: [{num: 2, color: 'lightgray'}],
            // set end color
            ColorEnd: "white",
            //sum next chart block without start & end block
            NextSum: 3,
            Duration: 60
        });

        $('.skill-angular').skills({
            //set badge name
            BadgeName: "angular",
            // set start color
            ColorStart: "rgb(95, 207, 128)",
            // set next color
            ColorNext: 'rgb(95, 207, 128)',
            // specify next color
            ColoNextNum: [{num: 2, color: 'lightgray'}],
            // set end color
            ColorEnd: "white",
            //sum next chart block without start & end block
            NextSum: 3,
            Duration: 60
        });

        /* Change Lang */
        $('#changelang_en').click(function (e) {
            e.preventDefault();
            $('p.de').css({display: 'none'});
            $('p.en').css({display: 'block'});

        });

        $('#changelang_de').click(function (e) {
            e.preventDefault();
            $('p.en').css({display: 'none'});
            $('p.de').css({display: 'block'});

        });


    }


});

        /**======/
       / scrospy/
      /=======*/
$('body').scrollspy({
    target: '#navbar-collapsible',
    offset: 52
});

        /**=========================/
       / smooth scrolling sections /
      /==========================*/
$('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top - 50
            }, 800);

            if (this.hash == "start") {
                $('.scroll-up').hide();
            }
            else {
                $('.scroll-up').show();
            }

            if (this.hash == "start") {


            }
               /**===================================/
              / activate animations in this section  /
             /====================================*/
            target.find('.animate').delay(1200).addClass("animated");
            setTimeout(function () {
                target.find('.animated').removeClass("animated");
            }, 2000);

            return false;
        }
    }
});



/**
 *  justFlipIt
 *  by simon lackmann
 *  */
$('.flip_weather').justFlipIt({
    Click: '.description_plus_flip',
    FrontColor:'none',
    //BackColor:'green',
    Template: '<div class="content">' +
    '<i class="fa fa-times description_plus_flip" style="position: absolute;right: 12px;font-size: 1.7em;top: 5px;"></i>' +
    '<p></p>description</p>' +
    '<div class="description_flip">' +
    '<p>' +
    '<ul class="tech-list">' +
    '<li class="tech-info">JSON</li>' +
    '<li class="tech-info">jQuery</li>' +
    '<li class="tech-info">Css</li>' +
    '<li class="tech-info">Html5</li>' +
    '<li class="tech-info">materialize</li>' +
    '</ul>' +
    '<hr class="lang">' +
    '<a class="ui sm black button " href="GoodWeather/index.html" style="bottom: 20px;left: 120px;position: absolute;">DEMO</a>' +
    '</p>' +
    '</div>' +
    '</div>'
});

$('.flip_nutrition').justFlipIt({
    Click: '.description_plus_flip',
    FrontColor:'none',
    //BackColor:'green',
    Template: '<div class="content">' +
    '<i class="fa fa-times description_plus_flip" style="position: absolute;right: 12px;font-size: 1.7em;top: 5px;"></i>' +
    '<p>description</p>' +
    '<div class="description_flip">' +
    '<p>' +
    '<ul class="tech-list">' +
    '<li class="tech-info">Node.js</li>'+
    '<li class="tech-info">MongoDB</li>'+
    '<li class="tech-info">Socket.io</li>'+
    '<li class="tech-info">jQuery</li>'+
    '<li class="tech-info">Semantic-ui</li>'+
    '<li class="tech-info">Localstorage</li>'+
    '<li class="tech-info">Css</li>'+
    '<li class="tech-info">Html5</li>'+
    '</ul>' +
    '<hr class="lang">' +
    '</p>' +
    '<a class="mobile_no_vid" href="#realnutrition">VIDEO</a>'+
    '</div>' +
    '</div>'
});

$('.flip_node_js_chat').justFlipIt({
    Click: '.description_plus_flip',
    FrontColor:'none',
    //BackColor:'green',
    Template: '<div class="content">' +
    '<i class="fa fa-times description_plus_flip" style="position: absolute;right: 12px;font-size: 1.7em;top: 5px;"></i>' +
    '<p>description</p>' +
    '<div class="description_flip">' +
    '<p>' +
    '<ul class="tech-list">' +
    '<li class="tech-info">PHP</li>' +
    '<li class="tech-info">Ajax</li>' +
    '<li class="tech-info">Mysql</li>' +
    '<li class="tech-info">Html5</li>' +
    '<li class="tech-info">materialize</li>' +
    '</ul>' +
    '<hr class="lang">' +
    '</p>' +
    '<h2>'+
    '<a href="https://github.com/SimHub/responsive_nodejs_chat">'+
    '<small>'+
    '<i class="fa fa-github"></i>'+
    'github'+
    '</small>'+
    '</a>'+
    '</h2>'+
    '<a class="mobile_no_vid" href="#node-chat-vid ">VIDEO</a>'+
    '<br/>'+
    '<a href="https://youtu.be/a6NMUJ05dwQ">WHISPER DEMO <i class="fa fa-youtube" style="font-size: 1.7em"></i></a>'+
    '<hr/>'+
    '<a href="http://simonlackmann.ddns.net:3020">DEMO</a>'+
    '</div>' +
    '</div>'
});

$('.flip_just_flip_it').justFlipIt({
    Click: '.description_plus_flip',
    FrontColor:'none',
    //BackColor:'green',
    Template: '<div class="content">' +
    '<i class="fa fa-times description_plus_flip" style="position: absolute;right: 12px;font-size: 1.7em;top: 5px;"></i>' +
    '<p>description</p>' +
    '<div class="description_flip">' +
    '<p>' +
    '<ul class="tech-list">' +
    '<li class="tech-info">jQuery</li>'+
    '<li class="tech-info">Css</li>'+
    '</ul>' +
    '<hr class="lang">' +
    '</p>'+
    '<h2>'+
    '<a href="https://github.com/SimHub/justFlipIt">'+
    '<small>'+
    '<i class="fa fa-github"></i>'+
    'github'+
    '</small>'+
    '</a>'+
    '</h2>'+
    '<hr/>'+
    '<a href="http://simhub.github.io/justFlipIt/">DEMO</a>'+
    '</div>' +
    '</div>'
});

$('.flip_base_64').justFlipIt({
    Click: '.description_plus_flip',
    FrontColor:'none',
    //BackColor:'green',
    Template: '<div class="content">' +
    '<i class="fa fa-times description_plus_flip" style="position: absolute;right: 12px;font-size: 1.7em;top: 5px;"></i>' +
    '<p>description</p>' +
    '<p>' +
    '<div class="description_flip">' +
    '<ul class="tech-list">' +
    '<li class="tech-info">PHP</li>'+
    '<li class="tech-info">jQuery</li>'+
    '<li class="tech-info">Css</li>'+
    '<li class="tech-info">Html5</li>'+
    '</ul>' +
    '<hr class="lang">' +
    '</p>' +
    '<h2>'+
    '<a href="https://github.com/SimHub/phpbase64encoder">'+
    '<small>'+
    '<i class="fa fa-github"></i>'+
    'github'+
    '</small>'+
    '</a>'+
    '</h2>'+
    '<hr/>'+
    '<a class="mobile_no_vid" href="#base64enconder_vid">VIDEO</a>'+
    '<hr/>'+
    '</div>' +
    '</div>'
});

/**
 * video mediaelementplayer
 * */
$('video').mediaelementplayer({
    success: function (player, node) {
        $('#' + node.id + '-mode').html('mode: ' + player.pluginType);
    },
    startLanguage: 'en',
    translationSelector: true
});

/**
 *  T.JS
 *  */
$('#t-js-intro').t('Hi! My name is Simon Lackmann and i am a Creative Developer.');


$('.dropdown')
    .dropdown({
        // you can use any ui transition
        //transition: 'drop'
    })
;





