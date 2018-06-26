$(function() {
    var mode = new Mode();
    getSettings();
    document.onkeydown =
        function f(e) {
            var e = e || window.event

            switch (e.keyCode) {
                case 27:
                    mode.changeMode("123", '123')
                case 65:
                    smoothScroll(scrollLeft);
                    break;

                case 66:
                    smoothScroll(scrollUp);
                    break;

                case 67:
                    smoothScroll(scrollDown);
                    break;

                case 68:
                    smoothScroll(scrollRight);
                    break;
                case 69:
                    window.history.back(-1);
                    break;
                case 70:
                    window.history.forward(1);
                    break;
                case 71:
                    showHints();
                    break;

            }
        }
});

function Mode() {
    var mode = "default";
    var subMode = "normal";
    this.changeMode = function (NewMode, newSubMode) {
        try {
            clearTimeout(popup)
        } catch (error) {

        }

        $(".mode").remove();
        mode = NewMode;
        subMode = newSubMode;
        var popUp = document.createElement('div')
        popUp.innerHTML = newSubMode;
        popUp.className = 'mode';
        document.body.appendChild(popUp)
        popup = setTimeout(function () {
            $(".mode").remove();
        }, 2000);
    }
    this.getMode = function () {
        return mode;
    }
    this.getSubMode = function () {
        return subMode;
    }
}

function getSettings() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'setting.json', true);
    xhr.onload = function () {
        if (xhr.readyState == 4) {
            if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                var params = JSON.parse(xhr.response);
                console.log(params)
            }


        }
    };
    xhr.send();

}