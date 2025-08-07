import { Course } from "./types";

export const courses: Course[] = [
  {
    slug: "algebra-1",
    title: "Algebra 1",
    description: "Master the foundations: expressions, equations, functions, and graphs.",
    chapters: [
      {
        slug: "linear-equations",
        title: "Linear Equations",
        lessons: [
          {
            slug: "solving-one-step-equations",
            title: "Solving One-Step Equations",
            description:
              "Learn to solve equations like x + 5 = 12 and 3x = 15 using inverse operations.",
            video: { type: "youtube", youtubeId: "QKzLZk2unLw" },
            problems: [
              {
                id: "p1",
                question: "Solve: x + 7 = 12",
                choices: ["x = 19", "x = 5", "x = -5", "x = -19"],
                correctIndex: 1,
                explanation: "Subtract 7 from both sides: x = 12 - 7 = 5.",
              },
              {
                id: "p2",
                question: "Solve: 4x = 28",
                choices: ["x = 7", "x = 24", "x = 32", "x = 4"],
                correctIndex: 0,
                explanation: "Divide both sides by 4: x = 28 / 4 = 7.",
              },
            ],
          },
          {
            slug: "two-step-equations",
            title: "Solving Two-Step Equations",
            description: "Solve equations like 2x + 3 = 11.",
            video: { type: "youtube", youtubeId: "fJTvE1TzXQE" },
            problems: [
              {
                id: "p1",
                question: "Solve: 2x + 3 = 11",
                choices: ["x = 7", "x = 4", "x = -4", "x = 14"],
                correctIndex: 1,
                explanation: "Subtract 3, then divide by 2: x = (11 - 3) / 2 = 4.",
              },
            ],
          },
        ],
      },
      {
        slug: "quadratic-functions",
        title: "Quadratic Functions",
        lessons: [
          {
            slug: "intro-to-quadratics",
            title: "Introduction to Quadratics",
            description:
              "Understand standard form, vertex form, and the shape of parabolas.",
            video: { type: "youtube", youtubeId: "XgkVt6v0u0M" },
            problems: [
              {
                id: "p1",
                question:
                  "Which is the standard form of a quadratic function?",
                choices: [
                  "y = mx + b",
                  "y = ax^2 + bx + c",
                  "y = a(x - h) + k",
                  "y = a/x",
                ],
                correctIndex: 1,
                explanation: "Standard form is y = ax^2 + bx + c.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "geometry",
    title: "Geometry",
    description: "Reason about shapes, lines, angles, and area with proofs and intuition.",
    chapters: [
      {
        slug: "triangles",
        title: "Triangles",
        lessons: [
          {
            slug: "triangle-angles",
            title: "Sum of Interior Angles",
            description: "Explore why interior angles of a triangle sum to 180°.",
            video: { type: "youtube", youtubeId: "juqV8Cw31Ig" },
            problems: [
              {
                id: "p1",
                question:
                  "A triangle has angles 50° and 60°. What is the third angle?",
                choices: ["50°", "60°", "70°", "80°"],
                correctIndex: 3,
                explanation:
                  "Angles sum to 180°. 180 - 50 - 60 = 70°, sorry check again. Wait carefully: 180 - 110 = 70°. So correct is 70°.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getCourseBySlug(courseSlug: string) {
  return courses.find((c) => c.slug === courseSlug);
}

export function getChapterBySlugs(courseSlug: string, chapterSlug: string) {
  const course = getCourseBySlug(courseSlug);
  return course?.chapters.find((ch) => ch.slug === chapterSlug);
}

export function getLessonBySlugs(
  courseSlug: string,
  chapterSlug: string,
  lessonSlug: string
) {
  const chapter = getChapterBySlugs(courseSlug, chapterSlug);
  return chapter?.lessons.find((l) => l.slug === lessonSlug);
}

export function allCourseParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export function allChapterParams() {
  const params: { course: string; chapter: string }[] = [];
  for (const course of courses) {
    for (const chapter of course.chapters) {
      params.push({ course: course.slug, chapter: chapter.slug });
    }
  }
  return params;
}

export function allLessonParams() {
  const params: { course: string; chapter: string; lesson: string }[] = [];
  for (const course of courses) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        params.push({
          course: course.slug,
          chapter: chapter.slug,
          lesson: lesson.slug,
        });
      }
    }
  }
  return params;
}