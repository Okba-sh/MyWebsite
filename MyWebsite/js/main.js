(function() {
  'use strict';

  // MOBAILE MENU

  $('#fh5co-primary-menu')
    .find('a[href*="#"]:not([href="#"])')
    .click(function() {
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate(
            {
              scrollTop: target.offset().top - 0
            },
            1000
          );
          if ($('.navbar-toggle').css('display') != 'none') {
            $(this)
              .parents('.container')
              .find('.navbar-toggle')
              .trigger('click');
          }
          return false;
        }
      }
    });

  // Main Menu Superfish
  var mainMenu = function() {
    $('#fh5co-primary-menu').superfish({
      delay: 0,
      animation: {
        opacity: 'show'
      },
      speed: 'fast',
      cssArrows: true,
      disableHI: true
    });
  };

  // Parallax
  var parallax = function() {
    $(window).stellar();
  };

  // Offcanvas and cloning of the main menu
  var offcanvas = function() {
    var $clone = $('#fh5co-menu-wrap').clone();
    $clone.attr({
      id: 'offcanvas-menu'
    });
    $clone.find('> ul').attr({
      class: '',
      id: ''
    });

    $('#fh5co-page').prepend($clone);

    // click the burger
    $('.js-fh5co-nav-toggle').on('click', function() {
      if ($('body').hasClass('fh5co-offcanvas')) {
        $('body').removeClass('fh5co-offcanvas');
      } else {
        $('body').addClass('fh5co-offcanvas');
      }
      // $('body').toggleClass('fh5co-offcanvas');
    });

    $('#offcanvas-menu').css('height', $(window).height());

    $(window).resize(function() {
      var w = $(window);

      $('#offcanvas-menu').css('height', w.height());

      if (w.width() > 769) {
        if ($('body').hasClass('fh5co-offcanvas')) {
          $('body').removeClass('fh5co-offcanvas');
        }
      }
    });
  };

  // Click outside of the Mobile Menu
  var mobileMenuOutsideClick = function() {
    $(document).click(function(e) {
      var container = $('#offcanvas-menu, .js-fh5co-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('fh5co-offcanvas')) {
          $('body').removeClass('fh5co-offcanvas');
        }
      }
    });
  };

  // Animations

  var contentWayPoint = function() {
    var i = 0;
    $('.animate-box').waypoint(
      function(direction) {
        if (direction === 'down' && !$(this.element).hasClass('animated')) {
          i++;

          $(this.element).addClass('item-animate');
          setTimeout(function() {
            $('body .animate-box.item-animate').each(function(k) {
              var el = $(this);
              setTimeout(
                function() {
                  el.addClass('fadeInUp animated');
                  el.removeClass('item-animate');
                },
                k * 200,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '85%' }
    );
  };

  var scheduleTab = function() {
    $('.schedule-container').css(
      'height',
      $('.schedule-content.active').outerHeight()
    );

    $(window).resize(function() {
      $('.schedule-container').css(
        'height',
        $('.schedule-content.active').outerHeight()
      );
    });

    $('.schedule a').on('click', function(event) {
      event.preventDefault();

      var $this = $(this),
        sched = $this.data('sched');

      $('.schedule a').removeClass('active');
      $this.addClass('active');
      $('.schedule-content').removeClass('active');

      $('.schedule-content[data-day="' + sched + '"]').addClass('active');
    });
  };

  // Document on load.
  $(function() {
    mainMenu();
    parallax();
    offcanvas();
    mobileMenuOutsideClick();
    contentWayPoint();
    scheduleTab();
  });
})();
