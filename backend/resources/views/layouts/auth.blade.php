<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Sign in') — Arwain Academy</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}?v=5">
    <link rel="icon" type="image/png" href="{{ asset('images/logo.png') }}">
</head>
<body>
    <main class="gate">
        <aside class="gate-visual">
            <img src="@yield('visual-src', asset('images/leadership.jpg'))" alt="">
            <div class="gate-visual-copy">
                <p>@yield('visual-kicker', 'Admin access')</p>
                <h1>@yield('visual-title', 'Leadership training and coaching, built around your goals.')</h1>
            </div>
        </aside>

        <section class="gate-panel">
            <a class="gate-brand" href="{{ url('/') }}">
                <img class="gate-brand-mark" src="{{ asset('images/logo.png') }}" alt="">
                Arwain Academy
            </a>

            <div class="gate-form">
                @if(session('success'))
                    <p class="gate-flash">{{ session('success') }}</p>
                @endif
                @yield('content')
            </div>
        </section>
    </main>
    <script src="{{ asset('js/password-toggle.js') }}?v=2"></script>
</body>
</html>
