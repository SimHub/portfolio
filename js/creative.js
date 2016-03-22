/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function ($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
    $("h1").fitText(
        1.2, {
            minFontSize: '35px',
            maxFontSize: '65px'
        }
    );

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize WOW.js Scrolling Animations
    new WOW().init();

    //BADGES

    var badges = ["http-1", "badges_githubBasics_Stage01",
        "badges_eCommerce_Stage5",
        "badges_githubBasics_Stage01",
        "badges_JavaScript_ExpressBasics_Stage3",
        "badges_JavaScript_MEANapp_Stage2",
        "badges_JavaScript_nodeBasics_Stage1",
        "badges_JavaScript_npmbasics_Stage2",
        "badges_Mongo_Basics_Stage2",
        "badges_phpstandards_Stage1",
        "badges_python_basics_stage5_alt",
        "badges_ruby_basics_Stage1",
        "badges_WP_BizOwners_Stage1",
        "badges-js-gulp-stage2"];

    for (var i = 0; i < badges.length; i++) {
        $('#badges').append('<img src="img/badges/' + badges[i] + '.png" width="40" alt="">')
    }

})(jQuery); // End of use strict
