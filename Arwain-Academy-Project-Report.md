# Arwain Academy — Project Status Report

**Project:** Arwain Academy website, student portal and admin panel  
**Live URL:** https://pixxelu.com/dev/arwainacademy/  
**Date:** 25 August 2026  
**Prepared for:** Client review and content sign-off

---

## 1. Purpose of this report

This report summarises what has been built, what the client should test, and what information is still needed from the client before the project can be treated as complete.

The website, course pages, FAQs, legal copy and dashboard text have been written and structured by the development team using publicly available CMI qualification outlines and a reasonable interpretation of the academy’s offering. **This is placeholder / draft content until the client reviews and approves it.**

---

## 2. Important — client must review all content

All page copy currently on the site was added by us so the design and flow could be completed. It is **not** final client-approved content.

Please read every page and confirm or send corrections for:

- Headings, taglines and about text  
- Course titles, prices, duration, who the course is for, assessment notes and progression  
- Testimonials (names, quotes and roles)  
- FAQ answers  
- Contact details, social links, email and phone  
- Privacy policy and terms & conditions  
- Banner / slider wording and images  

If anything is wrong, missing or should not be published, send the correct wording (or a Word/PDF document) and it will be updated.

**Please do not assume the current text is official Arwain Academy copy until you have signed it off.**

---

## 3. What has been delivered

### 3.1 Public website (student-facing)

| Page | URL | What is there now |
| --- | --- | --- |
| Home | `/` | Banner, about intro, courses highlight, testimonials, FAQ |
| About | `/about` | Academy story, approach, qualifications and coaching |
| Courses list | `/courses` | Level 3 and Level 5 CMI courses with price and duration |
| Course detail | `/courses/{slug}` | Full course information, Add to cart |
| Testimonials | `/testimonials` | Student / leader quotes |
| FAQ | `/faq` | Common questions |
| Contact | `/contact` | Enquiry form |
| Cart | `/cart` | Selected courses, remove, go to checkout |
| Checkout | `/checkout` | Plan (full / 3 / 6 / 12 months), Stripe or PayPal |
| Privacy | `/privacy-policy` | Draft privacy text |
| Terms | `/terms-and-conditions` | Draft terms text |

**Student account**

| Page | URL | What is there now |
| --- | --- | --- |
| Register | `/user/register` | Create student account |
| Login | `/user/login` | Sign in (password show/hide, forgot password) |
| Forgot / reset password | `/user/forgot-password` | Email reset link |
| Dashboard | `/dashboard` | Purchased / pending courses, profile |

### 3.2 Admin panel

**Admin URL:** https://pixxelu.com/dev/arwainacademy/admin/login  

| Area | What it does |
| --- | --- |
| Overview | Students, courses, payments snapshot, charts |
| Courses | Add, edit, delete courses (title, image, price, category) |
| Students | List, view, remove students |
| Payments | All checkouts, mark paid, delete |
| Payment setup | PayPal email and Stripe keys |
| Notifications | New student / payment alerts |
| Profile | Admin name, email, password |

Admin login is separate from the student website login. Students use `/user/login`. Admins use `/admin/login` only.

### 3.3 Payments

- Students can pay **in full** or in **3 / 6 / 12 month** instalments (monthly amount is the course price divided by months).  
- **Stripe** (card) and **PayPal** can be switched on from **Admin → Payment setup**.  
- After a successful payment, the course appears on the student dashboard as **Purchased**.  
- Pending PayPal/Stripe payments show as **Pending** until confirmed or marked paid by admin.

---

## 4. Current courses on the website

These six CMI qualifications are listed with draft descriptions and sample images:

1. CMI Level 3 Award in Principles of Management and Leadership — £349  
2. CMI Level 3 Certificate in Principles of Management and Leadership — £799  
3. CMI Level 3 Diploma in Principles of Management and Leadership — £1,249  
4. CMI Level 5 Award in Management and Leadership — £529  
5. CMI Level 5 Certificate in Management and Leadership — £899  
6. CMI Level 5 Diploma in Management and Leadership — £1,649  

Please confirm: titles, prices, instalment rules, images, and whether coaching products (e.g. Career Coaching) should also be on the public course list.

---

## 5. Question for the client — after Add to cart / after purchase

This is the main open point and needs a written answer from the client.

Right now the flow is:

1. Student opens a course → **Add to cart**  
2. Cart → **Checkout** → pays by Stripe or PayPal  
3. Course shows on **My courses** in the dashboard  
4. Opening that course shows only a short **Overview**, **Duration** and **What you bought** text  

There are **no** video lessons, PDFs, Zoom links, modules, assignments, progress tracking or certificates inside the dashboard yet.

**Please tell us what should appear after a student has paid, for example:**

- Video lessons (where will files be hosted — YouTube, Vimeo, uploaded files?)  
- Downloadable notes / PDF workbooks  
- Live session / Zoom / Teams links and dates  
- Module list and lesson order  
- Assignments or CMI assessment guidance  
- Tutor messages or discussion  
- Certificate or enrolment letter after completion  
- Access to an external CMI / learning portal (if yes, what URL and login method?)  
- Coaching bookings (if coaching is sold as a product)  

Until this is confirmed, the dashboard can only show that the course is **purchased**. We cannot guess the teaching format.

Please reply with a simple list per course type, for example:

> After purchase, Level 3 Certificate students should see: (1) welcome PDF, (2) six recorded sessions, (3) assignment brief, (4) tutor email.

---

## 6. Suggested test plan for the client

Please walk through the live site once and note anything that should change.

**Website**

- [ ] Home, About, Courses, Testimonials, FAQ, Contact all look correct  
- [ ] Course prices and names are right  
- [ ] Images are acceptable (or send replacements)  
- [ ] Contact form / enquiry details are correct  
- [ ] Privacy and terms are acceptable to publish  

**Student purchase**

- [ ] Register a new student account  
- [ ] Add a course to cart  
- [ ] Checkout with a **Stripe test card** (or a small live payment you can refund)  
- [ ] Confirm the course appears under My courses  
- [ ] Confirm pending vs purchased status is clear  

**Admin**

- [ ] Log in at `/admin/login`  
- [ ] Check the new student and payment appear  
- [ ] Open Payment setup — PayPal email and Stripe keys are the live (or test) keys you want  
- [ ] Add or edit a course if needed  

---

## 7. Items still waiting on the client

| # | Item | Why it matters |
| --- | --- | --- |
| 1 | Sign-off on all website copy | Current text was written by the development team |
| 2 | Final course list, prices and images | Including coaching if it should be sold online |
| 3 | **Post-purchase course content (see section 5)** | Dashboard cannot be finished without this |
| 4 | Real testimonials (or permission to keep drafts) | Draft names/quotes should not stay if unapproved |
| 5 | Correct social media URLs | Header/footer currently use generic LinkedIn, Facebook, Instagram, X links |
| 6 | Logo files (transparent PNG / SVG if you have a print-quality version) | Current logo was taken from the supplied image |
| 7 | Live vs test Stripe/PayPal keys | Test keys must not stay on the live site if you are taking real payments |
| 8 | Privacy / terms reviewed by you (or your advisor) | Legal pages are drafts only |

---

## 8. Technical notes (for the client’s information)

- Public site: React website  
- Admin and payments: Laravel (PHP) with MySQL  
- Student login and admin login are separate  
- Payments: Stripe Checkout and PayPal Standard  
- Hosting: Hostinger — `pixxelu.com/dev/arwainacademy/`  

---

## 9. Summary

The website, cart, checkout, student accounts and admin panel are in place so you can **browse, buy and manage** courses.

Two things must come from you before we treat the project as finished:

1. **Content approval** — please test every page; all copy was added by us and needs your check.  
2. **Purchased-course experience** — please tell us exactly what a student should see after Add to cart and after payment (videos, files, live classes, assignments, etc.).

Once those answers are received, the remaining work can be estimated and scheduled.

---

*Please reply on this report with comments, corrections, and the post-purchase course structure. Thank you.*
