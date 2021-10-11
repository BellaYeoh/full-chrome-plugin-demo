document.addEventListener('DOMContentLoaded', function () {
  var defaultConfig = { color: 'white', showImage: true }; // 默认配置
  // 读取数据，第一个参数是指定要读取的key以及设置默认值
  chrome.storage.sync.get(defaultConfig, function (items) {
    document.getElementById('color').value = items.color;
    document.getElementById('show_image').checked = items.showImage;
  });
});

document
  .getElementById('save')
  .addEventListener('click', function () {
    var color = document.getElementById('color').value;
    var showImage = document.getElementById('show_image').checked;

    chrome.extension.getBackgroundPage().showImage = showImage; // 让background即使生效
    chrome.storage.sync.set({ color, showImage }, function () {
      document.getElementById('status').textContent = '保存成功！';
    });
  });
