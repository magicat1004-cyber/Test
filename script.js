/* =========================================================
   ✏️  여기만 고치면 돼요! (쓸모야 홈페이지 설정)
   ========================================================= */
const SITE_CONFIG = {
  // 1) 스레드 프로필 주소 — 예: "https://www.threads.net/@아이디"
  //    비워두면 버튼을 눌렀을 때 "주소 입력 예정" 안내가 나와요.
  threadsUrl: "https://www.threads.com/@erudaunni",
  threadsHandle: "@erudaunni",   // 홈페이지에 표시되는 스레드 계정 이름

  // 2) 쓸모야 캐릭터 이미지 — images 폴더에 그림을 넣고 경로를 적어주세요.
  //    예: "images/sslmoya.png"  (비워두면 임시 캐릭터가 보여요)
  characterImage: "images/sslmoya.jpg",

  // 3) 작품 갤러리 — 실제 작품이 생기면 내용을 채워주세요.
  //    category: "emotion"(감성 그림) / "popup"(팝업 스타일) / "ai"(AI 창작)
  //    image: "images/파일이름.png" (비워두면 '작품 준비 중' 카드로 보여요)
  gallery: [
    { category: "emotion", title: "감성 그림 자리 1", image: "", date: "", description: "" },
    { category: "emotion", title: "감성 그림 자리 2", image: "", date: "", description: "" },
    { category: "popup",   title: "팝업 스타일 작품 자리 1", image: "", date: "", description: "" },
    { category: "popup",   title: "팝업 스타일 작품 자리 2", image: "", date: "", description: "" },
    { category: "ai",      title: "AI 창작 작품 자리 1", image: "", date: "", description: "" },
    { category: "ai",      title: "AI 창작 작품 자리 2", image: "", date: "", description: "" }
  ],

  // 4) AI와 함께하는 배움 — link 에 결과물 주소를 넣으면 '보러 가기' 버튼이 생겨요.
  learning: [
    { icon: "card",    title: "디지털 명함",     description: "나를 소개하는 작은 온라인 명함을 직접 만들어 보았어요.", link: "" },
    { icon: "heart",   title: "긍정 확언 카드",   description: "마음이 지칠 때 꺼내 보는 다정한 문장 카드를 만들었어요.", link: "" },
    { icon: "book",    title: "하루 기록장",     description: "오늘의 기분과 작은 일들을 차곡차곡 남기는 기록장이에요.", link: "" },
    { icon: "cookie",  title: "포춘쿠키",       description: "톡 깨뜨리면 오늘의 메시지가 나오는 작은 놀이를 만들었어요.", link: "" }
  ],

  // 5) 오늘의 다정한 한마디 — 문장을 자유롭게 추가/수정하세요.
  kindWords: [
    "오늘 하루도 충분히 잘 해냈어요.",
    "천천히 가도 괜찮아요. 멈추지 않으면 돼요.",
    "당신의 평범한 하루가 누군가에겐 위로가 돼요.",
    "작은 것에 웃을 수 있는 마음, 그게 가장 큰 쓸모예요.",
    "오늘의 하늘을 한 번 올려다봐요. 생각보다 예쁠지도 몰라요.",
    "애쓰지 않아도 당신은 이미 소중해요.",
    "잘하고 있어요. 정말로요.",
    "따뜻한 차 한 잔처럼, 오늘의 마음도 데워지길.",
    "조금 서툴러도 괜찮아요. 그게 바로 당신다움이에요.",
    "내일은 오늘보다 한 뼘 더 다정한 날이 될 거예요.",
    "쉬어 가는 것도 앞으로 가는 방법 중 하나예요.",
    "당신의 이야기를 기다리는 사람이 있어요."
  ]
};

/* =========================================================
   아래부터는 홈페이지 동작 코드예요. (수정하지 않아도 돼요)
   ========================================================= */
(function () {
  "use strict";

  const PLACEHOLDER_CHAR = "images/sslmoya-placeholder.svg";
  const CATEGORY_LABEL = { emotion: "감성 그림", popup: "팝업 스타일", ai: "AI 창작" };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const escapeHTML = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- 안내 토스트 ---------- */
  let toastTimer;
  function showToast(msg) {
    const toast = $("#toast");
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2800);
  }

  /* ---------- 캐릭터 이미지 ---------- */
  function setupCharacter() {
    const src = SITE_CONFIG.characterImage.trim();
    if (!src) return;
    $$(".js-character").forEach((img) => {
      img.onerror = () => { img.onerror = null; img.src = PLACEHOLDER_CHAR; img.classList.remove("is-photo"); };
      img.classList.add("is-photo");   // 배경이 있는 그림(사진형)에 맞는 모양으로 표시
      img.src = src;
      if (img.alt) img.alt = "쓸모야 캐릭터";
    });
    $$(".js-placeholder-tag").forEach((el) => el.remove());
  }

  /* ---------- 스레드 링크 ---------- */
  function setupThreads() {
    const url = SITE_CONFIG.threadsUrl.trim();
    $$(".js-threads-link").forEach((a) => {
      if (url) {
        a.href = url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      } else {
        a.href = "#";
        a.classList.add("is-pending");
        a.addEventListener("click", (e) => {
          e.preventDefault();
          showToast("스레드 주소가 곧 연결될 예정이에요. 조금만 기다려 주세요!");
        });
      }
    });
    if (!url) $$(".js-threads-notice").forEach((el) => (el.hidden = false));

    // 스레드 계정 이름 표시 (@erudaunni)
    const handle = (SITE_CONFIG.threadsHandle || "").trim();
    $$(".js-threads-handle").forEach((el) => {
      if (!handle) { el.hidden = true; return; }
      el.hidden = false;
      const name = $(".js-threads-handle-name", el);
      if (name) name.textContent = handle;
      if (el.tagName === "A") {
        if (url) {
          el.href = url;
          el.target = "_blank";
          el.rel = "noopener noreferrer";
        } else {
          el.removeAttribute("href");
        }
      }
    });
  }

  /* ---------- 오늘의 다정한 한마디 ---------- */
  function setupKindWords() {
    const words = SITE_CONFIG.kindWords;
    const text = $("#kindText");
    const btn = $("#kindBtn");
    let current = 0;
    btn.addEventListener("click", () => {
      if (words.length < 2) return;
      let next;
      do { next = Math.floor(Math.random() * words.length); } while (next === current);
      current = next;
      text.classList.add("is-changing");
      setTimeout(() => {
        text.textContent = words[current];
        text.classList.remove("is-changing");
      }, 260);
    });
  }

  /* ---------- 갤러리 ---------- */
  const placeholderArt = (category) => {
    const art = {
      emotion: '<svg viewBox="0 0 120 90" aria-hidden="true"><circle cx="88" cy="26" r="12" fill="#F1DDB8"/><path d="M0 90V62c20-14 40-14 60 0s40 14 60 0v28z" fill="#B9C6AE"/><path d="M0 90V74c24-10 48-10 72 0s34 8 48 2v14z" fill="#9CAF94"/></svg>',
      popup:   '<svg viewBox="0 0 120 90" aria-hidden="true"><path d="M10 80L60 70l50 10" fill="none" stroke="#C9B79A" stroke-width="2"/><rect x="22" y="36" width="18" height="38" fill="#D9CBB2"/><rect x="44" y="22" width="22" height="50" fill="#E6D8C3"/><rect x="70" y="40" width="20" height="34" fill="#C9B79A"/><circle cx="96" cy="58" r="9" fill="#B9C6AE"/></svg>',
      ai:      '<svg viewBox="0 0 120 90" aria-hidden="true"><path d="M60 16l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill="#9CAF94"/><path d="M90 50l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#D4C1A5"/><path d="M30 54l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#E6D8C3"/></svg>'
    };
    return art[category] || art.emotion;
  };

  function renderGallery() {
    const grid = $("#galleryGrid");
    grid.innerHTML = SITE_CONFIG.gallery.map((item, i) => {
      const hasImage = item.image && item.image.trim();
      const media = hasImage
        ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" loading="lazy" />`
        : `<div class="art-placeholder art-placeholder--${escapeHTML(item.category)}">${placeholderArt(item.category)}<span>작품 준비 중</span></div>`;
      return `
        <button class="art-card reveal" type="button" data-index="${i}" data-category="${escapeHTML(item.category)}">
          <div class="art-card__media">${media}</div>
          <div class="art-card__body">
            <span class="chip">${CATEGORY_LABEL[item.category] || "작품"}</span>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${hasImage ? "자세히 보기" : "곧 이 자리에 작품이 올라와요"} →</p>
          </div>
        </button>`;
    }).join("");

    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".art-card");
      if (card) openModal(Number(card.dataset.index));
    });
  }

  function setupFilter() {
    $$(".filter__btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        $$(".filter__btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const f = btn.dataset.filter;
        $$(".art-card").forEach((card) => {
          const show = f === "all" || card.dataset.category === f;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  }

  /* ---------- 상세 팝업 ---------- */
  let lastFocus = null;
  function openModal(index) {
    const item = SITE_CONFIG.gallery[index];
    if (!item) return;
    const hasImage = item.image && item.image.trim();
    $("#modalMedia").innerHTML = hasImage
      ? `<img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}" />`
      : `<div class="art-placeholder art-placeholder--${escapeHTML(item.category)}">${placeholderArt(item.category)}<span>작품 준비 중</span></div>`;
    $("#modalCategory").textContent = CATEGORY_LABEL[item.category] || "작품";
    $("#modalTitle").textContent = item.title;
    $("#modalDesc").textContent = item.description && item.description.trim()
      ? item.description
      : "아직 이 자리에 소개할 작품이 등록되지 않았어요. 작품이 준비되면 그림과 함께 이야기를 들려드릴게요.";
    $("#modalMeta").textContent = item.date ? `기록한 날 · ${item.date}` : "";

    lastFocus = document.activeElement;
    const modal = $("#modal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    $(".modal__close").focus();
  }

  function closeModal() {
    const modal = $("#modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }

  function setupModal() {
    $$("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $("#modal").classList.contains("is-open")) closeModal();
    });
  }

  /* ---------- AI와 함께하는 배움 ---------- */
  const ICONS = {
    card:   '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="12" width="36" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="17" cy="23" r="4" fill="currentColor"/><path d="M26 21h10M26 27h7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>',
    heart:  '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39s-14-8.5-14-19a8 8 0 0 1 14-5.3A8 8 0 0 1 38 20c0 10.5-14 19-14 19z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>',
    book:   '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 13c-4-3-10-3-15-2v25c5-1 11-1 15 2 4-3 10-3 15-2V11c-5-1-11-1-15 2zM24 13v25" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg>',
    cookie: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 28c0-9 7-16 16-16s16 7 16 16c-5-3-11-4-16 0-5-4-11-3-16 0z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 28l4 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>'
  };

  function renderLearning() {
    $("#learningGrid").innerHTML = SITE_CONFIG.learning.map((item) => {
      const link = item.link && item.link.trim();
      const action = link
        ? `<a class="learn-card__link" href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer">보러 가기 →</a>`
        : `<span class="learn-card__link is-pending">링크 준비 중</span>`;
      return `
        <article class="learn-card reveal">
          <div class="learn-card__icon">${ICONS[item.icon] || ICONS.card}</div>
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
          ${action}
        </article>`;
    }).join("");
  }

  /* ---------- 스크롤 애니메이션 ---------- */
  function setupReveal() {
    let pending = $$(".reveal");

    // 같은 줄의 카드가 순서대로 나타나도록 살짝 시간차
    pending.forEach((el) => {
      const siblings = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
      const idx = siblings.indexOf(el);
      if (idx > 0) el.style.transitionDelay = `${Math.min(idx, 5) * 80}ms`;
    });

    // 화면 안에 들어온 요소를 부드럽게 나타나게 해요
    let ticking = false;
    const check = () => {
      ticking = false;
      const limit = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-visible");
          return false;
        }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("load", check);
    check();
  }

  /* ---------- 상단 메뉴 ---------- */
  function setupNav() {
    const nav = $("#nav");
    const toggle = $("#navToggle");
    const menu = $("#navMenu");

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
    $$("a", menu).forEach((a) => a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- 팝업북 배경 패럴랙스 ---------- */
  function setupParallax() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = [
      [$(".city--back"), 0.08],
      [$(".city--mid"), 0.16],
      [$(".city--front"), 0.26]
    ];
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight);
        layers.forEach(([el, speed]) => { if (el) el.style.transform = `translateY(${y * speed}px)`; });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- 시작 ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    $("#year").textContent = new Date().getFullYear();
    setupCharacter();
    setupThreads();
    setupKindWords();
    renderGallery();
    setupFilter();
    setupModal();
    renderLearning();
    setupNav();
    setupParallax();
    setupReveal();
  });
})();
