import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import './Legal.css'

const sections = [
  { id: 'courses', title: 'Courses and coaching' },
  { id: 'booking', title: 'Booking and payment' },
  { id: 'cancel', title: 'Cancellations' },
  { id: 'website', title: 'Website use' },
  { id: 'contact', title: 'Contact' },
]

export default function Terms() {
  return (
    <main className="legal-page">
      <PageBanner
        title="Terms & conditions"
        text="The terms that apply when you use this website or enrol on an Arwain Academy course."
        image="/images/qualifications.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Terms & conditions' },
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
            <Link to="/privacy-policy">Privacy policy</Link>
          </aside>

          <div className="legal-body">
            <p className="legal-lead">
              By using this website or booking a course or coaching session,
              you agree to these terms. Please read them before you enrol.
            </p>

            <section id="courses">
              <h2>Courses and coaching</h2>
              <p>
                Course descriptions, duration and prices are shown on each
                course page. Qualifications include Level 3 and Level 5 awards,
                certificates and diplomas. Coaching is delivered 1-to-1. A free
                consultation does not create an obligation to purchase.
              </p>
            </section>

            <section id="booking">
              <h2>Booking and payment</h2>
              <p>
                Places are confirmed once we have accepted your booking and,
                where required, payment has been received. Prices are in pounds
                sterling. Where a previous price is shown, it is the earlier
                published fee.
              </p>
            </section>

            <section id="cancel">
              <h2>Cancellations</h2>
              <p>
                If you need to cancel or rearrange, contact us as soon as
                possible. Refunds and transfers depend on how far in advance you
                tell us and the type of course or session booked.
              </p>
            </section>

            <section id="website">
              <h2>Website use</h2>
              <p>
                Content on this site is for information about Arwain Academy.
                You may not copy course materials for commercial use without
                our permission.
              </p>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>
                Questions about these terms can be sent via the contact page or
                to hello@arwainacademy.co.uk.
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  )
}
