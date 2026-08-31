<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@arwainacademy.com'],
            [
                'name' => 'Arwain Admin',
                'password' => 'password',
                'role' => 'admin',
            ]
        );

        $students = [
            ['Molly S.', 'molly@example.com', 5],
            ['James R.', 'james@example.com', 4],
            ['Maddie K.', 'maddie@example.com', 3],
            ['Shirley L.', 'shirley@example.com', 2],
            ['Priya N.', 'priya@example.com', 1],
            ['Tom Hughes', 'tom@example.com', 0],
        ];

        foreach ($students as [$name, $email, $monthsAgo]) {
            $user = User::query()->updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'password' => 'password',
                    'role' => 'student',
                ]
            );
            $user->created_at = Carbon::now()->subMonths($monthsAgo)->subDays(rand(1, 12));
            $user->save();
        }

        $this->call(CourseSeeder::class);

        $extra = [
            5 => 3, 4 => 4, 3 => 5, 2 => 4, 1 => 6, 0 => 5,
        ];
        $n = 1;
        foreach ($extra as $monthsAgo => $count) {
            for ($i = 0; $i < $count; $i++, $n++) {
                $user = User::query()->updateOrCreate(
                    ['email' => "student{$n}@arwainacademy.com"],
                    [
                        'name' => 'Student '.$n,
                        'password' => 'password',
                        'role' => 'student',
                    ]
                );
                $user->created_at = Carbon::now()->subMonths($monthsAgo)->subDays($i + 1);
                $user->save();
            }
        }
    }
}
