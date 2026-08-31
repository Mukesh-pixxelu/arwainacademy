@extends('layouts.panel')

@section('title', 'Payments')

@section('content')
    @php
        $tabQuery = fn ($status) => array_filter(['status' => $status ?: null]);
    @endphp

    <section class="cohort">
        <div class="cohort-copy">
            <p>Billing</p>
            <h1>Course payments.</h1>
            <span>{{ $totalPayments }} checkout{{ $totalPayments === 1 ? '' : 's' }} recorded</span>
        </div>
        <ul class="cohort-stats">
            <li>
                <b>£{{ number_format($revenue, 0) }}</b>
                <small>Revenue</small>
            </li>
            <li>
                <b>{{ $successfulCount }}</b>
                <small>Successful</small>
            </li>
            <li>
                <b>{{ $pendingCount }}</b>
                <small>Pending</small>
            </li>
        </ul>
    </section>

    <div class="cohort-dock">
        <nav class="shelf-tabs">
            <a class="{{ $status === '' ? 'is-on' : '' }}" href="{{ route('admin.payments.index', $tabQuery('')) }}">All</a>
            <a class="{{ $status === 'successful' ? 'is-on' : '' }}" href="{{ route('admin.payments.index', $tabQuery('successful')) }}">Successful</a>
            <a class="{{ $status === 'pending' ? 'is-on' : '' }}" href="{{ route('admin.payments.index', $tabQuery('pending')) }}">Pending</a>
        </nav>
    </div>

    <div class="card roster-table-wrap">
        <table class="roster-table js-datatable">
            <thead>
                <tr>
                    <th class="col-no">S.No</th>
                    <th class="col-person">Student</th>
                    <th class="col-course">Course</th>
                    <th class="col-chip">Method</th>
                    <th class="col-chip">Plan</th>
                    <th class="col-amount">Amount</th>
                    <th class="col-status">Status</th>
                    <th class="col-actions"></th>
                </tr>
            </thead>
            <tbody>
                @forelse($payments as $index => $payment)
                    <tr>
                        <td class="roster-no">{{ $index + 1 }}</td>
                        <td>
                            <div class="roster-name">
                                <span class="avatar {{ $payment->isSuccessful() ? 'is-teal' : 'is-coral' }}">{{ strtoupper(substr($payment->user?->name ?? 'S', 0, 1)) }}</span>
                                <div>
                                    <strong>{{ $payment->user?->name ?? 'Student' }}</strong>
                                    <small>{{ $payment->user?->phone }}</small>
                                    <small>{{ $payment->user?->email }}</small>
                                </div>
                            </div>
                        </td>
                        <td><span class="roster-course">{{ $payment->courseList() }}</span></td>
                        <td><span class="roster-chip is-{{ $payment->method }}">{{ $payment->methodLabel() }}</span></td>
                        <td><span class="roster-chip is-plan">{{ $payment->planLabel() }}</span></td>
                        <td class="roster-amount" data-order="{{ $payment->amount }}">£{{ number_format((float) $payment->amount, 0) }}</td>
                        <td class="roster-status" data-order="{{ $payment->status }}">
                            <span class="pay-badge {{ $payment->isSuccessful() ? 'is-ok' : 'is-wait' }}">
                                {{ $payment->isSuccessful() ? 'Successful' : 'Pending' }}
                            </span>
                            <small>{{ ($payment->paid_at ?? $payment->created_at)->diffForHumans() }}</small>
                        </td>
                        <td class="roster-end">
                            <div class="roster-actions">
                                @if($payment->isPending())
                                    <form method="POST" action="{{ route('admin.payments.complete', $payment) }}">
                                        @csrf
                                        <button class="roster-btn is-paid" type="submit">Mark paid</button>
                                    </form>
                                @elseif($payment->user)
                                    <a class="roster-btn" href="{{ route('admin.students.show', $payment->user) }}">View</a>
                                @endif
                                <x-delete-form class="roster-btn is-danger" :action="route('admin.payments.destroy', $payment)" confirm="Delete this payment?" />
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="8">No payments found.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
