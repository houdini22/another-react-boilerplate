<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class ContactController extends Controller
{
    public function postIndex(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'message' => 'required',
            //'captcha' => 'required|captcha'
        ], [
            'validation.captcha' => 'Captcha code is incorrect.'
        ]);

        Mail::send('email_another_react_boilerplate', [
            'message' => $request->get('message')
        ], function ($message) use ($request) {
            $message->to('ja@baniowski.pro', 'Michał Baniowski')->subject('Email from another-react-boilerplate.baniowski.pro');
            $message->from($request->get('email'));
        });

        return response()->json(['message' => 'Email was successfully sent.']);
    }
}
