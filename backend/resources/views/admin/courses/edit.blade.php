@extends('layouts.panel')

@section('title', 'Edit course')
@section('eyebrow', 'Courses')
@section('heading', 'Edit course')

@section('content')
    <form class="form-card" method="POST" action="{{ route('admin.courses.update', $course) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.courses._form')
        <button class="btn" type="submit">Update course</button>
    </form>

    <article class="card" style="margin-top: 24px;">
        <div class="card-head">
            <h2>Course units</h2>
        </div>
        <p class="muted" style="padding: 0 20px;">
            Students see these in their course. Progress is the share of units they have read or submitted.
            Add a unit when you are ready to release the next piece of work.
        </p>
        <ul class="unit-list">
            @forelse($course->units as $unit)
                <li>
                    <div>
                        <strong>{{ $unit->title }}</strong>
                        <small>{{ $unit->type }}</small>
                    </div>
                    <form method="POST" action="{{ route('admin.courses.units.destroy', [$course, $unit]) }}" onsubmit="return confirm('Remove this unit?')">
                        @csrf
                        @method('DELETE')
                        <button class="roster-btn is-danger" type="submit">Remove</button>
                    </form>
                </li>
            @empty
                <li>No units yet. They are created when a student first opens the course, or add one below.</li>
            @endforelse
        </ul>
        <form class="unit-add" method="POST" action="{{ route('admin.courses.units.store', $course) }}">
            @csrf
            <input type="text" name="title" placeholder="Unit title" required>
            <select name="type">
                <option value="reading">Readable guide</option>
                <option value="assignment">Written submission</option>
                <option value="questionnaire">Questionnaire</option>
            </select>
            <textarea name="body" rows="3" placeholder="Optional notes or reading text"></textarea>
            <button class="btn" type="submit">Add unit</button>
        </form>
    </article>
@endsection
