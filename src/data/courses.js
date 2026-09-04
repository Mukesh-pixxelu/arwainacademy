import { asset } from '../utils/asset.js'
import { API_URL } from '../utils/api.js'

export const courses = [
  {
    slug: 'cmi-level-3-award-in-principles-of-management-and-leadership',
    title: 'CMI Level 3 Award in Principles of Management and Leadership',
    category: 'Level 3',
    price: 349,
    oldPrice: null,
    excerpt:
      'A concise, nationally recognised qualification for aspiring, newly appointed and practising first-line managers.',
    duration: '40 hours TQT',
    overview:
      'The CMI Level 3 Award in Principles of Management and Leadership is a concise, nationally recognised qualification designed for aspiring, newly appointed and practising first-line managers. It is suitable for team leaders, supervisors, shift managers and project officers who want to strengthen their management knowledge and develop greater confidence in leading others.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 3 Award in Principles of Management and Leadership is a concise, nationally recognised qualification designed for aspiring, newly appointed and practising first-line managers. It is suitable for team leaders, supervisors, shift managers and project officers who want to strengthen their management knowledge and develop greater confidence in leading others.',
          'The course introduces the principles that underpin successful management and leadership. Learners explore how organisations operate, the responsibilities of a manager and the different approaches that can be used to lead individuals and teams. The course also considers the knowledge, skills and professional behaviours required to build productive working relationships and contribute to organisational performance.',
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Aspiring managers preparing for their first management role',
          'Newly appointed team leaders and supervisors',
          'Existing managers without a formal management qualification',
          'Project officers and shift managers',
          'Employees who want to progress into management',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: [
          'To achieve the Award, learners must complete at least one unit totalling a minimum of:',
        ],
        items: ['Four credits', '40 hours of Total Qualification Time'],
      },
      {
        title: 'Assessment',
        paragraphs: [
          "Assessment is normally completed through a written assignment, work-based evidence, reflective accounts, reports or another approved assessment method. Learners must demonstrate that they have met every learning outcome and assessment criterion for their selected module. CMI's guideline for written work is approximately 2,000 to 2,500 words per unit.",
          'There are no examinations.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: [
          'CMI does not specify formal entry qualifications. Learners should normally be aged 16 or over and have sufficient literacy, workplace knowledge and experience to study at Level 3. Previous management experience is useful but not essential.',
        ],
      },
      {
        title: 'Progression',
        paragraphs: ['After completing the Award, learners may progress to:'],
        items: [
          'CMI Level 3 Certificate in Principles of Management and Leadership',
          'CMI Level 3 Diploma in Principles of Management and Leadership',
          'Further management responsibilities within their organisation',
          'Higher-level CMI management and leadership qualifications, subject to experience and suitability',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-3-certificate-in-principles-of-management-and-leadership',
    title: 'CMI Level 3 Certificate in Principles of Management and Leadership',
    category: 'Level 3',
    price: 799,
    oldPrice: 849,
    excerpt:
      'A nationally recognised qualification that builds a broader foundation of management knowledge for first-line managers.',
    duration: '130 hours TQT',
    overview:
      'The CMI Level 3 Certificate in Principles of Management and Leadership is a nationally recognised qualification designed for aspiring, newly appointed and practising first-line managers. It provides learners with a broad understanding of management and leadership while developing the practical knowledge needed to lead individuals and teams in the workplace.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 3 Certificate in Principles of Management and Leadership is a nationally recognised qualification designed for aspiring, newly appointed and practising first-line managers. It provides learners with a broad understanding of management and leadership while developing the practical knowledge needed to lead individuals and teams in the workplace.',
          'The course explores how organisations operate, the responsibilities of managers and the approaches that can be used to manage and lead others. Learners will also develop their understanding of team dynamics, motivation, communication, performance management and the professional behaviours expected of a manager.',
          'The Certificate is more comprehensive than the Level 3 Award and is suitable for learners who want to develop a broader foundation of management knowledge.',
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Aspiring managers preparing for their first management position',
          'Newly appointed team leaders and supervisors',
          'Existing managers without a formal management qualification',
          'Project officers and shift managers',
          'Employees responsible for coordinating people or workplace activities',
          'Managers seeking a recognised professional qualification',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: [
          'To achieve the Certificate, learners must complete a combination of units totalling a minimum of:',
        ],
        items: ['13 credits', '130 hours of Total Qualification Time'],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is normally completed through written assignments, work-based evidence, reports, reflective accounts, presentations or other approved assessment methods. Learners must demonstrate that they have met every learning outcome and assessment criterion for each selected module.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: [
          'CMI does not specify formal entry qualifications. Learners should normally be aged 16 or over and have sufficient literacy, workplace knowledge and experience to undertake study at Level 3.',
          'Previous management experience is helpful but not essential, making the course suitable for both practising and aspiring managers.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop a recognised foundation of management and leadership knowledge',
          'Improve their ability to lead and motivate a team',
          'Understand how to respond to common management challenges',
          'Develop greater confidence in managing workplace performance',
          'Apply management theories and models to workplace situations',
          'Gain a nationally recognised CMI qualification',
          'Become eligible for Foundation Chartered Manager status',
          'Support their progression into supervisory and first-line management roles',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Certificate, learners may progress to:'],
        items: [
          'CMI Level 3 Diploma in Principles of Management and Leadership',
          'CMI Level 3 Diploma in First Line Management and Leadership',
          'Higher-level CMI management and leadership qualifications, subject to experience and suitability',
          'Team leader, supervisor, shift manager or project officer positions',
          'Roles involving greater responsibility for people, projects and operational activities',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-3-diploma-in-principles-of-management-and-leadership',
    title: 'CMI Level 3 Diploma in Principles of Management and Leadership',
    category: 'Level 3',
    price: 1249,
    oldPrice: 1589,
    excerpt:
      'The most comprehensive Level 3 qualification for first-line managers, covering people, operations and professional development.',
    duration: '370 hours TQT',
    overview:
      'The CMI Level 3 Diploma in Principles of Management and Leadership is a comprehensive, nationally recognised qualification for aspiring, newly appointed and practising first-line managers. It develops the knowledge, skills and professional behaviours needed to manage individuals, lead teams and contribute to organisational performance.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 3 Diploma in Principles of Management and Leadership is a comprehensive, nationally recognised qualification for aspiring, newly appointed and practising first-line managers. It develops the knowledge, skills and professional behaviours needed to manage individuals, lead teams and contribute to organisational performance.',
          'The course provides a detailed understanding of how organisations operate and how managers translate organisational objectives into everyday activities. Learners will explore leadership approaches, team and individual performance, workplace communication, resource management, operational planning and continuing professional development.',
          'As the most comprehensive qualification within the Level 3 suite, the Diploma is suitable for learners who want to build a strong foundation across the main areas of first-line management.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '3D30' },
          { label: 'Qualification number', value: '603/2023/0' },
          { label: 'Qualification level', value: 'Level 3' },
          { label: 'Minimum credits', value: '37' },
          { label: 'Total Qualification Time', value: '370 hours' },
          { label: 'Guided Learning Hours', value: 'Dependent on the units selected' },
          { label: 'Assessment', value: 'Assignments and work-based evidence' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Aspiring managers preparing for their first management position',
          'Newly appointed team leaders and supervisors',
          'Existing first-line managers seeking a formal qualification',
          'Project officers and shift managers',
          'Employees responsible for managing people, resources or operational activities',
          'Managers looking to progress into roles with greater responsibility',
          'Organisations developing their future management capability',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: [
          'To achieve the Diploma, learners must complete a combination of units totalling a minimum of:',
        ],
        items: ['37 credits', '370 hours of Total Qualification Time'],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is completed through written assignments, reports, work-based evidence, reflective accounts, presentations or other approved assessment methods. Learners must demonstrate that they have met every learning outcome and assessment criterion for each selected module.',
          'There are no examinations.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: [
          'CMI does not specify formal entry qualifications. Learners should normally be aged 16 or over and have sufficient literacy, workplace knowledge and experience to undertake study at Level 3.',
          'Previous management experience is beneficial but not essential. Aspiring managers may use workplace scenarios, case studies and experience from other roles to demonstrate their understanding.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop comprehensive management and leadership knowledge',
          'Improve their ability to lead teams and manage individual performance',
          'Understand how to plan and monitor operational activities',
          'Develop stronger workplace communication skills',
          'Build confidence in managing budgets and resources',
          'Apply recognised management theories to workplace situations',
          'Create a structured professional development plan',
          'Gain a nationally recognised CMI qualification',
          'Become eligible for Foundation Chartered Manager status',
          'Prepare for progression into roles with greater management responsibility',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Diploma, learners may progress to:'],
        items: [
          'CMI Level 5 qualifications in Management and Leadership',
          'CMI qualifications in Coaching and Mentoring',
          'Higher-level leadership and management apprenticeships',
          'Team leader, supervisor, shift manager or project officer roles',
          'Operational or departmental management positions',
          'Roles involving responsibility for people, budgets, projects and organisational performance',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-5-award-in-management-and-leadership',
    title: 'CMI Level 5 Award in Management and Leadership',
    category: 'Level 5',
    price: 529,
    oldPrice: null,
    excerpt:
      'A focused Level 5 introduction for practising and aspiring middle managers, without committing to the full Certificate or Diploma.',
    duration: '40 hours TQT',
    overview:
      'The CMI Level 5 Award in Management and Leadership is a concise, nationally recognised qualification designed for practising and aspiring middle managers. It develops an understanding of the principles, theories and professional practices required to manage people, lead teams and contribute to organisational objectives.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 5 Award in Management and Leadership is a concise, nationally recognised qualification designed for practising and aspiring middle managers. It develops an understanding of the principles, theories and professional practices required to manage people, lead teams and contribute to organisational objectives.',
          'The course examines the relationship between management and leadership and how different approaches influence individuals, teams and organisational performance. Learners will consider the impact of organisational structure, culture, values and governance on management practice while developing the knowledge, skills and behaviours needed to lead with confidence.',
          'The Award is suitable for managers who want to gain a focused introduction to management and leadership at Level 5 without committing initially to the larger Certificate or Diploma.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '5A30' },
          { label: 'Qualification number', value: '603/2390/5' },
          { label: 'Qualification level', value: 'Level 5' },
          { label: 'Minimum credits', value: '4' },
          { label: 'Minimum Total Qualification Time', value: '40 hours' },
          { label: 'Recommended pathway', value: 'CMI 501' },
          { label: 'Recommended pathway credits', value: '7' },
          { label: 'Recommended pathway Total Unit Time', value: '70 hours' },
          { label: 'Recommended pathway Guided Learning Hours', value: '25 hours' },
          { label: 'Assessment', value: 'Assignment or work-based evidence' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Aspiring middle managers preparing for increased responsibility',
          'Newly appointed operational or departmental managers',
          'Existing managers without a formal management qualification',
          'Team leaders progressing into middle-management roles',
          'Project, divisional, regional and specialist managers',
          'Managers responsible for leading individuals and teams',
          'Professionals seeking a recognised management qualification',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: [
          'To achieve the Award, learners must complete at least one unit totalling a minimum of:',
        ],
        items: ['Four credits', '40 hours of Total Qualification Time'],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'The recommended CMI 501 pathway is normally assessed through a written assignment, report, workplace scenario or portfolio of work-based evidence. Learners must demonstrate that they have met every learning outcome and assessment criterion.',
          'There are no examinations.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: ['CMI does not specify formal entry qualifications. Learners should normally:'],
        items: [
          'Be aged 18 or over',
          'Have sufficient literacy and analytical skills to study at Level 5',
          'Be working in, or aspiring to, a management or leadership role',
          'Have access to an organisation or suitable workplace context for applying their learning',
        ],
        after: [
          'Previous management experience is beneficial but is not essential where the learner can use appropriate workplace scenarios or case studies.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop a recognised understanding of management and leadership',
          'Explore how organisational structure and culture affect management practice',
          'Improve their ability to select and adapt leadership approaches',
          'Strengthen their communication and decision-making skills',
          'Understand the professional behaviours expected of managers',
          'Develop approaches for building trust and supporting teams',
          'Apply management theories and models to workplace situations',
          'Gain a nationally recognised CMI qualification',
          'Support their progression towards Chartered Manager status',
          'Create a pathway to further management and leadership study',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Award, learners may progress to:'],
        items: [
          'CMI Level 5 Certificate in Management and Leadership',
          'CMI Level 5 Diploma in Management and Leadership',
          'CMI Level 5 Extended Diploma in Management and Leadership',
          'Specialist CMI qualifications in coaching, project management or equality, diversity and inclusion',
          'Higher-level CMI qualifications, subject to experience and suitability',
          'Operational, departmental, divisional, regional or specialist management roles',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-5-certificate-in-management-and-leadership',
    title: 'CMI Level 5 Certificate in Management and Leadership',
    category: 'Level 5',
    price: 899,
    oldPrice: 949,
    excerpt:
      'Broader development than the Award for middle managers who want to lead teams, manage performance and contribute to organisational objectives.',
    duration: '130 hours TQT',
    overview:
      'The CMI Level 5 Certificate in Management and Leadership is a nationally recognised qualification designed for practising and aspiring middle managers. It develops the knowledge and professional skills required to lead individuals and teams, manage workplace performance and contribute to organisational objectives.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 5 Certificate in Management and Leadership is a nationally recognised qualification designed for practising and aspiring middle managers. It develops the knowledge and professional skills required to lead individuals and teams, manage workplace performance and contribute to organisational objectives.',
          'The course examines management and leadership within an organisational context, including the influence of organisational structure, culture, values and governance. Learners will explore management and leadership theories before considering how managers can develop, motivate and lead individuals and teams to achieve successful outcomes.',
          'The Certificate offers broader development than the Level 5 Award while remaining more focused than the full Diploma.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '5C30' },
          { label: 'Qualification number', value: '603/2391/7' },
          { label: 'Qualification level', value: 'Level 5' },
          { label: 'Minimum credits', value: '13' },
          { label: 'Total Qualification Time', value: '130 hours' },
          { label: 'Recommended pathway', value: 'CMI 501 and CMI 502' },
          { label: 'Recommended pathway Guided Learning Hours', value: '52 hours' },
          { label: 'Assessment', value: 'Assignments and work-based evidence' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Aspiring middle managers preparing for increased responsibility',
          'Newly appointed operational or departmental managers',
          'Existing managers without a formal management qualification',
          'Team leaders progressing into middle-management roles',
          'Project, divisional, regional and specialist managers',
          'Managers responsible for leading individuals and teams',
          'Professionals seeking to strengthen their management practice',
          'Organisations developing their management and leadership capability',
        ],
      },
      {
        title: 'Learning outcomes',
        paragraphs: ['By completing the recommended pathway, learners will be able to:'],
        items: [
          "Analyse factors influencing an organisation's internal environment",
          'Evaluate the relationship between management and leadership',
          'Examine how leadership styles affect individuals and teams',
          'Adapt management approaches to different workplace situations',
          'Assess the knowledge, skills and behaviours required of managers',
          'Select communication techniques for different audiences',
          'Evaluate theories and practical approaches to team leadership',
          'Assess current and future team capabilities',
          'Identify appropriate recruitment and development approaches',
          'Use coaching and mentoring models to support development',
          'Develop approaches for motivating and leading individuals and teams',
          'Respond to challenges associated with multiple and remote teams',
        ],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is normally completed through written assignments, reports, workplace scenarios, operational plans, budgets, reflective accounts and portfolios of work-based evidence.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: ['CMI does not specify formal entry qualifications. Learners should normally:'],
        items: [
          'Be aged 18 or over',
          'Have sufficient literacy and analytical skills to study at Level 5',
          'Be working in, or aspiring to, a management or leadership role',
          'Have access to an organisation or suitable workplace context for applying their learning',
        ],
        after: [
          'Previous management experience is beneficial but not essential where the learner can use appropriate workplace scenarios or case studies.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop a recognised understanding of management and leadership',
          'Understand how organisational structure and culture affect management practice',
          'Improve their ability to lead, develop and motivate teams',
          'Strengthen their communication and decision-making skills',
          'Develop approaches for managing multiple and remote teams',
          'Understand how recruitment, coaching and development support team capability',
          'Apply management theories and models to workplace situations',
          'Gain a nationally recognised CMI qualification',
          'Support their progression towards Chartered Manager status',
          'Prepare for roles with greater management responsibility',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Certificate, learners may progress to:'],
        items: [
          'CMI Level 5 Diploma in Management and Leadership',
          'CMI Level 5 Extended Diploma in Management and Leadership',
          'Specialist CMI qualifications in coaching, project management or equality, diversity and inclusion',
          'Higher-level CMI qualifications, subject to experience and suitability',
          'Operational, departmental, divisional, regional or specialist management roles',
          'Positions involving increased responsibility for people, performance and organisational delivery',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-5-diploma-in-management-and-leadership',
    title: 'CMI Level 5 Diploma in Management and Leadership',
    category: 'Level 5',
    price: 1649,
    oldPrice: 1989,
    excerpt:
      'A comprehensive Level 5 programme for middle managers covering people, performance, operations and financial management.',
    duration: '370 hours TQT',
    overview:
      'The CMI Level 5 Diploma in Management and Leadership is a comprehensive, nationally recognised qualification for practising and aspiring middle managers. It develops the knowledge, skills and professional behaviours required to lead individuals and teams, manage operational performance and contribute to organisational strategy.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 5 Diploma in Management and Leadership is a comprehensive, nationally recognised qualification for practising and aspiring middle managers. It develops the knowledge, skills and professional behaviours required to lead individuals and teams, manage operational performance and contribute to organisational strategy.',
          'The course examines management and leadership within an organisational context, including the influence of governance, structure, culture, values and ethics. Learners will develop their understanding of people management, performance management, stakeholder relationships, workforce planning, operational delivery and financial management.',
          'As the most comprehensive qualification within the Level 5 Management and Leadership suite, the Diploma provides a broad programme of professional development for managers seeking greater responsibility.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '5D30' },
          { label: 'Qualification number', value: '603/2392/9' },
          { label: 'Qualification level', value: 'Level 5' },
          { label: 'Minimum credits', value: '37' },
          { label: 'Total Qualification Time', value: '370 hours' },
          { label: 'Recommended pathway Guided Learning Hours', value: '153 hours' },
          { label: 'Assessment', value: 'Assignments and work-based evidence' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Practising middle managers',
          'Aspiring operational or departmental managers',
          'Divisional, regional and specialist managers',
          'Experienced team leaders progressing into middle management',
          'Managers responsible for people, budgets and operational activities',
          'Professionals seeking a comprehensive management qualification',
          'Organisations developing their current and future management capability',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: [
          'To achieve the Diploma, learners must complete a combination of units totalling a minimum of:',
        ],
        items: ['37 credits', '370 hours of Total Qualification Time'],
        after: [
          'There are no compulsory units. However, the following pathway provides broad coverage of the main responsibilities of a middle manager.',
        ],
      },
      {
        title: 'Learning outcomes',
        paragraphs: ['By completing the recommended pathway, learners will be able to:'],
        items: [
          'Analyse how organisational structure, culture and values influence management',
          'Evaluate management and leadership theories and approaches',
          'Adapt leadership styles to different workplace situations',
          'Lead and support individuals and teams',
          'Establish and monitor performance expectations',
          'Respond constructively to underperformance',
          'Build productive stakeholder relationships',
          'Analyse current and future workforce requirements',
          'Develop operational plans aligned with organisational strategy',
          'Monitor operational performance using appropriate measures',
          'Understand organisational financial systems',
          'Set, manage and monitor budgets',
          'Use financial information to support management decisions',
        ],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is normally completed through written assignments, reports, workplace scenarios, operational plans, budgets, reflective accounts and portfolios of work-based evidence.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: ['CMI does not specify formal entry qualifications. Learners should normally:'],
        items: [
          'Be aged 18 or over',
          'Have sufficient literacy and analytical skills to study at Level 5',
          'Be working in, or aspiring to, a middle-management role',
          'Have access to an organisation or suitable workplace context',
          'Be able to apply management theories and models to workplace situations',
        ],
        after: [
          'Previous management experience is beneficial, but aspiring managers may use suitable case studies and workplace scenarios where appropriate.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop comprehensive management and leadership knowledge',
          'Improve their ability to lead individuals and teams',
          'Strengthen their performance-management skills',
          'Develop productive stakeholder relationships',
          'Understand current and future workforce requirements',
          'Translate organisational strategy into operational plans',
          'Build confidence in financial and budget management',
          'Apply management theories and models to workplace situations',
          'Gain a nationally recognised CMI qualification',
          'Support their progression towards Chartered Manager status',
          'Prepare for roles with greater organisational responsibility',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Diploma, learners may progress to:'],
        items: [
          'CMI Level 5 Extended Diploma in Management and Leadership',
          'CMI Level 6 Professional Management and Leadership Practice qualifications',
          'CMI Level 7 Strategic Management and Leadership Practice qualifications, subject to experience and suitability',
          'Specialist qualifications in coaching, project management or sustainability',
          'Operational, departmental, divisional, regional or specialist management roles',
          'Senior positions involving responsibility for people, budgets, projects and organisational performance',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-7-award-in-strategic-management-and-leadership-practice',
    title: 'CMI Level 7 Award in Strategic Management and Leadership Practice',
    category: 'Level 7',
    price: 649,
    oldPrice: null,
    excerpt:
      'A focused Level 7 introduction to strategic leadership for practising and aspiring senior leaders.',
    duration: '70 hours TQT',
    overview:
      'The CMI Level 7 Award in Strategic Management and Leadership Practice is a nationally recognised qualification for practising and aspiring senior leaders. It develops the strategic knowledge, critical understanding and professional behaviours required to lead organisations, functions and business areas through complex challenges.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 7 Award in Strategic Management and Leadership Practice is a nationally recognised qualification for practising and aspiring senior leaders. It develops the strategic knowledge, critical understanding and professional behaviours required to lead organisations, functions and business areas through complex challenges.',
          'The course examines the role of strategic leadership within different organisational contexts. Learners will explore contemporary leadership theories, organisational culture, governance, stakeholder expectations and the skills needed to shape and deliver sustainable strategic goals.',
          'As a focused Level 7 qualification, the Award provides an accessible introduction to strategic management and leadership without requiring the broader commitment of the Certificate or Diploma.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '7A30' },
          { label: 'Qualification number', value: '603/4833/1' },
          { label: 'Qualification level', value: 'Level 7' },
          { label: 'Minimum credits', value: '7' },
          { label: 'Minimum Total Qualification Time', value: '70 hours' },
          { label: 'Minimum Guided Learning Hours', value: '18 hours' },
          { label: 'Recommended pathway', value: 'CMI 701: Strategic Leadership' },
          { label: 'Recommended pathway credits', value: '11' },
          { label: 'Recommended pathway Total Unit Time', value: '110 hours' },
          { label: 'Recommended pathway Guided Learning Hours', value: '36 hours' },
          { label: 'Assessment', value: 'Assignment and work-based evidence' },
          { label: 'Grading', value: 'Pass or Refer' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Practising and aspiring senior managers',
          'Regional and specialist managers',
          'Heads of department or function',
          'Directors and business owners',
          'Senior project and programme leaders',
          'Professionals preparing for executive responsibility',
          'Leaders responsible for organisational strategy or transformation',
          'Senior Leader apprentices seeking additional accredited learning',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: ['To achieve the Award, learners must complete:'],
        items: [
          'At least one unit',
          'A minimum of seven credits',
          'At least 70 hours of Total Qualification Time',
          'A unit selected from Group A, CMI 701 to 716',
        ],
      },
      {
        title: 'Alignment with professional standards',
        paragraphs: ['The qualification is aligned with:'],
        items: [
          'The CMI Professional Standard',
          'The Senior Leader Apprenticeship Standard ST0480',
          'Strategic leadership responsibilities undertaken by senior managers, directors and executives',
        ],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is normally completed through a written report, professional presentation, reflective account or portfolio of work-based evidence. Learners must provide sufficient evidence to meet every assessment criterion.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: ['CMI does not specify formal entry qualifications. Learners should normally:'],
        items: [
          'Be aged 19 or over',
          'Be working in, or aspiring to, a senior management or leadership role',
          'Have sufficient professional experience to engage with strategic issues',
          'Have the literacy, research and analytical skills required for Level 7 study',
          'Have access to an organisation or suitable strategic context',
          'Be able to apply leadership theories to complex workplace situations',
        ],
        after: [
          'Learners do not need to hold a previous CMI qualification, although management experience or previous study at Level 5 or above will be beneficial.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop a recognised understanding of strategic leadership',
          'Strengthen their ability to lead in complex organisational environments',
          'Evaluate contemporary leadership theories and practices',
          'Improve their strategic thinking and decision-making',
          'Develop approaches for leading change and innovation',
          'Strengthen stakeholder influencing and communication skills',
          'Understand the importance of governance, ethics and accountability',
          'Apply leadership principles to genuine organisational challenges',
          'Gain a nationally recognised CMI qualification',
          'Receive access to CMI membership and learning resources while registered',
          'Establish a pathway to further Level 7 study and Chartered Manager development',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Award, learners may progress to:'],
        items: [
          'CMI Level 7 Certificate in Strategic Management and Leadership Practice',
          'CMI Level 7 Diploma in Strategic Management and Leadership Practice',
          'CMI Level 7 Extended Diploma in Strategic Management and Leadership Practice',
          'CMI Level 8 qualifications in Strategic Direction and Leadership Practice',
          'Senior management, director or executive roles',
          'Further professional development towards Chartered Manager status',
        ],
        after: [
          'Learners completing the Level 7 Diploma or Extended Diploma may be eligible for Chartered Manager status where they can demonstrate at least three years of management and leadership experience.',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-7-certificate-in-strategic-management-and-leadership-practice',
    title: 'CMI Level 7 Certificate in Strategic Management and Leadership Practice',
    category: 'Level 7',
    price: 999,
    oldPrice: null,
    excerpt:
      'Broader Level 7 development than the Award, covering strategic leadership plus collaboration and partnerships.',
    duration: '140 hours TQT',
    overview:
      'The CMI Level 7 Certificate in Strategic Management and Leadership Practice is a nationally recognised qualification designed for practising and aspiring senior leaders. It develops the critical understanding, strategic insight and professional behaviours required to lead organisations, functions and business areas through complex challenges.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 7 Certificate in Strategic Management and Leadership Practice is a nationally recognised qualification designed for practising and aspiring senior leaders. It develops the critical understanding, strategic insight and professional behaviours required to lead organisations, functions and business areas through complex challenges.',
          'The course explores the role of strategic leadership within contemporary organisations and examines how collaboration and partnerships can support strategic success. Learners will evaluate leadership theories, organisational context, governance, stakeholder relationships and approaches for establishing productive collaborative arrangements.',
          'The Certificate offers broader professional development than the Level 7 Award while remaining more focused than the full Diploma.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '7C30' },
          { label: 'Qualification number', value: '603/4834/3' },
          { label: 'Qualification level', value: 'Level 7' },
          { label: 'Minimum credits', value: '14' },
          { label: 'Minimum Total Qualification Time', value: '140 hours' },
          { label: 'Minimum Guided Learning Hours', value: '36 hours' },
          { label: 'Recommended pathway', value: 'CMI 701 and CMI 703' },
          { label: 'Recommended pathway credits', value: '18' },
          { label: 'Recommended pathway Total Unit Time', value: '180 hours' },
          { label: 'Recommended pathway Guided Learning Hours', value: '54 hours' },
          { label: 'Assessment', value: 'Assignments and work-based evidence' },
          { label: 'Grading', value: 'Pass or Refer' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Practising and aspiring senior managers',
          'Regional and specialist managers',
          'Heads of department or function',
          'Directors and business owners',
          'Senior project and programme leaders',
          'Professionals preparing for executive responsibility',
          'Leaders responsible for strategy, partnerships or transformation',
          'Senior Leader apprentices seeking additional accredited learning',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: ['To achieve the Certificate, learners must complete:'],
        items: [
          'At least two units',
          'A minimum of 14 credits',
          'At least 140 hours of Total Qualification Time',
          'Units selected exclusively from Group A, CMI 701 to 716',
        ],
      },
      {
        title: 'Alignment with professional standards',
        paragraphs: ['The qualification is aligned with:'],
        items: [
          'The CMI Professional Standard',
          'The Senior Leader Apprenticeship Standard ST0480',
          'Strategic leadership responsibilities undertaken by senior managers, directors and executives',
        ],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is normally completed through written reports, professional presentations, reflective accounts, partnership proposals or portfolios of work-based evidence.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: ['CMI does not specify formal entry qualifications. Learners should normally:'],
        items: [
          'Be aged 19 or over',
          'Be working in, or aspiring to, a senior management or leadership role',
          'Have sufficient experience to engage with strategic issues',
          'Have the literacy, research and analytical skills required for Level 7 study',
          'Have access to an organisation or suitable strategic context',
          'Be able to apply leadership theories to complex workplace situations',
        ],
        after: [
          'Learners do not need to hold a previous CMI qualification, although management experience or previous study at Level 5 or above will be beneficial.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop a recognised understanding of strategic leadership',
          'Strengthen their ability to lead in complex environments',
          'Evaluate contemporary leadership theories and practices',
          'Improve strategic thinking and decision-making',
          'Develop approaches for leading change and innovation',
          'Strengthen influencing and stakeholder-management skills',
          'Understand the strategic value of collaboration and partnerships',
          'Develop evidence-based proposals for partnership working',
          'Gain a nationally recognised CMI qualification',
          'Receive access to CMI membership and learning resources while registered',
          'Establish a pathway to further Level 7 study and Chartered Manager development',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Certificate, learners may progress to:'],
        items: [
          'CMI Level 7 Diploma in Strategic Management and Leadership Practice',
          'CMI Level 7 Extended Diploma in Strategic Management and Leadership Practice',
          'CMI Level 8 qualifications in Strategic Direction and Leadership Practice',
          'Senior management, director or executive roles',
          'Further professional development towards Chartered Manager status',
        ],
        after: [
          'Learners completing the Level 7 Diploma or Extended Diploma may be eligible for Chartered Manager status where they can demonstrate at least three years of management and leadership experience.',
        ],
      },
    ],
  },
  {
    slug: 'cmi-level-7-diploma-in-strategic-management-and-leadership-practice',
    title: 'CMI Level 7 Diploma in Strategic Management and Leadership Practice',
    category: 'Level 7',
    price: 1949,
    oldPrice: null,
    excerpt:
      'A comprehensive Level 7 qualification for senior leaders covering strategy, people, partnerships and organisational performance.',
    duration: '370 hours TQT',
    overview:
      'The CMI Level 7 Diploma in Strategic Management and Leadership Practice is a comprehensive, nationally recognised qualification for practising and aspiring senior leaders. It develops the strategic knowledge, critical understanding and professional behaviours required to lead organisations, functions and business areas through complex challenges.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The CMI Level 7 Diploma in Strategic Management and Leadership Practice is a comprehensive, nationally recognised qualification for practising and aspiring senior leaders. It develops the strategic knowledge, critical understanding and professional behaviours required to lead organisations, functions and business areas through complex challenges.',
          'The course explores strategic leadership, organisational performance, people development, collaboration and organisational strategy. Learners will critically evaluate contemporary theories and apply strategic models, evidence and professional judgement to genuine organisational priorities.',
          'The Diploma is suitable for leaders seeking a substantial professional qualification that supports progression into senior management, director and executive roles.',
        ],
      },
      {
        title: 'Qualification details',
        details: [
          { label: 'CMI qualification code', value: '7D30' },
          { label: 'Qualification number', value: '603/4837/9' },
          { label: 'Qualification level', value: 'Level 7' },
          { label: 'Minimum credits', value: '37' },
          { label: 'Total Qualification Time', value: '370 hours' },
          { label: 'Minimum Guided Learning Hours', value: '106 hours' },
          { label: 'Recommended pathway Guided Learning Hours', value: '118 hours' },
          { label: 'Assessment', value: 'Assignments and work-based evidence' },
          { label: 'Grading', value: 'Pass or Refer' },
          { label: 'Examinations', value: 'None' },
        ],
      },
      {
        title: 'Who is the course for?',
        paragraphs: ['The qualification is suitable for:'],
        items: [
          'Practising and aspiring senior managers',
          'Regional and specialist managers',
          'Heads of department or function',
          'Directors and business owners',
          'Senior project and programme leaders',
          'Professionals preparing for executive responsibility',
          'Leaders responsible for organisational strategy and transformation',
          'Senior Leader apprentices seeking additional accredited learning',
        ],
      },
      {
        title: 'Qualification structure',
        paragraphs: ['To achieve the Diploma, learners must complete:'],
        items: [
          'A minimum of 37 credits',
          'At least 370 hours of Total Qualification Time',
          'At least 30 credits and 300 hours from Group A units',
          'The remaining seven credits and 70 hours from either Group A or Group B',
        ],
        after: [
          'There are no individually compulsory units. However, the following recommended pathway provides balanced coverage of strategic leadership, people, partnerships and organisational strategy.',
        ],
      },
      {
        title: 'Recommended pathway',
        paragraphs: [
          'The recommended pathway supports professional development in areas including:',
        ],
        items: [
          'Organisational mission, culture and values',
          'Governance and accountability',
          'Horizon scanning and global perspectives',
          'Strategic workforce planning',
          'Organisational and team dynamics',
          'Talent management and succession planning',
          'Coaching and mentoring',
          'Strategic communication',
          'Stakeholder management',
          'Influencing and negotiation',
          'Collaborative leadership',
          'Organisational strategy',
          'Innovation and change',
          'Systems thinking',
          'Personal accountability and ethical leadership',
        ],
      },
      {
        title: 'Alignment with professional standards',
        paragraphs: ['The qualification is aligned with:'],
        items: [
          'The CMI Professional Standard',
          'The Senior Leader Apprenticeship Standard ST0480',
          'Strategic leadership responsibilities undertaken by senior managers, directors and executives',
        ],
      },
      {
        title: 'Assessment',
        paragraphs: [
          'Assessment is normally completed through written reports, strategic proposals, professional presentations, reflective accounts or portfolios of work-based evidence.',
        ],
      },
      {
        title: 'Entry requirements',
        paragraphs: ['CMI does not specify formal entry qualifications. Learners should normally:'],
        items: [
          'Be aged 19 or over',
          'Be working in, or aspiring to, a senior management or leadership role',
          'Have sufficient professional experience to engage with strategic issues',
          'Have the literacy, research and analytical skills required for Level 7 study',
          'Have access to an organisation or suitable strategic context',
          'Be able to apply leadership theories to complex workplace situations',
        ],
        after: [
          'Learners do not need to hold a previous CMI qualification, although management experience or previous study at Level 5 or above will be beneficial.',
        ],
      },
      {
        title: 'Benefits of completing the qualification',
        paragraphs: ['Learners will:'],
        items: [
          'Develop comprehensive strategic management and leadership knowledge',
          'Strengthen their ability to lead in complex environments',
          'Improve strategic thinking and decision-making',
          'Develop strategies for optimising people and organisational performance',
          'Strengthen stakeholder and partnership-management skills',
          'Develop and implement organisational strategy',
          'Evaluate contemporary leadership theories and practices',
          'Apply strategic models to genuine organisational challenges',
          'Gain a nationally recognised CMI qualification',
          'Receive access to CMI membership and learning resources while registered',
          'Support progression towards Chartered Manager status',
        ],
      },
      {
        title: 'Progression opportunities',
        paragraphs: ['After completing the Diploma, learners may progress to:'],
        items: [
          'CMI Level 7 Extended Diploma in Strategic Management and Leadership Practice',
          'CMI Level 8 qualifications in Strategic Direction and Leadership Practice',
          'Further postgraduate or professional study',
          'Senior management, director or executive roles',
          "Chartered Manager status, subject to meeting CMI's experience requirements",
        ],
        after: [
          'Learners completing the Level 7 Diploma may be eligible for Chartered Manager status where they can demonstrate at least three years of management and leadership experience.',
        ],
      },
    ],
  },
]

export const listedCourseSlugs = courses.map((course) => course.slug)

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function hydrateFromApi(apiCourse) {
  const local = courses.find((course) => course.slug === apiCourse.slug)
  const image = apiCourse.image_url || apiCourse.image || local?.image
  if (local) {
    return {
      ...local,
      title: apiCourse.title || local.title,
      category: apiCourse.category || local.category,
      price: Number(apiCourse.price ?? local.price),
      excerpt: apiCourse.description || local.excerpt,
      overview: local.overview,
      image,
    }
  }

  const description = apiCourse.description || ''
  return {
    slug: apiCourse.slug,
    title: apiCourse.title,
    category: apiCourse.category || 'Course',
    price: Number(apiCourse.price) || 0,
    oldPrice: null,
    excerpt: description,
    duration: '',
    overview: description,
    image,
    sections: [
      {
        title: 'Overview',
        paragraphs: [description || 'Details for this course will be published shortly.'],
      },
    ],
  }
}

export function findCourse(item, list = courses) {
  const slug = typeof item === 'string' ? item : item?.slug
  const title = typeof item === 'string' ? '' : item?.title
  if (slug) {
    const exact = list.find((course) => course.slug === slug)
    if (exact) return exact
  }

  const needle = normalize(title || slug)
  if (!needle) return undefined

  let best
  let bestScore = 0
  for (const course of list) {
    const hay = normalize(course.title)
    let score = 0
    if (hay === needle) score = 100
    else if (hay.includes(needle) || needle.includes(hay)) score = 80
    else {
      const words = needle.split(' ').filter((word) => word.length > 3)
      const hits = words.filter((word) => hay.includes(word)).length
      if (words.length && hits >= Math.min(3, words.length)) score = hits * 12
    }
    if (score > bestScore) {
      best = course
      bestScore = score
    }
  }

  return bestScore >= 36 ? best : undefined
}

export function getCourse(slug, list = courses) {
  return list.find((course) => course.slug === slug) || findCourse({ slug }, list)
}

export function formatPrice(price) {
  if (price === 0) return 'Free'
  return '£' + price.toLocaleString('en-GB')
}

export function courseImage(item) {
  const raw = item?.image || findCourse(item)?.image
  if (raw) {
    if (/^(https?:)?\/\//i.test(raw) || raw.startsWith('data:')) return raw
    if (raw.startsWith('uploads/') || raw.startsWith('/uploads/')) {
      return `${API_URL}/${String(raw).replace(/^\//, '')}`
    }
    return asset(raw)
  }

  const hay = `${item?.title || ''} ${item?.slug || ''} ${item?.category || ''}`.toLowerCase()
  if (hay.includes('coach')) return asset('images/coaching.jpg')
  if (hay.includes('leader')) return asset('images/leadership.jpg')
  return asset('images/qualifications.jpg')
}
