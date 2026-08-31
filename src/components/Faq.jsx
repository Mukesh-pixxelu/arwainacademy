import { useState } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/asset.js'
import './Faq.css'

const faqs = [
  {
    q: 'What does Arwain Academy offer?',
    a: 'We develop the next generation of leaders through recognised Level 3, Level 5 and Level 7 qualifications, plus 1-2-1 career, business and executive coaching. The focus is a human approach, connecting with your team, not chasing a perfect-leader image.',
  },
  {
    q: 'Which course should I start with?',
    a: 'It depends where you are now. First-line and new managers usually start at Level 3. Practising or aspiring middle managers typically look at Level 5. Senior leaders and directors usually look at Level 7. If you are unsure, book a free consultation and we will match you to the right pathway.',
  },
  {
    q: 'What is the difference between Level 3, 5 and 7?',
    a: 'Level 3 is designed for people in their first leadership role who want to lead and manage a team with tutor support. Level 5 is for middle managers who need more impact, leading teams, planning strategically, and managing change. Level 7 is for practising and aspiring senior leaders who need to lead organisations, functions and strategy through complex challenges.',
  },
  {
    q: 'Do you offer 1-2-1 coaching?',
    a: 'Yes. Career coaching, and business and executive coaching, are available as guided 1-2-1 sessions with accountability and a fresh perspective. Follow-ups are planned so actions are followed through.',
  },
  {
    q: 'How long do the qualifications take?',
    a: 'The Level 3 Award can be completed in under two months. Certificates and diplomas are flexible, with Level 5 and Level 7 diplomas typically taking up to 12 months. You can study around work rather than putting your career on hold.',
  },
  {
    q: 'What is an AA* Leader, and is there a membership fee?',
    a: 'AA* is our gold-standard recognition for management you can take through your career. There is no monthly membership fee. Book a free consultation if you would like help choosing a course or payment plan.',
  },
]

export default function Faq({ showIntro = true }) {
  const [open, setOpen] = useState(0)

  function toggle(index) {
    setOpen((current) => (current === index ? -1 : index))
  }

  return (
    <section
      className={showIntro ? 'faq' : 'faq faq-on-page'}
      aria-labelledby="faq-heading"
    >
      <div className={showIntro ? 'wrap faq-layout' : 'wrap faq-layout is-page'}>
        {showIntro ? (
          <div className="faq-intro" data-aos="fade-right">
            <p className="eyebrow">Support</p>
            <h2 id="faq-heading">Questions, answered</h2>
            <p>
              Clear answers on courses, coaching and how to get started, so you
              can take the next step with confidence.
            </p>
            <Link to="/contact" className="btn">
              Still unsure? Talk to us
            </Link>
          </div>
        ) : (
          <aside className="faq-aside" data-aos="fade-right">
            <h2 id="faq-heading" className="visually-hidden">
              Frequently asked questions
            </h2>
            <img
              src={asset('images/about.jpg')}
              alt="Leadership mentoring session at Arwain Academy"
            />
            <div className="faq-help">
              <p className="eyebrow">Need help choosing?</p>
              <h3>Talk to a tutor first</h3>
              <p>
                Book a free consultation and we’ll match you to the right Level
                3, Level 5, Level 7 or coaching pathway.
              </p>
              <Link to="/contact" className="btn">
                Book a free call
              </Link>
            </div>
            <ul className="faq-points">
              <li>
                <strong>Recognised qualifications</strong>
                Level 3, Level 5 and Level 7 awards, certificates and diplomas.
              </li>
              <li>
                <strong>1-2-1 coaching</strong>
                Career, business and executive sessions with follow-up.
              </li>
              <li>
                <strong>No membership fee</strong>
                AA* recognition you can take through your career.
              </li>
            </ul>
          </aside>
        )}

        <div className="faq-list" data-aos="fade-left">
          {faqs.map((item, index) => {
            const isOpen = open === index
            const panelId = 'faq-panel-' + index
            const buttonId = 'faq-button-' + index

            return (
              <article
                key={item.q}
                className={isOpen ? 'faq-item is-open' : 'faq-item'}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="faq-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="faq-q">{item.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
