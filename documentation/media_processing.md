# Media processing

## Sourcing

Source images are copied from the on-premices file server, using a sync utility, to an external hard drive, formatted as NTFS (so read-only under MacOS).

`R:\Appliwin\photos\HD`

This results in a large folder of images, about 350 GB.

## TODO

- Keep all filenames just like the originials (with .JPG)
- rename locally
- make a local dump of the gobelins DB, without the UGC tables
- on staging :
  - load the dump of the DB, do have the newly added images in the DB
  - run the gobelins:renameimages command, so the images have the canonical extensions
- change frontend to not downcase extensions anymore
- then, for updates, we can just rsync normally again, based on file size (not mtime).
- rsync --fuzzy --delete-after ?? => should not be needed.

```
$ pg_dump --host=localhost \
          --username=homestead \
          --clean \
          --no-owner \
          --exclude-table=public.users \
          --exclude-table=public.image_selection \
          --exclude-table=public.invitations \
          --exclude-table=public.migrations \
          --exclude-table=public.password_resets \
          --exclude-table=public.product_selection \
          --exclude-table=public.selection_user \
          --exclude-table=public.selections \
          --exclude-table=public.users \
          gobelins \
          > ./dump_mars_2020.sql


// test
$ psql  --host=localhost \
        --username=homestead \
        --dbname=gob_test \
        --file=dump_mars_2020.sql
```

Sur staging:

```
$ sudo su -l postgres
$ createdb -T gobelins gobelins_backup
$ psql  --host=localhost \
        --username=gobelins \
        --dbname=gobelins \
        --file=/var/www/gobelins/shared/dump_mars_2020.sql
```

## Images sizes

Histogram of image widths, to get an idea of the variation of image sizes:

| range (px)    | frequency | bar                            |
| ------------- | --------- | ------------------------------ |
| [132,1116]    | 4975      | ■■■■                           |
| [1116,2100]   | 33886     | ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ |
| [2100,3084]   | 27255     | ■■■■■■■■■■■■■■■■■■■■■■■■       |
| [3084,4067]   | 27701     | ■■■■■■■■■■■■■■■■■■■■■■■■■      |
| [4068,5052]   | 4247      | ■■■■                           |
| [5052,6031]   | 10821     | ■■■■■■■■■■                     |
| [6042,7005]   | 1277      | ■                              |
| [7021,7991]   | 85        |                                |
| [8043,8939]   | 17        |                                |
| [9096,9922]   | 9         |                                |
| [10134,10897] | 3         |                                |
| [11390,11812] | 2         |                                |
| [12165,12875] | 2         |                                |
| [12961,12993] | 2         |                                |
| [14291,14292] | 1         |                                |
| [15354,15355] | 2         |                                |
| [17717,17836] | 2         |                                |
| [18826,18827] | 1         |                                |

## Pre-processing

### Normalizing inconsistencies

Many characteristics of the images are inconsitent, because the files have been created over a long period of time (decades)
using different techniques (scanned printed photo, scanned ektas, digital photography), levels of capture quality (from 1MP compact to
high end DSLR), image formats (all file extensions are .jpg, but sometimes they are actually BMP, PNG, etc), and handled by hand
(no proper DAM system, so inconsistent file naming).

Format checking

Of these images, despite all having a .jpg (or .JPG) extension, some are encoded as PNG or BMP.

### Down sizing

The HD images are resized to a more reasonnable 1500px max width or height, that will be used
to display the detail page of the objects on the web site.

This is done as a batch job. Here, we are using Graphicsmagick's `gm mogrify`, but you could
the ImageMagick's `mogrify`, as their argument signature should be equivalent.

Images are stored in `public/media/xl` directory.

```bash
$ find /path/to/media/xl/ -type f -iname "*.jpg" | parallel --eta -q gm mogrify -resize '1500x1500>' -format jpg -strip {}
```

```
$
sharp -i 'rototo/**/*.{jpg,JPG}' -o '{dir}' resize 1500 1500 --fit inside --withoutEnlargement --optimise
```

### Warm the cache !

We precalculate the listing (grid) version of the images, to be sure that displaying a search result will
never hit the image rendering pipeline (see folklore/image composer package).

```bash
$ php artisan gobelins:warmcache
```

### Removing EXIF data

We strip all metadata with the `mogrify` and `jpegoptim` utilities.

Optionnaly, if all you need is to edit the metadata, Exiftool, an old Perl utility, works well.

```bash
$ find /path/to/media/xl/ -type f -iname "*.jpg" | parallel exiftool -all= -overwrite_original {}
```

### Optimizing JPEG compression

Important: `jpegoptim` isn't by default compiled with [MozJPEG](https://github.com/mozilla/mozjpeg).
See [these steps for installation](https://github.com/tjko/jpegoptim/issues/41#issuecomment-327498566).

jpegoptim options :

- quality 80 (or 50
- strip all metadata (including color profiles, that all the default sRGB).
- quiet, no output
- threshold 1: only overwrite the result file if recompressed version is 1% or more than original (this allows you to re-run the command on the same files without over compressing them)

```bash
# Thumbnails are compressed to quality 50 (@2x)
$ find public/media/xl/ -type f -iname "*(600x_).jpg" | parallel --eta jpegoptim -m50 -s -q -T1 {}
# Detail view images are left at quality 80.
$ find public/media/xl/ -type f -iname "*.jpg" -not -name "*(600x_)*" | parallel --eta jpegoptim -m80 -s -q -T1 {}
```
