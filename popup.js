chrome.storage.sync.get(["meaningObj"], function (value) {
  alert(JSON.stringify(value));
});
alert("helo");
