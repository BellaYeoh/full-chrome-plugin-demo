document
  .getElementById('check_jquery')
  .addEventListener('click', function () {
    chrome.devtools.inspectedWindow.eval(
      'jQuery.fn.jquery',
      function (result, isException) {
        var html = '';
        if (isException) html = '当前页面没有使用jQuery。';
        else html = '当前页面使用了jQuery，版本为：' + result;
        alert(html);
      }
    );
  });

document
  .getElementById('open_resource')
  .addEventListener('click', function () {
    chrome.devtools.inspectedWindow.eval(
      'window.location.href',
      function (result, isException) {
        chrome.devtools.panels.openResource(result, 20, function () {
          console.log('资源打开成功！');
        });
      }
    );
  });

document
  .getElementById('test_inspect')
  .addEventListener('click', function () {
    chrome.devtools.inspectedWindow.eval(
      'inspect(document.images[0])',
      function (result, isException) {}
    );
  });

document
  .getElementById('get_all_resources')
  .addEventListener('click', function () {
    chrome.devtools.inspectedWindow.getResources(function (
      resources
    ) {
      alert(JSON.stringify(resources));
    });
  });
