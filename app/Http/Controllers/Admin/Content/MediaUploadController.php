<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Content;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MediaUploadController extends Controller
{
    /**
     * Handle direct file uploads for dashboard product images, media library, and content.
     */
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'mimes:jpeg,jpg,png,webp,avif,gif', 'max:10240'],
        ]);

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = Str::random(24).'.'.$extension;

        $path = $file->storeAs('uploads', $filename, 'public');
        $url = '/storage/'.$path;

        return response()->json([
            'success' => true,
            'url' => $url,
            'original_name' => $file->getClientOriginalName(),
            'size' => number_format($file->getSize() / 1024, 1).' KB',
        ]);
    }
}
