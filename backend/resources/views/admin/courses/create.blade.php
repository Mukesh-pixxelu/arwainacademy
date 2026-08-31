@extends('layouts.panel')

@section('title', 'Add course')
@section('eyebrow', 'Courses')
@section('heading', 'Add a course')

@section('content')
    <p class="muted">Saved courses appear on the public website Courses page.</p>
    <form class="form-card" method="POST" action="{{ route('admin.courses.store') }}" enctype="multipart/form-data">
        @csrf
        @include('admin.courses._form')
        <button class="btn" type="submit">Save course</button>
    </form>
@endsection
