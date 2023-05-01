<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
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
            $image_resize->fit($request->query('width'), $request->query('height') );
            $filePath = storage_path('app/public/' .  $file->file_path . $request->query('width') . '_' . $request->query('height') . '.' . $file->extension);
            $deleteAfterSend = true;
            $image_resize->save($filePath);
        }

        return response()->file($filePath, [
            'Content-Type' => $file->mime,
        ])->deleteFileAfterSend($deleteAfterSend);
    }
    public function getList(Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $filters = $request->get('filters');

        $query = File::orderBy('id', 'DESC');

        if (!empty($filters['user'])) {
            $query = $query->whereHas('user', function($q) use ($filters) {
                $q->where('name', $filters['user']);
            });
        }

        $files = $query->get();

        return response()->json([
            'files' => $files->toArray(),
        ]);
    }
    public function deleteFile(Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $file = File::find($request->route('id'));
        if (!$file) {
            return $this->response404();
        }

        $file->delete();

        return response()->json([
            'msg' => 'ok',
        ]);
    }
    public function postUpload(Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $files = $request->allFiles();
        foreach ($files as $f) {
            $file = File::upload($f, $user);
        }

        return response()->json([
            'msg' => 'ok',
        ]);
    }
    public function postEdit(Request $request) {
        $user = User::getFromRequest($request);
        if (!$user) {
            return $this->response401();
        }

        $file = File::find($request->route('id'));
        if (!$file) {
            return $this->response404();
        }

        $file->fill($request->post());
        $file->save();

        return response()->json([
            'msg' => 'ok',
        ]);
    }
}
