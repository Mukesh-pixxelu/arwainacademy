@extends('layouts.panel')

@section('title', 'Edit course')
@section('eyebrow', 'Courses')
@section('heading', 'Edit course')

@section('content')
    <form class="form-card" method="POST" action="{{ route('admin.courses.update', $course) }}" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        @include('admin.courses._form')
        <button class="btn" type="submit">Update course</button>
    </form>
@endsection
