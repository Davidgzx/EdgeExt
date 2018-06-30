const chars = 'ABCDEFGHJKMNPQRSTWXYZ';

function hintCodes(chars, count) {
    let base = chars.length;
    if (count <= base) {
        return chars.slice(0, count).split('');
    }
    let codeWord = function (n, b) {
        let word = [];
        for (let i = 0; i < b; i++) {
            word.push(chars.charAt(n % base));
            n = ~~(n / base);
        }
        return word.reverse().join('');
    };
    let b = Math.ceil(Math.log(count) / Math.log(base));
    let cutoff = Math.pow(base, b) - count;
    let codes0 = [];
    let codes1 = [];
    let codeIndex = 0;
    for (let l = ~~(cutoff / (base - 1)); codeIndex < l; codeIndex++) {
        codes0.push(codeWord(codeIndex, b - 1));
    }
    codes0.sort();
    for (; codeIndex < count; codeIndex++) {
        codes1.push(codeWord(codeIndex + cutoff, b));
    }
    codes1.sort();
    return codes0.concat(codes1);
}


function showHints() {
    let hintContainer = document.createElement('div');
    hintContainer.id = 'hintContainer';
    // console.log($(this).outerWidth()+"  "+document.body.clientHeight)
    hintContainer.style.width = $(document).width()+'px';
    hintContainer.style.height =$(document).height()+'px';
    links = getClickableLinks();
    var j = 0;

    for (let i = 0; i < links.length; i++) {
        position = getVisibleBoundingRect(links[i]);
        if (position != null) {
            j++
            generateHints(links[i], position, hintContainer);
        }
    }

    document.body.appendChild(hintContainer);
    console.log($('#hintContainer').height())
    innerText = hintCodes(chars, j);
    makeHintsText(innerText);
}

function makeHintsText(innerText) {
    $(".hintsEdge").each(function (index, element) {
        element.innerText = innerText[index];
    });
}

function hideHints() {
    $('.hintsEdge').remove();
    $('#hintContainer').remove();

}

function generateHints(element, pos, container) {
    let hintDiv = document.createElement('div');
    hintDiv.href = element.href;
    hintDiv.className = 'hintsEdge';
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
    let rects = node.getClientRects();
    if (rects.length === 0) {
        return null;
    }
    if (node.offsetWidth === 0 && node.offsetHeight === 0) return null;
    if (node.getClientRects().length === 0) return null;

    var style = window.getComputedStyle(node);

    if (style.visibility === 'hidden') return null;
    if (style.opacity === '0') return null;
    let result = null;

    outer:
        for (let i = 0; i < rects.length; i++) {
            let r = rects[i];

            if (r.height <= 1 || r.width <= 1) {
                let children = node.children;
                for (let j = 0; j < children.length; j++) {
                    let child = children[j];
                    let childRect = getVisibleBoundingRect(child);
                    if (childRect !== null) {
                        result = childRect;
                        break outer;
                    }
                }
            } else {
                if (r.left + r.width < 5 || r.top + r.height < 5) {
                    continue;
                }
                if (innerWidth - r.left < 5 || innerHeight - r.top < 5) {
                    continue;
                }

                result = r;
                break;
            }
        }

    if (result !== null) {
        result = {
            left: Math.max(0, result.left),
            top: Math.max(0, result.top),

        };
    }

    return result;
}