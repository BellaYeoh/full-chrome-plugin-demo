// popup send message to content-scripts by connect
document
  .getElementById('connectToContent')
  .addEventListener('click', function () {
    getCurrentTabId(tabId => {
      const port = chrome.tabs.connect(tabId, {
        name: 'test-connect',
      });

      port.postMessage({ question: '你好，请问你是？' });
      port.onMessage.addListener(function (msg) {
        alert('收到消息：' + msg.answer);

        if (msg.answer && msg.answer.startsWith('我是')) {
          port.postMessage({ question: '哦，原来是你啊！' });
        }
      });
    });
  });

function getCurrentTabId(callback) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      if (callback) {
        callback(tabs.length ? tabs[0].id : null);
      }
    }
  );
}
