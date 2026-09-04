@extends('layouts.panel')

@section('title', 'Review submission')
@section('eyebrow', 'Sign-off')
@section('heading', $submission->unit?->title)

@section('content')
    <p class="muted">
        {{ $submission->user?->name }} · {{ $submission->user?->email }} · {{ $submission->course?->title }}
    </p>

    <article class="form-card">
        @if($submission->unit?->type === 'questionnaire' && is_array($submission->answers))
            <dl class="answer-list">
                @foreach($submission->answers as $id => $answer)
                    <div>
                        <dt>{{ $questions[$id]['label'] ?? $id }}</dt>
                        <dd>{{ $answer !== '' && $answer !== null ? $answer : '—' }}</dd>
                    </div>
                @endforeach
            </dl>
        @else
            <p style="white-space: pre-wrap;">{{ $submission->body ?: 'No written answer.' }}</p>
        @endif
    </article>

    <form class="form-card" method="POST" action="{{ route('admin.submissions.review', $submission) }}" style="margin-top: 18px;">
        @csrf
        <label>
            Note to student (optional)
            <textarea name="admin_note" rows="3">{{ old('admin_note', $submission->admin_note) }}</textarea>
        </label>
        <div class="roster-actions" style="margin-top: 16px; display: flex; gap: 10px;">
            <button class="btn" name="status" value="approved" type="submit">Sign off</button>
            <button class="btn ghost" name="status" value="returned" type="submit">Return for changes</button>
        </div>
    </form>

    <p style="margin-top: 16px;"><a href="{{ route('admin.submissions.index') }}">Back to list</a></p>
@endsection
