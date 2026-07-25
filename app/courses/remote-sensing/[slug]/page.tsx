import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getChapter,
  getChapterSlugs,
  type Chapter,
} from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getChapterSlugs("remote-sensing").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!getChapterSlugs("remote-sensing").includes(slug)) return {};

  const chapter = getChapter("remote-sensing", slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const socialImage =
    siteUrl && chapter.cover
      ? new URL(chapter.cover, siteUrl).toString()
      : undefined;

  return {
    title: `${chapter.title}｜遥感基础与应用`,
    description: chapter.summary,
    keywords: chapter.keywords,
    openGraph: {
      title: chapter.title,
      description: chapter.summary,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

function ChapterPage({ chapter }: { chapter: Chapter }) {
  const cover = chapter.cover ?? "/remote-sensing-chapter-1-cover.webp";

  return (
    <main className="reading-shell">
      <header className="reader-header">
        <Link className="course-brand" href="/">
          <span>GEO·OPEN</span>
          <small>资源环境开放教材</small>
        </Link>
        <nav aria-label="面包屑导航">
          <Link href="/courses/remote-sensing">遥感基础与应用</Link>
          <span>/</span>
          <b>第 {chapter.chapter} 章</b>
        </nav>
      </header>

      <section className="chapter-hero">
        <Image
          src={cover}
          alt="卫星观测山地、河流、农田与城市的遥感主题插画"
          fill
          priority
          sizes="100vw"
        />
        <div className="chapter-hero-shade" />
        <div className="chapter-hero-copy">
          <p>
            CHAPTER {String(chapter.chapter).padStart(2, "0")} ·{" "}
            {chapter.course}
          </p>
          <h1>{chapter.title}</h1>
          <span>{chapter.summary}</span>
          <div>
            <b>建议学习 {chapter.duration}</b>
            <b>更新于 {chapter.updated}</b>
          </div>
        </div>
      </section>

      <div className="reading-layout">
        <aside className="chapter-toc">
          <p>本章目录</p>
          <nav>
            {chapter.sections.map((section, index) => (
              <a href={`#${section.id}`} key={section.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="toc-note">
            <span>编辑提示</span>
            <p>本章内容来自仓库中的 Markdown 文件，可直接在 GitHub 修改。</p>
          </div>
        </aside>

        <article
          className="chapter-prose"
          dangerouslySetInnerHTML={{ __html: chapter.html }}
        />
      </div>

      <section className="chapter-next">
        <div>
          <span>本章结束</span>
          <h2>继续把“看见”变成“理解”</h2>
        </div>
        <Link href="/courses/remote-sensing">返回章节目录 →</Link>
      </section>
    </main>
  );
}

export default async function RemoteSensingChapterPage({ params }: PageProps) {
  const { slug } = await params;

  if (!getChapterSlugs("remote-sensing").includes(slug)) notFound();

  return <ChapterPage chapter={getChapter("remote-sensing", slug)} />;
}
