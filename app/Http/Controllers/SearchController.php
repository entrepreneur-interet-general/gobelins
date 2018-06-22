<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductType;
use App\Models\Author;
use App\Models\Period;
use App\Models\Style;
use App\Models\Material;
use App\Models\ProductionOrigin;
use ES;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = ES::type("products");
        
        $filters = [];

        if ($request->input('q')) {
            $filters[] = ['query_string' => ['query' => $request->input('q')]];
        }
        
        $product_types = ProductType::all();
        $product_type_ids = [];
        if (is_array($request->input('product_type_ids'))) {
            $product_type_ids = $request->input('product_type_ids');
            $filters[] = ['terms' => ['product_type_ids' => $product_type_ids]];
        }
        
        $styles = Style::all();
        $style_ids = [];
        if (is_array($request->input('style_ids'))) {
            $style_ids = $request->input('style_ids');
            $filters[] = ['terms' => ['style_id' => $style_ids]];
        }
        
        $authors = Author::orderBy('name', 'asc')->get();
        $author_ids = [];
        if (is_array($request->input('author_ids'))) {
            $author_ids = $request->input('author_ids');
            $filters[] = ['terms' => ['author_ids' => $author_ids]];
        }
        
        $periods = Period::orderBy('start_year', 'asc')->get();
        $period_start_year = false;
        $period_end_year = false;
        if (is_numeric($request->input('period_start_year')) && is_numeric($request->input('period_end_year'))) {
            $period_start_year = (int) $request->input('period_start_year');
            $period_end_year = (int) $request->input('period_end_year');
            $filters[] = [
                'bool' => [
                    'should' => [
                        ['range' => ['period_start_year' => ['lte' => $period_end_year]]],
                        [ 'bool' => ['must_not' => ['exists' => [ 'field' => 'period_start_year']]]],
                    ]
                ]
            ];
            
            $filters[] = [
                'bool' => [
                    'should' => [
                        ['range' => ['period_end_year' => ['gte' => $period_start_year]]],
                        [ 'bool' => ['must_not' => ['exists' => [ 'field' => 'period_end_year']]]],
                    ]
                ]
            ];
        }

        $materials = Material::all();
        $material_ids = [];
        if (is_array($request->input('material_ids'))) {
            $material_ids = $request->input('material_ids');
            $filters[] = ['terms' => ['material_ids' => $material_ids]];
        }

        $production_origins = ProductionOrigin::all();
        $production_origin_ids = [];
        if (is_array($request->input('production_origin_ids'))) {
            $production_origin_ids = $request->input('production_origin_ids');
            $filters[] = ['terms' => ['production_origin_id' => $production_origin_ids]];
        }

        
        // Filter terms are boolean AND i.e. "must".
        if (sizeof($filters) > 0) {
            $query->body([
                'query' => ['bool' => ['must' => $filters]]
            ]);
        }
            


        return view('site.search', [
            'query' => $request->input('q'),
            'es_query' => $query->getBody(),
            'product_types' => $product_types,
            'product_type_ids' => $product_type_ids,

            'authors' => $authors,
            'author_ids' => $author_ids,

            'periods' => $periods,
            'period_start_year' => $period_start_year,
            'period_end_year' => $period_end_year,

            'materials' => $materials,
            'material_ids' => $material_ids,

            'production_origins' => $production_origins,
            'production_origin_ids' => $production_origin_ids,

            'styles' => $styles,
            'style_ids' => $style_ids,
            
            'results' => $query->take(15)->get(),
        ]);
    }
}
