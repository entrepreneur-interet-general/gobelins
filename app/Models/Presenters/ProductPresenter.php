<?php

namespace App\Models\Presenters;

use App\Models\Presenters\Presenter;

class ProductPresenter extends Presenter
{

    public function nameInListing()
    {
        return $this->title_or_designation ?:
        $this->denomination ?:
        '';
    }

    public function authorsInListing()
    {
        $authors = '';
        if ($this->authors && $this->authors->count() > 0) {
            $authors = $this->authors->pluck('fullname')->join(', ');
        }
        return $authors;
    }

}
