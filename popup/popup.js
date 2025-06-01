document.querySelector(".right > a").addEventListener("click", function (e) {
    e.preventDefault();
    chrome.tabs.create({ url: this.href });
});

document.querySelector(".option-button").addEventListener("click", function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});

document.querySelectorAll(".switch-container input").forEach((input) => {
    input.addEventListener("change", () => {
        const settings = {
            theme: document.getElementById("theme-input").checked,
            adguard: document.getElementById("adguard-input").checked,
            popularCollapse: document.getElementById("popular-input").checked,
            keywordBlack: document.getElementById("keyword-input").checked,
        }

        chrome.storage.local.set(settings);
        chrome.runtime.sendMessage({ type: "setting-changed" }); // 백그라운드로 메시지 보내기
    })
})

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["theme", "adguard", "popularCollapse", "keywordBlack"], (res) => {
    document.getElementById("theme-input").checked = res.theme ?? true;
    document.getElementById("adguard-input").checked = res.adguard ?? true;
    document.getElementById("popular-input").checked = res.popularCollapse ?? true;
    document.getElementById("keyword-input").checked = res.keywordBlack ?? true;
  });
});