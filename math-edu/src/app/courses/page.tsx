import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function CoursesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">All Courses</h1>
      <p className="text-foreground/80 mb-6">Pick a course to get started.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}