@extends('layouts.panel')

@section('title', 'Student dashboard')
@section('eyebrow', 'Your portal')
@section('heading', 'Hello, '.auth()->user()->name)

@section('content')
    <p class="lead">Your student dashboard. Browse live courses and keep going with your leadership pathway.</p>

    <article class="card" style="margin-bottom: 24px;">
        <div class="card-head">
            <h2>Your payments</h2>
        </div>
        <div class="roster-table-wrap">
            <table class="roster-table js-datatable">
                    <thead>
                        <tr>
                            <th class="col-course">Course</th>
                            <th class="col-chip">Method</th>
                            <th class="col-amount">Amount</th>
                            <th class="col-status">Status</th>
                        </tr>
                    </thead>
                <tbody>
                    @forelse($payments as $payment)
                        <tr>
                            <td><span class="roster-course">{{ $payment->courseList() }}</span></td>
                            <td><span class="roster-chip is-{{ $payment->method }}">{{ $payment->methodLabel() }}</span></td>
                            <td class="roster-amount">£{{ number_format((float) $payment->amount, 0) }}</td>
                            <td class="roster-status">
                                <span class="pay-badge {{ $payment->isSuccessful() ? 'is-ok' : 'is-wait' }}">
                                    {{ $payment->isSuccessful() ? 'Successful' : 'Pending' }}
                                </span>
                                <small>{{ ($payment->paid_at ?? $payment->created_at)->diffForHumans() }}</small>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4">No payments yet. Buy a course on the website to see it here.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </article>

    <section class="course-admin-grid">
        @forelse($courses as $course)
            <article class="course-admin-card">
                <img src="{{ $course->image_url }}" alt="">
                <div>
                    <p class="tag">{{ $course->category ?: 'Course' }}</p>
                    <h3>{{ $course->title }}</h3>
                    <p>{{ Str::limit($course->description, 100) }}</p>
                    <strong>{{ $course->price == 0 ? 'Free' : '£'.number_format($course->price, 0) }}</strong>
                </div>
            </article>
        @empty
            <p>Courses will appear here once the academy publishes them.</p>
        @endforelse
    </section>
@endsection
