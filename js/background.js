// api called by popup.js
function test() {
  alert('I am background!');
}

// // background.js call popup.js
var views = chrome.extension.getViews({ type: 'popup' });
if (views.length > 0) {
  alert(views[0].location.href);
}

// background.js send message to content-script.js
chrome.contextMenus.create({
  title: '测试右键菜单',
  onclick: function () {
    sendMessageToContentScript(
      { cmd: 'hello,I am background！', value: 'background' },
      response => {
        if (response)
          alert('收到来自content-script的回复：' + response);
      }
    );
  },
});

function sendMessageToContentScript(message, callback) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        message,
        function (response) {
          if (callback) callback(response);
        }
      );
    }
  );
}

// listen recept message from content-script.js
chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('receive message from content-script：');
  console.log(request, sender, sendResponse);
  sendResponse(
    'I am background,I accepted your message：' +
      JSON.stringify(request)
  );
});
