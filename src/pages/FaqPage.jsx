import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner.jsx'
import Faq from '../components/Faq.jsx'

export default function FaqPage() {
  return (
    <main>
      <PageBanner
        title="Frequently asked questions"
        text="Clear answers on courses, coaching and how to get started — so you can take the next step with confidence."
        image="/images/coaching.jpg"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'FAQ' },
        ]}
      />

      <Faq showIntro={false} />

      <section className="cta-band">
        <div className="wrap">
          <h2>Still have a question?</h2>
          <p>Tell us your goals and we’ll recommend the right starting point.</p>
          <Link to="/contact" className="btn">
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  )
}
