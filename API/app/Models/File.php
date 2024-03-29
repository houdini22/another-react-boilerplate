<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'extension',
        'file_path',
        'mime',
        'type',
        'size',
        'title',
        'description',
        'caption',
        'alt',
        'class'
    ];

    public static function upload(UploadedFile $file, User $user, $data = [])
    {
        $newFile = new File();
        $fileName = Str::random() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('/uploads/user_avatar/', $fileName, 'public');
        $newFile->fill([
            'name' => $file->getClientOriginalName(),
            'extension' => $file->clientExtension(),
            'file_path' => '/uploads/user_avatar/' . $fileName,
            'mime' => $file->getMimeType(),
            'type' => 'file',
            'size' => filesize(storage_path('app/public/uploads/user_avatar/' . $fileName)),
            'title' => $file->getClientOriginalName(),
            'class' => Arr::get($data, 'class', 'file'),
        ]);
        $newFile->user_id = $user->id;
        $newFile->save();

        try {
            $image = Image::make(storage_path('app/public/' . $newFile->file_path));
            $newFile->width = $image->width();
            $newFile->height = $image->height();
            $newFile->save();
        } catch(\Intervention\Image\Exception\NotReadableException $e) {
        }

        return $newFile;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function delete()
    {
        unlink(storage_path('app/public' . $this->file_path));
        return parent::delete(); // TODO: Change the autogenerated stub
    }

    public function toArray()
    {
        $result = parent::toArray();
        $result['url'] = url("/files/preview/{$this->id}/{$this->name}");

        return $result;
    }
}
