"use client";

import { useEffect, useMemo, useState } from "react";

const courses = [
  {
    code: "REIT",
    number: "01",
    title: "资源环境信息技术",
    subtitle: "主线课程",
    description:
      "从资源环境问题出发，学习空间信息的获取、组织、分析与表达。",
    chapters: 8,
    tone: "green",
    tags: ["信息获取", "空间分析", "综合应用"],
  },
  {
    code: "RS",
    number: "02",
    title: "遥感基础与应用",
    subtitle: "信息获取",
    description:
      "理解电磁波与地物响应，在真实影像中识别和解释地表变化。",
    chapters: 7,
    tone: "rust",
    tags: ["遥感原理", "影像处理", "环境监测"],
  },
  {
    code: "CARTO",
    number: "03",
    title: "地图学",
    subtitle: "空间表达",
    description:
      "掌握地图语言、投影与视觉变量，把复杂空间关系讲清楚。",
    chapters: 6,
    tone: "blue",
    tags: ["地图语言", "地图投影", "专题制图"],
  },
];

const cases = [
  {
    index: "A",
    title: "城市扩张的二十年",
    place: "长三角 · Landsat",
    text: "从多期遥感影像提取建设用地，观察城市边界如何改变区域景观。",
    color: "lime",
  },
  {
    index: "B",
    title: "湖泊水体的季节脉动",
    place: "洞庭湖 · Sentinel-2",
    text: "利用水体指数与地图表达，分析丰水期和枯水期的面积差异。",
    color: "cyan",
  },
  {
    index: "C",
    title: "山火之后，植被如何恢复",
    place: "大兴安岭 · MODIS",
    text: "沿时间序列阅读植被指数，建立从现象、数据到解释的完整链条。",
    color: "orange",
  },
];

const lessonSteps = [
  "01  从像元到信息",
  "02  波段与光谱",
  "03  影像增强",
  "04  地物分类",
  "05  精度与不确定性",
];

const searchItems = [
  "空间数据",
  "比例尺",
  "地图投影",
  "电磁波谱",
  "光谱特征",
  "监督分类",
  "植被指数",
  "土地利用",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [bandMode, setBandMode] = useState<"natural" | "false">("natural");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(localStorage.getItem("geo-lesson-complete") === "true");
  }, []);

  const filteredSearch = useMemo(
    () =>
      searchItems.filter((item) =>
        item.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  const toggleComplete = () => {
    const next = !completed;
    setCompleted(next);
    localStorage.setItem("geo-lesson-complete", String(next));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="资源环境开放教材首页">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>GEO·OPEN</strong>
            <small>资源环境开放教材</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("courses")}>课程</button>
          <button onClick={() => scrollTo("path")}>学习路径</button>
          <button onClick={() => scrollTo("lab")}>交互实验</button>
          <button onClick={() => scrollTo("cases")}>案例</button>
        </nav>

        <div className="header-actions">
          <button
            className="search-trigger"
            onClick={() => setSearchOpen(true)}
            aria-label="打开教材搜索"
          >
            <span aria-hidden="true">⌕</span>
            <em>搜索教材</em>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="切换导航"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "关闭" : "菜单"}
          </button>
        </div>
      </header>

      {searchOpen && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="教材搜索"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSearchOpen(false);
          }}
        >
          <div className="search-box">
            <div className="search-input-row">
              <span aria-hidden="true">⌕</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索概念、章节或案例…"
              />
              <button onClick={() => setSearchOpen(false)}>ESC</button>
            </div>
            <p className="search-label">
              {query ? `与“${query}”相关的内容` : "常用术语"}
            </p>
            <div className="search-results">
              {filteredSearch.map((item, index) => (
                <button key={item} onClick={() => setSearchOpen(false)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                  <i>查看解释 →</i>
                </button>
              ))}
              {filteredSearch.length === 0 && (
                <p className="empty-result">暂未找到匹配内容</p>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="hero" id="top">
        <div className="topo-lines" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span>OPEN TEXTBOOK</span>
            <i />
            面向地球的课堂
          </p>
          <h1>
            读懂地球
            <br />
            <span>理解环境</span>
            <br />
            绘制未来
          </h1>
          <p className="hero-intro">
            以资源环境信息技术为主线，连接遥感的信息获取能力与地图学的空间表达能力。
            从一幅影像、一张地图开始，建立解决真实环境问题的完整思维。
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => scrollTo("courses")}>
              开始学习 <span>↗</span>
            </button>
            <button className="text-button" onClick={() => scrollTo("path")}>
              查看课程地图 <span>↓</span>
            </button>
          </div>
          <div className="hero-meta">
            <div>
              <strong>3</strong>
              <span>门关联课程</span>
            </div>
            <div>
              <strong>21</strong>
              <span>个核心章节</span>
            </div>
            <div>
              <strong>开放</strong>
              <span>无需登录学习</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="三门课程知识关系示意">
          <div className="map-coordinate top">32°N</div>
          <div className="map-coordinate side">118°E</div>
          <div className="raster-field">
            {Array.from({ length: 80 }).map((_, index) => (
              <i key={index} style={{ "--cell": index } as React.CSSProperties} />
            ))}
          </div>
          <div className="contour contour-one" />
          <div className="contour contour-two" />
          <div className="course-orbit orbit-one">
            <span>01</span>
            <strong>地图学</strong>
            <small>表达</small>
          </div>
          <div className="course-orbit orbit-two">
            <span>02</span>
            <strong>遥感</strong>
            <small>获取</small>
          </div>
          <div className="course-core">
            <span>03</span>
            <strong>资源环境</strong>
            <small>分析 · 应用</small>
          </div>
          <div className="visual-note">
            <b>知识坐标</b>
            <span>获取 → 表达 → 分析</span>
          </div>
        </div>
      </section>

      <section className="courses-section" id="courses">
        <div className="section-heading">
          <div>
            <p className="section-kicker">COURSE SYSTEM / 课程体系</p>
            <h2>一条主线，三种空间能力</h2>
          </div>
          <p>
            三门课程并非彼此孤立。你将在共同概念和真实问题之间反复穿行，
            最终形成自己的空间思维框架。
          </p>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article className={`course-card ${course.tone}`} key={course.code}>
              <div className="card-index">
                <span>{course.number}</span>
                <i>{course.code}</i>
              </div>
              <div className="card-graphic" aria-hidden="true">
                <i />
                <i />
                <i />
                <span />
              </div>
              <p>{course.subtitle}</p>
              <h3>{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-tags">
                {course.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="course-footer">
                <span>{course.chapters} 个章节</span>
                <button onClick={() => scrollTo("lesson")}>进入课程 ↗</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="path-section" id="path">
        <div className="path-intro">
          <p className="section-kicker light">LEARNING PATH / 学习路径</p>
          <h2>从观察现象，到回答问题</h2>
          <p>
            每个知识点都放回真实的资源环境情境中。循序渐进，也可以从你关心的问题出发。
          </p>
        </div>
        <div className="path-track">
          {[
            ["01", "看见", "从地图与影像中识别空间现象"],
            ["02", "理解", "掌握数据背后的原理与方法"],
            ["03", "分析", "选择工具验证自己的判断"],
            ["04", "表达", "用地图讲述清晰、有据的结论"],
          ].map(([number, title, text], index) => (
            <article key={number}>
              <div className="path-node">
                <span>{number}</span>
                {index < 3 && <i />}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lesson-section" id="lesson">
        <div className="lesson-window">
          <aside className="lesson-sidebar">
            <div className="lesson-course">
              <span>RS · 02</span>
              <strong>遥感基础与应用</strong>
            </div>
            <p>第二单元 · 遥感影像</p>
            <nav aria-label="章节目录">
              {lessonSteps.map((step, index) => (
                <button className={index === 1 ? "active" : ""} key={step}>
                  <i>{index === 1 ? "●" : "○"}</i>
                  {step}
                </button>
              ))}
            </nav>
            <div className="progress-block">
              <div>
                <span>本单元进度</span>
                <b>{completed ? "40%" : "20%"}</b>
              </div>
              <i>
                <span style={{ width: completed ? "40%" : "20%" }} />
              </i>
            </div>
          </aside>

          <article className="lesson-content">
            <div className="lesson-breadcrumb">遥感基础 / 第二单元 / 02</div>
            <h2>地物为什么呈现不同的颜色？</h2>
            <p className="lesson-lead">
              遥感影像中的颜色不一定是地物真实的颜色。理解波段组合，
              是从“看图”走向“读图”的第一步。
            </p>
            <div className="concept-callout">
              <span>核心概念</span>
              <p>
                不同地物对不同波长的电磁波具有不同的反射与吸收特征，
                这种规律构成了遥感识别地物的物理基础。
              </p>
            </div>
            <div className="mini-spectrum">
              <div className="spectrum-title">
                <span>反射率</span>
                <b>植被典型光谱曲线</b>
              </div>
              <div className="spectrum-chart">
                <i className="chart-line" />
                <span className="marker m1">蓝</span>
                <span className="marker m2">绿</span>
                <span className="marker m3">红</span>
                <span className="marker m4">近红外</span>
              </div>
            </div>
            <div className="lesson-bottom">
              <p>
                当我们把近红外波段赋予红色通道时，健康植被会在影像中呈现鲜红色。
                这并非“错误着色”，而是为了突出人眼原本看不到的信息。
              </p>
              <button
                className={completed ? "complete-button done" : "complete-button"}
                onClick={toggleComplete}
              >
                {completed ? "✓ 已完成本节" : "标记为已完成"}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="lab-section" id="lab">
        <div className="lab-copy">
          <p className="section-kicker">MINI LAB / 交互实验</p>
          <h2>同一片土地，不止一种看法</h2>
          <p>
            切换波段组合，观察水体、植被与建设用地如何改变颜色。
            先写下你的判断，再查看解释。
          </p>
          <div className="lab-switch" role="group" aria-label="波段组合">
            <button
              className={bandMode === "natural" ? "active" : ""}
              onClick={() => setBandMode("natural")}
            >
              <span>4-3-2</span>
              自然色
            </button>
            <button
              className={bandMode === "false" ? "active" : ""}
              onClick={() => setBandMode("false")}
            >
              <span>5-4-3</span>
              标准假彩色
            </button>
          </div>
          <div className="observation">
            <span>观察提示</span>
            <p>
              {bandMode === "natural"
                ? "自然色组合接近人眼观察。植被通常呈绿色，水体较暗，城市呈灰白色。"
                : "近红外被赋予红色通道。健康植被呈明亮红色，水体仍保持深色。"}
            </p>
          </div>
        </div>
        <div className={`satellite-panel ${bandMode}`}>
          <div className="satellite-toolbar">
            <span>SENTINEL-2 · 2025.08.17</span>
            <b>{bandMode === "natural" ? "RGB 4·3·2" : "RGB 5·4·3"}</b>
          </div>
          <div className="satellite-image" aria-label="模拟卫星影像">
            {Array.from({ length: 108 }).map((_, index) => (
              <i key={index} style={{ "--pixel": index } as React.CSSProperties} />
            ))}
            <div className="river" />
            <div className="city-label">建设用地</div>
            <div className="forest-label">健康植被</div>
          </div>
          <div className="map-scale">0 ━━━ 2 km</div>
        </div>
      </section>

      <section className="cases-section" id="cases">
        <div className="section-heading">
          <div>
            <p className="section-kicker">FIELD CASES / 实践案例</p>
            <h2>把方法带回真实世界</h2>
          </div>
          <button className="outline-button">查看全部案例 →</button>
        </div>
        <div className="case-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.index}>
              <div className={`case-visual ${item.color}`}>
                <span>{item.index}</span>
                <div className="case-map" aria-hidden="true">
                  {Array.from({ length: 36 }).map((_, index) => (
                    <i key={index} />
                  ))}
                </div>
              </div>
              <p>{item.place}</p>
              <h3>{item.title}</h3>
              <p className="case-description">{item.text}</p>
              <button>打开案例 <span>↗</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="open-banner">
        <div>
          <p>OPEN · LEARN · OBSERVE</p>
          <h2>知识因开放而生长</h2>
        </div>
        <p>
          本教材面向校内学生与社会学习者开放。内容将持续更新，
          欢迎从任意一章、一个问题或一幅地图开始探索。
        </p>
        <button onClick={() => scrollTo("top")}>回到顶部 ↑</button>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>GEO·OPEN</strong>
            <small>资源环境开放教材</small>
          </span>
        </a>
        <p>资源环境信息技术 · 遥感基础与应用 · 地图学</p>
        <span>开放教材原型 · 持续建设中</span>
      </footer>
    </main>
  );
}
