import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseBySlug, getChapterBySlugs, allChapterParams } from "@/data/courses";

export function generateStaticParams() {
  return allChapterParams();
}

export default function ChapterPage({
  params,
}: {
  params: { course: string; chapter: string };
}) {
  const course = getCourseBySlug(params.course);
  const chapter = getChapterBySlugs(params.course, params.chapter);
  if (!course || !chapter) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="text-sm text-foreground/70 mb-2">
        <Link href={`/courses/${course.slug}`} className="hover:underline">
          {course.title}
        </Link>{" "}
        / {chapter.title}
      </div>
      <h1 className="text-2xl font-bold mb-2">{chapter.title}</h1>
      <h2 className="text-xl font-semibold mb-3">Lessons</h2>
      <div className="flex flex-col gap-3">
        {chapter.lessons.map((lesson) => (
          <Link
            key={lesson.slug}
            href={`/courses/${course.slug}/${chapter.slug}/${lesson.slug}`}
            className="rounded-md border border-black/10 dark:border-white/10 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="font-medium">{lesson.title}</div>
            {lesson.description && (
              <div className="text-sm text-foreground/70">{lesson.description}</div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}