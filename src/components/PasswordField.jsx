import { useId, useState } from 'react'
import './PasswordField.css'

function EyeIcon({ off }) {
  if (off) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 3l18 18M10.6 10.6A2 2 0 0 0 12 14a2 2 0 0 0 1.4-.6M9.9 5.1A10 10 0 0 1 12 5c5 0 9 4 10 7- .3.8-1 1.9-1.9 2.9M6.1 6.1C4.2 7.5 2.8 9.4 2 12c1 3 5 7 10 7 1.3 0 2.5-.3 3.6-.8" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default function PasswordField({
  label = 'Password',
  className = 'auth-field',
  value,
  onChange,
  required,
  minLength,
  autoComplete,
  placeholder,
  name,
}) {
  const [show, setShow] = useState(false)
  const id = useId()

  function toggle(event) {
    event.preventDefault()
    event.stopPropagation()
    setShow((current) => !current)
  }

  return (
    <div className={className}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <span className="password-wrap">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        <button
          type="button"
          className={show ? 'password-eye is-on' : 'password-eye'}
          onMouseDown={(event) => event.preventDefault()}
          onClick={toggle}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
        >
          <EyeIcon off={show} />
        </button>
      </span>
    </div>
  )
}
