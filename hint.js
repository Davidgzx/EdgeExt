function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function showHints() {
    let container = document.createDocumentFragment();
    $('a:visible').each(function() {
        generateHints(this, container);
    });
    document.body.appendChild(container);
}

function hideHints() {
    $('.hints-before').remove();
    $('.hints-after').remove();
}

function generateHints(element, container) {
    position = GetAbsPosition(element);
    if (position != null) {
        let hintDiv = document.createElement('div');
        hintDiv.href = element.href;
        hintDiv.innerHTML = element.innerHTML;
        hintDiv.className = 'hints-before';
        hintDiv.style.left = position.left + 'px';
        hintDiv.style.top = position.top + 'px';
        container.appendChild(hintDiv);
    }
}

function isElemVisible(element, y) {
    if ($(window).scrollTop() > y + $(element).outerHeight() || $(window).scrollTop() < y - $(window).height()) {
        return false;
    }
    return true;
}

function isScrolledIntoView(elem) {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();
    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function GetAbsPosition(el) {
    let box = el.getBoundingClientRect();
    let doc = el.ownerDocument;
    let body = doc.body;
    let html = doc.documentElement;
    let clientTop = html.clientTop || body.clientTop || 0;
    let clientLeft = html.clientLeft || body.clientLeft || 0;
    let top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop;
    let left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
    return {
        top: top,
        left: left,
    };
}
