import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCourseChapters } from "@/lib/content";

export const metadata: Metadata = {
  title: "遥感基础与应用｜GEO·OPEN",
  description:
    "从遥感概念、技术系统与发展脉络出发，学习以地球观测数据认识资源与环境。",
};

const plannedChapters = [
  ["02", "电磁辐射与地物波谱", "理解遥感信息产生的物理基础"],
  ["03", "遥感平台与传感器", "认识数据获取系统及其能力边界"],
  ["04", "遥感影像与分辨率", "建立空间、光谱、时间与辐射尺度观"],
  ["05", "影像处理与增强", "从原始数据走向可解释的信息"],
  ["06", "影像分类与精度评价", "把识别结果转化为可信结论"],
  ["07", "资源环境遥感应用", "在真实问题中综合使用方法"],
];

export default function RemoteSensingCoursePage() {
  const chapters = getCourseChapters("remote-sensing");

  return (
    <main className="course-shell">
      <header className="course-header">
        <Link className="course-brand" href="/">
          <span>GEO·OPEN</span>
          <small>资源环境开放教材</small>
        </Link>
        <nav aria-label="课程导航">
          <Link href="/">首页</Link>
          <Link href="/courses/remote-sensing/01-introduction">开始学习</Link>
        </nav>
      </header>

      <section className="course-hero">
        <div className="course-hero-copy">
          <p className="course-overline">COURSE 02 · INFORMATION ACQUISITION</p>
          <h1>
            遥感基础
            <br />
            <span>与应用</span>
          </h1>
          <p>
            不直接接触地物，我们如何认识它？本课程从电磁波、传感器和影像出发，
            建立“获取—处理—解释—应用”的完整遥感思维。
          </p>
          <div className="course-stat-row">
            <span>
              <b>7</b> 个核心章节
            </span>
            <span>
              <b>开放</b> 无需登录
            </span>
            <span>
              <b>持续</b> 版本更新
            </span>
          </div>
        </div>
        <div className="course-cover" aria-label="遥感地球观测课程封面">
          <Image
            src="/remote-sensing-chapter-1-cover.webp"
            alt="卫星观测山地、河流、农田与城市的遥感主题插画"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 60vw"
          />
          <div>
            <span>RS / 01</span>
            <p>OBSERVE FROM A DISTANCE</p>
          </div>
        </div>
      </section>

      <section className="chapter-catalog">
        <div className="catalog-heading">
          <p>CHAPTER MAP / 章节地图</p>
          <h2>从“遥远的感知”开始</h2>
          <span>当前先开放第一章，其余章节将按课程进度逐步发布。</span>
        </div>

        <div className="chapter-list">
          {chapters.map((chapter) => (
            <Link
              className="chapter-row available"
              href={`/courses/remote-sensing/${chapter.slug}`}
              key={chapter.slug}
            >
              <span>{String(chapter.chapter).padStart(2, "0")}</span>
              <div>
                <p>已发布 · {chapter.updated}</p>
                <h3>{chapter.title}</h3>
                <small>{chapter.summary}</small>
              </div>
              <b>阅读本章 →</b>
            </Link>
          ))}

          {plannedChapters.map(([number, title, description]) => (
            <article className="chapter-row planned" key={number}>
              <span>{number}</span>
              <div>
                <p>建设中</p>
                <h3>{title}</h3>
                <small>{description}</small>
              </div>
              <b>COMING SOON</b>
            </article>
          ))}
        </div>
      </section>

      <footer className="course-footer-bar">
        <p>遥感基础与应用 · GEO·OPEN</p>
        <Link href="/">返回课程总览 ↑</Link>
      </footer>
    </main>
  );
}
