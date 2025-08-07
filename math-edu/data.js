(function(){
  const courses = [
    {
      id: "algebra-1",
      title: "Algebra I",
      description: "Master variables, equations, functions, and introductory algebraic reasoning.",
      thumbnail: "assets/algebra.jpg",
      chapters: [
        {
          id: "linear-equations",
          title: "Linear Equations",
          lessons: [
            {
              id: "intro-variables",
              title: "Introduction to Variables",
              description: "Understand what variables represent and how to work with them.",
              videoUrl: "https://www.youtube.com/embed/4v7-2h3G0xk",
              problems: [
                {
                  id: "p1",
                  type: "mcq",
                  prompt: "Which symbol is commonly used to represent a variable?",
                  choices: ["=", "x", "2", "+"],
                  correctAnswer: 1,
                  explanation: "A letter like x is commonly used to represent a variable."
                },
                {
                  id: "p2",
                  type: "short",
                  prompt: "If x = 3, what is x + 5?",
                  correctAnswer: "8",
                  explanation: "Substitute x with 3, then 3 + 5 = 8."
                }
              ]
            },
            {
              id: "solve-1step",
              title: "Solve One-step Equations",
              description: "Solve simple equations using inverse operations.",
              videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
              problems: [
                {
                  id: "p1",
                  type: "mcq",
                  prompt: "Solve x + 7 = 12",
                  choices: ["x = 5", "x = 19", "x = -5", "x = 7"],
                  correctAnswer: 0,
                  explanation: "Subtract 7 from both sides: x = 12 - 7 = 5."
                },
                {
                  id: "p2",
                  type: "short",
                  prompt: "Solve 3x = 18. Enter the value of x.",
                  correctAnswer: "6",
                  explanation: "Divide both sides by 3 to get x = 6."
                }
              ]
            }
          ]
        },
        {
          id: "functions",
          title: "Functions",
          lessons: [
            {
              id: "function-concepts",
              title: "What is a Function?",
              description: "Inputs, outputs, and function notation.",
              videoUrl: "https://www.youtube.com/embed/mYFZQf8mxmY",
              problems: [
                {
                  id: "p1",
                  type: "mcq",
                  prompt: "A function pairs each input with how many outputs?",
                  choices: ["Zero", "Exactly one", "At least two", "Infinitely many"],
                  correctAnswer: 1,
                  explanation: "By definition, a function maps each input to exactly one output."
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "geometry",
      title: "Geometry",
      description: "Lines, angles, triangles, circles, and geometric reasoning.",
      thumbnail: "assets/geometry.jpg",
      chapters: [
        {
          id: "angles",
          title: "Angles",
          lessons: [
            {
              id: "angle-basics",
              title: "Angle Basics",
              description: "Types of angles and how to measure them.",
              videoUrl: "https://www.youtube.com/embed/N7WfPpL3FfQ",
              problems: [
                {
                  id: "p1",
                  type: "mcq",
                  prompt: "An angle of 90° is called?",
                  choices: ["Acute", "Right", "Obtuse", "Straight"],
                  correctAnswer: 1,
                  explanation: "A right angle measures exactly 90°."
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  window.COURSES = courses;
})();