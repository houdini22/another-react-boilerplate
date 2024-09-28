<?php

namespace App\Http\Controllers;

class CaptchaServiceController extends Controller
{
    public function getCaptcha()
    {
        return response()->json(['captcha' => captcha_img()]);
    }
}
