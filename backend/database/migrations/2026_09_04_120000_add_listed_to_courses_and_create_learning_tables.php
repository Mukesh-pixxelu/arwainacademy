<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->boolean('listed')->default(false)->after('category');
        });

        $slugs = config('listed_courses', []);
        if ($slugs) {
            DB::table('courses')->whereIn('slug', $slugs)->update(['listed' => true]);
            DB::table('courses')->whereNotIn('slug', $slugs)->update(['listed' => false]);
        }

        Schema::create('course_units', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->string('key')->nullable();
            $table->string('title');
            $table->string('type')->default('assignment');
            $table->unsignedInteger('sort_order')->default(0);
            $table->longText('body')->nullable();
            $table->boolean('required')->default(true);
            $table->timestamps();

            $table->index(['course_id', 'sort_order']);
        });

        Schema::create('unit_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_unit_id')->constrained()->cascadeOnDelete();
            $table->string('status')->default('complete');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'course_unit_id']);
        });

        Schema::create('course_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_unit_id')->constrained()->cascadeOnDelete();
            $table->json('answers')->nullable();
            $table->longText('body')->nullable();
            $table->string('status')->default('submitted');
            $table->text('admin_note')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_submissions');
        Schema::dropIfExists('unit_progress');
        Schema::dropIfExists('course_units');

        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('listed');
        });
    }
};
