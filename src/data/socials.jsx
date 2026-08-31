function Icon({ children }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  )
}

export const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: (
      <Icon>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
      </Icon>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com',
    icon: (
      <Icon>
        <path d="M14 8.3h2.7V5h-2.7C11.6 5 10 6.7 10 9.3v2.2H8v3.4h2V20h3.4v-5.1h2.5l.5-3.4h-3V9.5c0-.6.3-1.2 1.6-1.2z" />
      </Icon>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com',
    icon: (
      <Icon>
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm8.4 1.8H7.8A4 4 0 0 0 3.8 7.8v8.4a4 4 0 0 0 4 4h8.4a4 4 0 0 0 4-4V7.8a4 4 0 0 0-4-4zM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3zm0 1.8A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1zM17.3 6.5a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z" />
      </Icon>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: (
      <Icon>
        <path d="M14.6 10.3 22 2h-2.2l-6.2 6.9L8.8 2H2l7.8 11.1L2 22h2.2l6.7-7.5L15.2 22H22l-7.4-11.7zm-2.4 2.6-.8-1.1L5.2 3.5h2.6l5.1 7.2.8 1.1 6.7 9.4h-2.6l-5.6-7.3z" />
      </Icon>
    ),
  },
]
