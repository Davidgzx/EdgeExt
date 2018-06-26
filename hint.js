function randomString(len) {　　
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
    var maxPos = $chars.length;　　
    var pwd = '';　　
    for (i = 0; i < len; i++) {　　　　
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
    }　　
    return pwd;
}

function showHints() {
    $(".hints-before").remove();
    $(".hints-after").remove();
    generateContainer();
    $("a:visible").each(function () {
        generateHints(this)
    })
}

function generateContainer() {
    var container = document.createElement('div')
    container.className = 'container';
    document.body.appendChild(container);
}

function generateHints(element) {
    position = GetAbsPosition(element);
    if (position != null) {
        var hintDiv = document.createElement('div')
        hintDiv.href = element.href
        hintDiv.innerHTML = randomString(4)
        hintDiv.className = 'hints-before';
        hintDiv.style.left = position.left + 'px';
        hintDiv.style.top = position.top + 'px';
        element.parentNode.appendChild(hintDiv)
    }

}

function isElemVisible(element, y) {
    if ($(window).scrollTop() > y + $(element).outerHeight() || $(window).scrollTop() < y - $(window).height()) {
        return false;
    }
    return true;
}
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function GetAbsPosition(element) {
    var t = element.offsetTop;
    if (isScrolledIntoView(element)) {
        var l = element.offsetLeft;
        if (t < 10) {
            t += 10;
        }
        if (l < 10) {
            l += 10;
        }
        return {
            left: l,
            top: t
        }
    } else {
        return null;
    }//
}