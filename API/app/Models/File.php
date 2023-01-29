<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class File extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'extension', 'file_path'];

    public static function upload(UploadedFile $file) {
        $newFile = new File;
        $fileName = Str::random() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs(public_path('/uploads/user_avatar/' . $fileName), $fileName);
        $newFile->fill([
            'name' => $file->getClientOriginalName(),
            'extension' => $file->clientExtension(),
            'file_path' => '/uploads/user_avatar/' . $fileName,
        ]);
        $newFile->save();

        return $newFile;
    }
}
