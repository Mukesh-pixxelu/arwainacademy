<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Dashboard') — Arwain Academy</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdn.datatables.net/2.3.2/css/dataTables.dataTables.min.css">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}?v=32">
    <link rel="icon" type="image/png" href="{{ asset('images/logo.png') }}">
    <script>
        (function () {
            const theme = localStorage.getItem('arwain-theme') || 'light';
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>
    @stack('head')
</head>
<body>
    <div class="app-shell">
        <aside class="sidebar">
            <a class="brand" href="{{ auth()->user()->isAdmin() ? route('admin.dashboard') : route('student.dashboard') }}">
                <span class="brand-mark" aria-hidden="true">
                    <img src="{{ asset('images/logo.png') }}" alt="">
                </span>
                <strong>Arwain</strong>
            </a>

            @if(auth()->user()->isAdmin())
                <a class="side-cta" href="{{ route('admin.courses.create') }}">
                    Add course
                    <span>+</span>
                </a>
            @endif

            <nav>
                @if(auth()->user()->isAdmin())
                    <a href="{{ route('admin.students.index') }}" class="{{ request()->routeIs('admin.students.*') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><path d="M16 14a4 4 0 0 0-8 0M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 14a3 3 0 0 0-2-2.8M18 8.2a2.5 2.5 0 1 0-1.2-4.7"/></svg>
                        Students
                    </a>
                    <a href="{{ route('admin.dashboard') }}" class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Z"/></svg>
                        Overview
                    </a>
                    <a href="{{ route('admin.courses.index') }}" class="{{ request()->routeIs('admin.courses.*') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v14H6.5A2.5 2.5 0 0 0 4 20.5V6.5Z"/><path d="M4 6.5h16"/></svg>
                        Courses
                    </a>
                    <a href="{{ route('admin.payments.index') }}" class="{{ request()->routeIs('admin.payments.*') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M8 14h3"/></svg>
                        Payments
                    </a>
                    <a href="{{ route('admin.submissions.index') }}" class="{{ request()->routeIs('admin.submissions.*') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><path d="M8 7h8M8 12h5M6 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2z"/></svg>
                        Sign-off
                    </a>
                    <a href="{{ route('admin.settings.payments') }}" class="{{ request()->routeIs('admin.settings.payments*') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="16" cy="14" r="1.6"/></svg>
                        Payment setup
                    </a>
                @else
                    <a href="{{ route('student.dashboard') }}" class="{{ request()->routeIs('student.dashboard') ? 'active' : '' }}">
                        <svg viewBox="0 0 24 24"><path d="M4 13h6V4H4v9Zm10 7h6V4h-6v16ZM4 20h6v-5H4v5Z"/></svg>
                        Overview
                    </a>
                @endif
            </nav>

            <div class="side-foot">
                <form class="side-settings" method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit">
                        <svg viewBox="0 0 24 24"><path d="M15 12H3M10 7l-5 5 5 5M21 4v16"/></svg>
                        Log out
                    </button>
                </form>
                <div class="app-promo">
                    <strong>Academy app</strong>
                    <p>Keep courses and students in one place.</p>
                </div>
            </div>
        </aside>

        <div class="app-main">
            <header class="topbar">
                <form class="search" method="GET" action="{{ auth()->user()->isAdmin() ? (request()->routeIs('admin.courses.*') ? route('admin.courses.index') : (request()->routeIs('admin.payments.*') ? route('admin.payments.index') : route('admin.students.index'))) : route('student.dashboard') }}">
                    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
                    <input type="search" name="q" value="{{ request('q') }}" placeholder="Search for...">
                </form>
                <div class="topbar-end">
                    <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle dark mode">
                        <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.2 6.2l1.4 1.4M16.4 16.4l1.4 1.4M6.2 17.8l1.4-1.4M16.4 7.6l1.4-1.4"/></svg>
                        <svg class="icon-moon" viewBox="0 0 24 24"><path d="M19 14.5A7.5 7.5 0 1 1 9.5 5 6 6 0 0 0 19 14.5Z"/></svg>
                    </button>
                    @if(auth()->user()->isAdmin())
                        <div class="notify" id="notify" data-feed="{{ route('admin.notifications.index') }}" data-read="{{ route('admin.notifications.read') }}" data-destroy="{{ url('/admin/notifications') }}">
                            <button class="bell" type="button" aria-label="Notifications" aria-expanded="false">
                                <svg viewBox="0 0 24 24"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"/><path d="M9 17a3 3 0 0 0 6 0"/></svg>
                                <i class="bell-dot" @if($unreadNotificationCount < 1) hidden @endif></i>
                            </button>
                            <div class="notify-panel" hidden>
                                <div class="notify-head">
                                    <strong>Notifications</strong>
                                    <span class="notify-count">{{ $unreadNotificationCount }} new</span>
                                    @if($adminNotifications->isNotEmpty())
                                        <button class="notify-clear" type="button" data-clear-all>Clear all</button>
                                    @endif
                                </div>
                                <ul class="notify-list">
                                    @forelse($adminNotifications as $note)
                                        <li class="{{ $note->isUnread() ? 'is-unread' : '' }}" data-type="{{ $note->type }}">
                                            <span class="notify-mark"></span>
                                            <div>
                                                <strong>{{ $note->title }}</strong>
                                                <p>{{ $note->body }}</p>
                                                <small>{{ $note->created_at->diffForHumans() }}</small>
                                            </div>
                                            <button type="button" class="notify-del" data-id="{{ $note->id }}" aria-label="Delete">Delete</button>
                                        </li>
                                    @empty
                                        <li class="notify-empty">No notifications yet.</li>
                                    @endforelse
                                </ul>
                            </div>
                        </div>
                    @endif
                    <div class="account" id="account">
                        <button class="user-chip" type="button" aria-expanded="false" aria-haspopup="true">
                            <span class="avatar">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</span>
                            <span>{{ auth()->user()->name }}</span>
                            <svg class="chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                        <div class="account-menu" hidden>
                            <a href="{{ route('profile.edit') }}">
                                <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.2 19.2a7 7 0 0 1 13.6 0"/></svg>
                                Edit profile
                            </a>
                            @if(auth()->user()->isAdmin())
                                <button type="button" id="accountNotifyBtn">
                                    <svg viewBox="0 0 24 24"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"/><path d="M9 17a3 3 0 0 0 6 0"/></svg>
                                    Notifications
                                </button>
                            @else
                                <a href="{{ route('notifications.page') }}">
                                    <svg viewBox="0 0 24 24"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"/><path d="M9 17a3 3 0 0 0 6 0"/></svg>
                                    Notifications
                                </a>
                            @endif
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit">
                                    <svg viewBox="0 0 24 24"><path d="M15 12H3M10 7l-5 5 5 5M21 4v16"/></svg>
                                    Log out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
            <div class="page-body">
                @hasSection('heading')
                    <div class="page-title">
                        <div>
                            <p class="eyebrow">@yield('eyebrow', 'Portal')</p>
                            <h1>@yield('heading')</h1>
                            @hasSection('heading-meta')
                                <p class="page-meta">@yield('heading-meta')</p>
                            @endif
                        </div>
                        @hasSection('heading-actions')
                            <div class="page-title-actions">@yield('heading-actions')</div>
                        @endif
                    </div>
                @endif
                @if(session('success'))
                    <p class="flash success">{{ session('success') }}</p>
                @endif
                @if(session('error'))
                    <p class="flash error">{{ session('error') }}</p>
                @endif
                @yield('content')
            </div>
        </div>
    </div>
    @stack('scripts')
    <script>
        (function () {
            const button = document.getElementById('themeToggle');
            if (!button) return;
            button.addEventListener('click', function () {
                const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('arwain-theme', next);
                window.dispatchEvent(new CustomEvent('themechange', { detail: next }));
            });
        })();

        (function () {
            const root = document.getElementById('notify');
            if (!root) return;

            const bell = root.querySelector('.bell');
            const panel = root.querySelector('.notify-panel');
            const list = root.querySelector('.notify-list');
            const count = root.querySelector('.notify-count');
            const dot = root.querySelector('.bell-dot');
            const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';

            function headers(extra) {
                return Object.assign({
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrf,
                }, extra || {});
            }

            function escapeHtml(value) {
                return String(value || '')
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
            }

            function render(data) {
                count.textContent = data.unread + ' new';
                dot.hidden = data.unread < 1;

                const clearBtn = root.querySelector('[data-clear-all]');
                if (clearBtn) clearBtn.hidden = !data.items.length;

                if (!data.items.length) {
                    list.innerHTML = '<li class="notify-empty">No notifications yet.</li>';
                    return;
                }

                list.innerHTML = data.items.map(function (item) {
                    return '<li class="' + (item.unread ? 'is-unread' : '') + '" data-type="' + escapeHtml(item.type) + '">'
                        + '<span class="notify-mark"></span><div>'
                        + '<strong>' + escapeHtml(item.title) + '</strong>'
                        + '<p>' + escapeHtml(item.body) + '</p>'
                        + '<small>' + escapeHtml(item.when) + '</small>'
                        + '</div>'
                        + '<button type="button" class="notify-del" data-id="' + item.id + '" aria-label="Delete">Delete</button>'
                        + '</li>';
                }).join('');
            }

            function refresh() {
                return fetch(root.dataset.feed, { headers: headers() })
                    .then(function (res) { return res.json(); })
                    .then(render)
                    .catch(function () {});
            }

            function markRead() {
                return fetch(root.dataset.read, {
                    method: 'POST',
                    headers: headers({ 'Content-Type': 'application/json' }),
                    body: '{}',
                }).then(function (res) { return res.json(); }).then(render).catch(function () {});
            }

            function destroyOne(id) {
                return fetch(root.dataset.destroy + '/' + id, {
                    method: 'DELETE',
                    headers: headers({ Accept: 'application/json' }),
                }).then(function (res) { return res.json(); }).then(render).catch(function () {});
            }

            function destroyAll() {
                return fetch(root.dataset.destroy, {
                    method: 'DELETE',
                    headers: headers({ Accept: 'application/json' }),
                }).then(function (res) { return res.json(); }).then(render).catch(function () {});
            }

            list.addEventListener('click', function (event) {
                const button = event.target.closest('.notify-del');
                if (!button) return;
                event.stopPropagation();
                if (!confirm('Delete this notification?')) return;
                destroyOne(button.getAttribute('data-id'));
            });

            root.querySelector('[data-clear-all]')?.addEventListener('click', function (event) {
                event.stopPropagation();
                if (!confirm('Delete all notifications?')) return;
                destroyAll();
            });

            bell.addEventListener('click', function (event) {
                event.stopPropagation();
                const open = panel.hidden;
                panel.hidden = !open;
                bell.setAttribute('aria-expanded', open ? 'true' : 'false');
                if (open) markRead();
            });

            document.addEventListener('click', function (event) {
                if (!root.contains(event.target)) {
                    panel.hidden = true;
                    bell.setAttribute('aria-expanded', 'false');
                }
            });

            setInterval(refresh, 20000);
        })();

        (function () {
            const account = document.getElementById('account');
            if (!account) return;
            const trigger = account.querySelector('.user-chip');
            const menu = account.querySelector('.account-menu');
            const notifyBtn = document.getElementById('accountNotifyBtn');
            const notifyRoot = document.getElementById('notify');

            function closeAccount() {
                menu.hidden = true;
                trigger.setAttribute('aria-expanded', 'false');
                account.classList.remove('is-open');
            }

            trigger.addEventListener('click', function (event) {
                event.stopPropagation();
                const open = menu.hidden;
                menu.hidden = !open;
                trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
                account.classList.toggle('is-open', open);
                if (open && notifyRoot) {
                    const panel = notifyRoot.querySelector('.notify-panel');
                    const bell = notifyRoot.querySelector('.bell');
                    if (panel) panel.hidden = true;
                    if (bell) bell.setAttribute('aria-expanded', 'false');
                }
            });

            if (notifyBtn && notifyRoot) {
                notifyBtn.addEventListener('click', function (event) {
                    event.stopPropagation();
                    closeAccount();
                    notifyRoot.querySelector('.bell')?.click();
                });
            }

            document.addEventListener('click', function (event) {
                if (!account.contains(event.target)) closeAccount();
            });
        })();
    </script>
    <script src="{{ asset('js/password-toggle.js') }}?v=2"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
    <script src="https://cdn.datatables.net/2.3.2/js/dataTables.min.js"></script>
    <script>
        (function () {
            if (typeof window.jQuery === 'undefined' || typeof window.DataTable === 'undefined') {
                console.error('DataTables could not load.');
                return;
            }

            window.jQuery('table.js-datatable').each(function () {
                const table = this;
                const body = table.tBodies[0];
                if (!body || !body.rows.length) return;
                if (body.rows.length === 1 && body.querySelector('td[colspan]')) return;
                if (window.jQuery.fn.dataTable.isDataTable(table)) return;

                const lastHead = table.tHead && table.tHead.rows[0]
                    ? table.tHead.rows[0].cells[table.tHead.rows[0].cells.length - 1]
                    : null;
                const lastIsActions = lastHead && lastHead.textContent.trim() === '';
                const compact = table.closest('.pay-board-main');

                try {
                    new DataTable(table, {
                        pageLength: compact ? 5 : 10,
                        lengthMenu: [5, 10, 25, 50, 100],
                        order: [],
                        autoWidth: false,
                        columnDefs: [
                            { className: 'dt-left', targets: '_all' },
                            ...(lastIsActions
                                ? [{ orderable: false, searchable: false, targets: -1 }]
                                : []),
                        ],
                        language: {
                            search: '',
                            searchPlaceholder: 'Search name, email, course…',
                            lengthMenu: 'Show _MENU_',
                            info: 'Showing _START_–_END_ of _TOTAL_',
                            infoEmpty: 'No records',
                            infoFiltered: '(filtered from _MAX_)',
                            zeroRecords: 'No matching records',
                            paginate: { previous: 'Prev', next: 'Next' },
                        },
                    });
                } catch (error) {
                    console.error('DataTables init failed', error);
                }
            });
        })();
    </script>
</body>
</html>
