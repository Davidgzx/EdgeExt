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
    let hintContain = document.createElement('div');
    hintContain.id="container"
    links = getClickableLinks();
    for (var i = 0; i < links.length; i++) {
        position = getVisibleBoundingRect(links[i]);
        if (position != null) {
            generateHints(links[i], position, hintContain);
        }
    }
    document.body.appendChild(hintContain);
}
function clickContainer(){
    
}
function hideHints() {
    $('.hints-before').remove();
    $('.hints-after').remove();
}

function generateHints(element, pos, container) {
    let hintDiv = document.createElement('div');
    hintDiv.href = element.href;
    hintDiv.innerHTML = element.innerText;
    hintDiv.className = 'hints-before';
    hintDiv.style.left = pos.left + document.scrollingElement.scrollLeft + 'px';
    hintDiv.style.top = pos.top + document.scrollingElement.scrollTop + 'px';
    container.appendChild(hintDiv);
}


// function isScrolledIntoView(elem) {
//     let docViewTop = $(window).scrollTop();
//     let docViewBottom = docViewTop + $(window).height();
//     let elemTop = $(elem).offset().top;
//     let elemBottom = elemTop + $(elem).height();
//     return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
// }

// function GetAbsPosition(el) {
//     if (isScrolledIntoView(el)) {
//         let box = el.getBoundingClientRect();
//         let doc = el.ownerDocument;
//         let body = doc.body;
//         let html = doc.documentElement;
//         let clientTop = html.clientTop || body.clientTop || 0;
//         let clientLeft = html.clientLeft || body.clientLeft || 0;
//         let top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop;
//         let left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
//         return {
//             top: top,
//             left: left,
//         }

//         // return $(el).offset();
//     }
// }

function getClickableLinks() {
    let elems = $('a,button,area,select,textarea,input:visible');


    // switch (true) {
    //     case node.hasAttribute('contenteditable'):
    //     case node.hasAttribute('tabindex'):
    //     case node.hasAttribute('onclick'):
    //     case node.hasAttribute('aria-haspopup'):
    //     case node.hasAttribute('data-cmd'):
    //     case node.hasAttribute('jsaction'):
    //     case node.hasAttribute('data-ga-click'):
    //     case node.hasAttribute('aria-selected'):
    //         return true;
    // }
    return elems;
}

function getVisibleBoundingRect(node) {
    var rects = node.getClientRects();
    if (rects.length === 0)
        return null;

    var result = null;

    outer:
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];

            if (r.height <= 1 || r.width <= 1) {
                var children = node.children;
                for (var j = 0; j < children.length; j++) {
                    var child = children[j];
                    var childRect = this.getVisibleBoundingRect(child);
                    if (childRect !== null) {
                        result = childRect;
                        break outer;
                    }
                }
            } else {
                if (r.left + r.width < 5 || r.top + r.height < 5)
                    continue;
                if (innerWidth - r.left < 5 || innerHeight - r.top < 5)
                    continue;

                result = r;
                break;
            }
        }

    if (result !== null) {

        result = {
            left: Math.max(0, result.left),
            right: Math.min(result.right, innerWidth),
            top: Math.max(0, result.top),
            bottom: Math.min(result.bottom, innerHeight),
            width: result.width,
            height: result.height,
        };
    }

    return result;
}