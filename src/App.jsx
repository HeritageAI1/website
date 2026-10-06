import { useEffect, useState } from 'react'
import './App.css'

// Data arrays keep the content structured and easy to update.
const metrics = [
  { value: '3x', label: 'faster decisions' },
  { value: '42%', label: 'lower operational drag' },
  { value: '24/7', label: 'AI-enabled support' },
  { value: '90 days', label: 'to business impact' },
]

const problemPoints = [
  {
    title: 'Legacy workflows stall growth',
    description:
      'Teams are buried in manual reporting, repetitive admin, and fragmented tools that slow each decision to a crawl.',
  },
  {
    title: 'AI hype is outpacing execution',
    description:
      'Many organizations have pilot ideas but lack a roadmap, governance, and practical operating model to scale them safely.',
  },
  {
    title: 'Opportunity is being lost daily',
    description:
      'Without intelligent automation, time is spent on tasks that could be routed, predicted, or optimized by systems designed for the job.',
  },
]

const tiers = [
  {
    name: 'Silver',
    label: 'Core archive access',
    audience: 'For smaller institutions and teams starting their digitisation journey',
    description:
      'A practical cloud-based foundation for making archival collections searchable and useful.',
    features: [
      'Cloud-based access to core archival search',
      'Document transcription',
      'Automated metadata categorisation',
    ],
  },
  {
    name: 'Gold',
    label: 'Full archive intelligence',
    audience: 'For medium-sized regional and specialist institutions',
    description:
      'Expanded discovery and analysis, with a secure, supported path for bringing an entire archive online.',
    features: [
      'Everything in Silver, plus bias and language detection',
      'Translation and expanded retrieval capabilities',
      'Secure on-site archive ingest and indexing on Heritage AI-owned compute',
      'Optional secure-cloud access to the indexed, vectorised archive',
      'Dedicated tooling integrated with your ecosystem through secure API wrappers',
      'Dedicated onboarding and staff training programme',
    ],
  },
]

const team = [
  {
    name: 'Dr. Gabriella Howell MBE',
    role: 'Founder & Business Strategy Lead',
    bio: 'Dr Gabriella Howell MBE is a distinguished heritage professional and academic with over a decade of experience across the UK and the Caribbean. As the leader of Heritage AI, Dr Howell leverages deep industry insight gained from active board roles, and her extensive research and publications, to guide organisations in harnessing AI for heritage preservation and innovation.',
    image: '/matt_image.png',
    label: 'Founder',
  },
  {
    name: 'Matt Gillie',
    role: 'AI Lead & Systems Architect',
    bio: 'Matt builds powerful and secure AI systems that underpin the Heritage AI platform. He has worked for frontier labs including OpenAI and Anthropic, helping to train and align cutting edge models, along with technical experience in national security. He is passionate about applying AI to heritage and cultural preservation, ensuring that these systems are both effective and responsible.',
    image: '/matt_image.png',
    label: 'Co-Founder & AI Lead',
  },

]

const archiveChats = [
  {
    query: 'Why was the North Quay restoration delayed in 1913?',
    answer:
      'The work paused twice: first after the March flood damaged stored timber, then while the harbor board disputed the revised cost. The minutes show approval resumed on 18 September.',
    source: 'Harbor Board Minutes, 1913 · pp. 42, 88',
  },
  {
    query: 'Who petitioned for the mill’s night-school in the 1880s?',
    answer:
      'A petition signed by 27 mill workers led the campaign. Eliza Ward organized the request, and the trustees approved evening classes in November 1886.',
    source: 'Mill Trustees’ Records, 1886 · fol. 17',
  },
  {
    query: 'How did the 1902 rail strike affect local food prices?',
    answer:
      'Letters and market reports describe a nine-day delay in flour deliveries. Prices rose by roughly 18%, then returned to their earlier level within three weeks of the settlement.',
    source: 'Market Ledger & Correspondence, 1902 · items 6–11',
  },
  {
    query: 'Which streets were rebuilt after the 1897 fire?',
    answer:
      'The insurance survey records reconstruction on Water Street and the eastern half of Bell Lane. Deeds confirm 14 replacement shopfronts were completed by spring 1899.',
    source: 'Fire Insurance Survey, 1897 · map 3; Deeds, 1898–99',
  },
  {
    query: 'What changed in the school curriculum after 1920?',
    answer:
      'The 1921 syllabus added practical science and local history, while reducing scripture lessons from five periods to three per week.',
    source: 'School Board Syllabi, 1918 & 1921 · box 12',
  },
]

function ArchiveChatDemo() {
  const [activeChatIndex, setActiveChatIndex] = useState(0)
  const [typedQuery, setTypedQuery] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const [newChatPressed, setNewChatPressed] = useState(false)
  const activeChat = archiveChats[activeChatIndex]

  useEffect(() => {
    const query = archiveChats[activeChatIndex].query
    let typingTimer
    let responseTimer
    let advanceTimer
    let nextChatTimer

    const typeNextCharacter = (characterIndex) => {
      setTypedQuery(query.slice(0, characterIndex))

      if (characterIndex < query.length) {
        typingTimer = window.setTimeout(() => typeNextCharacter(characterIndex + 1), 28)
        return
      }

      responseTimer = window.setTimeout(() => {
        setShowResponse(true)
        advanceTimer = window.setTimeout(() => {
          setNewChatPressed(true)
          nextChatTimer = window.setTimeout(() => {
            setTypedQuery('')
            setShowResponse(false)
            setNewChatPressed(false)
            setActiveChatIndex((index) => (index + 1) % archiveChats.length)
          }, 420)
        }, 4200)
      }, 450)
    }

    typeNextCharacter(0)

    return () => {
      window.clearTimeout(typingTimer)
      window.clearTimeout(responseTimer)
      window.clearTimeout(advanceTimer)
      window.clearTimeout(nextChatTimer)
    }
  }, [activeChatIndex])

  return (
    <div className="chat-demo" role="group" aria-label="Example Heritage AI archive conversation">
      <div className="chat-window-header">
        <div className="chat-brand">
          <span className="chat-brand-mark" aria-hidden="true">H</span>
          <span>
            <strong>Archive assistant</strong>
            <small><span className="status-dot" /> Connected to collections</small>
          </span>
        </div>
        <button
          className={`chat-new-button${newChatPressed ? ' is-pressed' : ''}`}
          type="button"
          onClick={() => {
            setTypedQuery('')
            setShowResponse(false)
            setNewChatPressed(false)
            setActiveChatIndex((index) => (index + 1) % archiveChats.length)
          }}
          aria-label="Start a new example chat"
        >
          <span aria-hidden="true">＋</span> New chat
        </button>
      </div>

      <div className="chat-thread" aria-live="polite" aria-atomic="false">
        <div className="chat-example-label">ILLUSTRATIVE ARCHIVE · {String(activeChatIndex + 1).padStart(2, '0')} / 05</div>
        <div className="chat-message user-message">
          <span className="message-avatar user-avatar" aria-hidden="true">Y</span>
          <div className="message-content">
            <span className="message-sender">You</span>
            <p>{typedQuery}<span className={`typing-cursor${showResponse ? ' is-hidden' : ''}`} aria-hidden="true" /></p>
          </div>
        </div>

        {showResponse && (
          <div className="chat-message assistant-message">
            <span className="message-avatar assistant-avatar" aria-hidden="true">H</span>
            <div className="message-content response-pop-in">
              <span className="message-sender">Heritage AI</span>
              <p>{activeChat.answer}</p>
              <div className="source-citation">
                <span aria-hidden="true">↗</span>
                {activeChat.source}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-composer" aria-hidden="true">
        <span>Ask across letters, ledgers, maps…</span>
        <span className="composer-send">↑</span>
      </div>
      <p className="chat-demo-caption">Ask a question. Get answers grounded in the archive.</p>
    </div>
  )
}

function App() {
  // Scroll reveal is handled in JavaScript so elements animate when they enter view,
  // creating a more premium landing-page feel without relying on heavy animation libraries.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.18,
      },
    )

    const revealItems = document.querySelectorAll('.reveal')
    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="page-shell">
      <header className="topbar reveal">
        <div className="brand-wrap" aria-label="Heritage AI home">
          <span className="brand-mark">H</span>
          <span className="brand-name">Heritage AI</span>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#problem">Problem</a>
          <a href="#services">Solutions</a>
          <a href="#team">Team</a>
        </nav>

        <a className="nav-cta" href="#contact">
          Book a consult
        </a>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-copy reveal">
            <p className="eyebrow">Unlocking AI for Heritage</p>
            <h1>Heritage AI</h1>
            <p className="lede">
              Heritage AI helps institutions unlock the power of their archives through AI-driven solutions, enabling faster results and more efficient workflows without compromising on quality or accuracy.
            </p>

            <div className="cta-row">
              <a href="#services" className="primary-button">
                Explore services
              </a>
              <a href="#problem" className="secondary-button">
                Why it matters
              </a>
            </div>

            <ul className="trust-list" aria-label="Key Heritage AI strengths">
              <li>Strategy-first delivery</li>
              <li>Responsible AI design</li>
              <li>High-impact automation</li>
            </ul>
          </div>

          <div className="hero-visual reveal" aria-label="Heritage AI archival chat demonstration">
            <ArchiveChatDemo />
          </div>
        </section>

        <section className="stats-bar reveal" aria-label="Heritage AI performance overview">
          {metrics.map((metric) => (
            <div key={metric.label} className="stat-item">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </section>

        <section id="problem" className="section problem-section">
          <div className="section-heading reveal">
            <p className="eyebrow">The problem</p>
            <h2>Too many teams are stuck between ambition and execution.</h2>
          </div>

          <div className="problem-grid">
            {problemPoints.map((point) => (
              <article key={point.title} className="info-card reveal">
                <span className="card-index">0{problemPoints.indexOf(point) + 1}</span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section offer-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Choose your archive tier</p>
            <h2>Two ways to bring your collections within reach.</h2>
            <p className="tier-intro">
              Start with essential cloud tools or unlock a fully managed, secure archive transformation.
            </p>
          </div>

          <div className="tier-comparison">
            {tiers.map((tier) => (
              <article key={tier.name} className={`tier-card tier-${tier.name.toLowerCase()} reveal`}>
                <div className="tier-card-topline">
                  <span className="tier-label">{tier.label}</span>
                  {tier.name === 'Gold' && <span className="tier-recommended">MOST CAPABLE</span>}
                </div>
                <div className="tier-heading-row">
                  <h3>{tier.name}</h3>
                  <span className="tier-swatch" aria-hidden="true" />
                </div>
                <p className="tier-audience">{tier.audience}</p>
                <p className="tier-description">{tier.description}</p>
                <div className="tier-divider" />
                <h4>Included capabilities</h4>
                <ul className="tier-feature-list">
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <span className="tier-check" aria-hidden="true">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a className="tier-cta" href="#contact">Discuss {tier.name}</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section principle-section">
          <div className="principle-copy reveal">
            <p className="eyebrow">How we work</p>
            <h2>We design AI that fits the business, not the other way around.</h2>
          </div>

          <div className="timeline reveal" aria-label="Heritage AI operating model">
            <div className="timeline-step">
              <span>01</span>
              <div>
                <h3>Diagnose</h3>
                <p>Clarify your biggest bottlenecks, decision points, and growth constraints.</p>
              </div>
            </div>
            <div className="timeline-step">
              <span>02</span>
              <div>
                <h3>Design</h3>
                <p>Prototype the right AI workflows, data model, and user experience for the task.</p>
              </div>
            </div>
            <div className="timeline-step">
              <span>03</span>
              <div>
                <h3>Deploy</h3>
                <p>Launch intelligently, track measurable outcomes, and refine through real-world use.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="section team-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Our team</p>
            <h2>Founders who blend heritage excellence with technical depth.</h2>
          </div>

          <div className="team-grid">
            {team.map((member) => (
              <article key={member.name} className="team-card reveal">
                <div className="team-photo-wrap">
                  <img className="team-photo" src={member.image} alt={`Placeholder portrait for ${member.name}`} />
                  {/* <span className="team-photo-label">{member.label}</span> */}
                </div>
                <div className="team-card-copy">
                  {/* <span className="team-card-index">HERITAGE AI · TEAM</span> */}
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section reveal">
          <div className="contact-panel">
            <p className="eyebrow">Ready to begin?</p>
            <h2>Build the next chapter of your business with AI that actually moves the needle.</h2>
            <a href="mailto:hello@heritageai.co" className="primary-button">
              hello@heritageai.co
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer reveal">
        <span>Heritage AI</span>
        <span>Strategy • Systems • Growth</span>
      </footer>
    </div>
  )
}

export default App
