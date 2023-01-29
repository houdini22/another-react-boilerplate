<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    public function getPreview(Request $request) {
        $file = File::find($request->route('file_id'));
        if (!$file) {
            return $this->response404();
        }

        return response()->file(storage_path('app/public' . $file->file_path), [
            'Content-Type' => 'image/png'
        ]);
    }
}
