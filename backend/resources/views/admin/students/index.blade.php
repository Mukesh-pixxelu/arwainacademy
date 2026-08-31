@extends('layouts.panel')

@section('title', 'Students')

@section('content')
    @php
        $tabQuery = fn ($when) => array_filter(['when' => $when ?: null]);
        $tones = ['is-purple', 'is-teal', 'is-coral', 'is-pink'];
    @endphp

    <section class="cohort">
        <div class="cohort-copy">
            <p>People</p>
            <h1>Know your cohort.</h1>
            <span>{{ $totalStudents }} students on the books</span>
        </div>
        <ul class="cohort-stats">
            <li>
                <b>{{ $totalStudents }}</b>
                <small>All</small>
            </li>
            <li>
                <b>{{ $monthStudents }}</b>
                <small>This month</small>
            </li>
            <li>
                <b>{{ $weekStudents }}</b>
                <small>This week</small>
            </li>
        </ul>
    </section>

    <div class="cohort-dock">
        <nav class="shelf-tabs">
            <a class="{{ $when === '' ? 'is-on' : '' }}" href="{{ route('admin.students.index', $tabQuery('')) }}">All</a>
            <a class="{{ $when === 'month' ? 'is-on' : '' }}" href="{{ route('admin.students.index', $tabQuery('month')) }}">This month</a>
            <a class="{{ $when === 'week' ? 'is-on' : '' }}" href="{{ route('admin.students.index', $tabQuery('week')) }}">This week</a>
        </nav>
    </div>

    <div class="card roster-table-wrap">
        <table class="roster-table js-datatable">
            <thead>
                <tr>
                    <th class="col-no">S.No</th>
                    <th class="col-person">Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th class="col-date">Registered</th>
                    <th class="col-actions"></th>
                </tr>
            </thead>
            <tbody>
                @forelse($students as $index => $student)
                    <tr>
                        <td class="roster-no">{{ $index + 1 }}</td>
                        <td>
                            <div class="roster-name">
                                <span class="avatar {{ $tones[$student->id % 4] }}">{{ strtoupper(substr($student->name, 0, 1)) }}</span>
                                <strong>{{ $student->name }}</strong>
                                @if($student->created_at->isCurrentMonth())
                                    <em>New</em>
                                @endif
                            </div>
                        </td>
                        <td class="roster-email">{{ $student->email }}</td>
                        <td>{{ $student->phone ?: 'Not given' }}</td>
                        <td data-order="{{ $student->created_at->timestamp }}">
                            <strong>{{ $student->created_at->format('d M Y') }}</strong>
                            <small>{{ $student->created_at->diffForHumans() }}</small>
                        </td>
                        <td class="roster-end">
                            <div class="roster-actions">
                                <a class="roster-btn" href="{{ route('admin.students.show', $student) }}">View</a>
                                <x-delete-form class="roster-btn is-danger" :action="route('admin.students.destroy', $student)" confirm="Remove this student?" label="Remove" />
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="6">No students found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
