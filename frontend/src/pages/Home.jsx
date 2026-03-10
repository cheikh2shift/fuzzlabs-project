import { Link } from 'react-router-dom'

export default function Home() {
  const skills = [
    'Golang', 'TypeScript', 'JavaScript', 'Python', 'Java', 'PHP', 'Swift', 'Objective-C',
    'React', 'Angular', 'Vue.js', 'Flutter', 'Apache Cordova',
    'Node.js', 'Express', 'REST APIs', 'GraphQL', 'WebSockets',
    'CI/CD', 'Microservices', 'Docker', 'Git', 'Linux',
    'PostgreSQL', 'MongoDB', 'Microsoft SQL Server', 'MySQL', 'CouchDB'
  ]

  const experience = [
    {
      title: 'Senior Software Engineer & Product Manager',
      company: 'Simsol Technologies',
      dates: 'Aug 2022 – Aug 2025',
      highlights: [
        'Built a proprietary full stack library that reduced deployment time to under two weeks.',
        'Delivered real-time dashboards with high-concurrency WebSockets.',
        'Integrated Twilio, Outlook, and WhatsApp workflows for enterprise automation.'
      ]
    },
    {
      title: 'Technical Content Lead & Copywriter',
      company: 'Ardan Labs',
      dates: 'Dec 2022 – Aug 2023',
      highlights: [
        'Published deep-dive Go tutorials for a global developer audience.',
        'Translated complex architecture decisions into clear product content.'
      ]
    },
    {
      title: 'Software Developer',
      company: 'dHub',
      dates: 'Sep 2017 – Sep 2021',
      highlights: [
        'Designed the backend for a large-scale warehouse management system.',
        'Shipped cross-platform mobile apps to the App Store and Google Play.'
      ]
    },
    {
      title: 'Founder & Lead Engineer',
      company: 'Orkiv',
      dates: 'May 2014 – Aug 2017',
      highlights: [
        'Bootstrapped a multi-tenant inventory + website automation SaaS.',
        'Built web scrapers that accelerated lead generation.'
      ]
    }
  ]

  const featuredProjects = [
    {
      title: 'Go Blog (Go-Blog.io)',
      description: 'Technical education platform for building scalable Go microservices.',
      tags: ['Golang', 'Microservices', 'Content Platform']
    },
    {
      title: 'Real-Time Analytics Suite',
      description: 'High-concurrency dashboards with WebSockets for enterprise reporting.',
      tags: ['WebSockets', 'React', 'Golang']
    },
    {
      title: 'Multi-Channel Automation',
      description: 'Twilio, Outlook, and WhatsApp integrations to streamline workflows.',
      tags: ['Integrations', 'APIs', 'Product Ops']
    }
  ]

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Senior Full Stack Engineer · Dakar, Senegal</div>
          <h1>
            Cheikh Diagne Seck
            <span>Building cloud-native platforms that ship fast.</span>
          </h1>
          <p>
            Results-driven engineer with 10+ years of experience spanning Golang, React, and
            TypeScript. I architect scalable backend systems, lead cross-functional teams, and
            deliver high-performance interfaces for SaaS and enterprise products.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="btn">Explore Portfolio</Link>
            <Link to="/contact" className="btn btn-secondary">Start a Project</Link>
          </div>
          <div className="hero-links">
            <a className="text-link" href="/Cheikh-Diagne-Seck-Resume-2026.pdf" target="_blank" rel="noreferrer">
              Download Resume
            </a>
            <a className="text-link" href="mailto:cheeikhseck@gmail.com">
              cheeikhseck@gmail.com
            </a>
          </div>
          <div className="hero-metrics">
            <div>
              <strong>85%</strong>
              <span>Faster deployments</span>
            </div>
            <div>
              <strong>99.9%</strong>
              <span>Uptime delivered</span>
            </div>
            <div>
              <strong>10+ yrs</strong>
              <span>Product engineering</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <h3>Go Blog</h3>
            <p>Technical education platform for scalable Go microservices.</p>
            <div className="chip-row">
              <span className="chip">Golang</span>
              <span className="chip">Microservices</span>
              <span className="chip">Cloud</span>
            </div>
          </div>
          <div className="hero-card highlight-card">
            <h3>Real-Time Dashboards</h3>
            <p>High-concurrency WebSocket data visualization for enterprise analytics.</p>
            <div className="chip-row">
              <span className="chip">WebSockets</span>
              <span className="chip">React</span>
              <span className="chip">Golang</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-header">
          <h2>Career Highlights</h2>
          <p>Focused on building modern platforms that are fast, reliable, and delightful to use.</p>
        </div>
        <div className="timeline">
          {experience.map(role => (
            <div key={role.company} className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3>{role.title}</h3>
                  <span>{role.company}</span>
                </div>
                <em>{role.dates}</em>
              </div>
              <ul>
                {role.highlights.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured Work</h2>
          <p>Recent platforms and initiatives that showcase my range across engineering and product.</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map(project => (
            <div key={project.title} className="featured-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="chip-row">
                {project.tags.map(tag => (
                  <span className="chip" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-split">
        <div>
          <h2>About Cheikh</h2>
          <p>
            I build cloud-native products that balance velocity and reliability. Over the last
            decade I’ve led teams across SaaS, enterprise, and developer education, pairing
            hands-on engineering with product leadership to deliver measurable outcomes.
          </p>
          <p>
            I enjoy translating complex architecture into clear execution plans, mentoring teams,
            and partnering with stakeholders from discovery through launch.
          </p>
        </div>
        <div className="about-card">
          <h3>Quick Profile</h3>
          <ul>
            <li>10+ years in full stack engineering</li>
            <li>Expert in Golang, React, TypeScript</li>
            <li>Leader of cross-functional delivery teams</li>
            <li>Based in Dakar, Senegal</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Skills & Technologies</h2>
          <p>Full stack delivery across modern web, mobile, and cloud-native platforms.</p>
        </div>
        <div className="skills-grid">
          {skills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>

      <section className="section section-split">
        <div>
          <h2>What I Deliver</h2>
          <p>
            From product discovery to production scale, I design systems that are secure,
            maintainable, and built to grow. I thrive in cross-functional teams, bridging
            engineering and product with clarity.
          </p>
        </div>
        <div className="deliverables">
          <div className="deliverable-card">
            <h3>Platform Architecture</h3>
            <p>Microservices, data pipelines, and cloud-native backends built for scale.</p>
          </div>
          <div className="deliverable-card">
            <h3>Product Engineering</h3>
            <p>Polished web and mobile experiences that feel fast and intuitive.</p>
          </div>
          <div className="deliverable-card">
            <h3>Go-to-Market Velocity</h3>
            <p>CI/CD pipelines and automation that keep releases reliable and frequent.</p>
          </div>
        </div>
      </section>
    </>
  )
}
