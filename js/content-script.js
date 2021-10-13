// listen recept message from background.js or popup.js
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  let msg = 'I accepted your message,';
  if (request.value) {
    msg += request.value + '.';
  } else {
    msg += '.';
  }

  sendResponse(msg);
});

// content-script.js send to background.js or popup.js
chrome.runtime.sendMessage(
  {
    greeting: 'hello,I am content-script,I send message to backend!',
  },
  function (response) {
    console.log('reply from backend: ' + response);
  }
);

// inject injected.js in page
document.addEventListener('DOMContentLoaded', function () {
  injectCustomJs();
});

function injectCustomJs(path) {
  const jsPath = path || 'js/injected.js';
  const temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
}

// listen accept message from injected.js
// first method
window.addEventListener(
  'message',
  function (e) {
    if (e.data.cmd === 'message') {
      console.log('收到消息：', e.data.data);
    }
  },
  false
);
