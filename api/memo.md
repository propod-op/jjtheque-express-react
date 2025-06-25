chemin pour les images : https://image.tmdb.org/t/p/w500/siRIgKDX920Nqu1jWDGMNxykqwN.jpg
chopix des tailles : w92, w185, w500 (largeur 500px), original

Point de montage :
- installer cifs : sudo apt install cifs-utils
- créer le dossier de montage : sudo mkdir /mnt/usbshare1
- créer le point de montage : sudo mount -t cifs //synogidy.local/usbshare1 /mnt/usbshare1 -o username=napo261,password=tcabkp2,workgroup=WORKGROUP
