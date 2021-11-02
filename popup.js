// dynamic inject js
getCurrentTabId(function (tabId) {
  chrome.tabs.executeScript(tabId, {
    code: 'document.body.style.backgroundColor="red"',
  });
});

getCurrentTabId2(function (tabId) {
  chrome.tabs.executeScript(tabId, { file: 'some-script.js' });
});

// inject css
chrome.tabs.query(
  { active: true, currentWindow: true },
  function (tabs) {
    chrome.tabs.insertCSS(tabs[0].id, { file: 'some-style.css' });
  }
);

// get current tab id
// method 1:
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

function getCurrentTabId2(callback) {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(
      { active: true, windowId: currentWindow.id },
      function (tabs) {
        if (callback) {
          callback(tabs.length ? tabs[0].id : null);
        }
      }
    );
  });
}
