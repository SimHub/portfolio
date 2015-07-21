$(function () {


    //PRE-LOADER FUNC//
    function preloader() {
        $('.changelang').each(function (ind, val) {
            $('.changelang').eq(ind).css({'display': 'none'});
        });
        //setTimeout(function () {
            $('.pre-loader').addClass('loader');
            setTimeout(function () {
                $('.pre-loader').removeClass('loader');
                $('.changelang').each(function (ind, val) {
                    $('.changelang').eq(ind).css({'display': 'block'});
                });
            }, 1750);
        //}, 500);
    }

    var $lastLang = 'en';
    var $eq;// html element counter


    var eqlenght = $('.lang').length;
    console.log('eqLenggh: ' + eqlenght);

    var m = [];
    for (var x = 0; x < eqlenght; x += 1) {
        var xd = $('.lang').eq(x).text();
        m.push(xd);
    }
    console.log(m);

    $('.changelang').on('click', function (e) {
        e.preventDefault();

        console.log('auto trigger');

        $eq = 0;

        var $lang = $('.lang');
        var $changeLang = $(this).attr('href');

        preloader();

        var SendIt;

        $.each($lang, function (i, v) {
            var data = [];

            data[i] = v.innerText;


            SendIt = {
                //default: 'no',

                lastLang: $lastLang,
                //lang: data[i],
                lang: m[i],

                changeLang: $changeLang
            };

            console.log(SendIt);

            $.post("app/translate_controller.php", SendIt, function (response) {

                //var obj = jQuery.parseJSON(response);
                //$eq-1;
                $lang.eq($eq).text(response);

                console.log($eq + ' txt:' + response);

                $eq++;// go through every html element in the same order of the request input

            });//END POST

            //$eq++;// go through every html element in the same order of the request input

        });//END $.EACH

        //$eq++;// go through every html element in the same order of the request input

        $lastLang = $(this).attr('href');//store the language code you clicked before

    });//End click changeLang

    //$('.default').on('click', function () {
    //    $('.changelang.def').trigger('click');
    //});

});