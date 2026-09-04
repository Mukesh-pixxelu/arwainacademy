@extends('layouts.panel')

@section('title', 'Sign-off')
@section('eyebrow', 'Learning')
@section('heading', 'Work to check')

@section('content')
    <div class="shelf-dock" style="margin-bottom: 18px;">
        <nav class="shelf-tabs">
            <a class="{{ $status === 'submitted' ? 'is-on' : '' }}" href="{{ route('admin.submissions.index', ['status' => 'submitted']) }}">Waiting ({{ $pending }})</a>
            <a class="{{ $status === 'approved' ? 'is-on' : '' }}" href="{{ route('admin.submissions.index', ['status' => 'approved']) }}">Signed off</a>
            <a class="{{ $status === 'returned' ? 'is-on' : '' }}" href="{{ route('admin.submissions.index', ['status' => 'returned']) }}">Returned</a>
            <a class="{{ $status === 'all' ? 'is-on' : '' }}" href="{{ route('admin.submissions.index', ['status' => 'all']) }}">All</a>
        </nav>
    </div>

    <article class="card">
        <div class="roster-table-wrap">
            <table class="roster-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Course</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($submissions as $submission)
                        <tr>
                            <td>{{ $submission->user?->name }}<br><small class="muted">{{ $submission->user?->email }}</small></td>
                            <td>{{ $submission->course?->title }}</td>
                            <td>{{ $submission->unit?->title }}</td>
                            <td>
                                <span class="pay-badge {{ $submission->status === 'approved' ? 'is-ok' : ($submission->status === 'returned' ? 'is-wait' : '') }}">
                                    {{ $submission->status }}
                                </span>
                            </td>
                            <td>{{ $submission->created_at->format('d M Y, H:i') }}</td>
                            <td><a class="roster-btn" href="{{ route('admin.submissions.show', $submission) }}">Review</a></td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6">Nothing to review.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
        {{ $submissions->links() }}
    </article>
@endsection
