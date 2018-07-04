// const KEYCODE_LOOKUP = {
//     9: 'tab',
//     17: 'ctrl',
//     16: 'shift',
//     18: 'alt',
//     27: 'esc',
//     8: 'delete',
//     91: 'cmd',
//     93: 'cmd',
//     13: 'return',
//     65: 'a',
//     66: 'b',
//     67: 'c',
//     68: 'd',
//     69: 'e',
//     70: 'f',
//     71: 'g',
//     72: 'h',
//     73: 'i',
//     74: 'j',
//     75: 'k',
//     76: 'l',
//     77: 'm',
//     78: 'n',
//     79: 'o',
//     80: 'p',
//     81: 'q',
//     82: 'r',
//     83: 's',
//     84: 't',
//     85: 'u',
//     86: 'v',
//     87: 'w',
//     88: 'x',
//     89: 'y',
//     90: 'z',
//     219: '[',
//     191: '/',
//     48: '0',
//     49: '1',
//     50: '2',
//     51: '3',
//     52: '4',
//     53: '5',
//     54: '6',
//     55: '7',
//     56: '8',
//     57: '9',
// };
const hintKeys = {
    50: '2',
    51: '3',
    56: '8',
    57: '9',
    88: 'x',
    66: 'b',
    73: 'i',
    79: 'o',
    80: 'p',
    81: 'q',
    71: 'g',
    77: 'm',
    78: 'n',
    65: 'a',
};
const scrollKeys = {
    68: 'd',
    72: 'h',
    74: 'j',
    75: 'k',
    76: 'l',
    85: 'u',
}
const mode = new Mode();
const scroller = new Scroller(3200);
const hintGenerator = new HintGenerator(Object.values(hintKeys).toString().replace(/,/g, ""));
$(function () {
    mode.changeMode('command');
    document.onkeydown = function
    f(e) {
        e = e || window.event;
        if ($('input').is(':focus') === false) {
            if (mode.getMode() != 'command') {
                if (e.keyCode == 27) {
                    mode.changeMode('command');
                }

            } else {

                if (mode.getSubMode() == 'hints' && hintKeys.hasOwnProperty(e.keyCode)) {
                    e.preventDefault();
                    let hints = $('.hintsEdge').children(':first-child');
                    let key = e.keyCode;
                    hints.each(function (index) {
                        if (hints[index].innerHTML == String.fromCharCode(key)) {
                            $(hints[index]).remove();
                        } else {
                            hints[index].parentNode.remove();
                        }
                    });
                    if ($('.hintsEdge').children().length == 0) {
                        let clicking = $('.hintsEdge')[0].href;
                        hintGenerator.hideHints();
                        mode.changeSubMode('default');
                        // console.log(clicking.tagName.toLocaleLowerCase())
                        $(clicking).trigger('focus');
                        clicking.click();


                    }
                }
                if (e.keyCode == 27) {
                    e.preventDefault();
                    z
                    if (mode.getSubMode() == 'hints') {
                        hintGenerator.hideHints();
                        mode.changeSubMode('default');
                    } else {
                        hintGenerator.hideHints();
                        mode.changeMode('normal');
                        mode.changeSubMode('default');
                    }
                }
                if (e.keyCode == 84) {
                    e.preventDefault();

                    hintGenerator.hideHints();
                    window.open();
                }
                if (e.keyCode == 82) {
                    e.preventDefault();
                    window.location.reload();
                }
                if (scrollKeys.hasOwnProperty(e.keyCode) && !e.shiftKey) {
                    e.preventDefault();

                    if (mode.getMode() != 'command') {
                        mode.changeMode('command');
                    } else if (mode.getSubMode() != 'scroll' && mode.getMode() == 'command') {
                        hintGenerator.hideHints();
                        mode.changeSubMode('scroll');
                    }
                    if (mode.getSubMode() == 'scroll') {
                        switch (e.keyCode) {
                            case 72:
                                scroller.smoothScroll(scroller.scrollLeft, 1);
                                break;
                            case 74:
                                scroller.smoothScroll(scroller.scrollDown, 1);
                                break;
                            case 75:
                                scroller.smoothScroll(scroller.scrollUp, 1);
                                break;
                            case 76:
                                scroller.smoothScroll(scroller.scrollRight, 1);
                                break;
                            case 85:
                                scroller.smoothScrollQuarter(scroller.scrollUp);
                                break;
                            case 68:
                                scroller.smoothScrollQuarter(scroller.scrollDown);
                                break;
                        }
                    }
                }
                if (e.keyCode == 72 && e.shiftKey) {
                    e.preventDefault();
                    window.history.back();
                }
                if (e.keyCode == 76 && e.shiftKey) {
                    e.preventDefault();

                    window.history.forward();
                }
                if (e.keyCode == 70) {
                    e.preventDefault();
                    if (mode.getMode() != 'command') {
                        mode.changeMode('command');
                    } else if ($('.hintsEdge').length != 0) {
                        hintGenerator.hideHints();
                        mode.changeSubMode('default');
                    } else if (mode.getSubMode() != 'hints') {
                        mode.changeSubMode('hints');
                        hintGenerator.showHints();
                        $('#hintContainer').bind('click', function () {
                            if (mode.getSubMode() == 'hints') {
                                hintGenerator.hideHints();
                                mode.changeSubMode('default');
                            }
                        });
                    }
                }
            }
        }
    };
});


/**
 */
function getSettings() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'setting.json', true);
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 0) {
                let params = JSON.parse(xhr.response);
                console.log(params);
            }
        }
    };
    xhr.send();
}