chrome.devtools.panels.create(
  'MyPanel',
  'img/icon.png',
  'mypanel.html',
  function (panel) {
    console.log('自定义面板创建成功！');
  }
);

chrome.devtools.panels.elements.createSidebarPane(
  'Images',
  function (sidebar) {
    sidebar.setExpression(
      'document.querySelectorAll("img")',
      'All Images'
    );
  }
);
