<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class RepairCorruptedImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gobelins:repairimages';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Some JPEGs are corrupted. We find them and repair them.';

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
        // $out = passthru('find storage/app/media/ -iname "*.jpg" -print0 | xargs -0 jpeginfo -c | grep -e WARNING -e ERROR');
        $out = <<<EOB
storage/app/media_BD/MONTAGNE/2018/06/GMTL-152-000_2017-4.JPG  Corrupt JPEG data: 2727 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/MONTAGNE/2018/06/GMTL-135-000_2017-2.JPG  Corrupt JPEG data: 2902 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CAVALIE/2017/01/GOB-194-001_2017-2.JPG  Corrupt JPEG data: 671 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/GOB-660-002_2015-3.JPG  Corrupt JPEG data: 764 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/GOB-660-001_2015-4.JPG  Corrupt JPEG data: 664 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/gob-195-017_2015-4.jpg  Corrupt JPEG data: 704 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/GOB-660-002_2015-6.JPG  Corrupt JPEG data: 751 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/gmtb-696-000_2015-2.jpg  Corrupt JPEG data: 736 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/gmtb-1010-000_2016_5.jpg  Corrupt JPEG data: 816 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/CINQPEYRES/2017/11/GOB-660-003_2015-3.JPG  Corrupt JPEG data: 822 extraneous bytes before marker 0x01  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2014/RPBRG/gml-9693-003_2012-1.JPG  Corrupt JPEG data: 2757 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2014/RPBRG/gme-14008-022_2012-1.JPG  Corrupt JPEG data: 2787 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2014/RPBRG/gml-7066-000_2012-1.JPG  Corrupt JPEG data: 2847 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2014/MPMPAL/gme-16091-003_2013.JPG  Corrupt JPEG data: 2727 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2015/02/gml-7190-000_2013.JPG  Corrupt JPEG data: 2686 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2016/01/gme-7714-002_2012-2.JPG  Corrupt JPEG data: 2897 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2016/01/gme-5935-002_2012-2.JPG  Corrupt JPEG data: 2735 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/DELAMOTTE/2016/01/gme-893-000_2012-1.JPG  Corrupt JPEG data: 2771 extraneous bytes before marker 0xd8  Invalid JPEG file structure: two SOI markers  [ERROR]
storage/app/media_BD/ZUBER/2010/03/GMT-29920-005_2012-1.jpg  Corrupt JPEG data: 602 extraneous bytes before marker 0x0a  Unsupported marker type 0x0a  [ERROR]
storage/app/media_BD/ZUBER/2010/03/GMT-28627-005_2012-1.jpg  Corrupt JPEG data: 602 extraneous bytes before marker 0x0a  Unsupported marker type 0x0a  [ERROR]
EOB;
        $images = preg_match_all('/^(.*?\.jpg) .*$/im', $out, $matches);
        // dd($matches);
        foreach ($images as $img) {
        }
    }
}
