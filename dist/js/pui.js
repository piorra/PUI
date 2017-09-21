(function() {
    //initial works
    //plug-in for Checkboxes
    $('.pui-check input[type=checkbox]').is(function () {
        t = $(this)
        $(this).after('<label class="checkbox"><span class="box"></span></label>')
        $(this).parent().find('label.checkbox').attr('for', t.attr('id'))
    })
    //plug-in for radio buttons
    $('.pui-radio input[type=radio]').is(function () {
        t = $(this)
        $(this).after('<label class="radio"><span class="circle"></span><span class="ripple"></span></label>')
        $(this).parent().find('label.radio').attr('for', t.attr('id'))
    })
    //tab line
    $('.tab-line').is(function () {
        t = $(this);
        r = t.parent().find('li').find('button[data-tab-target].active').parent()
        w = t.parent().find('li').width()
        t.css({
            'left': r.position().left,
            'width': w
        })
    })
    //tabs
    $('[data-tab-target]').click(function () {
        t = $(this)
        $( t.parent().parent().find('.active').attr('data-tab-target') ).removeClass('active')
        t.parent().parent().find('.active').removeClass('active')
        //$( t.parent().parent().parent().find('.tab-part.active') ).removeClass('active')
        t.addClass('active')
        $( t.attr('data-tab-target') ).addClass('active');
        w = t.parent().parent().find('li').find('button[data-tab-target].active').parent().width();
        line = t.parent().parent().find('.tab-line');
        r = t.parent().parent().find('li').find('button[data-tab-target].active').parent()
        line.css({
            'width': w,
            'left': r.position().left
        })
    })
    //sidenav
}());
+(function() {
    //inputs
    'use strict';
    function RC_focus( elem ) {
        $(elem).closest('.pui-input').removeClass('focus')
    }
    function focus(elem) {
        var i = $(elem);
        i.prop("disabled") || i.closest(".pui-input").addClass("focus")
    }
    function init() {
        $(document).on('keydown paste', '.pui-input input', function() {
            $(this).parent().removeClass('empty')
        }).on('keyup change', '.pui-input input', function () {
            var input = $(this),
            parent = input.closest('.pui-input');
            "" === input.val() ? parent.addClass('empty') : parent.removeClass('empty');
            input[0].checkValidity() === false ? parent.addClass('invalid') : parent.removeClass('invalid')
        }).on('focus', '.pui-input input', function () {
            focus(this)
        }).on('blur', '.pui-input input', function () {
            RC_focus(this)
        }).ready(function () {
            var input = $('.pui-input input');
            input.each(function () {
                var n = $(this);
                "" === n.val() ? n.parent().addClass('empty') : n.parent().removeClass('empty');
            })
        })
    }
    init()
}());
(function() {
    'use strict';
    $('.sidenav-control').click(function () {
        var s = $(this).parent().parent().find('.sidenav');
        s.addClass('active');
    })
    $('.sidenav').parent().find('.sidenav-overlay').click(function () {
        $(this).parent().find('.sidenav').removeClass('active')
    })
}());
+(function() {
    $('[pui-collapse-target]').click(function() {
        $( $(this).attr('pui-collapse-target') ).slideToggle(200)
    })

    $('.card.hover-effect').bind('mouseover', function () {
        $(this).addClass('--is-hovered')
    })

    $('.card.hover-effect').bind('mouseout', function () {
        $(this).removeClass('--is-hovered')
    })
}());
!(function() {
    $('[data-close]').click(function () {
        t = $(this);
        if (t.data('close') == 'notifbox' && t.parent().hasClass('pui-notifbox')) {
            if (t.parent().hasClass('animated')) {
                t.parent().animate({
                    height:0,
                    //margin:0,
                    paddingTop:0,
                    paddingBottom: 0,
                    opacity:0
                }, 300);
                setTimeout(function () {
                    t.parent().remove()
                }, 301);
            } else {
                t.parent().remove()
            }
        } else {

        }
    })
}());
var _pui = {
    fn: {
        alert: function (o) {
            a = document.createElement('div');
            a.classList.add('pui-alert');
            setTimeout(function () {
                a.classList.add('active')
                $( a ).find('.btn').append("<div class='ripple-container waves-effect'></div>");
            }, 1);
            $('body').append(a).addClass('--alert-is-open');
            a.setAttribute('data-knownby', 'alert' + Date.now());
            c = document.createElement('div');
            c.classList.add('content');
            a.appendChild(c);
            header = document.createElement('div')
            header.classList.add('header');
            c.appendChild(header);
            closeButton = document.createElement('button')
            closeButton.classList.add('close', 'material-icons')
            $( closeButton ).click(function () {
                j = $(this).parent().parent().parent();
                j.removeClass('active')
                setTimeout(function () {
                    j.remove()
                }, 425);
                $('body').removeClass('--alert-is-open');
            })
            closeButton.innerHTML = 'close';
            header.appendChild(closeButton);
            title = document.createElement('h5')
            header.appendChild(title)
            title.innerHTML = o.title;
            body = document.createElement('div');
            body.classList.add('body')
            body.innerHTML = o.text;
            c.appendChild(body);
            footer = document.createElement('footer');
            c.appendChild(footer)
            if ( o.customButton == undefined) {
                void 0
            } else {
                customButton = document.createElement('button');
                customButton.classList.add('btn', 'sm', 'simple', o.customButton.theme);
                footer.appendChild( customButton )
                customButton.innerHTML = o.customButton.text;
                $(customButton).click(function () {
                    if (o.customButton.func != null) {
                        o.customButton.func()
                    }
                    (function() {
                        if (o.customButton.close == undefined || o.customButton.close == true){
                            j = $(customButton).parent().parent().parent()
                            j.removeClass('active')
                            setTimeout(function () {
                                j.remove()
                            }, 425);
                            $('body').removeClass('--alert-is-open');
                        } else if (o.customButton.close == false) {
                            void 0
                        } else {
                            throw new Error(' ')
                        }
                    }());
                })
            }
            if (o.closeButton == undefined) {
                void 0
            } else {
                footerCloseButton = document.createElement('button');
                footerCloseButton.innerHTML = o.closeButton.text;
                footerCloseButton.classList.add('btn', 'sm', 'simple');
                (function() {
                    o.closeButton.theme == undefined ? footerCloseButton.classList.add('gray') : footerCloseButton.classList.add( o.closeButton.theme )
                }());
                footer.appendChild(footerCloseButton);
                $( footerCloseButton ).click(function () {
                    j = $(this).parent().parent().parent();
                    j.removeClass('active')
                    setTimeout(function () {
                        j.remove()
                    }, 425);
                    $('body').removeClass('--alert-is-open');
                })
            }
            return null;
        }
    }
}

function $snackbar(i) {
    'use strict';
    //Just a function to create elements, give a class to them and appending them to a parent.
    function create(a, b, c) {
        var el = $('<' + a + ' class=' + b + ' />');
        el.appendTo( $(c) );
        return el;
    }
    //Initial build
    var snack = create('div', 'pui-snackbar', 'body'),
    inner = create('div', 'inner', snack),
    button_container = create('div', 'button-container', snack);
    //activate the snack
    snack.addClass('active');
    //create button, if it exists. (if it's defined in the options)
    var button = i.button && typeof i.button === 'object' ? create('button', 'btn', button_container) : void 0;
    button.addClass('simple').addClass('sm').addClass( i.button.theme || 'primary' ).addClass('block');
    button.text( i.button.text );
    //Add ripple to button
    create('div', 'ripple-container', button);
    //write the main text
    inner[0].innerHTML = i.text;
    //button click event
    button.click(function () {
        'func' in i.button && typeof i.button.func === 'function' ? i.button.func() : void 0;
        //Close the snack on click
        if ( i.button.close == !0 || !i.button.close ) {
            clearTimeout( removeOnTime );
            snack.removeClass('active').on('transitionend', function() {
                $(this).remove()
            })
        } else {
            return null;
        }
    });
    //removing on time out
    var time = i.time || 6000,
    removeOnTime = function () {
        setTimeout(function () {
            snack.removeClass('active').on('transitionend', function () {
                $(this).remove()
            })
        }, time);
    };
    removeOnTime()
}

;(function() {
    'use strict';
    const elements = '.btn, .pui-tab ul.tab-head li button,ul.pui-nav-tab li button,ul.pui-pagination li a, ul.pui-pill li button, .pui-nav .quick-links a, .pui-alert .content .header .close, .sidenav-toggle button, .sidenav>li>a, .sidenav .sidenav-title, .has-ripple',
    checkDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)),
    showEvent = checkDevice ? 'touchstart' : 'mousedown',
    hideEvent = checkDevice ? 'touchend' : 'mouseup';

    $(elements).append("<div class='ripple-container'></div>");

    $(document).on(showEvent, elements, function(e){

        if (e.button == 2){
            return false
        }

        var $ripple = $('<span class="ripple-effect" />'),
        $button = $(this).find('.ripple-container'),
        $offset = $button.offset(),
        xPos = checkDevice && 'touches' in e ? ( e.touches[0].pageX - $offset.left ) : (e.pageX - $offset.left),
        yPos = checkDevice && 'touches' in e ? ( e.touches[0].pageY - $offset.top ) : (e.pageY - $offset.top),
        $color = $button.parent().data('ripple-color') || 'currentColor',
        size = Math.max( $button.width() , $button.height()) * Math.PI * 1.5,
        speed = 1050/3;

        $ripple.appendTo( $button ).css({
            'top': yPos,
            'left': xPos,
            'background-color': $color,
        }).addClass('on')

        setTimeout(function () {
            $ripple.css({
                'height': size,
                'width': size
            })
        }, 0);

        $(document).on(hideEvent, $button, function (e) {
            $ripple.animate({
                'opacity': 0
            }, speed*1.5, function () {
                $(this).remove()
            })
        })
    })
}());
;(function() {
    'use strict';
    function createElement(tagName, className, parent) {
        var el = $('<' + tagName + ' class="' + className + '" />');
        el.appendTo(parent);
        return el;
    };
    function uid(prefix){
        do prefix += ~~(Math.random()*1000000)
        while (document.getElementById(prefix));
        return prefix;
    };
    function getHeightOf(e) {
        return e[0].offsetHeight;
    };
    function getWidthOf(e) {
        return e[0].offsetWidth;
    };
    $('[data-tooltip]').each(function () {
        const elem = $(this);
        if ( !elem.data('tooltip-place') ) elem.attr('data-tooltip-place', 'top');
        var container = $(elem).data('tooltip-container') || 'body';
        if ( $(container).length === 0 ){
            return false;
            throw new SyntaxError('Wrong Container Specified for tooltip!');
        }
        var place = elem.data('tooltip-place').toLowerCase();
        if ( !(/top|right|bottom|left/g.test(place)) ){
            return false;
        };
        elem.attr('aria-tooltip-id', uid('tooltip'));
        elem.on('mouseover focus', function () {
            var tooltip = createElement('div', 'pui-tooltip', $(container)).attr('id', elem.attr('aria-tooltip-id')),
            knownTip = $('.pui-tooltip#' + elem.attr('aria-tooltip-id'));
            if ( knownTip.length > 1 ){
                var tipLength = knownTip.length;
                $( knownTip[ knownTip.length-1 ] ).remove()
        }
        var innerTooltip = createElement('div', 'inner', tooltip);
        innerTooltip['html']( elem.data('tooltip') );
        var a = createElement('span', 'arrow', tooltip);
        tooltip.addClass( place );
        var width = getWidthOf(tooltip),
        height = getHeightOf(tooltip),
        difWidth = getWidthOf(elem) - width,
        difHeight = getHeightOf(elem) - height;
        var arrow = tooltip.find('.arrow');
        jQuery.offset.setOffset(tooltip[0], $.extend({
            using: function (props) {
                if (place == 'top') {
                    tooltip.css({
                        top: Math.round(props.top) - height - getHeightOf(arrow),
                        left: Math.round(props.left) + difWidth/2
                    })
                } else if (place == 'bottom') {
                    tooltip.css({
                        top: Math.round(props.top) + getHeightOf(elem) + getHeightOf(arrow),
                        left: Math.round(props.left) + difWidth/2
                    })
                } else if (place == 'left') {
                    tooltip.css({
                        top: Math.round(props.top) + difHeight/2 ,
                        left: Math.round(props.left) - width - getWidthOf(arrow)
                    })
                } else {
                    tooltip.css({
                        top: Math.round(props.top) + difHeight/2,
                        left: Math.round(props.left) + getWidthOf(elem) + getWidthOf(arrow)
                    })
                }
            }
        }, elem.offset()), 0);
        tooltip.addClass('on speed-both');
        elem.on('mouseout blur', function () {
            tooltip.removeClass('speed-both').animate({
                'opacity': 0
            }, 100 , function(){
                $(this).remove()
            })
        })
    })
});
$('[data-popover]').each(function(){
    const elem = $(this);
    if ( !elem.data('popover-place') ) elem.attr('data-popover-place', 'top');
    var container = $(elem).data('popover-container') || 'body';
    if ( $(container).length === 0 ){
        return false;
        throw new SyntaxError('Wrong Container Specified for Pop-Over!');
    }
    var place = elem.data('popover-place').toLowerCase();
    if ( !(/top|right|bottom|left/g.test(place)) ){
        return false;
    };
    elem.attr('aria-popover-id', uid('popover'));
    elem.click(function(){
        var pop = createElement('div', 'pui-popover', $(container)).attr('id', elem.attr('aria-popover-id')),
        innerPop = createElement('div', 'inner', pop),
        popTitle = createElement('span', 'title', innerPop),
        popText = createElement('p', '', innerPop),
        knownPop = $('.pui-popover#' + elem.attr('aria-popover-id'));
        pop.addClass(place);
        createElement('span', 'arrow', pop);
        if ( knownPop.length > 1 ){
            knownPop.animate({
                'opacity': 0
            }, 120, function(){
                $(this).remove()
            })
        };
        popText['html']( elem.data('popover') );
        popTitle['html']( elem.data('popover-title') );
        var width = getWidthOf(pop),
        height = getHeightOf(pop),
        difWidth = getWidthOf(elem) - width,
        difHeight = getHeightOf(elem) - height;
        var arrow = pop.find('.arrow');
        jQuery.offset.setOffset(pop[0], $.extend({
            using: function (props) {
                if (place == 'top') {
                    pop.css({
                        top: Math.round(props.top) - height - getHeightOf(arrow),
                        left: Math.round(props.left) + difWidth/2
                    })
                } else if (place == 'bottom') {
                    pop.css({
                        top: Math.round(props.top) + getHeightOf(elem) + getHeightOf(arrow),
                        left: Math.round(props.left) + difWidth/2
                    })
                } else if (place == 'left') {
                    pop.css({
                        top: Math.round(props.top) + difHeight/2 ,
                        left: Math.round(props.left) - width - getWidthOf(arrow)
                    })
                } else {
                    pop.css({
                        top: Math.round(props.top) + difHeight/2,
                        left: Math.round(props.left) + getWidthOf(elem) + getWidthOf(arrow)
                    })
                }
            }
        }, elem.offset()), 0);
        pop.animate({
            'opacity': 1
        }, 120)
    })
})
}());
