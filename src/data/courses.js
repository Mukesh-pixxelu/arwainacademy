export const courses = [
  {
    slug: 'free-consultation-call',
    title: 'Free Consultation Call',
    category: 'Coaching',
    price: 0,
    oldPrice: null,
    cta: 'enquire',
    excerpt: 'Expert tips and the best course for your goals, with a free call.',
    duration: '30 minutes',
    overview: 'Would you like further information on our offering? Book a free call to discuss the best options for your needs.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80',
  },
  {
    slug: 'career-coaching',
    title: 'Career Coaching',
    category: 'Coaching',
    price: 89,
    oldPrice: null,
    cta: 'enquire',
    excerpt: 'Clear, actionable steps to progress your career.',
    duration: '1-to-1 session',
    overview: 'Coaching and support to progress your career, stand out, and achieve your goals. Follow-ups planned so actions are followed through.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80',
  },
  {
    slug: 'business-and-executive-coaching',
    title: 'Business and Executive Coaching',
    category: 'Coaching',
    price: 99,
    oldPrice: null,
    cta: 'enquire',
    excerpt: 'A guided process with accountability and a fresh perspective.',
    duration: '1-to-1 session',
    overview: 'An experienced business coach will support you in identifying and achieving specific goals.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&q=80',
  },
  {
    slug: 'level-3-award-in-leadership-management',
    title: 'Level 3 Award in Leadership & Management',
    category: 'Level 3',
    price: 349,
    oldPrice: null,
    cta: 'cart',
    excerpt: 'Become a more effective manager in less than 2 months.',
    duration: 'Under 2 months',
    overview: 'Designed for those in their first leadership role. Learn how to lead and manage your team with qualified tutors.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80',
  },
  {
    slug: 'level-3-certificate-in-leadership-management',
    title: 'Level 3 Certificate in Leadership & Management',
    category: 'Level 3',
    price: 799,
    oldPrice: 849,
    cta: 'cart',
    excerpt: 'Build core leadership skills with a recognised certificate.',
    duration: 'Flexible',
    overview: 'For practising or aspiring first-line managers who want a recognised Level 3 certificate.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
  },
  {
    slug: 'level-3-diploma-in-leadership-management',
    title: 'Level 3 Diploma in Leadership & Management',
    category: 'Level 3',
    price: 1249,
    oldPrice: 1589,
    cta: 'cart',
    excerpt: 'A fuller Level 3 qualification for new managers.',
    duration: 'Flexible',
    overview: 'A complete Level 3 diploma pathway with tutor support.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80',
  },
  {
    slug: 'level-5-award-in-leadership-management',
    title: 'Level 5 Award in Leadership & Management',
    category: 'Level 5',
    price: 529,
    oldPrice: null,
    cta: 'cart',
    excerpt: 'For middle managers ready to lead with more impact.',
    duration: 'Flexible',
    overview: 'A focused Level 5 award for practising or aspiring middle managers.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
  },
  {
    slug: 'level-5-certificate-in-leadership-management',
    title: 'Level 5 Certificate in Leadership & Management',
    category: 'Level 5',
    price: 899,
    oldPrice: 949,
    cta: 'cart',
    excerpt: 'Strengthen your middle-management practice.',
    duration: 'Flexible',
    overview: 'A Level 5 certificate for managers leading teams and delivering results.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
  },
  {
    slug: 'level-5-diploma-in-leadership-management',
    title: 'Level 5 Diploma in Leadership & Management',
    category: 'Level 5',
    price: 1649,
    oldPrice: 1989,
    cta: 'cart',
    excerpt: 'The full Level 5 diploma pathway.',
    duration: 'Up to 12 months',
    overview: 'A comprehensive diploma for middle managers who want to lead teams, plan strategically, and manage change.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
  },
]

export function getCourse(slug) {
  return courses.find((course) => course.slug === slug)
}

export function formatPrice(price) {
  if (price === 0) return 'Free'
  return '£' + price.toLocaleString('en-GB')
}

export function courseImage(item) {
  if (item?.image) return item.image
  return getCourse(item?.slug)?.image || ''
}
