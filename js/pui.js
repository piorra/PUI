$('.btn, .pui-tab ul.tab-head li button,ul.pui-nav-tab li button,ul.pui-pagination li a, ul.pui-pill li button, .pui-nav ul.menu li a, .nav-toggle, .card-btn, .pui-alert .content .header .close').append("<div class='ripple-container waves-effect'></div>")
$('.pui-check input[type=checkbox]').is(function () {
    t = $(this)
    $(this).after('<label class="checkbox"><span class="box"></span><span class="ripple"></span></label>')
    $(this).parent().find('label.checkbox').attr('for', t.attr('id'))
})
$('.pui-radio input[type=radio]').is(function () {
    t = $(this)
    $(this).after('<label class="radio"><span class="circle"></span><span class="ripple"></span></label>')
    $(this).parent().find('label.radio').attr('for', t.attr('id'))
})
$('.tab-line').is(function () {
    t = $(this);
    r = t.parent().find('li').find('button[pui-tab-target].active').parent()
    w = t.parent().find('li').width()
    t.css({
        'left': r.position().left,
        'width': w
    })
})
$('[pui-tab-target]').click(function () {
    t = $(this)
    $( t.parent().parent().find('.active').attr('pui-tab-target') ).removeClass('active')
    t.parent().parent().find('.active').removeClass('active')
    //$( t.parent().parent().parent().find('.tab-part.active') ).removeClass('active')
    t.addClass('active')
    $( t.attr('pui-tab-target') ).addClass('active');
    w = t.parent().parent().find('li').width();
    line = t.parent().parent().find('.tab-line');
    r = t.parent().parent().find('li').find('button[pui-tab-target].active').parent()
    line.css({
        'width': w,
        'left': r.position().left
    })
})
;(function() {
    /*$('.pui-dropdown [pui-dropdown-toggler]').click(function () {
        $(this).parent().toggleClass('active')
    })*/
    $('.pui-dropdown [pui-dropdown-toggler]').is(function () {
        t = $(this);
        c = {};
        c.a = function () {
            t.attr('aria-open', false)
        }
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
        },
        snackbar: function (o) {
            s = document.createElement('div')
            s.classList.add('pui-snackbar')
            $('body').append(s)
            setTimeout(function () {
                s.classList.add('active')
                $( s ).find('.close').append("<div class='ripple-container waves-effect'></div>");
            }, 1);
            i = document.createElement('span')
            i.classList.add('inner')
            s.appendChild(i)
            i.innerHTML = o.text;
            if (o.button != null) {
                bc = document.createElement('div')
                bc.classList.add('button-container');
                s.appendChild(bc)
                b = document.createElement('button');
                b.innerHTML = o.button.text;
                b.classList.add('btn', 'simple', 'close', 'sm');
                (function() {
                    o.button.theme == undefined ? b.classList.add('primary') : b.classList.add(o.button.theme);
                }());
                bc.appendChild(b);
                $(b).click(function () {
                    if (o.button.func != undefined || o.button.func != null) {
                        o.button.func();
                    }
                    if (o.button.close == undefined || o.button.close == true) {
                        s.classList.remove('active')
                        setTimeout(function () {
                            $(s).remove()
                        }, 126);
                    } else {
                        void 0
                    }
                })
            }
            setTimeout(function () {
                s.classList.remove('active')
                setTimeout(function () {
                    $(s).remove()
                }, 126);
            }, o.destroyTime == undefined ? 6000 : o.destroyTime)
        }
    }
}
//(function() {
    /*$('.pui-button-list .handler .btn').click(function () {
        //alert( $(this).attr('class') )
        s = $(this);
        f = {prototype:{}};
        f.prototype.findTarget = function (el) {
            return el.parent().parent().find('.list')
        };
        f.prototype.classToggle = function (el) {
            el.click(function () {
                f.prototype.findTarget(el).toggleClass('list-is-active')
            })
        };
        f.prototype.classToggle(s);
        //$(this).click(function () {
        //    $(this).parent().parent().find('.list').toggleClass('active')
        //})
    })*/
//}());
$('.pui-ftl').is(function () {
    var s = $(this);
    var f = {prototype:{}};
    f.prototype.scrollTarget = function(el) {
        return el.data('ftl-target') == undefined ? 0 : el.data('ftl-target');
    };
    f.prototype.scrollParentDetect = function (el) {
        return el.data('ftl-parent') == undefined || el.data('ftl-parent') == 'document' ? 'html,body' : el.data('ftl-parent')
    };
    f.prototype.scrollSpeed = function (el) {
        return el.data('ftl-speed')
    };
    f.prototype.scrollOffset = function (el) {
        return el.data('ftl-offset')
    };
    f.prototype.activate = function (el) {
        el.addClass('ftl-is-active')
    };
    f.prototype.deactivate = function (el) {
        el.removeClass('ftl-is-active')
    };
    f.prototype.ftlClassSwitch = function (el) {
        $(window).scroll(function () {
            if ( $(window).scrollTop() > f.prototype.scrollOffset(el)) {
                f.prototype.activate(el)
            } else {
                f.prototype.deactivate(el)
            }
        })
    };
    f.prototype.ftlScrollTo = function (el) {
        el.click(function () {
            $( f.prototype.scrollParentDetect(el) ).animate({
                scrollTop: f.prototype.scrollTarget(el)
            }, f.prototype.scrollSpeed(el))
            this.click(false)
        })
    };
    f.prototype.ftl$do_it = function (el) {
        f.prototype.ftlClassSwitch(el)
        f.prototype.ftlScrollTo(el)
    };
    f.prototype.ftl$do_it(s)
})
