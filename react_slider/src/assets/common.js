const resize = function() {
  var fontSize = parseFloat(window.getComputedStyle(document.querySelector('html'))['font-size']) || 16;

  function goPAGE() {
      return (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
  }
  function autoSizie(){
      var w = document.documentElement.clientWidth;
      var oringiFontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) || 16;
      document.querySelector('html').setAttribute('data-origin-font-size', oringiFontSize);
      document.getElementsByTagName('html')[0].style.fontSize = goPAGE() ? (625*w/750*16/fontSize+'%') : (417+'%');
  }
  autoSizie()
  window.addEventListener('resize', autoSizie, false);
}
export default resize();
