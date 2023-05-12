<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Log;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    public function getPreview(Request $request)
    {
        $file = File::find($request->route('file_id'));
        if (!$file) {
            return $this->response404([
                'data' => [
                    'id' => $request->route('file_id'),
                    'model' => File::class,
                ],
            ]);
        }

        $file->preview_count += 1;
        $file->save();

        $filePath = storage_path('app/public' . $file->file_path);
        $deleteAfterSend = false;

        if ($request->query('width') && $request->query('height')) {
            $image_resize = \Intervention\Image\Facades\Image::make($filePath);
            $image_resize->fit($request->query('width'), $request->query('height'));
            $filePath = storage_path('app/public/' . $file->file_path . $request->query('width') . '_' . $request->query('height') . '.' . $file->extension);
            $deleteAfterSend = true;
            $image_resize->save($filePath);
        }

        return response()->file($filePath, [
            'Content-Type' => $file->mime,
        ])->deleteFileAfterSend($deleteAfterSend);
    }

    public function getList(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $filters = $request->get('filters');

        $query = File::orderBy($filters['order_by'], $filters['order_direction'])
            ->where(function ($query) use ($filters) {
                $query->where('alt', 'like', "%{$filters['search']}%")
                    ->orWhere('caption', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%")
                    ->orWhere('title', 'like', "%{$filters['search']}%");
            });

        if (!empty($filters['user'])) {
            $query = $query->whereHas('user', function ($q) use ($filters) {
                $q->where('name', $filters['user']);
            });
        }

        if (!empty($filters['has_user'])) {
            if ($filters['has_user'] === 'yes') {
                $query = $query->whereHas('user');
            } else if ($filters['has_user'] === 'no') {
                $query = $query->whereDoesntHave('user');
            }
        }

        $files = $query->paginate($filters['items_per_page']);

        Log::add($user, 'files.list', [
            'request' => $request]);

        return $this->responseOK($files);
    }

    public function deleteFile(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $file = File::find($request->route('id'));
        if (!$file) {
            Log::add($user, 'media.not_found', [
                'message' => 'while.delete',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => File::class,
                ],
            ]);
        }

        $file->delete();

        Log::add($user, 'media.delete', [
            'model' => $file,
            'request' => $request
        ]);

        return response()->json([
            'msg' => 'ok',
        ]);
    }

    public function postUpload(Request $request)
    {
        $user = $this->getUserFromRequest($request);
        $data = $request->post();

        $files = $request->allFiles();
        $result = [];
        foreach ($files as $f) {
            $file = File::upload($f, $user, $data);
            $result[] = $file;
            Log::add($user, 'media.upload', [
                'model' => $file,
                'request' => $request
            ]);
        }

        return $this->responseOK($result);
    }

    public function postEdit(Request $request)
    {
        $user = $this->getUserFromRequest($request);

        $file = File::find($request->route('id'));
        if (!$file) {
            Log::add($user, 'media.not_found', [
                'message' => 'while.edit',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => File::class,
                ],
            ]);
        }

        $file->fill($request->post());
        $file->save();

        Log::add($user, 'media.edit', [
            'model' => $file,
            'request' => $request
        ]);

        return $this->responseOK();
    }

    public function getDownload(Request $request)
    {
        $file = File::find($request->route('id'));
        if (!$file) {
            Log::add(NULL, 'media.not_found', [
                'message' => 'while.download',
                'request' => $request
            ]);
            return $this->response404([
                'data' => [
                    'id' => $request->route('id'),
                    'model' => File::class,
                ],
            ]);
        }

        $file->download_count += 1;
        $file->save();

        $filePath = storage_path('app/public' . $file->file_path);

        return response()->download($filePath, $file->name, [
            'Content-Type' => $file->mime,
        ]);
    }
}
