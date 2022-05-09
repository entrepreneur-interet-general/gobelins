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


// Vanilla version of FitVids
// License: WTFPL
(function(window, document, undefined) {
    "use strict";

    // List of Video Vendors embeds you want to support
    var players = [
        'iframe[src*="youtube"]',
        'iframe[src*="vimeo"]',
        'iframe[src*="dailymotion"]',
    ];

    // Select videos
    var fitVids = document.querySelectorAll(players.join(","));

    // If there are videos on the page...
    if (fitVids.length) {
        // Loop through videos
        for (var i = 0; i < fitVids.length; i++) {
            // Get Video Information
            var fitVid = fitVids[i];
            var width = parseInt(fitVid.getAttribute("width"), 10);
            var height = parseInt(fitVid.getAttribute("height"), 10);
            var aspectRatio = height / width;
            var parentDiv = fitVid.parentNode;

            // Wrap it in a DIV
            var div = document.createElement("div");
            div.className = "Embed__inner";
            div.style.paddingBottom = aspectRatio * 100 + "%";
            parentDiv.insertBefore(div, fitVid);
            fitVid.remove();
            div.appendChild(fitVid);

            // Clear height/width from fitVid
            fitVid.removeAttribute("height");
            fitVid.removeAttribute("width");
        }
    }
})(window, document);

