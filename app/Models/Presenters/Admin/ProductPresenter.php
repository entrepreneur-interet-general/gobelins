<?php

namespace App\Models\Presenters\Admin;

use App\Models\Presenters\Presenter;
use ImageService;

class ProductPresenter extends Presenter
{

    public function tagsAsString()
    {
        return $this->tags->map(function ($tag) {
            return $tag->name;
        })->implode(', ');
    }

    public function listing_thumbnail()
    {
        $image = $this->entity->images()
            ->orderBy('is_poster', 'DESC')
            ->orderBy('is_prime_quality', 'DESC')
            ->first();
        if ($image) {
            return image_url('/media/xl/' . $image->path, 160);
        }
        return ImageService::getTransparentFallbackUrl([]);

    }

}
