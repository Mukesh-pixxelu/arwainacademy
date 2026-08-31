@if ($paginator->hasPages())
    <nav class="pager" aria-label="Pagination">
        @if ($paginator->onFirstPage())
            <span class="pager-btn is-off" aria-disabled="true">
                <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>
                Prev
            </span>
        @else
            <a class="pager-btn" href="{{ $paginator->previousPageUrl() }}" rel="prev">
                <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>
                Prev
            </a>
        @endif

        <div class="pager-pages">
            @foreach ($paginator->linkCollection() as $link)
                @if ($link['label'] === '...')
                    <span class="pager-dots">…</span>
                @elseif (! is_numeric($link['label']))
                    @continue
                @elseif ($link['active'])
                    <span class="pager-num is-on" aria-current="page">{{ $link['label'] }}</span>
                @else
                    <a class="pager-num" href="{{ $link['url'] }}">{{ $link['label'] }}</a>
                @endif
            @endforeach
        </div>

        @if ($paginator->hasMorePages())
            <a class="pager-btn" href="{{ $paginator->nextPageUrl() }}" rel="next">
                Next
                <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
            </a>
        @else
            <span class="pager-btn is-off" aria-disabled="true">
                Next
                <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
            </span>
        @endif
    </nav>
@endif
