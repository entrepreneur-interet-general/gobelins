<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RenameImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:renameimagesfromorig';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '[tmp] Rename the broken image names (only use on case sensitive file system)';

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
        $this->processImages();
    }

    /**
     * Forcefully restore the original uppercase file name extensions
     * (JPG) that have been downcased by command-line tools
     * (such as mogrify, etc)
     *
     * We iterate on the ORIG files (that have the proper uppercase extension),
     * and check if we find corresponding files with a lowercase extention in
     * the XL directory. If so, we rename them.
     *
     * @return void
     */
    private function processImages()
    {
        $dir = new \RecursiveDirectoryIterator(public_path() . '/media/orig/');
        $iterator = new \RecursiveIteratorIterator($dir);
        $regex_iterator = new \RegexIterator($iterator, '/^.+\.JPG$/', \RecursiveRegexIterator::GET_MATCH);
        foreach ($regex_iterator as $r) {
            $path = $r[0];

            $path = str_replace('/orig/', '/xl/', $path);
            $path = str_replace('.JPG', '.jpg', $path);
            $files_to_rename = glob($path, GLOB_BRACE);
            if ($files_to_rename === false) {
                echo 'Error globing pattern ' . $path;
            } else {
                foreach ($files_to_rename as $f) {
                    $new_name = str_replace('.jpg', '.JPG', $f);
                    if ($f !== $new_name) {
                        echo "Uppercasing ext: $f\n";
                        rename($f, $new_name);
                    }
                }
            }
        }

    }
}
