export type VideoSource =
  | { type: "youtube"; youtubeId: string }
  | { type: "file"; src: string };

export type PracticeProblem = {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation?: string;
};

export type Lesson = {
  slug: string;
  title: string;
  description?: string;
  video: VideoSource;
  problems: PracticeProblem[];
};

export type Chapter = {
  slug: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  description: string;
  chapters: Chapter[];
};

export type CourseSlugParams = {
  course: string;
  chapter?: string;
  lesson?: string;
};