$(function () {
    let mode = new Mode();
    getSettings();
    document.onkeydown =
        function f(e) {
            e = e || window.event;
            if (mode.getMode() != 'command') {
                if (e.keyCode == 27) {
                    mode.changeMode('command');
                }
            } else {
                if (e.keyCode == 27) {
                    if (mode.getMode() == 'command') {
                        mode.changeMode('normal');
                        mode.changeSubMode('default');
                    }
                }
                if (e.keyCode == 72) {
                    if (mode.getSubMode() != 'scroll') {
                        mode.changeSubMode('scroll');
                        smoothScroll(scrollLeft, 1);
                    } else {
                        smoothScroll(scrollLeft, 1);
                    }
                }
                if (e.keyCode == 74) {
                    if (mode.getSubMode() != 'scroll') {
                        mode.changeSubMode('scroll');
                        smoothScroll(scrollDown, 1);
                    } else {
                        smoothScroll(scrollDown, 1);
                    }
                }
                if (e.keyCode == 75) {
                    if (mode.getSubMode() != 'scroll') {
                        mode.changeSubMode('scroll');
                        smoothScroll(scrollUp, 1);
                    } else {
                        smoothScroll(scrollUp, 1);
                    }
                }
                if (e.keyCode == 76) {
                    if (mode.getSubMode() != 'scroll') {
                        mode.changeSubMode('scroll');
                        smoothScroll(scrollRight, 1);
                    } else {
                        smoothScroll(scrollRight, 1);
                    }
                }
                if (e.keyCode == 85) {
                    if (mode.getSubMode() != 'scroll') {
                        mode.changeSubMode('scroll');
                        smoothScroll(scrollUp, 4);
                    } else {
                        smoothScroll(scrollUp, 4);
                    }
                }
                if (e.keyCode == 68) {
                    if (mode.getSubMode() != 'scroll') {
                        mode.changeSubMode('scroll');
                        smoothScroll(scrollDown, 4);
                    } else {
                        smoothScroll(scrollDown, 4);
                    }
                }
                if (e.keyCode == 72 && e.shiftKey) {
                    window.history.back(-1);
                }
                if (e.keyCode == 76 && e.shiftKey) {
                    window.history.forward(1);
                }
                if (e.keyCode == 70) {
                    if (mode.getMode() != 'command') {
                        mode.changeMode('command');
                    } else if ($('.hints-before').length != 0) {
                        hideHints();
                        mode.changeSubMode('default');
                    } else if (mode.getSubMode() != 'hints') {
                        mode.changeSubMode('hints');
                        showHints();
                    }
                }
            }
        };
});
/**
 */
function Mode() {
    let mode = 'normal';
    let subMode = 'normal';
    this.changeMode = function (newMode) {
        mode = newMode;
        this.changePopUp();
    };
    this.changeSubMode = function (newSubMode) {
        subMode = newSubMode;
        this.changePopUp();
    };
    this.getMode = function () {
        return mode;
    };
    this.getSubMode = function () {
        return subMode;
    };

    this.changePopUp = function () {
        try {
            clearTimeout(popup);
        } catch (error) {};
        $('#mode').remove();
        let popUp = document.createElement('div');
        popUp.innerHTML = '<div id=\'modePop\'>' + 'Mode: ' +
            mode + '</div>' + '<div id=\'subModePop\'>' + subMode + '</div>';
        popUp.id = 'mode';
        document.body.appendChild(popUp);
        popup = setTimeout(function () {
            $('#mode').remove();
        }, 500);
    };
}
/**
 */
function getSettings() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'setting.json', true);
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                let params = JSON.parse(xhr.response);
                console.log(params);
            }
        }
    };
    xhr.send();
}