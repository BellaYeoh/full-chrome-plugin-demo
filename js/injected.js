// injected.js send message to content-script.js
// first method
window.postMessage({ cmd: 'message', data: 'hello' }, '*');
