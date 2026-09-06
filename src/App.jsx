import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

function App() {
  const [step, setStep] = useState(0)
  const [bootFinished, setBootFinished] = useState(false)

  const messages = [
    "Initializing system...",
    "Loading core modules...",
    "Loading interface...",
    "Checking system...",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((currentStep) => {
        if (currentStep < messages.length) {
          return currentStep + 1
        }

        clearInterval(timer)

        setTimeout(() => {
          setBootFinished(true)
        }, 1000)

        return currentStep
      })
    }, 900)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!bootFinished ? (
        <BootScreen messages={messages} step={step} />
      ) : (
        <Desktop />
      )}
    </AnimatePresence>
  )
}

/* =========================
   BOOT SCREEN
========================= */

function BootScreen({ messages, step }) {
  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        KHAYYAM OS
      </motion.h1>

      <div className="boot-messages">
        {messages.slice(0, step).map((message) => (
          <motion.p
            key={message}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {">"} {message}
          </motion.p>
        ))}
      </div>

      <motion.div
        className="loading-bar"
        initial={{ width: 0 }}
        animate={{
          width: `${(step / messages.length) * 100}%`,
        }}
      />
    </motion.div>
  )
}

/* =========================
   DESKTOP
========================= */

function Desktop() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  return (
    <motion.div
      className="desktop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="desktop-content">

        {/* ABOUT */}
        <div
          className="desktop-icon"
          onClick={() => setAboutOpen(true)}
        >
          <div className="icon">👤</div>
          <span>About Me</span>
        </div>

        {/* PROJECTS */}
        <div
          className="desktop-icon"
          onClick={() => setProjectsOpen(true)}
        >
          <div className="icon">📁</div>
          <span>Projects</span>
        </div>

        {/* SKILLS */}
        <div
          className="desktop-icon"
          onClick={() => setSkillsOpen(true)}
        >
          <div className="icon">⚙️</div>
          <span>Skills</span>
        </div>

        {/* RESUME */}
        <div
          className="desktop-icon"
          onClick={() => setResumeOpen(true)}
        >
          <div className="icon">📄</div>
          <span>Resume</span>
        </div>

        {/* TERMINAL */}
        <div
          className="desktop-icon"
          onClick={() => setTerminalOpen(true)}
        >
          <div className="icon">💻</div>
          <span>Terminal</span>
        </div>

      </div>

      {/* ABOUT */}
      <AnimatePresence>
        {aboutOpen && (
          <AboutWindow
            onClose={() => setAboutOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* PROJECTS */}
      <AnimatePresence>
        {projectsOpen && (
          <ProjectsWindow
            onClose={() => setProjectsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SKILLS */}
      <AnimatePresence>
        {skillsOpen && (
          <SkillsWindow
            onClose={() => setSkillsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* RESUME */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeWindow
            onClose={() => setResumeOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* TERMINAL */}
      <AnimatePresence>
        {terminalOpen && (
          <TerminalWindow
            onClose={() => setTerminalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* TASKBAR */}
      <div className="taskbar">
        <div className="start-button">
          K
        </div>

        <div className="taskbar-title">
          KHAYYAM OS
        </div>

        <div className="system-info">
          Online • 2026
        </div>
      </div>
    </motion.div>
  )
}

/* =========================
   ABOUT WINDOW
========================= */

function AboutWindow({ onClose }) {
  return (
    <motion.div
      className="window about-window"
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <div className="window-header">
        <span>
          About Me
        </span>

        <button onClick={onClose}>
          ×
        </button>
      </div>

      <div className="window-content about-content">

        <div className="about-top">
          <div className="profile-icon">
            K
          </div>

          <div>
            <span className="section-label">
              USER PROFILE
            </span>

            <h2>
              Khayyam Mehmood
            </h2>

            <p className="about-role">
              Computer Science Student
            </p>
          </div>
        </div>

        <div className="about-divider" />

        <div className="about-description">
          <p>
            I'm a Computer Science student at Capital
            University of Science & Technology with an
            interest in software development and modern
            web technologies.
          </p>

          <p>
            I've worked with technologies including
            JavaScript, React, Node.js, Express,
            MongoDB, MySQL, C++ and Python.
          </p>

          <p>
            I'm focused on building real-world projects,
            improving my development skills and growing
            as a software developer.
          </p>
        </div>

        <div className="about-stats">

          <div className="about-stat">
            <span>DEGREE</span>
            <strong>
              BS Computer Science
            </strong>
          </div>

          <div className="about-stat">
            <span>FOCUS</span>
            <strong>
              Software Development
            </strong>
          </div>

          <div className="about-stat">
            <span>STATUS</span>
            <strong>
              Open to Opportunities
            </strong>
          </div>

        </div>
      </div>
    </motion.div>
  )
}

/* =========================
   PROJECTS WINDOW
========================= */

function ProjectsWindow({ onClose }) {
  const projects = [
    {
      name: "Khaanakart",
      description:
        "A food delivery web application designed to provide a modern online ordering experience.",
      type: "Web Application",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
      ],
      github:
        "https://github.com/KhayyamMehmood",
    },

    {
      name: "Hayal Travel",
      description:
        "A travel and ticket booking web application built as a practical web development project.",
      type: "Web Application",
      technologies: [
        "React",
        "JavaScript",
        "Tailwind CSS",
      ],
      github:
        "https://github.com/KhayyamMehmood",
    },

    {
      name: "Home Care Services",
      description:
        "A real-world website developed for a home care service.",
      type: "Web Development",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
      ],
      github:
        "https://github.com/KhayyamMehmood/home-care-services",
    },

    {
      name: "Book Nest",
      description:
        "A book-focused website developed during internship practice.",
      type: "Web Development",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
      ],
      github:
        "https://github.com/KhayyamMehmood/book-nest",
    },
  ]

  return (
    <motion.div
      className="window projects-window"
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <div className="window-header">
        <span>
          Projects
        </span>

        <button onClick={onClose}>
          ×
        </button>
      </div>

      <div className="window-content">

        <div className="projects-heading">
          <span className="section-label">
            PORTFOLIO
          </span>

          <h2>
            Selected Projects
          </h2>

          <p>
            A collection of things I've built.
          </p>
        </div>

        <div className="projects-grid">

          {projects.map((project, index) => (
            <motion.div
              className="project-card"
              key={project.name}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.12,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <div className="project-number">
                0{index + 1}
              </div>

              <div className="project-type">
                {project.type}
              </div>

              <h3>
                {project.name}
              </h3>

              <p>
                {project.description}
              </p>

              <div className="technologies">
                {project.technologies.map((tech) => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}
              </div>

              <button
                className="github-button"
                onClick={() =>
                  window.open(
                    project.github,
                    "_blank"
                  )
                }
              >
                GitHub →
              </button>
            </motion.div>
          ))}

        </div>
      </div>
    </motion.div>
  )
}

/* =========================
   SKILLS WINDOW
========================= */

function SkillsWindow({ onClose }) {
  const skillCategories = [
    {
      name: "Frontend",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Bootstrap",
        "Tailwind CSS",
      ],
    },

    {
      name: "Backend",
      skills: [
        "Node.js",
        "Express.js",
      ],
    },

    {
      name: "Databases",
      skills: [
        "MySQL",
        "MongoDB",
        "Firebase",
      ],
    },

    {
      name: "Languages",
      skills: [
        "JavaScript",
        "C++",
        "Python",
      ],
    },

    {
      name: "Tools",
      skills: [
        "Git",
        "GitHub",
        "Vite",
        "Netlify",
      ],
    },

    {
      name: "Other",
      skills: [
        "Flutter",
        "Dart",
      ],
    },
  ]

  return (
    <motion.div
      className="window skills-window"
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <div className="window-header">
        <span>
          Skills
        </span>

        <button onClick={onClose}>
          ×
        </button>
      </div>

      <div className="window-content">

        <div className="skills-heading">
          <span className="section-label">
            TECHNICAL PROFILE
          </span>

          <h2>
            Skills & Technologies
          </h2>

          <p>
            Technologies and tools I've worked with.
          </p>
        </div>

        <div className="skills-grid">

          {skillCategories.map(
            (category, categoryIndex) => (
              <motion.div
                className="skill-category"
                key={category.name}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: categoryIndex * 0.08,
                }}
              >

                <div className="skill-category-header">
                  <span className="skill-category-number">
                    0{categoryIndex + 1}
                  </span>

                  <h3>
                    {category.name}
                  </h3>
                </div>

                <div className="skill-list">

                  {category.skills.map(
                    (skill, skillIndex) => (
                      <motion.div
                        className="skill-item"
                        key={skill}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            categoryIndex * 0.08 +
                            skillIndex * 0.04,
                        }}
                        whileHover={{
                          x: 4,
                        }}
                      >
                        <span className="skill-dot">
                          +
                        </span>

                        <span>
                          {skill}
                        </span>
                      </motion.div>
                    )
                  )}

                </div>
              </motion.div>
            )
          )}

        </div>
      </div>
    </motion.div>
  )
}

/* =========================
   RESUME WINDOW
========================= */

function ResumeWindow({ onClose }) {
  return (
    <motion.div
      className="window resume-window"
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <div className="window-header">
        <span>
          Resume
        </span>

        <button onClick={onClose}>
          ×
        </button>
      </div>

      <div className="window-content resume-content">

        <div className="resume-heading">
          <span className="section-label">
            DOCUMENT
          </span>

          <h2>
            My Resume
          </h2>

          <p>
            A professional overview of my education,
            technical skills and development projects.
          </p>
        </div>

        <div className="resume-preview">

          <div className="resume-paper">

            <div className="resume-paper-header">
              <div>
                <h1>
                  KHAYYAM MEHMOOD
                </h1>

                <p>
                  Computer Science Student
                </p>
              </div>

              <div className="resume-initial">
                K
              </div>
            </div>

            <div className="resume-contact">
              <span>
                khayyammehmood7@gmail.com
              </span>

              <span>
                github.com/KhayyamMehmood
              </span>

              <span>
                linkedin.com/in/khayyam-mehmood-691a7b350
              </span>
            </div>

            <div className="resume-line" />

            <div className="resume-section">
              <h3>
                PROFILE
              </h3>

              <p>
                Computer Science student at Capital
                University of Science & Technology with
                hands-on experience developing web
                applications using modern frontend and
                backend technologies. Interested in
                software development, problem solving
                and building practical digital products.
              </p>
            </div>

            <div className="resume-section">
              <h3>
                EDUCATION
              </h3>

              <div className="resume-entry">
                <strong>
                  Bachelor of Science in Computer Science
                </strong>

                <p>
                  Capital University of Science &
                  Technology
                </p>
              </div>
            </div>

            <div className="resume-section">
              <h3>
                TECHNICAL SKILLS
              </h3>

              <p>
                JavaScript • React • HTML • CSS •
                Tailwind CSS • Bootstrap • Node.js •
                Express.js • MySQL • MongoDB • Firebase •
                C++ • Python • Git • GitHub • Vite •
                Flutter • Dart
              </p>
            </div>

            <div className="resume-section">
              <h3>
                PROJECTS
              </h3>

              <div className="resume-entry">
                <strong>
                  Khaanakart
                </strong>

                <p>
                  Food delivery web application focused
                  on providing a modern online ordering
                  experience.
                </p>
              </div>

              <div className="resume-entry">
                <strong>
                  Hayal Travel
                </strong>

                <p>
                  Travel and ticket booking web
                  application built as a practical
                  development project.
                </p>
              </div>

              <div className="resume-entry">
                <strong>
                  Home Care Services
                </strong>

                <p>
                  Real-world website developed for a
                  home care service.
                </p>
              </div>

              <div className="resume-entry">
                <strong>
                  Book Nest
                </strong>

                <p>
                  Book-focused website developed during
                  internship practice.
                </p>
              </div>
            </div>

            <div className="resume-section">
              <h3>
                GITHUB
              </h3>

              <p>
                github.com/KhayyamMehmood
              </p>
            </div>

          </div>
        </div>

        <div className="resume-actions">

          <button
            className="resume-button"
            onClick={() =>
              window.open(
                "https://github.com/KhayyamMehmood",
                "_blank"
              )
            }
          >
            GitHub →
          </button>

          <button
            className="resume-button secondary"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/khayyam-mehmood-691a7b350/",
                "_blank"
              )
            }
          >
            LinkedIn →
          </button>

          <button
            className="resume-button secondary"
            onClick={() =>
              window.open(
                "mailto:khayyammehmood7@gmail.com",
                "_blank"
              )
            }
          >
            Email →
          </button>

        </div>
      </div>
    </motion.div>
  )
}

/* =========================
   TERMINAL WINDOW
========================= */

function TerminalWindow({ onClose }) {
  const [history, setHistory] = useState([
    {
      type: "output",
      text: [
        "KHAYYAM OS Terminal v1.0",
        "Type 'help' to see available commands.",
      ],
    },
  ])

  const [input, setInput] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const commands = {
    help: [
      "Available commands:",
      "",
      "about       About Khayyam",
      "projects    View projects",
      "skills      View technical skills",
      "neofetch    Show system information",
      "github      Open GitHub",
      "linkedin    Open LinkedIn",
      "email       Contact Khayyam",
      "clear       Clear terminal",
      "help        Show available commands",
    ],

    about: [
      "Name: Khayyam Mehmood",
      "Degree: BS Computer Science",
      "University: Capital University of Science & Technology",
      "Focus: Software Development",
      "Status: Open to Opportunities",
    ],

    projects: [
      "01  Khaanakart",
      "02  Hayal Travel",
      "03  Home Care Services",
      "04  Book Nest",
    ],

    skills: [
      "Frontend:",
      "  HTML, CSS, JavaScript, React",
      "  Bootstrap, Tailwind CSS",
      "",
      "Backend:",
      "  Node.js, Express.js",
      "",
      "Databases:",
      "  MySQL, MongoDB, Firebase",
      "",
      "Languages:",
      "  JavaScript, C++, Python",
      "",
      "Tools:",
      "  Git, GitHub, Vite, Netlify",
      "",
      "Other:",
      "  Flutter, Dart",
    ],

    neofetch: [
      "██╗  ██╗ █████╗ ██╗   ██╗██╗   ██╗ █████╗ ███╗   ███╗",
      "██║ ██╔╝██╔══██╗╚██╗ ██╔╝╚██╗ ██╔╝██╔══██╗████╗ ████║",
      "█████╔╝ ███████║ ╚████╔╝  ╚████╔╝ ███████║██╔████╔██║",
      "██╔═██╗ ██╔══██║  ╚██╔╝    ╚██╔╝  ██╔══██║██║╚██╔╝██║",
      "██║  ██╗██║  ██║   ██║      ██║   ██║  ██║██║ ╚═╝ ██║",
      "╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝",
      "",
      "OS:        KHAYYAM OS",
      "User:      Khayyam Mehmood",
      "Shell:     KHAYYAM Terminal",
      "Degree:    BS Computer Science",
      "University:CUST",
      "Focus:     Software Development",
      "Frontend:  React / Tailwind CSS",
      "Backend:   Node.js / Express",
      "Languages: JavaScript / C++ / Python",
      "Status:    Open to Opportunities",
    ],

    github: [
      "Opening GitHub...",
    ],

    linkedin: [
      "Opening LinkedIn...",
    ],

    email: [
      "Opening email client...",
    ],
  }

  const handleCommand = (event) => {
    if (event.key !== "Enter") {
      return
    }

    const command = input.trim().toLowerCase()

    if (!command) {
      setHistory((previous) => [
        ...previous,
        {
          type: "command",
          text: "",
        },
      ])

      setInput("")
      return
    }

    if (command === "clear") {
      setHistory([])
      setInput("")
      return
    }

    const output = commands[command]

    if (command === "github") {
      window.open(
        "https://github.com/KhayyamMehmood",
        "_blank"
      )
    }

    if (command === "linkedin") {
      window.open(
        "https://www.linkedin.com/in/khayyam-mehmood-691a7b350/",
        "_blank"
      )
    }

    if (command === "email") {
      window.open(
        "mailto:khayyammehmood7@gmail.com",
        "_blank"
      )
    }

    setHistory((previous) => [
      ...previous,
      {
        type: "command",
        text: command,
      },
      {
        type: "output",
        text: output || [
          `Command not found: ${command}`,
          "Type 'help' to see available commands.",
        ],
      },
    ])

    setInput("")
  }

  return (
    <motion.div
      className="window terminal-window"
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="window-header terminal-header">
        <span>
          Terminal
        </span>

        <button onClick={onClose}>
          ×
        </button>
      </div>

      <div className="terminal-body">

        {history.map((item, index) => (
          <div
            key={index}
            className={
              item.type === "command"
                ? "terminal-command"
                : "terminal-output"
            }
          >
            {item.type === "command" && (
              <span className="terminal-prompt">
                khayyam@os:~$
              </span>
            )}

            {item.type === "command" ? (
              <span className="terminal-command-text">
                {" "}{item.text}
              </span>
            ) : (
              item.text.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {line || "\u00A0"}
                </div>
              ))
            )}
          </div>
        ))}

        <div className="terminal-input-row">

          <span className="terminal-prompt">
            khayyam@os:~$
          </span>

          <input
            ref={inputRef}
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleCommand}
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />

        </div>

      </div>
    </motion.div>
  )
}

export default App