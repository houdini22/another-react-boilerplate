<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Intervention\Image\Image;

class FilesController extends Controller
{
    public function getPreview(Request $request) {
        $file = File::find($request->route('file_id'));
        if (!$file) {
            return $this->response404();
        }

        $file->preview_count += 1;
        $file->save();

        $filePath = storage_path('app/public' . $file->file_path);
        $deleteAfterSend = false;

        if ($request->query('width') && $request->query('height')) {
            $image_resize = \Intervention\Image\Facades\Image::make($filePath);
            $image_resize->resize($request->query('width'), $request->query('height') );
            $filePath = storage_path('app/public/' .  $file->file_path . $request->query('width') . '_' . $request->query('height') . '.' . $file->extension);
            $deleteAfterSend = true;
            $image_resize->save($filePath);
        }

        return response()->file($filePath, [
            'Content-Type' => $file->mime,
        ])->deleteFileAfterSend($deleteAfterSend);
    }
}
