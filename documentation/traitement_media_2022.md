# Préparation matérielle

Un disque dur externe, avec deux partitions :

1. `MNdev_exfat` formatté en ExFAT, pour récupérer les images depuis un poste Windows.
2. `MNdev_apfs` formatté en APFS sensible à la casse, pour traiter les versions réduites des images HD.

# Récupération des images

Sur le réseau du ministère, dans les locaux du Mobilier National, utiliser SyncToy pour synchroniser les images du disque avec celles sur le réseau.

# Traitement des images

On laisse les images HD sur `MNdev_exfat`.

```shell
$ cd /Volumes/MNdev_exfat/media

$ find HD -type f -iname "_.jpg" | parallel -q gm mogrify -size 1500x1500 -resize '1500x1500>' -preserve-timestamp +profile "_" -output-directory ../../MNdev_apfs/media -create-directories {}
```

# Images corrompues lors de l'import n°13

```
❯ find HD -type f -iname "*.jpg" | parallel -q gm mogrify -size 1500x1500 -resize '1500x1500>' -preserve-timestamp +profile "*" -output-directory ../../MNdev_apfs/media -create-directories {}
gm mogrify: Premature end of JPEG file (HD/CINQPEYRES/2014/05/gmt-13480-000_2014.JPG).
gm mogrify: Premature end of JPEG file (HD/CINQPEYRES/2014/06/gob-891-001_2014.JPG).
gm mogrify: Corrupt JPEG data: premature end of data segment (HD/DATALAND/4/GME-13681-000_7567.jpg).
gm mogrify: Unsupported marker type 0x84 (HD/DELAMOTTE/2016/01/gmt-6094-000_2012-1.JPG).
gm mogrify: Unsupported marker type 0x87 (HD/DELAMOTTE/2016/01/GML-1303-000_2012.JPG).
gm mogrify: Unsupported marker type 0x87 (HD/DELAMOTTE/2016/01/GMT-20279-002_2012-1.JPG).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-7878-000_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-83-000_2018.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-8495-000_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-8672-008_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-9072-001_2018-1.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-9072-001_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-9072-002_2018-1.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MFDB/2018/02/GML-9072-002_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/REPERAGE/2020/FEKKAR/GMT-18849-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MONTAGNE/2019/CSLCONST/GML-7640-001_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MONTAGNE/2019/CSLCONST/GML-7640-002_2018-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/MONTAGNE/2019/CSLCONST/GML-7317-000_2018-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-12678-004_2020-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14008-001_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14008-003_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14074-001_2020-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14074-003_2020-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14196-005_2020-8.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14237-001_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/02/gmt-14237-003_2020-7.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/08/gmt-14368-001_2020-5.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/08/gmt-14368-001_2020-6.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/08/gmt-14368-002_2020-8.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/08/gmt-15089-001_2020-6.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/08/gmt-15089-004_2020-4.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/VALS/2021/08/gmt-15089-004_2020-5.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/MJUST/GME-16346-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/MJUST/GMT-21810-005_2020-5.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/MUHENNER/GME-10924-000_2020-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/MUHENNER/GME-10924-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/MUHENNER/GME-18483-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/ALLFRA/GME-10323-003_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/ALLFRA/GMT-14400-003_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/03/GME-17846-000_2020.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2020/03/GME-8651-000_2020.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/EMIN/GME-4078-001_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/EMIN/GME-4078-002_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GME-12932-000_2020-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GME-15153-000_2020.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GME-17269-003_2020.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GML-6115-001_2020-1.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GML-6115-002_2020.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GML-9793-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GMT-11168-004_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GMT-29457-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GMT-31037-002_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/01/GMT-31567-007_2020.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GME-10375-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-6867-007_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-9048-002_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-9455-003_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-9455-004_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-9455-005_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-9455-006_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GMT-13334-022_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GMT-20607-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GMT-7752-001_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GMTB-789-001_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GME-3541-000_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GML-5043-001_2020-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MTRAV/GME-10152-000_2020-4.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-004_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-007_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-010_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-013_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-017_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-033_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-036_2021-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-054_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-064_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-071_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-076_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-078_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-081_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-085_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-086_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-089_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-092_2021-4.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-094_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-100_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-102_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/02/GMT-30570-104_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/03/GME-12443-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/03/GME-18101-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/03/GME-7168-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/03/GMT-27968-007_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/03/GMT-31835-002_2021-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/03/GMT-31835-002_2021-4.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/RPMRG/GME-13999-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/04/GML-172-007_2021-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/04/GML-172-007_2021-7.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/05/GME-12714-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/05/GME-14161-001_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/05/GML-10694-002_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/05/GMT-13229-024_2021.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/05/GMT-15673-003_2021.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/05/GMT-30821-019_2021.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/METRA01/GME-12495-002_2021.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/METRA01/GME-12713-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/METRA01/GME-14086-000_2021-1.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/METRA01/GME-14451-002_2021-3.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/METRA01/GML-11187-000_2021.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/AC/GME-5923-005_2021-1.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/AC/GME-5923-006_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MPPRHONO3/MNE2017-37-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/MPPRHONO3/MNT2016-247-000_2021-2.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/07/GME-15685-000_2021.jpg).
gm mogrify: Invalid SOS parameters for sequential JPEG (HD/GOISNARD/2021/07/GME-18044-000_2021-2.jpg).
```
