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
