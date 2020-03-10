<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
use \App\Models\Image;

class RenameImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:renameimages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rename the broken image names (case sensitivity)';

    /**
     * UI: a Symfony Progress Bar instance.
     */
    protected $progress_bar;

    /**
     * Skip this many images when resuming the command.
     *
     * @var integer
     */
    protected $skip = 0;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if ($this->option('skip')) {
            $this->skip = (int) $this->option('skip');
        }

        $this->processImages();
    }

    /**
     * Forcefully restore the original uppercase file name extensions
     * (JPG) that have been downcased by command-line tools
     * (such as mogrify, etc)
     *
     * @return void
     */
    private function processImages()
    {
        $this->progress_bar = $this->output->createProgressBar(Image::where('path', 'like', '%.JPG')->count() - $this->skip);

        \App\Models\Image::where('path', 'like', '%.JPG')->orderBy('id', 'DESC')->skip(28000)->chunk(500, function ($images) {
            foreach ($images as $img) {
                // Get all files from the directory of the image (only orig).
                $dir_listing = glob(dirname(public_path() . '/media/orig/' . $img->path) . '/*');
                // Search all variants of a file
                //   - thumbnails with "-image(300-)" at the end
                //   - ignore case of extension (jpg or JPG), for case-sensitive file systems.
                $pattern = public_path() .
                           '/media/{xl,orig}/' .
                           str_replace('.JPG', '{,image(*)}.{jpg,JPG}', $img->path);

                // On case-insensitive file-systems, glob() will return
                // file names reflecting the query, e.g.
                // For a foobar.jpg file on disk,
                //    glob('*.JPG') // => foobar.JPG
                //    glob('*.jpg') // => foobar.jpg
                $files_to_rename = glob($pattern, GLOB_BRACE);

                if ($files_to_rename === false) {
                    $this->progress_bar->clear();
                    $this->warn('Error globing pattern ' . $pattern);
                    $this->progress_bar->display();
                } else {
                    // Beware, the list of files we have do not necessarily
                    // reflect the actual case of the file names on disk.
                    foreach ($files_to_rename as $case_insensitive_name) {
                        $new_name = str_replace('.jpg', '.JPG', $case_insensitive_name);

                        // Treat files in /orig/ separately
                        // Because we must copy the files to a read-only
                        // external HD at one point, only attempt to rename
                        // those files if the filenames don't match.
                        if (strpos($case_insensitive_name, '/orig/') !== false) {
                            if ($case_insensitive_name != $new_name &&
                            in_array($case_insensitive_name, $dir_listing, true)) {
                                $this->progress_bar->clear();

                                $this->warn('-------------------------------------------');
                                $this->warn('OK! Found an orig file to rename! File is :');
                                $this->warn($case_insensitive_name);
                                $this->warn('Rename to :');
                                $this->warn($new_name);
                                $this->warn('And parent directory listing is');
                                var_dump($dir_listing);
                                $this->warn('-------------------------------------------');

                                
                                $this->warn('Rename: ' . $case_insensitive_name);
                                
                                $result = @rename($case_insensitive_name, $new_name);
                                if (!$result) {
                                    $this->warn('Pattern: ' . $pattern);
                                    $this->warn('Could not rename file: ' . $case_insensitive_name);
                                }
                                $this->progress_bar->display();
                            }
                        } else {
                            rename($case_insensitive_name, $new_name);
                        }
                    }
                }

                $this->progress_bar->advance();
            }
        });


        $this->progress_bar->finish();
    }
}
