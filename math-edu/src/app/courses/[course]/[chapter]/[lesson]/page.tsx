import { notFound } from "next/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import ProblemSet from "@/components/ProblemSet";
import { getCourseBySlug, getLessonBySlugs, allLessonParams } from "@/data/courses";

export function generateStaticParams() {
  return allLessonParams();
}

export default function LessonPage({
  params,
}: {
  params: { course: string; chapter: string; lesson: string };
}) {
  const course = getCourseBySlug(params.course);
  const lesson = getLessonBySlugs(params.course, params.chapter, params.lesson);
  if (!course || !lesson) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-sm text-foreground/70 mb-2">
        {course.title} / {lesson.title}
      </div>
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <VideoPlayer {...lesson.video} />

      <h2 className="text-xl font-semibold mt-8 mb-3">Practice problems</h2>
      <ProblemSet problems={lesson.problems} />
    </div>
  );
}