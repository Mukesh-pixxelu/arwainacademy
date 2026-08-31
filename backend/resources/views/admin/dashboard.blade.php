@extends('layouts.panel')

@section('title', 'Overview')

@section('content')
    @php
        $hour = now()->hour;
        $hello = $hour < 12 ? 'Good morning' : ($hour < 17 ? 'Good afternoon' : 'Good evening');
        $paidPct = $courseCount > 0 ? (int) round(($paidCourses / $courseCount) * 100) : 0;
        $avatarTones = ['is-purple', 'is-teal', 'is-coral', 'is-pink'];
    @endphp

    <section class="pulse">
        <div class="pulse-copy">
            <p>{{ $hello }}, {{ auth()->user()->name }}</p>
            <h1>Academy pulse</h1>
            <time>{{ now()->format('l, j F Y') }}</time>
        </div>
        <div class="pulse-actions">
            <a class="btn" href="{{ route('admin.courses.create') }}">Add course</a>
            <a class="btn ghost light" href="{{ route('admin.payments.index') }}">Payments</a>
            <a class="btn ghost light" href="{{ route('admin.students.index') }}">Students</a>
        </div>
    </section>

    <ul class="pulse-meters">
        <li>
            <span class="stat-icon is-purple">
                <svg viewBox="0 0 24 24"><path d="M16 14a4 4 0 0 0-8 0M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
            </span>
            <strong>{{ number_format($studentCount) }}</strong>
            <span>Total students</span>
        </li>
        <li>
            <span class="stat-icon is-teal">
                <svg viewBox="0 0 24 24"><path d="M4 19V7l8-3 8 3v12l-8 3-8-3Z"/><path d="M12 4v15"/></svg>
            </span>
            <strong>{{ number_format($courseCount) }}</strong>
            <span>Available courses</span>
        </li>
        <li>
            <span class="stat-icon is-coral">
                <svg viewBox="0 0 24 24"><path d="M12 3v18M16 8H9.5a2.5 2.5 0 0 0 0 5H14a2.5 2.5 0 0 1 0 5H8"/></svg>
            </span>
            <strong>£{{ number_format($avgPrice, 0) }}</strong>
            <span>Avg course price</span>
        </li>
        <li>
            <span class="stat-icon is-pink">
                <svg viewBox="0 0 24 24"><path d="M12 3v18M8 8h8"/></svg>
            </span>
            <strong>{{ $paidCourses }}/{{ $freeCourses }}</strong>
            <span>Paid / free</span>
        </li>
    </ul>

    <article class="stage">
        <div class="stage-chart">
            <div class="card-head">
                <h2>Students vs courses</h2>
                <span class="chip">Last 6 months</span>
            </div>
            <div class="chart-box">
                <canvas id="barChart"></canvas>
            </div>
        </div>
        <aside class="stage-aside">
            <p>New this month</p>
            <h2>{{ number_format($monthStudents) }}</h2>
            <span class="promo-pill">{{ $monthShare }}% of all students</span>
            <div class="chart-box is-spark">
                <canvas id="sparkChart"></canvas>
            </div>
            <div class="mix">
                <div class="mix-track">
                    <i style="width: {{ $paidPct }}%"></i>
                </div>
                <small>{{ $paidCourses }} paid · {{ $freeCourses }} free courses</small>
            </div>
        </aside>
    </article>

    <div class="gallery">
        <article class="card pie-card">
            <div class="card-head">
                <h2>Courses by category</h2>
            </div>
            <div class="pie-layout">
                <div class="chart-box is-pie">
                    <canvas id="pieChart"></canvas>
                    <div class="pie-core">
                        <b>{{ number_format($courseCount) }}</b>
                        <span>courses</span>
                    </div>
                </div>
                <ul class="pie-legend">
                    @php $pieSwatch = ['#FF8C69', '#7A33FF', '#2ADBC1', '#F4A7C3']; @endphp
                    @forelse($pieLabels as $i => $label)
                        <li>
                            <i style="background: {{ $pieSwatch[$i % 4] }}"></i>
                            {{ $label }}
                            <b>{{ $pieData[$i] }}</b>
                        </li>
                    @empty
                        <li>No courses yet.</li>
                    @endforelse
                </ul>
            </div>
        </article>

        <article class="card">
            <div class="card-head">
                <h2>Student registrations</h2>
            </div>
            <div class="chart-box is-line">
                <canvas id="lineChart"></canvas>
            </div>
        </article>

        <article class="card gallery-feed">
            <div class="card-head">
                <h2>Latest students</h2>
                <a href="{{ route('admin.students.index') }}">All</a>
            </div>
            <ul class="people">
                @forelse($latestStudents as $i => $student)
                    <li>
                        <span class="avatar {{ $avatarTones[$i % 4] }}">{{ strtoupper(substr($student->name, 0, 1)) }}</span>
                        <div>
                            <strong>{{ $student->name }}</strong>
                            <small>{{ $student->phone ?: 'No phone' }}</small>
                            <small>{{ $student->email }}</small>
                        </div>
                        <div class="roster-actions">
                            <a class="roster-btn" href="{{ route('admin.students.show', $student) }}">View</a>
                            <x-delete-form class="roster-btn is-danger" :action="route('admin.students.destroy', $student)" confirm="Remove this student?" label="Remove" />
                        </div>
                    </li>
                @empty
                    <li>No students yet.</li>
                @endforelse
            </ul>
        </article>
    </div>

    <div class="pay-board">
        <article class="card pay-board-main">
            <div class="card-head">
                <h2>Latest payments</h2>
                <a href="{{ route('admin.payments.index') }}">All</a>
            </div>
            <ul class="pay-stats">
                <li>
                    <b>£{{ number_format($revenue, 0) }}</b>
                    <small>Successful revenue</small>
                </li>
                <li>
                    <b>{{ $successfulPayments }}</b>
                    <small>Successful</small>
                </li>
                <li>
                    <b>{{ $pendingPayments }}</b>
                    <small>Pending</small>
                </li>
            </ul>
            <div class="roster-table-wrap">
                <table class="roster-table js-datatable">
                    <thead>
                        <tr>
                            <th class="col-person">Student</th>
                            <th class="col-course">Course</th>
                            <th class="col-chip">Method</th>
                            <th class="col-amount">Amount</th>
                            <th class="col-status">Status</th>
                            <th class="col-actions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($latestPayments as $payment)
                            <tr>
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
                                <td colspan="6">No payments yet. They appear here when a student checks out.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </article>

        <article class="card dash-notes">
            <div class="card-head">
                <h2>Notifications</h2>
                @if($latestNotifications->isNotEmpty())
                    <x-delete-form :action="route('admin.notifications.destroy-all')" confirm="Delete all notifications?" label="Clear all" />
                @else
                    <span class="chip">Live</span>
                @endif
            </div>
            <ul class="notify-list dash-note-list">
                @forelse($latestNotifications as $note)
                    <li class="{{ $note->isUnread() ? 'is-unread' : '' }}" data-type="{{ $note->type }}">
                        <span class="notify-mark"></span>
                        <div>
                            <strong>{{ $note->title }}</strong>
                            <p>{{ $note->body }}</p>
                            <small>{{ $note->created_at->diffForHumans() }}</small>
                        </div>
                        <x-delete-form :action="route('admin.notifications.destroy', $note)" confirm="Delete this notification?" label="Delete" />
                    </li>
                @empty
                    <li class="notify-empty">No notifications yet.</li>
                @endforelse
            </ul>
        </article>
    </div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const pieLabels = @json($pieLabels);
    const pieData = @json($pieData);
    const safePieLabels = pieLabels.length ? pieLabels : ['No courses'];
    const safePieData = pieData.length ? pieData : [1];
    const barLabels = @json($barLabels);
    const studentBars = @json($studentBars);
    const courseBars = @json($courseBars);
    const colors = { purple: '#7A33FF', teal: '#2ADBC1', coral: '#FF8C69', pink: '#F4A7C3' };
    const pieStops = [
        ['#FFB08A', '#FF6B4A'],
        ['#B57BFF', '#6B2EF0'],
        ['#7AF0DE', '#12B39C'],
        ['#F8C4D8', '#E56B96'],
    ];

    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.plugins.legend.labels.boxWidth = 8;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;

    function cssVar(name, fallback) {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
    }
    function isDark() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    function themeMuted() { return cssVar('--muted', '#9aa1b4'); }
    function themeCard() { return cssVar('--card', '#ffffff'); }
    function themeLine() { return cssVar('--line', '#eef0f6'); }

    function verticalGradient(chart, top, bottom) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return top;
        const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, top);
        g.addColorStop(1, bottom);
        return g;
    }

    const glowBars = {
        id: 'glowBars',
        beforeDatasetDraw(chart, args) {
            const ctx = chart.ctx;
            ctx.save();
            ctx.shadowColor = args.index === 0 ? 'rgba(18, 179, 156, 0.32)' : 'rgba(107, 46, 240, 0.32)';
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = 6;
        },
        afterDatasetDraw(chart) {
            chart.ctx.restore();
        },
    };

    const barCaps = {
        id: 'barCaps',
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            chart.data.datasets.forEach((ds, di) => {
                chart.getDatasetMeta(di).data.forEach((bar, i) => {
                    const value = ds.data[i];
                    if (!value) return;
                    ctx.save();
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(bar.x, bar.y + 6, 4.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = di === 0 ? '#12b39c' : '#6b2ef0';
                    ctx.font = '600 11px Inter, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(value, bar.x, bar.y - 8);
                    ctx.restore();
                });
            });
        },
    };

    const baseLine = {
        id: 'baseLine',
        afterDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            if (!chartArea) return;
            const y = scales.y.getPixelForValue(0);
            ctx.save();
            ctx.strokeStyle = themeLine();
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(chartArea.left, y);
            ctx.lineTo(chartArea.right, y);
            ctx.stroke();
            ctx.restore();
        },
    };

    const donutGlow = {
        id: 'donutGlow',
        beforeDraw(chart) {
            const arc = chart.getDatasetMeta(0)?.data?.[0];
            if (!arc) return;
            const { x, y, innerRadius } = arc.getProps(['x', 'y', 'innerRadius'], true);
            const ctx = chart.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, innerRadius - 1, 0, Math.PI * 2);
            ctx.fillStyle = themeCard();
            ctx.shadowColor = isDark() ? 'rgba(122, 51, 255, 0.28)' : 'rgba(122, 51, 255, 0.16)';
            ctx.shadowBlur = 22;
            ctx.fill();
            ctx.restore();
        },
    };

    Chart.defaults.color = themeMuted();

    const barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        plugins: [glowBars, barCaps, baseLine],
        data: {
            labels: barLabels,
            datasets: [
                {
                    label: 'Students',
                    data: studentBars,
                    backgroundColor: (ctx) => verticalGradient(ctx.chart, '#7AF0DE', '#12B39C'),
                    borderRadius: 999,
                    borderSkipped: false,
                    maxBarThickness: 18,
                },
                {
                    label: 'Courses',
                    data: courseBars,
                    backgroundColor: (ctx) => verticalGradient(ctx.chart, '#C4A0FF', '#6B2EF0'),
                    borderRadius: 999,
                    borderSkipped: false,
                    maxBarThickness: 18,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 18, bottom: 4 } },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { padding: 18, font: { weight: '600' }, color: themeMuted() },
                },
            },
            scales: {
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { font: { weight: '600' }, color: themeMuted() },
                },
                y: {
                    beginAtZero: true,
                    display: false,
                    grid: { display: false },
                    border: { display: false },
                },
            },
            datasets: { bar: { categoryPercentage: 0.5, barPercentage: 0.72 } },
        },
    });

    const pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        plugins: [donutGlow],
        data: {
            labels: safePieLabels,
            datasets: [{
                data: safePieData,
                backgroundColor: (ctx) => {
                    const { ctx: c, chartArea } = ctx.chart;
                    if (!chartArea) return pieStops[ctx.dataIndex % 4][1];
                    const cx = (chartArea.left + chartArea.right) / 2;
                    const cy = (chartArea.top + chartArea.bottom) / 2;
                    const r = Math.min(chartArea.width, chartArea.height) / 2;
                    const g = c.createRadialGradient(cx, cy, r * 0.35, cx, cy, r);
                    const stop = pieStops[ctx.dataIndex % 4];
                    g.addColorStop(0, stop[0]);
                    g.addColorStop(1, stop[1]);
                    return g;
                },
                borderWidth: 0,
                borderRadius: 18,
                spacing: 8,
                hoverOffset: 10,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '74%',
            rotation: -90,
            plugins: { legend: { display: false }, tooltip: { displayColors: false } },
        },
    });

    const lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: barLabels,
            datasets: [{
                data: studentBars,
                borderColor: colors.coral,
                backgroundColor: 'rgba(255,140,105,0.16)',
                fill: true,
                tension: 0.45,
                pointRadius: 0,
                borderWidth: 3,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, border: { display: false }, ticks: { color: themeMuted() } },
                y: {
                    beginAtZero: true,
                    display: false,
                    grid: { display: false },
                    border: { display: false },
                },
            },
        },
    });

    new Chart(document.getElementById('sparkChart'), {
        type: 'line',
        data: {
            labels: barLabels,
            datasets: [{
                data: studentBars,
                borderColor: '#fff',
                backgroundColor: 'rgba(255,255,255,0.2)',
                fill: true,
                tension: 0.45,
                pointRadius: 0,
                borderWidth: 2,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
        },
    });

    function applyChartTheme() {
        Chart.defaults.color = themeMuted();
        barChart.options.plugins.legend.labels.color = themeMuted();
        barChart.options.scales.x.ticks.color = themeMuted();
        lineChart.options.scales.x.ticks.color = themeMuted();
        barChart.update();
        pieChart.update();
        lineChart.update();
    }

    window.addEventListener('themechange', applyChartTheme);
</script>
@endpush
