# 쓸모야의 작은 세상

쓸모야의 Threads 활동을 소개하는 정적 홈페이지예요.

## 파일 구성
| 파일 | 하는 일 |
|---|---|
| `index.html` | 홈페이지의 글과 구조 (제목, 소개 문구 등) |
| `style.css` | 색상·글꼴·배치 (맨 위 `:root` 에서 색상 변경) |
| `script.js` | **맨 위 `SITE_CONFIG` 만 고치면 돼요** — 스레드 주소, 캐릭터 이미지, 작품, 배움 링크, 다정한 한마디 |
| `images/` | 그림을 넣는 폴더 (`sslmoya-placeholder.svg` 는 임시 캐릭터) |

## 자주 하는 수정
- 스레드 주소: `script.js` → `threadsUrl: "https://www.threads.com/@erudaunni"` (연결 완료)
- 표시되는 계정 이름: `script.js` → `threadsHandle: "@erudaunni"`
- 캐릭터 그림: `images/sslmoya.png` 로 저장 → `characterImage: "images/sslmoya.png"`
- 작품 추가: 그림을 `images/` 에 넣고 → `gallery` 의 `title`, `image`, `description`, `date` 채우기

## Vercel 배포
빌드 과정이 없는 정적 사이트라서 설정 없이 바로 올라가요. (`vercel.json` 포함)

**방법 1 — GitHub 연결 (추천, 수정할 때마다 자동 반영)**
1. GitHub 저장소에 이 폴더의 파일을 모두 올려요.
2. [vercel.com](https://vercel.com) → GitHub로 로그인 → **Add New… → Project**
3. 저장소를 고르고 **Import** → Framework Preset: **Other**, Build Command·Output Directory는 비워두고 **Deploy**
4. `https://프로젝트이름.vercel.app` 주소가 생겨요.

**방법 2 — 터미널 (Node.js 필요)**
```bash
npm i -g vercel
vercel        # 처음 배포(미리보기)
vercel --prod # 실제 주소로 배포
```
