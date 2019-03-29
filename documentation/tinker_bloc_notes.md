# Some notes and useful snippets to be used with the `artisan tinker`command

## Searching for badly named image files

```php
////////////////////////
\App\Models\Image::where('path', 'like', '%.jpg')->chunk(500, function ($images) {
    foreach ($images as $img) {
        $path_db = public_path() . '/media/orig/' . $img->path;
        if (!file_exists($path_db)) {
            echo 'Missing lowercase: ' , $path_db, "\n";
        }
    }
});

/////////////////////////////
$count_upper = 0;
$count_lower = 0;
$both = 0;
\App\Models\Image::where('path', 'like', '%.JPG')->chunk(500, function ($images) use (&$count_lower, &$count_upper, &$both) {
    foreach ($images as $img) {
        $path_upper = public_path() . '/media/orig/' . $img->path;
        $path_lower = public_path() . '/media/orig/' . str_replace('.JPG', '.jpg', $img->path);

        if (!file_exists($path_upper) && !file_exists($path_lower)) {
            $both ++;
            echo "Both image: $path_upper";
        }
        if (!file_exists($path_upper)) {
            $count_upper ++;
        }
        if (!file_exists($path_lower)) {
            $count_lower ++;
        }
    }
});
echo "\nUpper: $count_upper | Lower: $count_lower | Both: $both\n";

////////////////////////
\App\Models\Image::chunk(500, function ($images) {
    foreach ($images as $img) {
        $path_db = public_path() . '/media/orig/' . $img->path;
        $path_borked = public_path() . '/media/orig/' . str_replace('.JPG', '.jpg', $img->path);

        if (!file_exists($path_db) && !file_exists($path_borked)) {
            echo 'Irreplacable: ' , $path_db, "\n";
        }
    }
});
```

## Warming cache

Variants of the gobelins:warmcache artisan task.

```php
$this->progress_bar = $this->output->createProgressBar(\App\Models\Image::count());

\App\Models\Image::chunk(100, function ($images) {
    foreach ($images as $img) {
        $xl_path = '/media/xl/' . $img->path;
        $thumb_330_path = public_path() . Image::url($xl_path, 330);
        if (!file_exists($thumb_330_path)) {
            Image::make($xl_path, ['width' => 330])->save($thumb_330_path);
        }
        $thumb_160_path = public_path() . Image::url($xl_path, 160);
        if (!file_exists($thumb_160_path)) {
            Image::make($xl_path, ['width' => 160])->save($thumb_160_path);
        }
        $this->progress_bar->advance();
    }
});


$this->progress_bar->finish();

```
