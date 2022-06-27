<?php

namespace App\Repositories;

use A17\Twill\Repositories\Behaviors\HandleBlocks;
use A17\Twill\Repositories\Behaviors\HandleMedias;
use A17\Twill\Repositories\Behaviors\HandleRevisions;
use A17\Twill\Repositories\Behaviors\HandleSlugs;
use A17\Twill\Repositories\Behaviors\HandleTags;
use A17\Twill\Repositories\ModuleRepository;
use App\Models\Article;
use App\Models\Section;

class ArticleRepository extends ModuleRepository
{
    use HandleBlocks, HandleSlugs, HandleMedias, HandleRevisions, HandleTags;

    protected $relatedBrowsers = ['articles'];
    protected $listingPaginationAmount = 9;

    public function __construct(Article $model)
    {
        $this->model = $model;
    }

    public function filter($query, array $scopes = [])
    {
        $this->addRelationFilterScope($query, $scopes, 'section_id', 'section');

        $this->searchIn($query, $scopes, 'search', [
            'title',
            'subtitle',
            'byline',
            'lead',
        ]);

        return parent::filter($query, $scopes);
    }

    public function afterSave($object, $fields)
    {
        $this->updateBrowser($object, $fields, 'related');
        parent::afterSave($object, $fields);
    }

    public function inSection($section, $qty = 6)
    {
        return Article::published()->where('section_id', '=', $section->id)->orderBy('updated_at', 'DESC')->limit($qty)->get();
    }

    public function getFormFields($object)
    {
        $fields = parent::getFormFields($object);
        $fields['browsers']['related'] = $this->getFormFieldsForBrowser($object, 'related', 'encyclopedie', 'title', 'articles');
        return $fields;
    }

    /**
     * Override the tags listing query, so we may order alphabetically.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function getTagsQuery()
    {
        return $this->model->allTags()->orderBy('name', 'asc');
    }

    /**
     * List of tags, used in the Twill back office listings.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getTagsListForFilter()
    {
        return $this->getTagsQuery()->where('count', '>', 0)->select('name', 'id')->get()->pluck('name', 'id');
    }

    /**
     * List articles by tag
     *
     * @param [String] $tag
     * @return Illuminate\Pagination\Paginator
     */
    public function byTag($tag)
    {
        return $this->published()->whereTag($tag)->paginate($this->listingPaginationAmount);
    }

    /**
     * List articles by section
     *
     * @param [String] $section
     * @return Illuminate\Pagination\Paginator
     */
    public function bySection($section)
    {
        $section = Section::published()->forSlug($section)->first();
        abort_unless($section, 404, "Rubrique indisponible");
        return $this->published()->where('section_id', '=', $section->id)->paginate($this->listingPaginationAmount);
    }

    /**
     * List articles published in the last 3 months
     *
     * @return Illuminate\Pagination\Paginator
     */
    public function byRecent()
    {
        return $this->published()->whereDate('publish_start_date', '>', now()->subMonths(3))->orderBy('publish_start_date', 'DESC')->paginate($this->listingPaginationAmount);
    }

    /**
     * List 4 pages of articles ordered by most recent.
     *
     * @return Illuminate\Pagination\Paginator
     */
    public function byRecentOrder()
    {
        return $this->published()->orderBy('publish_start_date', 'DESC')->limit(4 * $this->listingPaginationAmount)->paginate($this->listingPaginationAmount);
    }

    /**
     * Search the articles for a string
     * Ideally, this should be implemented with proper full-text
     * search, but I'm not sure which version of Postgres is in
     * production, so skipping for now. Maybe index in ES?
     *
     * @param [String] $q
     * @return Illuminate\Pagination\Paginator
     */
    public function searchFor($q)
    {
        return $this->published()
            ->where('title', 'ILIKE', '%' . $q . '%')
            ->orWhere('subtitle', 'ILIKE', '%' . $q . '%')
            ->orWhere('lead', 'ILIKE', '%' . $q . '%')
            ->orWhere('byline', 'ILIKE', '%' . $q . '%')
            ->paginate($this->listingPaginationAmount);
    }

}
