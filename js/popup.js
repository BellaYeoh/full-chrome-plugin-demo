// popup.js call background.js
var bg = chrome.extension.getBackgroundPage();
bg.test();
alert(bg.document.body.innerHTML);

// popup.js send message to content script
document
  .getElementById('sendToContent')
  .addEventListener('click', function () {
    sendMessageToContentScript(
      {
        cmd: 'hello,I am popup! ',
        value: 'popup',
      },
      response => {
        if (response) {
          alert('收到来自content-script的回复：' + response);
        }
      }
    );
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
    'I am popup,I accepted your message：' +
      JSON.stringify(request)
  );
});
