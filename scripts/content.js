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

      chrome.storage.local.get(['timetable'], (res) => {
        if(res.timetable ?? true) {
            // iframe 생성
            const iframe = document.createElement('iframe');
            iframe.src = 'https://everytime.kr/timetable';
            iframe.style.border = 'none';
            iframe.style.transform = 'scale(0.8)';       // 80%로 축소
            iframe.style.transformOrigin = 'top left';   // 기준점을 좌상단으로
            iframe.style.width = '125%';                 // 축소된 만큼 보이게 너비 증가
            iframe.style.height = '1100px';
            iframe.style.overflowWrap = 'none';             

            //차단 오버레이 설정할 div (포지셔닝)
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            wrapper.style.height = '680px';
            wrapper.style.marginBottom = '10px';
            wrapper.style.overflow = "hidden";
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


      chrome.storage.local.get(['food'], (res) => {
        if (res.food ?? true) {
          // 3. 학식 메뉴 랜덤 3개 추천
          fetch(chrome.runtime.getURL("scripts/menu.json"))
            .then((response) => response.json())
            .then((menu_data) => {
              // 학식 전체 메뉴에서 무작위 3개 선택
              const allMenus = [];
              menu_data.메뉴.forEach((brandItem) => {
                brandItem.메뉴.forEach((menu) => {
                  allMenus.push({
                    브랜드: brandItem.브랜드,
                    이름: menu.이름,
                    가격: menu.가격
                  });
                });
              });
    
              const randomMenus = allMenus.sort(() => 0.5 - Math.random()).slice(0, 3);
    
              // 테이블 생성
              const table = document.createElement('table');
              table.style.borderCollapse = 'collapse';
              table.style.margin = '10px 0';
              table.style.border = '1px solid #ccc';
              table.style.width = '100%';
              table.style.backgroundColor = '#fff';
              table.style.borderRadius = '8px';
              table.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)';
              table.style.fontSize = '14px';
    
              // 테이블 헤더
              const thead = document.createElement('thead');
              thead.innerHTML = `
                <tr style="background-color: #e0e0e0;">
                  <th style="padding: 10px; border: 1px solid #ccc;">브랜드</th>
                  <th style="padding: 10px; border: 1px solid #ccc;">메뉴</th>
                  <th style="padding: 10px; border: 1px solid #ccc;">가격</th>
                </tr>
              `;
              table.appendChild(thead);
    
              // 테이블 본문
              const tbody = document.createElement('tbody');
              randomMenus.forEach(menu => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td style="padding: 8px; border: 1px solid #ccc; text-align: center;">${menu.브랜드}</td>
                  <td style="padding: 8px; border: 1px solid #ccc;">${menu.이름}</td>
                  <td style="padding: 8px; border: 1px solid #ccc; text-align: right;">${menu.가격}</td>
                `;
                tbody.appendChild(row);
              });
    
              table.appendChild(tbody);
    
              // 자연스럽게 레이아웃 내에 삽입
              const rightside = document.querySelector('#container > .rightside');
              if (rightside) {
                const firstCard = rightside.querySelector('.card');
                if (firstCard) {
                  rightside.insertBefore(table, firstCard); // 카드들 위에 자연스럽게 삽입
                } else {
                  rightside.appendChild(table); // 카드 없으면 맨 아래 삽입
                }
              } else {
                document.body.appendChild(table); // fallback
              }
            })
            .catch(err => {
              console.error("학식 메뉴 로딩 실패:", err);
            });
        }
      });
    }
});

// 3. 학점 계산기 삽입 
