var pos = {
  distance: 200,
  speed: 2,
};
window.onload = function () {
  document.onkeydown =
    function f(e) {
      var e = e || window.event
      var i = 0;
      switch (e.keyCode) {
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
          showhints();
          break;
      }
    }
}
function smoothScroll(fun) {
  timer = 0
  for (var dur = 0; dur < pos.distance; dur += pos.speed) {
    timer = timer + 1
    t = setTimeout(fun, timer)
  }


}
function scrollRight() {
  window.scrollBy(pos.speed, 0);
}

function scrollDown() {
  window.scrollBy(0, pos.speed);
}

function scrollUp() {
  window.scrollBy(0, -pos.speed);
}

function scrollLeft() {
  window.scrollBy(-pos.speed, 0);
}

function showhints() {
  var links = $("a:visible");

  for (var i = 0; i < links.length; i++) {
    position = GetAbsPosition(links[i]);
    var oDiv = document.createElement('div')
    oDiv.innerHTML = '添加的div'
    oDiv.className = 'hints-before';
    oDiv.style.left = position.left - 10 + 'px';
    oDiv.style.top = position.top + 10 + 'px';
    links[i].parentNode.appendChild(oDiv);

  }


}

function GetAbsPosition(element) {
  var t = element.offsetTop;
  var l = element.offsetLeft;
  return { left: l, top: t }
}