<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->courses() as $course) {
            Course::query()->updateOrCreate(
                ['slug' => $course['slug']],
                $course
            );
        }
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function courses(): array
    {
        return [
            [
                'slug' => 'cmi-level-3-award-in-principles-of-management-and-leadership',
                'title' => 'CMI Level 3 Award in Principles of Management and Leadership',
                'category' => 'Level 3',
                'price' => 349,
                'description' => 'A concise, nationally recognised qualification for aspiring, newly appointed and practising first-line managers.',
                'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-3-certificate-in-principles-of-management-and-leadership',
                'title' => 'CMI Level 3 Certificate in Principles of Management and Leadership',
                'category' => 'Level 3',
                'price' => 799,
                'description' => 'A nationally recognised qualification that builds a broader foundation of management knowledge for first-line managers.',
                'image' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-3-diploma-in-principles-of-management-and-leadership',
                'title' => 'CMI Level 3 Diploma in Principles of Management and Leadership',
                'category' => 'Level 3',
                'price' => 1249,
                'description' => 'The most comprehensive Level 3 qualification for first-line managers, covering people, operations and professional development.',
                'image' => 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-5-award-in-management-and-leadership',
                'title' => 'CMI Level 5 Award in Management and Leadership',
                'category' => 'Level 5',
                'price' => 529,
                'description' => 'A focused Level 5 introduction for practising and aspiring middle managers.',
                'image' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-5-certificate-in-management-and-leadership',
                'title' => 'CMI Level 5 Certificate in Management and Leadership',
                'category' => 'Level 5',
                'price' => 899,
                'description' => 'Broader development than the Award for middle managers who want to lead teams and manage workplace performance.',
                'image' => 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-5-diploma-in-management-and-leadership',
                'title' => 'CMI Level 5 Diploma in Management and Leadership',
                'category' => 'Level 5',
                'price' => 1649,
                'description' => 'A comprehensive Level 5 programme for middle managers covering people, performance, operations and financial management.',
                'image' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-7-award-in-strategic-management-and-leadership-practice',
                'title' => 'CMI Level 7 Award in Strategic Management and Leadership Practice',
                'category' => 'Level 7',
                'price' => 649,
                'description' => 'A focused Level 7 introduction to strategic leadership for practising and aspiring senior leaders.',
                'image' => 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-7-certificate-in-strategic-management-and-leadership-practice',
                'title' => 'CMI Level 7 Certificate in Strategic Management and Leadership Practice',
                'category' => 'Level 7',
                'price' => 999,
                'description' => 'Broader Level 7 development than the Award, covering strategic leadership plus collaboration and partnerships.',
                'image' => 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=80',
            ],
            [
                'slug' => 'cmi-level-7-diploma-in-strategic-management-and-leadership-practice',
                'title' => 'CMI Level 7 Diploma in Strategic Management and Leadership Practice',
                'category' => 'Level 7',
                'price' => 1949,
                'description' => 'A comprehensive Level 7 qualification for senior leaders covering strategy, people, partnerships and organisational performance.',
                'image' => 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
            ],
        ];
    }
}
