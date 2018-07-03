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
    73: 'i',
    74: 'j',
    75: 'k',
    85: 'u',
}
$(function () {
    let mode = new Mode();
    mode.changeMode('command');
    document.onkeydown = function
    f(e) {
        e = e || window.event;
        if (mode.getMode() != 'command' && e.keyCode == 27) {
            mode.changeMode('command');
        } else {
            if (mode.getSubMode() == 'hints' && hintKeys.hasOwnProperty(e.keyCode)) {
                let hints = $('.hintsEdge').children(':first-child');
                let key = e.keyCode;
                hints.each(function (index, element) {
                    if (element.innerHTML == String.fromCharCode(key)) {
                        $(element).remove();
                    } else {
                        element.parentNode.remove();
                    }
                });
                if ($('.hintsEdge').children().length == 0) {
                    let clicking = $('.hintsEdge')[0].href;
                    hideHints();
                    mode.changeSubMode('default');
                    clicking.click();
                }
            }
            if (e.keyCode == 27) {
                if (mode.getSubMode() == 'hints') {
                    hideHints();
                    mode.changeSubMode('default');
                } else {
                    hideHints();
                    mode.changeMode('normal');
                    mode.changeSubMode('default');
                }
            }
            if (e.keyCode == 84) {
                hideHints();
                window.open();
            }
            if (e.keyCode == 82) {
                window.location.reload();
            }
            if (scrollKeys.hasOwnProperty(e.keyCode) && !e.shiftKey) {
                if (mode.getMode() != 'command') {
                    mode.changeMode('command');
                } else if (mode.getSubMode() != 'scroll' && mode.getMode() == 'command') {
                    hideHints();
                    mode.changeSubMode('scroll');
                }
                if (mode.getSubMode() == 'scroll') {
                    switch (e.keyCode) {
                        case 72:
                            smoothScroll(scrollLeft, 1);
                            break;
                        case 74:
                            smoothScroll(scrollDown, 1);
                            break;
                        case 75:
                            smoothScroll(scrollUp, 1);
                            break;
                        case 76:
                            smoothScroll(scrollRight, 1);
                            break;
                        case 85:
                            smoothScroll(scrollUp, 4);
                            break;
                        case 68:
                            smoothScroll(scrollDown, 4);
                            break;
                    }
                }
            }
            if (e.keyCode == 72 && e.shiftKey) {
                window.history.back();
            }
            if (e.keyCode == 76 && e.shiftKey) {
                window.history.forward();
            }
            if (e.keyCode == 70) {
                if (mode.getMode() != 'command') {
                    mode.changeMode('command');
                } else if ($('.hintsEdge').length != 0) {
                    hideHints();
                    mode.changeSubMode('default');
                } else if (mode.getSubMode() != 'hints') {
                    mode.changeSubMode('hints');
                    showHints();
                    $('#hintContainer').bind('click', function () {
                        if (mode.getSubMode() == 'hints') {
                            hideHints();
                            mode.changeSubMode('default');
                        }
                    });
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