// listen connect
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port);

  if (port.name === 'test-connect') {
    port.onMessage.addListener(function (msg) {
      console.log('收到长连接消息', msg);
      if (msg.question === '你好，请问你是？') {
        port.postMessage({ answer: '我是你爸！' });
      }
    });
  }
});
