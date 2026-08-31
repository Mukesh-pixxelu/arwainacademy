<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Course>
 */
class CourseFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title).'-'.Str::lower(Str::random(5)),
            'image' => 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80',
            'description' => fake()->paragraph(),
            'price' => fake()->randomElement([89, 349, 799, 1249]),
            'category' => fake()->randomElement(['Level 3', 'Level 5', 'Level 7']),
        ];
    }
}
