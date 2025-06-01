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

// 1. 로고 교체
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

// 2. 시간표 삽입 
window.addEventListener('load', () => {
    const rightside = document.querySelector('#container > .rightside');

    if (rightside) {

        chrome.storage.local.get(['popularCollapse'], (res) => {
          if (res.popularCollapse ?? true) {
            new MutationObserver((mutations, obs) => {
              const cards = rightside.querySelectorAll(".card");
              
              if (cards[0] && cards[1]) {
                if (cards[0].querySelector('a.article') && cards[1].querySelector('a.list')) {
                  cards[0].querySelectorAll('a.article').forEach((a) => a.remove());
                  cards[1].querySelectorAll('a.list').forEach((a) => a.remove());
                  obs.disconnect();
                }
              }
            }).observe(document.body, {childList: true, subtree: true});
          }
        });

      // iframe 생성
      const iframe = document.createElement('iframe');
      iframe.src = 'https://everytime.kr/timetable';
      iframe.style.border = 'none';
      iframe.style.transform = 'scale(0.8)';       // 80%로 축소
      iframe.style.transformOrigin = 'top left';   // 기준점을 좌상단으로
      iframe.style.width = '125%';                 // 축소된 만큼 보이게 너비 증가
      iframe.style.height = '1100px';             

        //차단 오버레이 설정할 div (포지셔닝)
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        wrapper.style.height = '880px';
        wrapper.style.marginBottom = '10px';
        wrapper.appendChild(iframe);

      // top-left 50x50 클릭 차단 오버레이
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '50px';
      overlay.style.height = '50px';
      overlay.style.zIndex = '10';
      overlay.style.background = 'transparent'; //투명

        wrapper.appendChild(overlay);
        rightside.prepend(wrapper);
    }
});

// 3. 학점 계산기 삽입 
