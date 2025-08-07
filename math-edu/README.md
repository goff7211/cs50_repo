# Math Academy (Static Demo)

A lightweight static math education site with courses → chapters → lessons. Lessons include an embedded video and interactive practice problems. Progress and answers are saved to `localStorage`.

## Quick start

- Serve the folder with any static server. Example using Python:

```bash
cd /workspace/math-edu
python3 -m http.server 8000
```

- Open `http://localhost:8000` in your browser.

## Structure

- `index.html`: Courses list
- `course.html`: Course detail with chapters and lessons
- `lesson.html`: Lesson page with video and practice
- `data.js`: Seed data for demo courses
- `app.js`: UI rendering, answer checking, progress tracking
- `styles.css`: Styles

## Customize

- Edit `data.js` to add more courses, chapters, lessons, and problems.
- Supported problem types:
  - `mcq`: multiple choice (set `choices` and numeric `correctAnswer` index)
  - `short`: short answer (set `correctAnswer` as string or array of strings)

## Notes

- Videos are embedded via YouTube; ensure you have internet access.
- This is a static demo and does not require a backend.