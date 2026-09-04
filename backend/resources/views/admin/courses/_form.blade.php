<label>
    Title
    <input type="text" name="title" value="{{ old('title', $course->title ?? '') }}" required>
</label>
@error('title') <small class="error">{{ $message }}</small> @enderror

<label>
    Category
    <select name="category">
        @php $current = old('category', $course->category ?? 'Coaching'); @endphp
        <option value="Coaching" @selected($current === 'Coaching')>Coaching</option>
        <option value="Level 3" @selected($current === 'Level 3')>Level 3</option>
        <option value="Level 5" @selected($current === 'Level 5')>Level 5</option>
        <option value="Level 7" @selected($current === 'Level 7')>Level 7</option>
    </select>
</label>

<label>
    Price (£)
    <input type="number" name="price" min="0" step="0.01" value="{{ old('price', $course->price ?? 0) }}" required>
</label>
@error('price') <small class="error">{{ $message }}</small> @enderror

<label>
    Description
    <textarea name="description" rows="6" required>{{ old('description', $course->description ?? '') }}</textarea>
</label>
@error('description') <small class="error">{{ $message }}</small> @enderror

<label>
    Course image
    <input type="file" name="image" accept="image/*">
</label>
@error('image') <small class="error">{{ $message }}</small> @enderror

@if(!empty($course?->image_url))
    <p class="muted">Current image:</p>
    <img class="preview" src="{{ $course->image_url }}" alt="">
@endif

<div class="form-block">
    <h3>Course PDF</h3>
    <p class="muted">Students see this PDF in their course guide after they enrol.</p>
    <label>
        Upload PDF
        <input type="file" name="guide_pdf" accept="application/pdf">
    </label>
    @error('guide_pdf') <small class="error">{{ $message }}</small> @enderror
    @if(!empty($course?->guide_pdf_url))
        <p class="muted">Current PDF: <a href="{{ $course->guide_pdf_url }}" target="_blank" rel="noreferrer">Open file</a></p>
    @endif
</div>

<div class="form-block">
    <h3>Five questions</h3>
    <p class="muted">These questions appear on the student questionnaire for this course. Leave a box empty to skip it.</p>
    @php
        $saved = collect($course?->questions ?? [])->values()->map(function ($question) {
            return is_string($question) ? $question : (string) ($question['label'] ?? '');
        })->take(5)->pad(5, '')->all();
        $questionValues = old('questions', $saved);
    @endphp
    @for($i = 0; $i < 5; $i++)
        <label>
            Question {{ $i + 1 }}
            <textarea name="questions[]" rows="2" maxlength="500">{{ $questionValues[$i] ?? '' }}</textarea>
        </label>
    @endfor
    @error('questions') <small class="error">{{ $message }}</small> @enderror
    @error('questions.*') <small class="error">{{ $message }}</small> @enderror
</div>

<label class="check-row">
    <input type="checkbox" name="listed" value="1" @checked(old('listed', $course->listed ?? false))>
    Show this course on the public website
</label>
