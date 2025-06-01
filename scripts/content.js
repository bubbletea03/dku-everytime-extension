chrome.runtime.sendMessage({ type: "refreshed"});

function applyCSS(fileName) {
  if (document.getElementById("dynamic-style")) return;

  const link = document.createElement("link");
  link.id = "dynamic-style";
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = chrome.runtime.getURL(fileName);
  document.head.appendChild(link);

  console.log(link.href);
}

chrome.storage.local.get(["adguard"], (settings) => {
  if (settings.adguard === false) applyCSS("scripts/activeBanners.css");
})

// ─── ① 로고 바꾸기 ───


const observer = new MutationObserver((mutations, obs) => {
  const logoImg = document.querySelector("nav #logo a img");
  if (logoImg) {
    console.log("✅ 로고 교체 완료");
    logoImg.src = chrome.runtime.getURL("icons/dku_main_logo.png");
    obs.disconnect();
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "adguard") {
    applyCSS("scripts/adguard.css");
  }
});


observer.observe(document.body, {
  childList: true,
  subtree: true
});


window.addEventListener('load', () => {
    const rightside = document.querySelector('#container > .rightside');

    if (rightside) {
        rightside.innerHTML = '';

        const iframe = document.createElement('iframe');
        iframe.src = 'https://everytime.kr/timetable';
        iframe.style.border = 'none';
        iframe.style.transform = 'scale(0.8)';       // 80%로 축소
        iframe.style.transformOrigin = 'top left';   // 기준점을 좌상단으로
        iframe.style.width = '125%';                 // 축소된 만큼 보이게 너비 증가
        iframe.style.height = '1100px';              // 실제 높이는 콘텐츠에 맞게 크게

        rightside.appendChild(iframe);
    }
});

