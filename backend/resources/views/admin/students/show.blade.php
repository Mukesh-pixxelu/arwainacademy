@extends('layouts.panel')

@section('title', $student->name)

@section('content')
    <article class="profile-card">
        <span class="avatar is-purple profile-avatar">{{ strtoupper(substr($student->name, 0, 1)) }}</span>
        <div>
            <p class="eyebrow">Student</p>
            <h1>{{ $student->name }}</h1>
            <p class="muted">{{ $student->email }}</p>
        </div>
        <dl class="profile-meta">
            <div>
                <dt>Phone</dt>
                <dd>{{ $student->phone ?: 'Not given' }}</dd>
            </div>
            <div>
                <dt>Registered</dt>
                <dd>{{ $student->created_at->format('d M Y, H:i') }}</dd>
            </div>
            <div>
                <dt>Joined</dt>
                <dd>{{ $student->created_at->diffForHumans() }}</dd>
            </div>
        </dl>
        <div class="profile-card-actions">
            <a class="btn ghost" href="{{ route('admin.students.index') }}">Back to cohort</a>
            <x-delete-form class="btn" :action="route('admin.students.destroy', $student)" confirm="Remove this student and their payments?" label="Remove student" />
        </div>
    </article>

    <article class="card" style="margin-top: 20px;">
        <div class="card-head">
            <h2>Payments</h2>
        </div>
        <div class="roster-table-wrap">
            <table class="roster-table js-datatable">
                    <thead>
                        <tr>
                            <th class="col-course">Course</th>
                            <th class="col-chip">Method</th>
                            <th class="col-amount">Amount</th>
                            <th class="col-status">Status</th>
                            <th class="col-actions"></th>
                        </tr>
                    </thead>
                <tbody>
                    @forelse($payments as $payment)
                        <tr>
                            <td><span class="roster-course">{{ $payment->courseList() }}</span></td>
                            <td><span class="roster-chip is-{{ $payment->method }}">{{ $payment->methodLabel() }}</span></td>
                            <td class="roster-amount" data-order="{{ $payment->amount }}">£{{ number_format((float) $payment->amount, 0) }}</td>
                            <td class="roster-status" data-order="{{ $payment->status }}">
                                <span class="pay-badge {{ $payment->isSuccessful() ? 'is-ok' : 'is-wait' }}">
                                    {{ $payment->isSuccessful() ? 'Successful' : 'Pending' }}
                                </span>
                            </td>
                            <td class="roster-end">
                                <div class="roster-actions">
                                    <x-delete-form class="roster-btn is-danger" :action="route('admin.payments.destroy', $payment)" confirm="Delete this payment?" />
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">No payments yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </article>
@endsection
