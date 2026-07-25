import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const contentRoot = path.join(process.cwd(), "content");

export type ChapterSection = {
  id: string;
  title: string;
};

export type Chapter = {
  slug: string;
  title: string;
  course: string;
  chapter: number;
  summary: string;
  duration: string;
  updated: string;
  keywords: string[];
  cover?: string;
  sections: ChapterSection[];
  html: string;
};

type ChapterFrontmatter = Omit<Chapter, "slug" | "sections" | "html">;

function chapterDirectory(course: string) {
  return path.join(contentRoot, course);
}

export function getChapterSlugs(course: string) {
  const directory = chapterDirectory(course);

  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => file.replace(/\.md$/, ""));
}

function addHeadingIds(markdown: string) {
  const sections: ChapterSection[] = [];
  let index = 0;

  const content = markdown.replace(/^##\s+(.+)$/gm, (_, heading: string) => {
    index += 1;
    const title = heading.trim();
    const id = `section-${index}`;
    sections.push({ id, title });
    return `<h2 id="${id}">${title}</h2>`;
  });

  return { content, sections };
}

export function getChapter(course: string, slug: string): Chapter {
  const filePath = path.join(chapterDirectory(course), `${slug}.md`);
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as ChapterFrontmatter;
  const prepared = addHeadingIds(content);

  return {
    ...frontmatter,
    slug,
    keywords: frontmatter.keywords ?? [],
    sections: prepared.sections,
    html: marked.parse(prepared.content, {
      async: false,
      gfm: true,
    }) as string,
  };
}

export function getCourseChapters(course: string) {
  return getChapterSlugs(course)
    .map((slug) => getChapter(course, slug))
    .sort((a, b) => a.chapter - b.chapter);
}
