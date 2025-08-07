import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourseBySlug, allCourseParams } from "@/data/courses";

export function generateStaticParams() {
  return allCourseParams();
}

export default function CoursePage({
  params,
}: {
  params: { course: string };
}) {
  const course = getCourseBySlug(params.course);
  if (!course) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
      <p className="text-foreground/80 mb-6">{course.description}</p>

      <h2 className="text-xl font-semibold mb-3">Chapters</h2>
      <div className="flex flex-col gap-3">
        {course.chapters.map((chapter) => (
          <Link
            key={chapter.slug}
            href={`/courses/${course.slug}/${chapter.slug}`}
            className="rounded-md border border-black/10 dark:border-white/10 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <div className="font-medium">{chapter.title}</div>
            <div className="text-sm text-foreground/70">
              {chapter.lessons.length} lesson{chapter.lessons.length === 1 ? "" : "s"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}