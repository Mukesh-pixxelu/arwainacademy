<?php

/**
 * Fallback questionnaire if a course has no custom questions yet.
 * Admin can set 5 questions per course on the course edit page.
 */
return [
    [
        'id' => 'role',
        'label' => 'What is your current job title?',
        'type' => 'text',
        'required' => true,
    ],
    [
        'id' => 'organisation',
        'label' => 'Which organisation do you work for?',
        'type' => 'text',
        'required' => true,
    ],
    [
        'id' => 'time_in_role',
        'label' => 'How long have you been in this role?',
        'type' => 'text',
        'required' => true,
    ],
    [
        'id' => 'team',
        'label' => 'Do you currently line manage others? If yes, how many?',
        'type' => 'text',
        'required' => true,
    ],
    [
        'id' => 'why_course',
        'label' => 'Why have you chosen this qualification?',
        'type' => 'textarea',
        'required' => true,
    ],
    [
        'id' => 'goals',
        'label' => 'What do you want to achieve by the end of the course?',
        'type' => 'textarea',
        'required' => true,
    ],
    [
        'id' => 'develop',
        'label' => 'Which areas of management and leadership do you most want to develop?',
        'type' => 'textarea',
        'required' => true,
    ],
    [
        'id' => 'workplace_examples',
        'label' => 'Will you be able to use real workplace examples in your assignments?',
        'type' => 'textarea',
        'required' => true,
    ],
    [
        'id' => 'study_hours',
        'label' => 'How many hours each week can you set aside for study?',
        'type' => 'text',
        'required' => true,
    ],
    [
        'id' => 'support',
        'label' => 'Do you need any additional learning support? Tell us anything that will help us support you.',
        'type' => 'textarea',
        'required' => false,
    ],
    [
        'id' => 'anything_else',
        'label' => 'Is there anything else we should know before you start?',
        'type' => 'textarea',
        'required' => false,
    ],
];
