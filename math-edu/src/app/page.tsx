import { courses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-1">Welcome to Math Academy</h1>
      <p className="text-foreground/80 mb-6">
        Browse courses, watch lessons, and practice with instant feedback.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
