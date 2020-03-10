# Check there are only .jpg or .JPG files in the directory

This allows to check we didn't include any other documents,
hidden files, etc.

`$ find . -type f -not -iname "\*.jpg"`

# Identify format mismatches (.jpg files pretending to be JPEGs):

```
$ find . -type f | parallel -q gm identify -format "%m -> %d/%f" {} | grep -v JPEG
BMP -> ./BIDEAU/2007/02/GME-7351-000_9 2007.jpg
PNG -> ./MONTAGNE/2018/06/BV-521-005_2018-1.jpg
PNG -> ./MONTAGNE/2018/08/MNE2018-48-000_2018-1.jpg
PNG -> ./REPERAGE/2016/DIVERS/GMTB- 674-000_2016-1.jpg
```

# public/media/orig is symlinked to /Volumes/Transcend/export-2020-03-02/HD

Files from last year (because last dump was on 2019-03-22)

```
$ cd public/media/orig
$ find . -type f -mtime -365 | parallel --eta -q gm mogrify -preserve-timestamp -resize '1500x1500>' -format jpg -strip -output-directory ~/EIG/gobelins/public/media/xl -create-directories {}
```

# Upload orig files to staging

```
$ cd public/media/orig
$ rsync -avzhe ssh --progress --delete  --dry-run ./* ned@tarabiscot:/var/www/gobelins/shared/public/media/orig/
$ rsync -avzhe ssh --progress --delete  --dry-run ./public/media/orig/ ned@tarabiscot:/var/www/gobelins/shared/public/media/orig/
```

Rsync options:

- Dropping -a because owner and perms are different
- -r recurse into directories
- -t preserve modification times
- -h output numbers in a human-readable format
- -e ssh do it over SSH
- -z compress
- --size-only skip files that match in size (disregard modification times)

```
$ rsync -rvzhte ssh --size-only --progress ./public/media/orig/ root@tarabiscot:/var/www/gobelins/shared/public/media/orig/
```
