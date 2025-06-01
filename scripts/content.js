// ─── ① 로고 바꾸기 ───
const observer = new MutationObserver((mutations, obs) => {
  const logoImg = document.querySelector("nav #logo a img");
  if (logoImg) {
    console.log("✅ 로고 교체 완료");
    logoImg.src = chrome.runtime.getURL("icons/dku_main_logo.png");
    obs.disconnect();
  }
});
(function adBlocker() {
  const adSelectors = [
    '[id^="ad-"]',         
    '[class*="ad-"]',     
    '.ad', '.ads',        
    '.banner', '.banner-ad',
    '#sponsor', '.sponsor',
    'iframe[src*="ads"]'
  ];

  
  function removeAds(root = document) {
    adSelectors.forEach(sel => {
      root.querySelectorAll(sel).forEach(el => el.parentElement.remove());
    });
  }


  removeAds();

  new MutationObserver((mutations) => {
    mutations.forEach(m => {
      if (m.addedNodes.length) {
        m.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;
          removeAds(node);
        });
      }
    });
  }).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
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

