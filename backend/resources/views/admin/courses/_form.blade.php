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
