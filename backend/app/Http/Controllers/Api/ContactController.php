<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:40'],
            'course' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:4000'],
        ]);

        $to = (string) config('mail.contact_to', 'info@arwainacademy.com');
        $body = implode("\n", [
            'New website enquiry',
            '',
            'Name: '.$data['name'],
            'Email: '.$data['email'],
            'Phone: '.($data['phone'] ?: '—'),
            'Course: '.($data['course'] ?: '—'),
            '',
            'Message:',
            $data['message'],
        ]);

        Mail::raw($body, function ($message) use ($data, $to) {
            $message
                ->to($to)
                ->replyTo($data['email'], $data['name'])
                ->subject('Website enquiry from '.$data['name']);
        });

        return response()->json([
            'ok' => true,
            'message' => 'We’ve received your enquiry and will be in touch shortly.',
        ]);
    }
}
