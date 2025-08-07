import Link from "next/link";
import { Course } from "@/data/types";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-lg border border-black/10 dark:border-white/10 p-4 flex flex-col gap-2 bg-white dark:bg-black/10">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-sm text-foreground/80">{course.description}</p>
      <Link
        className="mt-2 inline-flex w-max rounded-md bg-foreground text-background text-sm px-3 py-2 hover:opacity-90"
        href={`/courses/${course.slug}`}
      >
        View course
      </Link>
    </div>
  );
}