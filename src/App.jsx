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

/* =====================================================
   ARC REACTOR
===================================================== */

function ArcReactor() {
  return (
    <div className="arc-reactor" aria-hidden="true">
      <div className="reactor-housing">
        <div className="housing-cut cut-1"></div>
        <div className="housing-cut cut-2"></div>
        <div className="housing-cut cut-3"></div>
        <div className="housing-cut cut-4"></div>
      </div>

      <div className="reactor-ring outer-ring"></div>
      <div className="reactor-ring outer-ring-2"></div>
      <div className="reactor-segments"></div>
      <div className="reactor-ring inner-ring"></div>

      <div className="reactor-plate">
        <div className="reactor-bolts">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="reactor-triangle">
          <div className="triangle-inner"></div>
          <div className="triangle-light"></div>
        </div>

        <div className="reactor-center"></div>
      </div>
    </div>
  )
}

/* =====================================================
   BOOT SCREEN
===================================================== */

function BootScreen({ messages, step }) {
  return (
    <motion.div
      className="boot-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ArcReactor />

      <div className="boot-content">
        <motion.h1
          className="boot-title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          KHAYYAM OS
        </motion.h1>

        <motion.p
          className="boot-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          PERSONAL OPERATING SYSTEM
        </motion.p>

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
      </div>
    </motion.div>
  )
}

/* =====================================================
   DRAGGABLE WINDOW
===================================================== */

function DraggableWindow({
  children,
  title,
  onClose,
  className = "",
}) {
  const [position, setPosition] = useState(null)
  const [dragging, setDragging] = useState(false)

  const dragOffset = useRef({
    x: 0,
    y: 0,
  })

  const windowRef = useRef(null)

  useEffect(() => {
    const centerWindow = () => {
      if (!windowRef.current) return

      const rect = windowRef.current.getBoundingClientRect()

      const centerX =
        (window.innerWidth - rect.width) / 2

      const centerY =
        (window.innerHeight - rect.height) / 2

      setPosition({
        x: Math.max(10, centerX),
        y: Math.max(45, centerY),
      })
    }

    requestAnimationFrame(centerWindow)

    window.addEventListener("resize", centerWindow)

    return () => {
      window.removeEventListener("resize", centerWindow)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragging) return

      setPosition((previous) => {
        if (!previous) return previous

        const width =
          windowRef.current?.offsetWidth || 700

        const height =
          windowRef.current?.offsetHeight || 500

        const maxX =
          window.innerWidth - width - 10

        const maxY =
          window.innerHeight - height - 10

        return {
          x: Math.max(
            10,
            Math.min(
              event.clientX - dragOffset.current.x,
              maxX
            )
          ),
          y: Math.max(
            40,
            Math.min(
              event.clientY - dragOffset.current.y,
              maxY
            )
          ),
        }
      })
    }

    const handleMouseUp = () => {
      setDragging(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  const handleHeaderMouseDown = (event) => {
    if (event.button !== 0) return
    if (!windowRef.current) return

    const rect = windowRef.current.getBoundingClientRect()

    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    setDragging(true)
    event.preventDefault()
  }

  return (
    <motion.div
      ref={windowRef}
      className={`window ${className}`}
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.96,
      }}
      style={{
        position: "fixed",
        left: position ? `${position.x}px` : "50%",
        top: position ? `${position.y}px` : "50%",
        transform: position
          ? "none"
          : "translate(-50%, -50%)",
        margin: 0,
        zIndex: 100,
        cursor: dragging ? "grabbing" : "default",
      }}
    >
      <div
        className="window-header"
        onMouseDown={handleHeaderMouseDown}
        style={{
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        <div className="traffic-lights">
          <button
            className="traffic red"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            onClick={onClose}
          ></button>

          <button
            className="traffic yellow"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          ></button>

          <button
            className="traffic green"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          ></button>
        </div>

        <span className="window-title">{title}</span>

        <div className="window-controls">
          <span>−</span>
          <span>□</span>
          <span
            onMouseDown={(event) =>
              event.stopPropagation()
            }
            onClick={onClose}
            style={{ cursor: "pointer" }}
          >
            ×
          </span>
        </div>
      </div>

      {children}
    </motion.div>
  )
}

/* =====================================================
   DESKTOP
===================================================== */

function Desktop() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const [icons, setIcons] = useState([
    {
      id: "about",
      name: "About Me",
      icon: "◎",
      x: 35,
      y: 75,
      action: () => setAboutOpen(true),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "in",
      x: 35,
      y: 185,
      action: () =>
        window.open(
          "https://www.linkedin.com/in/khayyam-mehmood-691a7b350/",
          "_blank"
        ),
    },
    {
      id: "projects",
      name: "Projects",
      icon: "▣",
      x: 35,
      y: 295,
      action: () => setProjectsOpen(true),
    },
    {
      id: "skills",
      name: "Skills",
      icon: "⚙",
      x: 35,
      y: 405,
      action: () => setSkillsOpen(true),
    },
    {
      id: "resume",
      name: "Resume",
      icon: "▤",
      x: 35,
      y: 515,
      action: () => setResumeOpen(true),
    },
    {
      id: "terminal",
      name: "Terminal",
      icon: ">_",
      x: 35,
      y: 625,
      action: () => setTerminalOpen(true),
    },
    {
      id: "github",
      name: "GitHub",
      icon: "●",
      x: 35,
      y: 735,
      action: () =>
        window.open(
          "https://github.com/KhayyamMehmood",
          "_blank"
        ),
    },
  ])

  const [draggingIcon, setDraggingIcon] = useState(null)
  const [iconMoved, setIconMoved] = useState(false)

  const handleIconMouseDown = (event, id) => {
    if (event.button !== 0) return

    const icon = icons.find((item) => item.id === id)
    if (!icon) return

    setIconMoved(false)

    setDraggingIcon({
      id,
      offsetX: event.clientX - icon.x,
      offsetY: event.clientY - icon.y,
      startX: event.clientX,
      startY: event.clientY,
    })

    event.preventDefault()
  }

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!draggingIcon) return

      const distanceX = Math.abs(
        event.clientX - draggingIcon.startX
      )

      const distanceY = Math.abs(
        event.clientY - draggingIcon.startY
      )

      if (distanceX > 5 || distanceY > 5) {
        setIconMoved(true)
      }

      setIcons((previousIcons) =>
        previousIcons.map((icon) => {
          if (icon.id !== draggingIcon.id) {
            return icon
          }

          const iconWidth = 90
          const iconHeight = 90

          const maxX =
            window.innerWidth - iconWidth - 10

          const maxY =
            window.innerHeight - iconHeight - 80

          return {
            ...icon,
            x: Math.max(
              10,
              Math.min(
                event.clientX - draggingIcon.offsetX,
                maxX
              )
            ),
            y: Math.max(
              45,
              Math.min(
                event.clientY - draggingIcon.offsetY,
                maxY
              )
            ),
          }
        })
      )
    }

    const handleMouseUp = () => {
      setDraggingIcon(null)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [draggingIcon])

  const handleIconClick = (event, item) => {
    if (iconMoved) return
    item.action()
  }

  const toggleContact = () => {
    setContactOpen((current) => !current)
  }

  return (
    <motion.div
      className="desktop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="top-menu">
        <div className="menu-left">
          <strong>KHAYYAM OS</strong>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>

        <div className="menu-right">
          <span>⌁</span>
          <span>🔊</span>
          <span>Sun 6 Sep&nbsp; 10:36 PM</span>
          <span className="online-dot"></span>
        </div>
      </div>

      {icons.map((item) => (
        <div
          key={item.id}
          className="desktop-icon draggable-icon"
          style={{
            position: "absolute",
            left: `${item.x}px`,
            top: `${item.y}px`,
            cursor:
              draggingIcon?.id === item.id
                ? "grabbing"
                : "pointer",
            userSelect: "none",
          }}
          onMouseDown={(event) =>
            handleIconMouseDown(event, item.id)
          }
          onClick={(event) =>
            handleIconClick(event, item)
          }
        >
          <div
            className={`desktop-icon-box icon-${item.id}`}
            aria-hidden="true"
          >
            {item.icon}
          </div>

          <span>{item.name}</span>
        </div>
      ))}

      <AnimatePresence>
        {aboutOpen && (
          <AboutWindow
            onClose={() => setAboutOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {projectsOpen && (
          <ProjectsWindow
            onClose={() => setProjectsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {skillsOpen && (
          <SkillsWindow
            onClose={() => setSkillsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {resumeOpen && (
          <ResumeWindow
            onClose={() => setResumeOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {terminalOpen && (
          <TerminalWindow
            onClose={() => setTerminalOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="edit-label">Edit</div>

      <div className="contact-wrapper">
        <button
          className="contact-button"
          onClick={toggleContact}
          aria-label="Open contact information"
          title="Contact Me"
        >
          ☎
        </button>

        <AnimatePresence>
          {contactOpen && (
            <motion.div
              className="contact-popup"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <div className="contact-popup-header">
                <span>CONTACT.EXE</span>
                <button
                  onClick={() => setContactOpen(false)}
                  aria-label="Close contact menu"
                >
                  ×
                </button>
              </div>

              <a href="mailto:khayammehmood7@gmail.com">
                <span>✉</span>
                <div>
                  <small>Email</small>
                  khayammehmood7@gmail.com
                </div>
              </a>

              <a href="tel:+92XXXXXXXXXX">
                <span>☎</span>
                <div>
                  <small>Phone</small>
                  +92 330 3480003
                </div>
              </a>

              <a
                href="https://www.instagram.com/_khayyam_m?stkn=YXI0dzVzNW15dnhx&utm_source=qr"
                target="_blank"
                rel="noreferrer"
              >
                <span>◎</span>
                <div>
                  <small>Instagram</small>
                  Open Instagram
                </div>
              </a>

              <a
                href="https://github.com/KhayyamMehmood"
                target="_blank"
                rel="noreferrer"
              >
                <span>●</span>
                <div>
                  <small>GitHub</small>
                  KhayyamMehmood
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/khayyam-mehmood-691a7b350/"
                target="_blank"
                rel="noreferrer"
              >
                <span>in</span>
                <div>
                  <small>LinkedIn</small>
                  Khayyam Mehmood
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="dock">
        <div className="dock-icon">⠿</div>

        {icons.map((item) => (
          <button
            key={item.id}
            className={`dock-icon icon-${item.id}`}
            onClick={item.action}
            title={item.name}
            aria-label={item.name}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

/* =====================================================
   ABOUT WINDOW
===================================================== */

function AboutWindow({ onClose }) {
  return (
    <DraggableWindow
      title="About Me"
      onClose={onClose}
      className="about-window"
    >
      <div className="window-content about-content">
        <div className="about-body">
          <div className="about-photo-section">
            <div className="profile-photo">
              <img
                src="/profile.png"
                alt="Khayyam Mehmood"
              />
            </div>

            <div className="quote">
              <span>“</span>
              <div>
                Turning ideas into real-world solutions through code.
                <div className="quote-name">— Khayyam Mehmood</div>
              </div>
            </div>
          </div>

          <div className="about-info">
            <div className="profile-label">PROFILE.EXE</div>

            <div className="online-status">
              <span></span>
              Online
            </div>

            <h1>
              Khayyam <strong>Mehmood</strong>
            </h1>

            <h3>FULL-STACK DEVELOPER</h3>

            <p className="about-text">
              I'm a passionate Full-Stack Developer who loves building modern
              web applications and turning ideas into real-world solutions. I
              enjoy working with technology, solving problems, and continuously
              learning new things.
            </p>

            <div className="info-list">
              <div><span>⌖</span>Pakistan</div>
              <div><span>◆</span>BS Computer Science (In Progress)</div>
              <div><span>✉</span>khayyammehmood7@gmail.com</div>
              <div className="opportunity"><span>▣</span>Open to Opportunities</div>
            </div>

            <div className="about-divider" />

            
          </div>
        </div>
      </div>
    </DraggableWindow>
  )
}

/* =====================================================
   PROJECTS WINDOW
===================================================== */

function ProjectsWindow({ onClose }) {
  const projects = [
    {
      name: "Khaanakart",
      description:
        "A food delivery web application designed to provide a modern online ordering experience.",
      type: "Web Application",
      technologies: ["React", "Vite", "Tailwind CSS"],
      github: "https://github.com/KhayyamMehmood",
    },
    {
      name: "Hayal Travel",
      description:
        "A travel and ticket booking web application built as a practical web development project.",
      type: "Web Application",
      technologies: ["React", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/KhayyamMehmood",
    },
    {
      name: "Home Care Services",
      description:
        "A real-world website developed for a home care service.",
      type: "Web Development",
      technologies: ["HTML", "CSS", "JavaScript"],
      github:
        "https://github.com/KhayyamMehmood/home-care-services",
    },
    {
      name: "Book Nest",
      description:
        "A book-focused website developed during internship practice.",
      type: "Web Development",
      technologies: ["HTML", "CSS", "JavaScript"],
      github:
        "https://github.com/KhayyamMehmood/book-nest",
    },
  ]

  return (
    <DraggableWindow
      title="Projects"
      onClose={onClose}
      className="projects-window"
    >
      <div className="window-content">
        <div className="projects-heading">
          <span className="section-label">PORTFOLIO</span>
          <h2>Selected Projects</h2>
          <p>A collection of things I've built.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              className="project-card"
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -5 }}
            >
              <div className="project-number">
                0{index + 1}
              </div>

              <div className="project-type">
                {project.type}
              </div>

              <h3>{project.name}</h3>
              <p>{project.description}</p>

              <div className="technologies">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>

              <button
                className="github-button"
                onClick={() =>
                  window.open(project.github, "_blank")
                }
              >
                GitHub →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </DraggableWindow>
  )
}

/* =====================================================
   SKILLS WINDOW
===================================================== */

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
      skills: ["Node.js", "Express.js"],
    },
    {
      name: "Databases",
      skills: ["MySQL", "MongoDB", "Firebase"],
    },
    {
      name: "Languages",
      skills: ["JavaScript", "C++", "Python"],
    },
    {
      name: "Tools",
      skills: ["Git", "GitHub", "Vite", "Netlify"],
    },
    {
      name: "Other",
      skills: ["Flutter", "Dart"],
    },
  ]

  return (
    <DraggableWindow
      title="Skills"
      onClose={onClose}
      className="skills-window"
    >
      <div className="window-content">
        <div className="skills-heading">
          <span className="section-label">
            TECHNICAL PROFILE
          </span>

          <h2>Skills & Technologies</h2>

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: categoryIndex * 0.08,
                }}
              >
                <div className="skill-category-header">
                  <span>
                    0{categoryIndex + 1}
                  </span>

                  <h3>{category.name}</h3>
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
                      >
                        <span>+</span>
                        <span>{skill}</span>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </DraggableWindow>
  )
}

/* =====================================================
   RESUME WINDOW
===================================================== */

function ResumeWindow({ onClose }) {
  return (
    <DraggableWindow
      title="Resume"
      onClose={onClose}
      className="resume-window"
    >
      <div className="window-content resume-content">
        <div className="resume-heading">
          <span className="section-label">DOCUMENT</span>

          <h2>My Resume</h2>

          <p>
            A professional overview of my education,
            technical skills and development projects.
          </p>
        </div>

        <div className="resume-preview">
          <div className="resume-paper">
            <div className="resume-paper-header">
              <div>
                <h1>KHAYYAM MEHMOOD</h1>
                <p>Computer Science Student</p>
              </div>

              <div className="resume-initial">K</div>
            </div>

            <div className="resume-contact">
              <span>khayyammehmood7@gmail.com</span>
              <span>github.com/KhayyamMehmood</span>
              <span>
                linkedin.com/in/khayyam-mehmood-691a7b350
              </span>
            </div>

            <div className="resume-line" />

            <div className="resume-section">
              <h3>PROFILE</h3>

              <p>
                Computer Science student at Capital
                University of Science & Technology with
                hands-on experience developing web
                applications using modern frontend and
                backend technologies.
              </p>
            </div>

            <div className="resume-section">
              <h3>EDUCATION</h3>

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
              <h3>TECHNICAL SKILLS</h3>

              <p>
                JavaScript • React • HTML • CSS • Tailwind
                CSS • Bootstrap • Node.js • Express.js •
                MySQL • MongoDB • Firebase • C++ • Python
                • Git • GitHub • Vite • Flutter • Dart
              </p>
            </div>

            <div className="resume-section">
              <h3>PROJECTS</h3>

              <div className="resume-entry">
                <strong>Khaanakart</strong>
                <p>
                  Food delivery web application focused
                  on providing a modern ordering experience.
                </p>
              </div>

              <div className="resume-entry">
                <strong>Hayal Travel</strong>
                <p>
                  Travel and ticket booking web application.
                </p>
              </div>

              <div className="resume-entry">
                <strong>Home Care Services</strong>
                <p>
                  Real-world website developed for a home
                  care service.
                </p>
              </div>

              <div className="resume-entry">
                <strong>Book Nest</strong>
                <p>
                  Book-focused website developed during
                  internship practice.
                </p>
              </div>
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
    </DraggableWindow>
  )
}

/* =====================================================
   TERMINAL WINDOW
===================================================== */

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
      "OS:        KHAYYAM OS",
      "User:      Khayyam Mehmood",
      "Shell:     KHAYYAM Terminal",
      "Degree:    BS Computer Science",
      "University: CUST",
      "Focus:     Software Development",
      "Frontend:  React / Tailwind CSS",
      "Backend:   Node.js / Express",
      "Languages: JavaScript / C++ / Python",
      "Status:    Open to Opportunities",
    ],

    github: ["Opening GitHub..."],
    linkedin: ["Opening LinkedIn..."],
    email: ["Opening email client..."],
  }

  const handleCommand = (event) => {
    if (event.key !== "Enter") return

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

    const output = commands[command]

    setHistory((previous) => [
      ...previous,
      {
        type: "command",
        text: command,
      },
      {
        type: "output",
        text:
          output || [
            `Command not found: ${command}`,
            "Type 'help' to see available commands.",
          ],
      },
    ])

    setInput("")
  }

  return (
    <DraggableWindow
      title="Terminal"
      onClose={onClose}
      className="terminal-window"
    >
      <div
        className="terminal-body"
        onClick={() => inputRef.current?.focus()}
      >
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
                {" "}
                {item.text}
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
    </DraggableWindow>
  )
}

export default App