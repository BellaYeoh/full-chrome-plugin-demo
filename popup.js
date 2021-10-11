document
  .getElementById('notify')
  .addEventListener('click', function () {
    chrome.notifications.create(null, {
      type: 'basic',
      iconUrl: 'icon.png',
      title: '这是标题',
      message: '发送一条桌面通知',
    });
  });
