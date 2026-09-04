import { useMemo, useState } from 'react'
import { apiRequest } from '../utils/api.js'

function statusLabel(status) {
  return {
    todo: 'To do',
    complete: 'Read',
    submitted: 'Waiting for sign-off',
    approved: 'Signed off',
    returned: 'Returned — please update',
  }[status] || status
}

export default function CourseLearn({ catalog, workspace, slug, token, onUpdate }) {
  const [tab, setTab] = useState('guide')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [answers, setAnswers] = useState({})
  const [assignment, setAssignment] = useState('')

  const units = workspace?.units || []
  const questions = workspace?.questions || []
  const progress = workspace?.progress || { done: 0, total: 0, percent: 0 }
  const pdfUrl = workspace?.course?.guide_pdf_url
  const guide = units.find((unit) => unit.type === 'reading') || units[0]
  const questionnaire = units.find((unit) => unit.type === 'questionnaire')
  const assignments = units.filter((unit) => unit.type === 'assignment')
  const activeUnit = useMemo(
    () => units.find((unit) => String(unit.id) === String(tab)) || null,
    [units, tab],
  )

  const sections = catalog?.sections || []

  function setAnswer(id, value) {
    setAnswers((current) => ({ ...current, [id]: value }))
  }

  async function run(request) {
    setSaving(true)
    setError('')
    try {
      const data = await request()
      onUpdate(data)
    } catch (err) {
      setError(err.message || 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  function markRead() {
    if (!guide) return
    run(() =>
      apiRequest(`/api/learning/${slug}/units/${guide.id}/complete`, {
        method: 'POST',
        token,
      }),
    )
  }

  function sendQuestionnaire(e) {
    e.preventDefault()
    if (!questionnaire) return
    run(() =>
      apiRequest(`/api/learning/${slug}/units/${questionnaire.id}/submit`, {
        method: 'POST',
        token,
        body: { answers },
      }),
    )
  }

  function sendAssignment(e) {
    e.preventDefault()
    if (!activeUnit) return
    run(() =>
      apiRequest(`/api/learning/${slug}/units/${activeUnit.id}/submit`, {
        method: 'POST',
        token,
        body: { body: assignment },
      }),
    )
  }

  function printGuide() {
    window.print()
  }

  if (!workspace) {
    return <p className="sd-muted">Loading your course…</p>
  }

  return (
    <div className="sd-learn-body sd-workspace">
      <section className="sd-progress">
        <div>
          <strong>{progress.percent}%</strong>
          <span>
            {progress.done} of {progress.total} items done
          </span>
        </div>
        <div className="sd-progress-track" aria-hidden="true">
          <span style={{ width: `${progress.percent}%` }} />
        </div>
        <p>
          Progress grows as you read and submit work. When a new unit is added,
          the bar updates to include it.
        </p>
      </section>

      {error ? <p className="sd-error">{error}</p> : null}

      <div className="sd-tabs">
        <button type="button" className={tab === 'guide' ? 'is-on' : ''} onClick={() => setTab('guide')}>
          Course guide
        </button>
        {questionnaire ? (
          <button
            type="button"
            className={tab === 'questionnaire' ? 'is-on' : ''}
            onClick={() => setTab('questionnaire')}
          >
            Questionnaire
          </button>
        ) : null}
        {assignments.map((unit) => (
          <button
            key={unit.id}
            type="button"
            className={tab === String(unit.id) ? 'is-on' : ''}
            onClick={() => setTab(String(unit.id))}
          >
            {unit.title}
          </button>
        ))}
      </div>

      {tab === 'guide' ? (
        <article className="sd-guide" id="course-guide">
          <header>
            <h2>Course guide</h2>
            <div className="sd-guide-actions">
              <button type="button" className="sd-btn is-ghost" onClick={printGuide}>
                Print / save PDF
              </button>
              {guide && !guide.complete ? (
                <button type="button" className="sd-btn" onClick={markRead} disabled={saving}>
                  {saving ? 'Saving…' : 'Mark as read'}
                </button>
              ) : (
                <em className="is-ok">Read</em>
              )}
            </div>
          </header>
          <p className="sd-guide-lead">{catalog?.overview || guide?.body}</p>
          {pdfUrl ? (
            <div className="sd-pdf">
              <iframe title={`${workspace?.course?.title || 'Course'} PDF`} src={pdfUrl} />
              <a href={pdfUrl} target="_blank" rel="noreferrer">
                Open PDF in a new tab
              </a>
            </div>
          ) : (
            <p className="sd-muted">Your tutor has not uploaded a course PDF yet.</p>
          )}
          {sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              {(section.paragraphs || []).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items?.length ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          {!sections.length && guide?.body ? <p>{guide.body}</p> : null}
        </article>
      ) : null}

      {tab === 'questionnaire' && questionnaire ? (
        <section>
          <h2>
            <span>02</span>
            Initial questionnaire
          </h2>
          <p>
            Answer on the platform. Your tutor will check this and sign it off
            before you continue.
          </p>
          <p className={'sd-chip-status is-' + questionnaire.status}>
            {statusLabel(questionnaire.status)}
          </p>
          {questionnaire.admin_note ? (
            <p className="sd-note">Tutor note: {questionnaire.admin_note}</p>
          ) : null}

          {questionnaire.status === 'approved' || questionnaire.status === 'submitted' ? (
            <dl className="sd-answers">
              {questions.map((question) => (
                <div key={question.id}>
                  <dt>{question.label}</dt>
                  <dd>{questionnaire.submission?.answers?.[question.id] || '—'}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <form className="sd-quiz" onSubmit={sendQuestionnaire}>
              {questions.map((question) => (
                <label key={question.id}>
                  {question.label}
                  {question.required ? ' *' : ''}
                  {question.type === 'textarea' ? (
                    <textarea
                      rows="4"
                      required={question.required}
                      value={answers[question.id] ?? questionnaire.submission?.answers?.[question.id] ?? ''}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                    />
                  ) : (
                    <input
                      required={question.required}
                      value={answers[question.id] ?? questionnaire.submission?.answers?.[question.id] ?? ''}
                      onChange={(e) => setAnswer(question.id, e.target.value)}
                    />
                  )}
                </label>
              ))}
              <button type="submit" className="sd-btn" disabled={saving}>
                {saving ? 'Sending…' : 'Submit for sign-off'}
              </button>
            </form>
          )}
        </section>
      ) : null}

      {activeUnit ? (
        <section>
          <h2>{activeUnit.title}</h2>
          {activeUnit.body ? <p>{activeUnit.body}</p> : null}
          <p className={'sd-chip-status is-' + activeUnit.status}>
            {statusLabel(activeUnit.status)}
          </p>
          {activeUnit.admin_note ? (
            <p className="sd-note">Tutor note: {activeUnit.admin_note}</p>
          ) : null}
          {activeUnit.status === 'approved' || activeUnit.status === 'submitted' ? (
            <p className="sd-muted">{activeUnit.submission?.body}</p>
          ) : (
            <form className="sd-quiz" onSubmit={sendAssignment}>
              <label>
                Your submission
                <textarea
                  rows="8"
                  required
                  value={assignment || activeUnit.submission?.body || ''}
                  onChange={(e) => setAssignment(e.target.value)}
                />
              </label>
              <button type="submit" className="sd-btn" disabled={saving}>
                {saving ? 'Sending…' : 'Submit for sign-off'}
              </button>
            </form>
          )}
        </section>
      ) : null}
    </div>
  )
}
