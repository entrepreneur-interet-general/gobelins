<?php

namespace App\Repositories;

use A17\Twill\Repositories\Behaviors\HandleSlugs;
use A17\Twill\Repositories\ModuleRepository;
use App\Models\Section;
use Illuminate\Support\Facades\Cache;

class SectionRepository extends ModuleRepository
{
    use HandleSlugs;

    public function __construct(Section $model)
    {
        $this->model = $model;
    }

    public function afterSave($object, $fields)
    {
        Cache::forget('nav_sections');

        parent::afterSave($object, $fields);
    }

    /**
     * Fetch and cache a collection of sections, to be used in the navigation.
     *
     * @return \Illuminate\Support\Collection
     */
    public function cachedNavSections()
    {
        return Cache::rememberForever('nav_sections', function () {
            return $this->published()
                ->with('slugs')
                ->orderBy('position')
                ->get()
                ->map(function ($item) {
                    return [
                        'title' => $item->title,
                        'slug' => $item->slug,
                    ];
                });
        });
    }
}
