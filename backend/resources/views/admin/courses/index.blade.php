@extends('layouts.panel')

@section('title', 'Courses')

@section('content')
    @php
        $chipQuery = fn ($cat) => array_filter(['category' => $cat ?: null, 'q' => $search ?: null]);
    @endphp

    <section class="shelf">
        <div class="shelf-copy">
            <p>Course library</p>
            <h1>Shape the catalogue.</h1>
            <span class="shelf-count">{{ $totalCourses }} live {{ \Illuminate\Support\Str::plural('course', $totalCourses) }}</span>
        </div>
        <ul class="shelf-stats">
            @foreach($categories as $name)
                <li>
                    <b>{{ $categoryCounts[$name] ?? 0 }}</b>
                    <span>{{ $name }}</span>
                </li>
            @endforeach
        </ul>
        <a class="shelf-add" href="{{ route('admin.courses.create') }}">Add course</a>
    </section>

    <div class="shelf-dock">
        <form class="catalogue-search" method="GET">
            @if($category !== '')
                <input type="hidden" name="category" value="{{ $category }}">
            @endif
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
            <input type="search" name="q" value="{{ $search }}" placeholder="Find a title or pathway…">
        </form>
        <nav class="shelf-tabs">
            <a class="{{ $category === '' ? 'is-on' : '' }}" href="{{ route('admin.courses.index', $chipQuery('')) }}">All</a>
            @foreach($categories as $name)
                <a class="{{ $category === $name ? 'is-on' : '' }}" href="{{ route('admin.courses.index', $chipQuery($name)) }}">{{ $name }}</a>
            @endforeach
        </nav>
    </div>

    <div class="catalogue-grid">
        @forelse($courses as $course)
            <article class="catalogue-card">
                <div class="catalogue-media">
                    <img src="{{ $course->image_url }}" alt="">
                    <span class="catalogue-badge">{{ $course->category ?: 'Course' }}</span>
                </div>
                <div class="catalogue-body">
                    <h3>{{ $course->title }}</h3>
                    <p>{{ Str::limit($course->description, 110) }}</p>
                </div>
                <div class="catalogue-foot">
                    <strong class="{{ $course->price == 0 ? 'is-free' : '' }}">{{ $course->price == 0 ? 'Free' : '£'.number_format($course->price, 0) }}</strong>
                    <div class="catalogue-actions">
                        <a href="{{ route('admin.courses.edit', $course) }}">Edit</a>
                        <x-delete-form :action="route('admin.courses.destroy', $course)" confirm="Delete this course?" />
                    </div>
                </div>
            </article>
        @empty
            <div class="catalogue-empty">
                <strong>No courses found</strong>
                <p>{{ $search || $category ? 'Try another search or category.' : 'Add your first course to the catalogue.' }}</p>
                <a class="btn" href="{{ route('admin.courses.create') }}">+ Add course</a>
            </div>
        @endforelse
    </div>

    {{ $courses->links() }}
@endsection
