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
    let hintContain = document.createDocumentFragment();
    links = $('a');
    for (var i = 0; i < links.length; i++) {
        position = GetAbsPosition(links[i]);
        if (position != null) {
            generateHints(links[i], hintContain);
        }
    }
    document.body.appendChild(hintContain);
}

function hideHints() {
    $('.hints-before').remove();
    $('.hints-after').remove();
}

function generateHints(element, container) {
    let hintDiv = document.createElement('div');
    hintDiv.href = element.href;
    hintDiv.innerHTML = element.innerHTML;
    hintDiv.className = 'hints-before';
    hintDiv.style.left = position.left + 'px';
    hintDiv.style.top = position.top + 'px';
    container.appendChild(hintDiv);
}


function isScrolledIntoView(elem) {
    let docViewTop = $(window).scrollTop();
    let docViewBottom = docViewTop + $(window).height();
    let elemTop = $(elem).offset().top;
    let elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function GetAbsPosition(el) {
    if (isScrolledIntoView(el)) {
        //     let box = el.getBoundingClientRect();
        //     let doc = el.ownerDocument;
        //     let body = doc.body;
        //     let html = doc.documentElement;
        //     let clientTop = html.clientTop || body.clientTop || 0;
        //     let clientLeft = html.clientLeft || body.clientLeft || 0;
        //     let top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop;
        //     let left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
        //     return {
        //         top: top,
        //         left: left,
        //     }

        return $(el).offset();
    }
}