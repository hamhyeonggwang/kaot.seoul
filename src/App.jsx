import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════ */
const D = {
  black:     "#1C1C1C",
  navy:      "#1A2B4C",
  navyMid:   "#243760",
  ivory:     "#F5F0E8",
  ivoryDim:  "#EDE7D9",
  ivoryDark: "#DDD5C4",
  teal:      "#2A9D8F",
  tealDim:   "#1F7A6E",
  tealPale:  "#E4F4F2",
  stone:     "#8C8275",
  stoneLt:   "#B5AFA6",

  /* ── 폰트 역할 분담 ──
     Pretendard   : UI 전반 (GNB, 버튼, 태그, 숫자, 캡션, eyebrow)
     Noto Sans KR : 본문 (카드 설명, 공지 목록, 결과보고 텍스트)
     Noto Serif KR: 헤드라인 (Hero h1, 섹션 타이틀, 카드 제목)
  */
  fUI:    "'Pretendard', 'Noto Sans KR', sans-serif",
  fBody:  "'Noto Sans KR', 'Pretendard', sans-serif",
  fSerif: "'Noto Serif KR', Georgia, serif",
};

/* ═══════════════════════════════════════════
   GLOBAL CSS
═══════════════════════════════════════════ */
const CSS = `
  /* ── Pretendard (jsDelivr CDN) ── */
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

  /* ── Noto Sans KR + Noto Serif KR (Google Fonts) ── */
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Noto+Serif+KR:wght@400;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* 기본 body → Pretendard */
  body { font-family: ${D.fUI}; }

  /* ── 반응형 카드 그리드 ── */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 14px;
  }
  .card-grid-3 {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
  }

  /* ── 텍스트 보호 ── */
  .card-title {
    font-family: ${D.fSerif};
    word-break: keep-all;
    overflow-wrap: break-word;
    line-height: 1.55;
  }
  .card-desc {
    font-family: ${D.fBody};
    word-break: keep-all;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.7;
  }

  /* ── 섹션 헤딩 ── */
  .section-heading {
    font-family: ${D.fSerif};
    word-break: keep-all;
  }

  /* ── GNB 링크 ── */
  .nav-link {
    font-family: ${D.fUI};
    font-weight: 500;
    position: relative;
    transition: color 0.18s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1.5px;
    background: ${D.teal};
    transition: width 0.2s ease;
  }
  .nav-link:hover::after { width: 100%; }
  .nav-link:hover { color: ${D.teal} !important; }

  /* ── Reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .reveal.on { opacity: 1; transform: translateY(0); }

  /* ── Card hover ── */
  .c-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }
  .c-lift:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(28,28,28,0.09);
  }

  /* ── Buttons ── */
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: ${D.fUI};
    font-weight: 600; font-size: 13px;
    cursor: pointer; border: none;
    letter-spacing: 0.02em;
    transition: all 0.18s ease;
    border-radius: 2px;
  }
  .btn-navy  { background:${D.navy};  color:${D.ivory}; padding:10px 22px; }
  .btn-navy:hover  { background:${D.navyMid}; }
  .btn-teal  { background:${D.teal};  color:${D.ivory}; padding:10px 22px; }
  .btn-teal:hover  { background:${D.tealDim}; }
  .btn-out   { background:transparent; color:${D.navy}; border:1.5px solid ${D.navy}; padding:9px 20px; }
  .btn-out:hover   { background:${D.navy}; color:${D.ivory}; }
  .btn-out-w { background:transparent; color:${D.ivory}; border:1.5px solid rgba(245,240,232,.4); padding:9px 20px; }
  .btn-out-w:hover { background:rgba(245,240,232,.1); border-color:rgba(245,240,232,.75); }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: ${D.ivoryDim}; }
  ::-webkit-scrollbar-thumb { background: ${D.ivoryDark}; border-radius: 2px; }
`;

/* ═══════════════════════════════════════════
   폰트 역할 가이드 (컴포넌트 위 주석)
   Pretendard  → UI: GNB, 버튼, 태그, eyebrow, 숫자, 캡션, 날짜
   Noto Sans   → Body: 카드 설명, 공지 내용, 결과보고 본문
   Noto Serif  → Display: Hero h1, 섹션 제목, 카드 타이틀
═══════════════════════════════════════════ */

/* ── Reveal 컴포넌트 ── */
function Reveal({ children, delay = 0 }) {
  const r = useRef(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add("on");
    }, { threshold: 0.1 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  return (
    <div ref={r} className="reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Badge / Tag ── Pretendard ── */
function Tag({ label, variant = "stone" }) {
  const v = {
    stone:  { bg: D.ivoryDark, color: D.stone },
    teal:   { bg: D.tealPale,  color: D.tealDim },
    navy:   { bg: D.navy,      color: D.ivory },
    warm:   { bg: "#EDE0CC",   color: "#7A6040" },
  }[variant] || { bg: D.ivoryDark, color: D.stone };
  return (
    <span style={{
      display: "inline-block",
      background: v.bg, color: v.color,
      /* Pretendard — UI 요소 */
      fontFamily: D.fUI,
      fontSize: 9, fontWeight: 700,
      letterSpacing: "0.13em", textTransform: "uppercase",
      padding: "3px 8px", borderRadius: 2, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

/* ── Eyebrow ── Pretendard ── */
function Eyebrow({ text, light }) {
  return (
    <div style={{
      fontFamily: D.fUI,
      fontSize: 10, fontWeight: 700,
      letterSpacing: "0.22em", textTransform: "uppercase",
      color: light ? "rgba(245,240,232,.45)" : D.teal,
      marginBottom: 10,
    }}>{text}</div>
  );
}

/* ── Section Heading ── Noto Serif KR ── */
function H2({ children, light }) {
  return (
    <h2 className="section-heading" style={{
      fontFamily: D.fSerif,
      fontSize: "clamp(20px, 2.6vw, 28px)",
      fontWeight: 600, lineHeight: 1.3,
      color: light ? D.ivory : D.black,
    }}>{children}</h2>
  );
}

/* ── GNB ── Pretendard ── */
const NAV_ITEMS = [
  {
    label: "지부 소개",
    sub: ["인사말", "조직도 및 임원"],
  },
  {
    label: "사업 안내",
    sub: ["보수교육", "주요활동"],
  },
  {
    label: "결과보고",
    sub: ["연도별 사업결과"],
  },
  {
    label: "네트워크",
    sub: [],
  },
  {
    label: "공지·자료",
    sub: [],
  },
];

function GNB({ active, onNav }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [hovered,   setHovered]   = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      padding: "0 40px",
      background: scrolled ? "rgba(245,240,232,.96)" : D.ivory,
      borderBottom: `1px solid ${D.ivoryDark}`,
      backdropFilter: "blur(10px)", transition: "background .3s",
    }}>
      {/* ── 메인 바 ── */}
      <div style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* 로고 */}
        <button onClick={() => onNav("home")} style={{
          display: "flex", alignItems: "center", gap: 9,
          background: "none", border: "none", cursor: "pointer", padding: 0,
        }}>
          <div style={{ width: 26, height: 26, borderRadius: 2, background: D.navy, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 10, height: 10, border: `2px solid ${D.teal}`, borderRadius: "50%" }} />
          </div>
          <div>
            <div style={{ fontFamily: D.fUI, fontSize: 10, fontWeight: 700, color: D.black, lineHeight: 1.1 }}>대한작업치료사협회</div>
            <div style={{ fontFamily: D.fUI, fontSize: 8, color: D.stone, letterSpacing: ".08em" }}>서울지부</div>
          </div>
        </button>

        {/* 메뉴 */}
        <div style={{ display: "flex", gap: 28 }}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              style={{ position: "relative" }}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <button onClick={() => onNav(item.label)} className="nav-link btn" style={{
                background: "none", padding: "0 0 2px", borderRadius: 0,
                fontSize: 12, fontWeight: active === item.label ? 600 : 400,
                color: active === item.label ? D.teal : D.black,
              }}>
                {item.label}
              </button>

              {/* 드롭다운 */}
              {item.sub.length > 0 && hovered === item.label && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", left: "50%",
                  transform: "translateX(-50%)",
                  background: D.ivory,
                  border: `1px solid ${D.ivoryDark}`,
                  borderRadius: 2,
                  boxShadow: "0 8px 24px rgba(28,28,28,.10)",
                  minWidth: 140,
                  zIndex: 300,
                  overflow: "hidden",
                }}>
                  {/* 상단 teal 라인 */}
                  <div style={{ height: 2, background: D.teal }} />
                  {item.sub.map((s, i) => (
                    <button key={s} onClick={() => { onNav(s); setHovered(null); }} style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: D.fUI, fontSize: 12, color: D.black,
                      padding: "10px 16px",
                      borderBottom: i < item.sub.length - 1 ? `1px solid ${D.ivoryDark}` : "none",
                      transition: "background .15s, color .15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = D.ivoryDim; e.currentTarget.style.color = D.teal; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = D.black; }}
                    >{s}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <a href="mailto:kaot.seoul@gmail.com" style={{ textDecoration: "none" }}>
          <button className="btn btn-navy" style={{ fontSize: 11, padding: "7px 16px" }}>문의하기</button>
        </a>
      </div>
    </nav>
  );
}

/* ── Mobile Bottom Nav ── Pretendard ── */
function BottomNav({ active, onNav }) {
  const items = [
    { k: "home",     l: "홈" },
    { k: "사업 안내", l: "사업" },
    { k: "결과보고",  l: "결과" },
    { k: "네트워크",  l: "네트" },
    { k: "공지·자료", l: "공지" },
  ];
  return (
    <div style={{
      height: 54, background: "rgba(245,240,232,.97)",
      borderTop: `1px solid ${D.ivoryDark}`,
      backdropFilter: "blur(12px)", display: "flex",
    }}>
      {items.map(it => (
        <button key={it.k} onClick={() => onNav(it.k)} style={{
          flex: 1, border: "none", background: "none", cursor: "pointer", padding: 0,
          fontFamily: D.fUI,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3,
        }}>
          <div style={{
            width: 3, height: 3, borderRadius: "50%",
            background: active === it.k ? D.teal : "transparent",
            transition: "background .2s",
          }} />
          <span style={{
            fontSize: 9, fontWeight: active === it.k ? 700 : 400,
            color: active === it.k ? D.black : D.stone,
          }}>{it.l}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Strip Wrapper ── */
function Strip({ bg = D.ivory, py = 64, children }) {
  const border = (bg === D.ivory || bg === D.ivoryDim)
    ? { borderBottom: `1px solid ${D.ivoryDark}` } : {};
  return (
    <section style={{ background: bg, padding: `${py}px 40px`, ...border }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ── Project Card ── 타이틀: Noto Serif / 설명: Noto Sans / 태그: Pretendard ── */
function ProjectCard({ title, category, type, status, desc, delay = 0 }) {
  const statusV = { "진행중": "teal", "예정": "warm", "완료": "stone" }[status] || "stone";
  const typeV   = { "보수교육": "navy", "담당사업": "stone", "참여사업": "stone" }[type] || "stone";
  return (
    <Reveal delay={delay}>
      <div className="c-lift" style={{
        background: D.ivory, border: `1px solid ${D.ivoryDark}`,
        borderRadius: 2, padding: "20px 18px 18px",
        height: "100%", display: "flex", flexDirection: "column", minWidth: 0,
      }}>
        {/* 태그 — Pretendard */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <Tag label={type === "보수교육" ? "보수교육" : type === "담당사업" ? "담당" : "참여"} variant={typeV} />
            <Tag label={status} variant={statusV} />
          </div>
          {/* 카테고리 — Pretendard */}
          <span style={{ fontFamily: D.fUI, fontSize: 9, color: D.stoneLt, letterSpacing: ".06em", whiteSpace: "nowrap" }}>
            {category}
          </span>
        </div>

        {/* 카드 제목 — Noto Serif KR */}
        <div className="card-title" style={{
          fontSize: 13, fontWeight: 600, color: D.black, flex: 1, marginBottom: 10,
        }}>{title}</div>

        {/* 설명 — Noto Sans KR */}
        {desc && (
          <div className="card-desc" style={{ fontSize: 11, color: D.stone }}>
            {desc}
          </div>
        )}

        {/* 더보기 — Pretendard */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 14, height: 1, background: D.teal }} />
          <span style={{ fontFamily: D.fUI, fontSize: 9, color: D.teal, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>
            자세히
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Report Card ── 제목: Noto Serif / 메타: Pretendard ── */
function ReportCard({ year, period, count, size, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="c-lift" style={{
        background: "rgba(245,240,232,.04)",
        border: "1px solid rgba(245,240,232,.10)",
        borderRadius: 2, padding: "16px 18px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 2, flexShrink: 0,
            background: "rgba(42,157,143,.12)", border: "1px solid rgba(42,157,143,.3)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          }}>
            {/* 연도 라벨 — Pretendard */}
            <span style={{ fontFamily: D.fUI, fontSize: 8, fontWeight: 700, color: D.teal, letterSpacing: ".06em" }}>
              {period}
            </span>
            {/* 연도 숫자 — Noto Serif */}
            <span style={{ fontFamily: D.fSerif, fontSize: 14, fontWeight: 700, color: D.ivory }}>
              {year}
            </span>
          </div>
          <div>
            {/* 보고서 제목 — Noto Serif KR */}
            <div style={{ fontFamily: D.fSerif, fontSize: 13, fontWeight: 600, color: D.ivory, wordBreak: "keep-all" }}>
              {year} {period} 사업 결과보고서
            </div>
            {/* 메타 — Pretendard */}
            <div style={{ fontFamily: D.fUI, fontSize: 10, color: D.stoneLt, marginTop: 2 }}>
              사업 {count}건 · {size}
            </div>
          </div>
        </div>
        {/* PDF 라벨 — Pretendard */}
        <span style={{ fontFamily: D.fUI, fontSize: 10, color: D.teal, fontWeight: 700, letterSpacing: ".06em", flexShrink: 0 }}>
          PDF
        </span>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════
   HERO CARD NEWS — 최대 3개 슬라이더
   실제 서비스: Notion CMS에서 이미지 URL + 제목 + 링크 fetch
═══════════════════════════════════════════ */

// 샘플 카드뉴스 데이터 (Notion CMS 연동 전 placeholder)
const CARD_NEWS_DATA = [
  {
    id: 1,
    tag: "보수교육",
    title: "카드뉴스 제목을\n여기에 입력합니다",
    date: "2026.04",
    // 실제 서비스: Notion DB의 이미지 URL 필드 사용
    bg: `linear-gradient(145deg, ${D.tealDim} 0%, ${D.navy} 100%)`,
  },
  {
    id: 2,
    tag: "사업 안내",
    title: "카드뉴스 제목을\n여기에 입력합니다",
    date: "2026.03",
    bg: `linear-gradient(145deg, #243760 0%, #0D1B2E 100%)`,
  },
  {
    id: 3,
    tag: "공지",
    title: "카드뉴스 제목을\n여기에 입력합니다",
    date: "2026.02",
    bg: `linear-gradient(145deg, #1F7A6E 0%, #1A2B4C 100%)`,
  },
];

function HeroCardNews({ narrow = false }) {
  const [current, setCurrent] = useState(0);
  const total = CARD_NEWS_DATA.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  const card = CARD_NEWS_DATA[current];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: narrow ? 340 : "100%" }}>

      {/* 카드 */}
      <div style={{
        background: card.bg,
        borderRadius: 4,
        border: "1px solid rgba(245,240,232,.12)",
        overflow: "hidden",
        aspectRatio: "4/3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px",
        position: "relative",
        cursor: "pointer",
        transition: "opacity .3s ease",
      }}>
        {/* 상단 teal 라인 */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: D.teal }} />

        {/* 태그 */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontFamily: D.fUI, fontSize: 9, fontWeight: 700,
            letterSpacing: ".12em", textTransform: "uppercase",
            background: "rgba(42,157,143,.25)",
            border: "1px solid rgba(42,157,143,.4)",
            color: D.tealPale,
            padding: "3px 9px", borderRadius: 2,
          }}>{card.tag}</span>
          <span style={{ fontFamily: D.fUI, fontSize: 9, color: "rgba(245,240,232,.35)" }}>
            {current + 1} / {total}
          </span>
        </div>

        {/* 이미지 영역 placeholder */}
        <div style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "14px 0",
        }}>
          {/* 실제 서비스: <img src={card.imageUrl} style={{width:"100%", height:"100%", objectFit:"cover"}} /> */}
          <div style={{
            width: "100%", height: "100%",
            background: "rgba(245,240,232,.05)",
            border: "1px dashed rgba(245,240,232,.15)",
            borderRadius: 2,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245,240,232,.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 12, height: 10, borderRadius: 1, background: "rgba(245,240,232,.2)" }} />
            </div>
            <span style={{ fontFamily: D.fUI, fontSize: 9, color: "rgba(245,240,232,.25)", letterSpacing: ".08em" }}>
              이미지 영역
            </span>
          </div>
        </div>

        {/* 하단: 제목 + 날짜 */}
        <div>
          <div style={{
            fontFamily: D.fSerif, fontSize: 13, fontWeight: 600,
            color: D.ivory, lineHeight: 1.5, marginBottom: 8,
            wordBreak: "keep-all", whiteSpace: "pre-line",
          }}>{card.title}</div>
          <div style={{ fontFamily: D.fUI, fontSize: 9, color: "rgba(245,240,232,.35)" }}>
            {card.date}
          </div>
        </div>
      </div>

      {/* 컨트롤 바 */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginTop: 10,
      }}>
        {/* 인디케이터 */}
        <div style={{ display: "flex", gap: 6 }}>
          {CARD_NEWS_DATA.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 20 : 6, height: 6,
              borderRadius: 3, border: "none", cursor: "pointer",
              background: i === current ? D.teal : "rgba(245,240,232,.2)",
              transition: "all .25s ease", padding: 0,
            }} />
          ))}
        </div>

        {/* 이전 / 다음 */}
        <div style={{ display: "flex", gap: 6 }}>
          {[{ fn: prev, label: "‹" }, { fn: next, label: "›" }].map(({ fn, label }) => (
            <button key={label} onClick={fn} style={{
              width: 26, height: 26, borderRadius: 2, border: "none",
              background: "rgba(245,240,232,.08)",
              color: "rgba(245,240,232,.6)",
              fontFamily: D.fUI, fontSize: 14, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .18s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(42,157,143,.3)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(245,240,232,.08)"}
            >{label}</button>
          ))}
        </div>
      </div>

      {/* CMS 안내 레이블 */}
      <div style={{
        marginTop: 8, textAlign: "center",
        fontFamily: D.fUI, fontSize: 8,
        color: "rgba(245,240,232,.18)", letterSpacing: ".08em",
      }}>
        Notion CMS 연동 — 최대 3개 게시
      </div>
    </div>
  );
}


const PROJECTS = [
  { title: "작업치료 임상기초 1",                           category: "보수교육",    type: "보수교육", status: "예정",   desc: "기본 평가 및 중재 기법 중심의 역량 강화 과정" },
  { title: "작업치료 임상기초 2",                           category: "보수교육",    type: "보수교육", status: "예정",   desc: "1회차 심화 및 임상 사례 적용 중심" },
  { title: "임상기술 마스터 클래스",                        category: "보수교육",    type: "보수교육", status: "예정",   desc: "최신 근거 기반 중재 기법 심화 실습" },
  { title: "지역사회 통합돌봄에서의 작업치료 내용과 절차",  category: "보수교육",    type: "보수교육", status: "예정",   desc: "통합돌봄 체계 내 작업치료사 역할 이해" },
  { title: "마음으로 ON — 작업치료사 모집",                 category: "성동구",      type: "담당사업", status: "진행중", desc: "성동구 가족지원센터 협력 지역사회 서비스" },
  { title: "PBS 긍정적 행동지원 사업",                      category: "서울시교육청", type: "참여사업", status: "진행중", desc: "학교 환경 내 긍정적 행동지원 서비스 참여" },
  { title: "SST 발달장애인 가족지원 캠프",                  category: "복지",        type: "참여사업", status: "예정",   desc: "사회기술훈련 기반 가족 지원 캠프 운영 참여" },
  { title: "기타 사업",                                     category: "미정",        type: "참여사업", status: "예정",   desc: "신규 발굴 협력 사업 — 세부 내용 확정 예정" },
];

function HomePage({ narrow }) {
  return (
    <div style={{ background: D.ivory }}>

      {/* ── HERO ── h1: Noto Serif / 서브카피: Noto Sans / 나머지: Pretendard ── */}
      <section style={{
        background: D.navy,
        padding: narrow ? "64px 32px" : "80px 40px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(245,240,232,.025) 80px)`,
        }} />
        <div style={{ position: "absolute", top: 0, left: narrow ? 32 : 40, width: 2, height: 64, background: D.teal }} />

        <div style={{
          maxWidth: 1040, margin: "0 auto", position: "relative", zIndex: 1,
          display: "grid",
          gridTemplateColumns: narrow ? "1fr" : "1fr 340px",
          gap: narrow ? 40 : 48,
          alignItems: "center",
        }}>

          {/* ── 좌: 텍스트 ── */}
          <div>
            <div style={{ marginBottom: 32 }}>
              <Reveal>
                <div style={{ fontFamily: D.fUI, fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,.45)" }}>
                  대한작업치료사협회 서울지부 공식 홈페이지
                </div>
              </Reveal>
            </div>

            <Reveal delay={50}>
              <h1 style={{
                fontFamily: D.fSerif,
                fontSize: narrow ? "clamp(26px,6vw,34px)" : "clamp(28px,3.5vw,44px)",
                fontWeight: 600, color: D.ivory, lineHeight: 1.25,
                maxWidth: 520, marginBottom: 20, wordBreak: "keep-all",
              }}>
                대한작업치료사협회 서울지부<br />
                <span style={{ color: D.teal }}>Seoul OT, Soul OT</span>
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p style={{
                fontFamily: D.fBody,
                fontSize: 14, color: "rgba(245,240,232,.58)",
                lineHeight: 1.9, maxWidth: 420, marginBottom: 36, wordBreak: "keep-all",
              }}>
                서울지부의 사업 현황과 결과보고,<br />
                협력 네트워크를 한곳에서 확인하세요
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn-teal">사업 소개 보기</button>
                <button className="btn btn-out-w">결과보고서 다운로드</button>
              </div>
            </Reveal>
          </div>

          {/* ── 우: 카드뉴스 슬라이더 ── */}
          {!narrow && <HeroCardNews />}
        </div>

        {/* 모바일: 카드뉴스 하단 배치 */}
        {narrow && (
          <div style={{ maxWidth: 1040, margin: "32px auto 0", position: "relative", zIndex: 1 }}>
            <HeroCardNews narrow />
          </div>
        )}
      </section>

      {/* ── QUICK NAV BAR ── */}
      <div style={{
        background: D.black,
        display: "grid",
        gridTemplateColumns: narrow ? "repeat(2,1fr)" : "repeat(4,1fr)",
      }}>
        {[
          { label: "보수교육 안내",  sub: "2026 교육 일정 확인",   anchor: "#education" },
          { label: "사업 안내",     sub: "담당 및 참여 사업",      anchor: "#projects"  },
          { label: "결과보고서",    sub: "연도별 PDF 다운로드",    anchor: "#reports"   },
          { label: "문의하기",      sub: "kaot.seoul@gmail.com", anchor: "mailto:kaot.seoul@gmail.com" },
        ].map((item, i, arr) => (
          <a key={item.label} href={item.anchor} style={{ textDecoration: "none" }}>
            <div style={{
              padding: narrow ? "16px 20px" : "18px 28px",
              borderRight: (!narrow && i < arr.length - 1) ? "1px solid rgba(245,240,232,.07)" : "none",
              borderBottom: (narrow && i < 2) ? "1px solid rgba(245,240,232,.07)" : "none",
              cursor: "pointer",
              transition: "background .18s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(42,157,143,.10)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* 메뉴명 — Pretendard bold */}
              <div style={{ fontFamily: D.fUI, fontSize: narrow ? 13 : 14, fontWeight: 700, color: D.ivory, marginBottom: 3 }}>
                {item.label}
              </div>
              {/* 설명 — Pretendard light */}
              <div style={{ fontFamily: D.fUI, fontSize: 10, color: D.stoneLt, letterSpacing: ".04em" }}>
                {item.sub}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* ── 사업 STRIP ── */}
      <Strip bg={D.ivory} py={68}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
          <div>
            <Reveal><Eyebrow text="2026 사업" /></Reveal>
            <Reveal delay={50}><H2>주요 사업 소개</H2></Reveal>
          </div>
          <Reveal delay={70}>
            <button className="btn btn-out" style={{ fontSize: 11 }}>전체 보기</button>
          </Reveal>
        </div>

        {/* 그룹 레이블 — Pretendard */}
        <Reveal>
          <div style={{ fontFamily: D.fUI, fontSize: 9, fontWeight: 700, letterSpacing: ".18em", color: D.stoneLt, textTransform: "uppercase", marginBottom: 12 }}>
            보수교육
          </div>
        </Reveal>
        <div className="card-grid" style={{ marginBottom: 28 }}>
          {PROJECTS.slice(0, 4).map((p, i) => <ProjectCard key={p.title} {...p} delay={i * 55} />)}
        </div>

        <div style={{ height: 1, background: D.ivoryDark, margin: "4px 0 24px" }} />

        <Reveal>
          <div style={{ fontFamily: D.fUI, fontSize: 9, fontWeight: 700, letterSpacing: ".18em", color: D.stoneLt, textTransform: "uppercase", marginBottom: 12 }}>
            담당 및 참여 사업
          </div>
        </Reveal>
        <div className="card-grid">
          {PROJECTS.slice(4).map((p, i) => <ProjectCard key={p.title} {...p} delay={i * 55} />)}
        </div>
      </Strip>

      {/* ── 결과보고 STRIP (dark) ── */}
      <Strip bg={D.black} py={68}>
        <div style={{
          display: "grid",
          gridTemplateColumns: narrow ? "1fr" : "1fr 1fr",
          gap: narrow ? 36 : 60, alignItems: "center",
        }}>
          <div>
            <Reveal><Eyebrow text="사업 결과보고" light /></Reveal>
            <Reveal delay={50}><H2 light>연도별 결과보고서</H2></Reveal>
            <Reveal delay={90}>
              {/* 설명 — Noto Sans KR */}
              <p style={{
                fontFamily: D.fBody,
                fontSize: 13, color: "rgba(245,240,232,.48)",
                lineHeight: 1.9, marginTop: 10, marginBottom: 28, wordBreak: "keep-all",
              }}>
                서울지부 연간 사업의 성과와 결과를<br />
                투명하게 공개합니다. PDF로 다운로드하실 수 있습니다.
              </p>
              <button className="btn btn-teal">보고서 목록 보기</button>
            </Reveal>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { year: "2024", period: "상반기", count: "6",  size: "2.4 MB" },
              { year: "2023", period: "연간",   count: "11", size: "5.8 MB" },
              { year: "2022", period: "연간",   count: "9",  size: "4.2 MB" },
            ].map((r, i) => <ReportCard key={r.year + r.period} {...r} delay={i * 70} />)}
          </div>
        </div>
      </Strip>

      {/* ── 네트워크 STRIP ── */}
      <Strip bg={D.ivoryDim} py={64}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <Reveal><Eyebrow text="네트워크" /></Reveal>
            <Reveal delay={50}><H2>협력 기관 네트워크</H2></Reveal>
          </div>
          <Reveal delay={70}>
            <button className="btn btn-out" style={{ fontSize: 11 }}>전체 보기</button>
          </Reveal>
        </div>

        {/* 지도 placeholder */}
        <Reveal>
          <div style={{
            background: D.navy, borderRadius: 2,
            height: narrow ? 140 : 180, marginBottom: 22,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 60%, rgba(42,157,143,.12) 0%, transparent 55%), radial-gradient(circle at 72% 40%, rgba(42,157,143,.07) 0%, transparent 55%)` }} />
            {[[22, 48], [38, 58], [56, 36], [68, 54], [80, 42], [34, 28]].map(([x, y], i) => (
              <div key={i} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, width: 5, height: 5, borderRadius: "50%", background: D.teal, opacity: .75, boxShadow: `0 0 8px ${D.teal}` }} />
            ))}
            <div style={{ background: "rgba(245,240,232,.07)", border: "1px solid rgba(245,240,232,.13)", borderRadius: 2, padding: "8px 18px", backdropFilter: "blur(6px)", textAlign: "center" }}>
              {/* Pretendard */}
              <div style={{ fontFamily: D.fUI, fontSize: 12, color: "rgba(245,240,232,.55)", wordBreak: "keep-all" }}>서울 내 협력기관 지도</div>
              <div style={{ fontFamily: D.fUI, fontSize: 9, color: "rgba(245,240,232,.3)", marginTop: 2 }}>Kakao Maps 연동 예정</div>
            </div>
          </div>
        </Reveal>

        <div className="card-grid-3">
          {[
            ["푸르메재단 넥슨어린이재활병원", "의료기관"],
          ].map(([name, type], i) => (
            <Reveal key={name} delay={i * 40}>
              <div className="c-lift" style={{
                background: D.ivory, border: `1px solid ${D.ivoryDark}`,
                borderRadius: 2, padding: "14px",
              }}>
                {/* 기관명 — Pretendard */}
                <div style={{ fontFamily: D.fUI, fontSize: 13, fontWeight: 600, color: D.black, marginBottom: 5, wordBreak: "keep-all" }}>
                  {name}
                </div>
                {/* 유형 — Pretendard */}
                <div style={{ fontFamily: D.fUI, fontSize: 9, color: D.stone, letterSpacing: ".07em", textTransform: "uppercase" }}>
                  {type}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Strip>

      {/* ── 공지 STRIP (F-pattern) ── */}
      <Strip bg={D.ivory} py={60}>
        <div style={{
          display: "grid",
          gridTemplateColumns: narrow ? "1fr" : "220px 1fr",
          gap: narrow ? 28 : 52, alignItems: "start",
        }}>
          <div>
            <Reveal><Eyebrow text="공지사항" /></Reveal>
            <Reveal delay={50}><H2>최신 소식</H2></Reveal>
            <Reveal delay={90}>
              {/* 설명 — Noto Sans KR */}
              <p style={{
                fontFamily: D.fBody,
                fontSize: 12, color: D.stone, lineHeight: 1.9,
                marginTop: 8, marginBottom: 18, wordBreak: "keep-all",
              }}>
                서울지부의 주요 공지와<br />활동 소식을 확인하세요.
              </p>
              <button className="btn btn-out" style={{ fontSize: 11 }}>전체 공지</button>
            </Reveal>
          </div>

          <div>
            {[
              { tag: "공지",     title: "타이틀", date: "2024.06.12", isNew: true },
              { tag: "네트워크", title: "타이틀", date: "2024.06.05", isNew: true },
              { tag: "학술",     title: "타이틀", date: "2024.05.28", isNew: false },
              { tag: "행사",     title: "타이틀", date: "2024.05.15", isNew: false },
              { tag: "공지",     title: "타이틀", date: "2024.04.01", isNew: false },
            ].map((n, i) => (
              <Reveal key={n.title} delay={i * 45}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "13px 0", borderBottom: `1px solid ${D.ivoryDark}`,
                  cursor: "pointer", gap: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <Tag label={n.tag} variant={n.isNew ? "teal" : "stone"} />
                    {/* 공지 제목 — Noto Sans KR */}
                    <span style={{
                      fontFamily: D.fBody,
                      fontSize: 13, color: D.black,
                      fontWeight: n.isNew ? 500 : 400,
                      wordBreak: "keep-all", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>{n.title}</span>
                    {n.isNew && (
                      <span style={{
                        fontFamily: D.fUI,
                        fontSize: 7, fontWeight: 700, color: D.teal,
                        border: `1px solid ${D.teal}`, borderRadius: 1,
                        padding: "1px 4px", letterSpacing: ".1em", flexShrink: 0,
                      }}>NEW</span>
                    )}
                  </div>
                  {/* 날짜 — Pretendard */}
                  <span style={{ fontFamily: D.fUI, fontSize: 10, color: D.stoneLt, flexShrink: 0 }}>
                    {n.date}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Strip>

      {/* ── CTA BANNER ── */}
      <section style={{ background: D.navyMid, padding: narrow ? "36px 32px" : "44px 40px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div>
            {/* eyebrow — Pretendard */}
            <div style={{ fontFamily: D.fUI, fontSize: 9, color: "rgba(245,240,232,.4)", letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 6 }}>
              문의하기
            </div>
            {/* 헤딩 — Noto Serif KR */}
            <div style={{ fontFamily: D.fSerif, fontSize: 20, fontWeight: 600, color: D.ivory, wordBreak: "keep-all" }}>
              함께하고 싶으신가요?
            </div>
            {/* 설명 — Noto Sans KR */}
            <div style={{ fontFamily: D.fBody, fontSize: 12, color: "rgba(245,240,232,.45)", marginTop: 4 }}>
              서울지부는 언제나 여러분의 참여를 환영합니다
            </div>
          </div>
          <a href="mailto:kaot.seoul@gmail.com" style={{ textDecoration: "none" }}>
            <button className="btn btn-teal">문의하기</button>
          </a>
        </div>
      </section>

      {/* ── FOOTER ── Pretendard ── */}
      <footer style={{ background: D.black, padding: narrow ? "20px 32px" : "24px 40px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: D.fUI, fontSize: 10, color: D.stoneLt }}>
            © 2026 대한작업치료사협회 서울지부
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center" }}>
            {["지부 소개", "사업 안내", "결과보고", "네트워크", "공지·자료"].map(l => (
              <span key={l} style={{ fontFamily: D.fUI, fontSize: 10, color: D.stoneLt, cursor: "pointer" }}>{l}</span>
            ))}
            {/* 구분선 */}
            <div style={{ width: 1, height: 10, background: "rgba(245,240,232,.15)" }} />
            {/* 인스타그램 */}
            <a
              href="https://www.instagram.com/kaot.seoul"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}
            >
              {/* 인스타 아이콘 (SVG) */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke={D.stoneLt} strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="4.5" stroke={D.stoneLt} strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1" fill={D.stoneLt}/>
              </svg>
              <span style={{ fontFamily: D.fUI, fontSize: 10, color: D.stoneLt }}>@kaot.seoul</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FONT SPECIMEN — 폰트 역할 가이드 패널
═══════════════════════════════════════════ */
function FontSpecimen() {
  const rows = [
    { font: D.fSerif,  name: "Noto Serif KR",  weight: 600, size: 28, sample: "작업치료사의 연대, 서울에서",  role: "Hero h1 · 섹션 타이틀 · 카드 제목" },
    { font: D.fSerif,  name: "Noto Serif KR",  weight: 700, size: 16, sample: "2026 · 서울지부 결과보고서",   role: "연도 숫자 · 보고서 제목" },
    { font: D.fBody,   name: "Noto Sans KR",   weight: 400, size: 14, sample: "서울지부의 사업 현황과 결과보고, 협력 네트워크를 한곳에서 확인하세요.", role: "Hero 서브카피 · 카드 설명 · 공지 본문 · 결과보고 텍스트" },
    { font: D.fUI,     name: "Pretendard",     weight: 700, size: 13, sample: "사업 소개 보기  PDF  NEW  2026.06.12", role: "버튼 · 태그 · Eyebrow · 날짜 · 숫자 레이블 · GNB" },
    { font: D.fUI,     name: "Pretendard",     weight: 400, size: 12, sample: "지부 소개  사업 소개  결과보고  네트워크  공지·자료", role: "GNB 링크 · 푸터 · 캡션" },
  ];
  return (
    <div style={{ padding: "32px 40px", background: D.ivory, maxWidth: 1040, margin: "0 auto" }}>
      <div style={{ fontFamily: D.fUI, fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: D.teal, marginBottom: 24 }}>
        Font Specimen — 3종 믹스 역할 가이드
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            gap: 20,
            padding: "20px 0",
            borderBottom: `1px solid ${D.ivoryDark}`,
            alignItems: "center",
          }}>
            <div>
              <div style={{ fontFamily: D.fUI, fontSize: 11, fontWeight: 700, color: D.black, marginBottom: 3 }}>{r.name}</div>
              <div style={{ fontFamily: D.fUI, fontSize: 9, color: D.stoneLt, marginBottom: 4 }}>weight {r.weight} · {r.size}px</div>
              <div style={{ fontFamily: D.fUI, fontSize: 9, color: D.teal, lineHeight: 1.5, wordBreak: "keep-all" }}>{r.role}</div>
            </div>
            <div style={{ fontFamily: r.font, fontSize: r.size, fontWeight: r.weight, color: D.black, wordBreak: "keep-all", lineHeight: 1.4 }}>
              {r.sample}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SHELL
═══════════════════════════════════════════ */
export default function App() {
  const [vp,   setVp]   = useState("desktop");
  const [page, setPage] = useState("home");
  const [tab,  setTab]  = useState("prototype");

  const frameW   = { mobile: 375, tablet: 768, desktop: 1060 }[vp];
  const isMobile = vp === "mobile";
  const narrow   = vp !== "desktop";

  return (
    <div style={{ fontFamily: D.fUI, background: "#CEC9C0", minHeight: "100vh" }}>
      <style>{CSS}</style>

      {/* ── Toolbar ── */}
      <div style={{
        background: D.black,
        borderBottom: "1px solid rgba(245,240,232,.07)",
        padding: "9px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
      }}>
        {/* 탭 전환 */}
        <div style={{ display: "flex", gap: 6 }}>
          {[["prototype", "프로토타입"], ["specimen", "폰트 가이드"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: "4px 13px", borderRadius: 2, border: "none", cursor: "pointer",
              fontFamily: D.fUI, fontSize: 10, fontWeight: 600, letterSpacing: ".06em",
              background: tab === k ? D.teal : "rgba(245,240,232,.08)",
              color: tab === k ? D.ivory : D.stoneLt,
            }}>{l}</button>
          ))}
        </div>

        {/* 뷰포트 (프로토타입 탭에서만) */}
        {tab === "prototype" && (
          <div style={{ display: "flex", gap: 6 }}>
            {[["mobile", "Mobile 375"], ["tablet", "Tablet 768"], ["desktop", "Desktop 1060"]].map(([k, l]) => (
              <button key={k} onClick={() => setVp(k)} style={{
                padding: "4px 13px", borderRadius: 2, border: "none", cursor: "pointer",
                fontFamily: D.fUI, fontSize: 10, fontWeight: 600, letterSpacing: ".06em",
                background: vp === k ? D.teal : "rgba(245,240,232,.08)",
                color: vp === k ? D.ivory : D.stoneLt,
              }}>{l}</button>
            ))}
          </div>
        )}

        <span style={{ fontFamily: D.fUI, fontSize: 9, color: D.stoneLt, letterSpacing: ".1em" }}>
          서울지부 · Pretendard + Noto Sans KR + Noto Serif KR
        </span>
      </div>

      {/* ── Font Specimen 탭 ── */}
      {tab === "specimen" && (
        <div style={{ padding: "20px 12px 48px" }}>
          <div style={{
            maxWidth: 1060,
            margin: "0 auto",
            border: "1.5px solid rgba(28,28,28,.4)",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 18px 56px rgba(0,0,0,.22)",
            background: D.ivory,
          }}>
            <FontSpecimen />
          </div>
        </div>
      )}

      {/* ── Prototype 탭 ── */}
      {tab === "prototype" && (
        <div style={{ padding: "20px 12px 48px", display: "flex", justifyContent: "center" }}>
          <div style={{
            width: frameW,
            border: "1.5px solid rgba(28,28,28,.45)",
            borderRadius: isMobile ? 18 : 3,
            overflow: "hidden",
            boxShadow: "0 18px 56px rgba(0,0,0,.22)",
            background: D.ivory,
          }}>
            {!isMobile && <GNB active={page} onNav={setPage} />}
            <div style={{ maxHeight: isMobile ? 580 : 640, overflowY: "auto" }}>
              <HomePage narrow={narrow} />
            </div>
            {isMobile && <BottomNav active={page} onNav={setPage} />}
          </div>
        </div>
      )}
    </div>
  );
}
