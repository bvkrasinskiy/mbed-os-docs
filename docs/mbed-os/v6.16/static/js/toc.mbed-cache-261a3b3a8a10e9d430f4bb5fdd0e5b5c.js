window.initToC = function() {
    // Add the active class to the currently selected toc item
    var loc = $(location)[0];
    var splitPathname = loc.pathname.split("/");
    var pathname = splitPathname[splitPathname.length-1];

    var activeHeader = $("a.toc-item[href='" + pathname + "']").last();
    if(loc.hash) {
        var activeSubHeader = activeHeader.parent().find("a.toc-item[href='" + loc.hash + "']");
        activeSubHeader.addClass("active");
        activeSubHeader.next("div.toc-level.three").addClass("open");
        activeSubHeader.next("div.toc-level.three").removeClass("closed");
    } else {
        activeHeader.addClass("active");
        activeHeader.parents(".toc-level.two").show();
    }
    activeHeader.parent().show();
    activeHeader.next(".two").show();
    activeHeader.next(".three").show();

    // Toggle toc when viewing on small screen
    $("#nav-button").click(function(e) {
        e.preventDefault();
        $(".toc-wrapper").toggleClass('open');
        $("#nav-button").toggleClass('open');
    });

    // Make correct toc items active
    $(".toc-level.sub a").click(function(event) {
        var link = $(this)[0].hash;
        if (link) {
            $(".active").removeClass("active");
            $(this).addClass("active");
            $(link).delay(200).fadeTo(200, 0).fadeTo(500, 1.0);
        }
    });

    // Slide subsections in and out of view depending on context
    $(".toc-level.sub.two > a").click(function() {
        if ($(this)[0].hash) {
            var toggleSpeed = 200;
            var levelThree = $(this).next(".toc-level.three");
            var openSection = $(".toc-level.three.open");
            if (levelThree[0] != openSection[0]) {
                levelThree.slideDown(toggleSpeed, function() {
                    levelThree.addClass("open");
                    levelThree.removeClass("closed");
                    openSection.removeClass("open");
                    openSection.slideUp(toggleSpeed);
                    openSection.addClass("closed");
                });
            }
        }
    });

    // Close toc when viewing on small screen
    var closeToc = function() {
        $(".toc-wrapper").removeClass('open');
        $("#nav-button").removeClass('open');
    };
    $(".page-wrapper").click(closeToc);
    $("a.toc-item").click(closeToc);

    // When scrolling the ToC, make sure it takes up 100% height of the viewport
    var toc = document.getElementById('toc');
    function scrollTocToTopOfViewport() {
        toc.scrollIntoView({behavior: 'smooth'});
    }
    toc.addEventListener('scroll', scrollTocToTopOfViewport)
};
