import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import './Legal.css'

const sections = [
  { id: 'collect', title: 'Information we collect' },
  { id: 'use', title: 'How we use it' },
  { id: 'keep', title: 'How long we keep it' },
  { id: 'rights', title: 'Your rights' },
  { id: 'contact', title: 'Contact' },
]

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <PageBanner
        title="Privacy policy"
        text="How Arwain Academy collects, uses and looks after your information."
        image="/images/coaching.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Privacy policy' },
        ]}
      />

      <div className="wrap legal-wrap">
        <article className="legal-panel">
          <aside>
            <p>On this page</p>
            <ol>
              {sections.map((item) => (
                <li key={item.id}>
                  <a href={'#' + item.id}>{item.title}</a>
                </li>
              ))}
            </ol>
            <Link to="/terms-and-conditions">Terms & conditions</Link>
          </aside>

          <div className="legal-body">
            <p className="legal-lead">
              This policy explains what personal information we collect when you
              use the Arwain Academy website, enquire about a course, or book a
              consultation — and how we use it.
            </p>

            <section id="collect">
              <h2>Information we collect</h2>
              <p>
                When you send an enquiry we may collect your name, email
                address, phone number, course interest and message. We also
                collect basic technical data such as browser type when you
                browse the site.
              </p>
            </section>

            <section id="use">
              <h2>How we use it</h2>
              <p>
                We use your details to reply to enquiries, recommend a suitable
                Level 3 or Level 5 pathway or coaching session, and to
                administer bookings. We do not sell your information.
              </p>
            </section>

            <section id="keep">
              <h2>How long we keep it</h2>
              <p>
                Enquiry records are kept only as long as needed to handle your
                request and meet our records obligations, then deleted or
                anonymised.
              </p>
            </section>

            <section id="rights">
              <h2>Your rights</h2>
              <p>
                You can ask us for a copy of the information we hold, or to
                update or delete it, by emailing hello@arwainacademy.co.uk.
              </p>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>
                For privacy questions, email hello@arwainacademy.co.uk. We aim
                to reply within 1–2 working days.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
