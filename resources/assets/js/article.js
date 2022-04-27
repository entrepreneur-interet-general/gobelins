import Colcade from "colcade";
import Flickity from "flickity";

window.Colcade = Colcade;

document.querySelectorAll('[data-carousel]').forEach(function(node){
    new Flickity(node, {
        imagesLoaded: true,
        cellAlign: 'left',
        contain: true,
        groupCells: true,
        pageDots: false,
        arrowShape: 'M57 64.3985L43 50.2226M56.7495 35.0762L43.1518 49.8269'
    });
});

// function positionBackgroundImages() {

//     // Iterate through anchor nodes
//     // for each one,
//     // get the position of it
//     // find the bg image name in the attribute, and offet 
//     // lookup that bg image name in the config object
//     // set the bg image, with offettted position, on the document background.

//     images = {
//         art_
//     };
// }

// let ev = document.addEventListener('resize', positionBackgroundImages);