(function ($) {
    FlipClock.CashFace = FlipClock.Face.extend({
      shouldAutoIncrement: false,
      constructor: function (factory, options) {

        if (typeof options != "object") {
          options = {};
        }

        factory.autoStart = options.autoStart ? true : false;

        if (options.autoStart) {
          this.shouldAutoIncrement = true;
        }

        factory.increment = function (newData) {
          factory.countdown = false;
          factory.setTime(factory.getTime().getTimeSeconds() + 1);
        };

        factory.decrement = function () {
          factory.countdown = true;
          var time = factory.getTime().getTimeSeconds();
          if (time > 0) {
            factory.setTime(time);
          }
        };

        factory.setValue = function (digits) {
          factory.setTime(digits);
        };

        factory.setCounter = function (digits) {
          factory.setTime(digits);
        };

        this.base(factory, options);
      },
      build: function () {
        var t = this;
        var children = this.factory.$el.find('ul');
        var time = this.factory.getTime().digitize([this.factory.getTime().time]);

        if (time.length > children.length) {
          $.each(time, function (i, digit) {
            var list = t.createList(digit);
            list.select(digit);
          });

        }

        $.each(this.lists, function (i, list) {

          setInterval(function () {
            list.play();
          }, 1300);

        });

        $('<ul class="flip  play"><li class="flip-clock-before"><a href="javascript:void(0)"><div class="up"><div class="shadow"></div><div class="inn">$</div></div><div class="down"><div class="shadow"></div><div class="inn">$</div></div></a></li><li class="flip-clock-active"><a href="javascript:void(0)"><div class="up"><div class="shadow"></div><div class="inn">$</div></div><div class="down"><div class="shadow"></div><div class="inn">$</div></div></a></li></ul>').insertBefore(this.lists[0].$el);
        if (time.length > 3) {
          this.createDivider();
          $(this.dividers[0]).insertBefore(this.lists[this.lists.length - 3].$el);
          if (time.length > 5) {
            this.createDivider();
            $(this.dividers[1]).insertBefore(this.lists[this.lists.length - 5].$el);
            if (time.length > 8) {
              this.createDivider();
              $(this.dividers[2]).insertBefore(this.lists[this.lists.length - 8].$el);
              if (time.length > 11) {
                this.createDivider();
                $(this.dividers[3]).insertBefore(this.lists[this.lists.length - 11].$el);
              }
            }
          }
        }

        this.base();
      },

      createDivider: function (label, css, excludeDots) {
        if (typeof css == "boolean" || !css) {
          excludeDots = css;
          css = label;
        }

        var dots = [
          '<span class="' + this.factory.classes.dot + ' comma">,</span>'
        ].join('');

        if (excludeDots) {
          dots = '';
        }

        label = this.factory.localize(label);

        var html = [
          '<span class="' + this.factory.classes.divider + ' ' + (css ? css : '').toLowerCase() + '">',
          '<span class="' + this.factory.classes.label + '">' + (label ? label : '') + '</span>',
          dots,
          '</span>'
        ];

        var $html = $(html.join(''));

        this.dividers.push($html);

        return $html;
      },

      /**
       * Flip the clock face
       */

      flip: function (time, doNotAddPlayClass) {
        if (this.shouldAutoIncrement) {
          this.autoIncrement();
        }

        if (!time) {
          time = this.factory.getTime().digitize([this.factory.getTime().time]);
        }

        this.base(time, doNotAddPlayClass);
      },

      /**
       * Reset the clock face
       */

      reset: function () {
        this.factory.time = new FlipClock.Time(
          this.factory,
          this.factory.original ? Math.round(this.factory.original) : 0
        );

        this.flip();
      }
    });

  }(jQuery));

  function changeCountry(event) {
    $("#countryFlag").html('<img src="images/blank.gif" class="flag flag-' + $(event).attr("data-code") + '" alt="' + $(event).attr("data-country") + '" />');
    $("#countryCode").html($(event).attr("data-mobile"))
  }