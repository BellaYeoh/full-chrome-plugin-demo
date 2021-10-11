chrome.runtime.onInstalled.addListener(function () {
  // declarativeContent 用于设置插件激活规则，需要在 manifest.json 进行权限申请
  chrome.declarativeContent.onPageChanged.removeRules(
    undefined,
    function () {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: 'baidu.com' },
            }),
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()],
        },
      ]);
    }
  );
});
