# dku-everytime-extension
repository for DKU Opensource SW team project

https://kyni.notion.site/1b416d2b6c8c80de8a7eccb232fe7fb2

![image](https://github.com/user-attachments/assets/1835053e-0413-46ba-a23d-162bf56946e3)


---
# 개발자 가이드

### 프로젝트 디렉터리 구조
- background/ : 백그라운드에서 돌아가는 스크립트
- icons/ : 사용되는 icon
- lib/ : 라이브러리를 쓸 경우 넣을 폴더
- options/ : 확장프로그램 세부 정보에서 들어갈 수 있는 옵션 탭을 관리
- **popup/** : 팝업 창의 HTML/CSS/JS
- **scripts/** : 실제로 확장프로그램이 **everytime.kr** 에 대해 적용하는 JS/CSS

확장프로그램이 everytime.kr 에 적용하는 전체적인 내용은 content.js 를 확인하면 볼 수 있습니다.
content.js 는 JS의 module 기능을 이용할 수 없어 import 등이 불가능합니다.

### 확장 프로그램 테스트 방법

![image](https://github.com/user-attachments/assets/df6659b7-759e-4dcd-82db-b1ec7dad1177)
1. 크롬 브라우저 우측 상단에 확장프로그램 버튼을 눌러 `확장 프로그램 관리` 클릭합니다.
또는 주소창에 직접 chrome://extension 을 입력합니다.

![image](https://github.com/user-attachments/assets/47b917a6-02e3-433c-a4b0-ea7c762c8e45)
2. 확장프로그램 관리 탭으로 이동하였으면, 우측 상단에 개발자 모드를 킵니다.

![image](https://github.com/user-attachments/assets/dc1fba75-7b9f-499d-bbb5-5da6d64bd6ea)
3. 개발자 모드를 키면 압축해제된 확장프로그램을 로드할 수 있습니다.
이 방법으로 dku-everytime-extension 프로젝트를 직접 테스트할 수 있습니다.



---
# 유저 가이드
