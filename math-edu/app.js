(function(){
  const App = {
    init() {
      document.getElementById('year').textContent = new Date().getFullYear();
      const page = document.body.dataset.page;
      if (page === 'home') this.renderHome();
      if (page === 'course') this.renderCourse();
      if (page === 'lesson') this.renderLesson();
    },

    // ---------- Routing helpers ----------
    getQueryParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    },

    // ---------- Data helpers ----------
    getCourseById(courseId) {
      return window.COURSES.find(c => c.id === courseId);
    },
    getChapterById(course, chapterId) {
      return course?.chapters.find(ch => ch.id === chapterId);
    },
    getLessonById(chapter, lessonId) {
      return chapter?.lessons.find(ls => ls.id === lessonId);
    },

    // ---------- Progress storage ----------
    getProgress() {
      try { return JSON.parse(localStorage.getItem('progress') || '{}'); } catch { return {}; }
    },
    setProgress(progress) {
      localStorage.setItem('progress', JSON.stringify(progress));
    },
    isLessonComplete(courseId, lessonGlobalId) {
      const p = this.getProgress();
      return Boolean(p[courseId]?.completed?.[lessonGlobalId]);
    },
    markLessonCompletion(courseId, lessonGlobalId, isComplete) {
      const p = this.getProgress();
      if (!p[courseId]) p[courseId] = { completed: {} };
      p[courseId].completed[lessonGlobalId] = Boolean(isComplete);
      this.setProgress(p);
    },
    getCourseCompletion(course) {
      const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
      const p = this.getProgress();
      const completed = p[course.id]?.completed || {};
      const completedCount = Object.values(completed).filter(Boolean).length;
      const pct = totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);
      return { totalLessons, completedCount, pct };
    },

    // ---------- Render: Home ----------
    renderHome() {
      const listEl = document.getElementById('course-list');
      listEl.innerHTML = '';
      window.COURSES.forEach(course => {
        const prog = this.getCourseCompletion(course);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <div class="meta">
            <span class="badge ${prog.pct === 100 ? 'complete' : ''}"><span class="dot"></span>${prog.pct}% complete</span>
            <span>${prog.completedCount} / ${prog.totalLessons} lessons</span>
          </div>
          <a class="btn primary" href="./course.html?course=${encodeURIComponent(course.id)}">View course</a>
        `;
        listEl.appendChild(card);
      });
    },

    // ---------- Render: Course ----------
    renderCourse() {
      const courseId = this.getQueryParam('course');
      const course = this.getCourseById(courseId);
      if (!course) {
        this.renderNotFound('Course');
        return;
      }

      document.title = `Math Academy — ${course.title}`;
      document.getElementById('course-title').textContent = course.title;
      document.getElementById('course-description').textContent = course.description;

      this.renderBreadcrumbs([
        { label: 'Courses', href: './index.html' },
        { label: course.title }
      ]);

      const chaptersEl = document.getElementById('chapters');
      chaptersEl.innerHTML = '';

      course.chapters.forEach(chapter => {
        const section = document.createElement('section');
        section.className = 'chapter card';
        section.innerHTML = `<h2>${chapter.title}</h2>`;

        const ul = document.createElement('ul');
        ul.className = 'lesson-list';

        chapter.lessons.forEach(lesson => {
          const li = document.createElement('li');
          const lessonGlobalId = `${chapter.id}__${lesson.id}`;
          const completed = this.isLessonComplete(course.id, lessonGlobalId);
          li.innerHTML = `
            <span>
              <a href="./lesson.html?course=${encodeURIComponent(course.id)}&chapter=${encodeURIComponent(chapter.id)}&lesson=${encodeURIComponent(lesson.id)}">${lesson.title}</a>
              <span class="muted" style="margin-left:8px;">${lesson.description || ''}</span>
            </span>
            <span class="badge ${completed ? 'complete' : ''}"><span class="dot"></span>${completed ? 'Done' : 'Not started'}</span>
          `;
          ul.appendChild(li);
        });

        section.appendChild(ul);
        chaptersEl.appendChild(section);
      });
    },

    // ---------- Render: Lesson ----------
    renderLesson() {
      const courseId = this.getQueryParam('course');
      const chapterId = this.getQueryParam('chapter');
      const lessonId = this.getQueryParam('lesson');

      const course = this.getCourseById(courseId);
      const chapter = this.getChapterById(course, chapterId);
      const lesson = this.getLessonById(chapter, lessonId);

      if (!course || !chapter || !lesson) {
        this.renderNotFound('Lesson');
        return;
      }

      document.title = `Math Academy — ${lesson.title}`;

      this.renderBreadcrumbs([
        { label: 'Courses', href: './index.html' },
        { label: course.title, href: `./course.html?course=${encodeURIComponent(course.id)}` },
        { label: lesson.title }
      ]);

      document.getElementById('lesson-title').textContent = lesson.title;
      document.getElementById('lesson-description').textContent = lesson.description || '';

      const iframe = document.getElementById('lesson-video');
      iframe.src = lesson.videoUrl;

      const problemsEl = document.getElementById('problems');
      problemsEl.innerHTML = '';

      const savedAnswers = this.getSavedAnswers(courseId, chapterId, lessonId);

      lesson.problems.forEach((problem, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'problem';

        const title = document.createElement('h3');
        title.textContent = `Problem ${index + 1}`;
        wrapper.appendChild(title);

        const prompt = document.createElement('div');
        prompt.innerHTML = problem.prompt;
        wrapper.appendChild(prompt);

        if (problem.type === 'mcq') {
          const choices = document.createElement('div');
          choices.className = 'choices';
          problem.choices.forEach((choice, i) => {
            const label = document.createElement('label');
            label.className = 'choice';
            label.innerHTML = `
              <input type="radio" name="${problem.id}" value="${i}"> <span>${choice}</span>
            `;
            choices.appendChild(label);
          });
          wrapper.appendChild(choices);

          if (savedAnswers && savedAnswers[problem.id] != null) {
            const radios = choices.querySelectorAll(`input[name="${problem.id}"]`);
            const savedIndex = parseInt(savedAnswers[problem.id], 10);
            if (!Number.isNaN(savedIndex) && radios[savedIndex]) radios[savedIndex].checked = true;
          }
        } else if (problem.type === 'short') {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = problem.id;
          input.placeholder = 'Type your answer';
          if (savedAnswers && savedAnswers[problem.id] != null) input.value = savedAnswers[problem.id];
          wrapper.appendChild(input);
        }

        const feedback = document.createElement('div');
        feedback.className = 'feedback';
        wrapper.appendChild(feedback);

        problemsEl.appendChild(wrapper);
      });

      const checkBtn = document.getElementById('check-answers');
      const resetBtn = document.getElementById('reset-answers');
      const scoreEl = document.getElementById('score');

      checkBtn.addEventListener('click', () => {
        const { correctCount, total } = this.checkAnswers(lesson);
        scoreEl.textContent = `Score: ${correctCount} / ${total}`;
        const lessonGlobalId = `${chapter.id}__${lesson.id}`;
        const allCorrect = correctCount === total;
        this.markLessonCompletion(course.id, lessonGlobalId, allCorrect);
      });

      resetBtn.addEventListener('click', () => {
        this.clearSavedAnswers(courseId, chapterId, lessonId);
        this.renderLesson();
      });
    },

    // ---------- Practice logic ----------
    getAnswersFromDOM(lesson) {
      const answers = {};
      lesson.problems.forEach(problem => {
        if (problem.type === 'mcq') {
          const selected = document.querySelector(`input[name="${problem.id}"]:checked`);
          answers[problem.id] = selected ? selected.value : null;
        } else if (problem.type === 'short') {
          const input = document.querySelector(`input[name="${problem.id}"]`);
          answers[problem.id] = (input?.value || '').trim();
        }
      });
      return answers;
    },

    checkAnswers(lesson) {
      const courseId = this.getQueryParam('course');
      const chapterId = this.getQueryParam('chapter');
      const lessonId = this.getQueryParam('lesson');

      const answers = this.getAnswersFromDOM(lesson);
      this.saveAnswers(courseId, chapterId, lessonId, answers);

      let correctCount = 0;
      lesson.problems.forEach(problem => {
        const given = answers[problem.id];
        let isCorrect = false;
        if (problem.type === 'mcq') {
          isCorrect = String(problem.correctAnswer) === String(given);
        } else if (problem.type === 'short') {
          const correct = Array.isArray(problem.correctAnswer) ? problem.correctAnswer.map(String) : [String(problem.correctAnswer)];
          isCorrect = correct.map(s => s.trim().toLowerCase()).includes(String(given || '').trim().toLowerCase());
        }
        const wrapper = [...document.querySelectorAll('.problem')].find(node =>
          node.querySelector(`[name="${problem.id}"]`)
        );
        const feedback = wrapper?.querySelector('.feedback');
        if (feedback) {
          feedback.textContent = isCorrect ? 'Correct!' : `Not quite. ${problem.explanation || ''}`;
          feedback.className = `feedback ${isCorrect ? 'ok' : 'no'}`;
        }
        if (isCorrect) correctCount += 1;
      });

      return { correctCount, total: lesson.problems.length };
    },

    // ---------- Answer storage ----------
    getSavedAnswers(courseId, chapterId, lessonId) {
      try {
        const key = `answers:${courseId}:${chapterId}:${lessonId}`;
        return JSON.parse(localStorage.getItem(key) || 'null');
      } catch { return null; }
    },
    saveAnswers(courseId, chapterId, lessonId, answers) {
      const key = `answers:${courseId}:${chapterId}:${lessonId}`;
      localStorage.setItem(key, JSON.stringify(answers));
    },
    clearSavedAnswers(courseId, chapterId, lessonId) {
      const key = `answers:${courseId}:${chapterId}:${lessonId}`;
      localStorage.removeItem(key);
    },

    // ---------- UI utils ----------
    renderBreadcrumbs(items) {
      const el = document.getElementById('breadcrumbs');
      if (!el) return;
      el.innerHTML = items.map((it, idx) => {
        if (it.href && idx < items.length - 1) {
          return `<a href="${it.href}">${it.label}</a>`;
        }
        return `<span>${it.label}</span>`;
      }).join(' › ');
    },

    renderNotFound(entity) {
      const main = document.querySelector('main.container');
      main.innerHTML = `<div class="card"><h2>${entity} not found</h2><p class="muted">Please go back to <a href=\"./index.html\">Courses</a>.</p></div>`;
    }
  };

  window.addEventListener('DOMContentLoaded', () => App.init());
})();