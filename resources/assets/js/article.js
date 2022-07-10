import Colcade from "colcade";
import Flickity from "flickity";
//import A11yDialog from 'a11y-dialog'
import { setupDialogs } from "./dialogs.js";
import imagesLoaded from "imagesloaded";

setupDialogs();

window.Colcade = Colcade;

// Handle Search dialog
// const search_dialog_el = document.querySelector('#search_dialog');
// const search_dialog = new A11yDialog(search_dialog_el);
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// search_dialog
//   .on('show', () => (disableBodyScroll(search_dialog_el)))
//   .on('hide', () => (enableBodyScroll(search_dialog_el)));


if (document.querySelectorAll('[data-carousel]')) {

    document.querySelectorAll('[data-carousel]').forEach((node) => {
        new Flickity(node, {
            imagesLoaded: true,
            cellAlign: 'left',
            contain: true,
            groupCells: true,
            pageDots: false,
            arrowShape: 'M57 64.3985L43 50.2226M56.7495 35.0762L43.1518 49.8269',
            on: {
                ready: function() {
                    function debounce(func){
                        var timer;
                        return function(event){
                            if(timer) clearTimeout(timer);
                            timer = setTimeout(func,100,event);
                        };
                    };
                    // We want to position the Prev/Next arrows depending on the
                    // height of the image, not the card itself. And because height
                    // is variable, we must handle in JS.
                    let verticalOffset = () => {
                        let height = node.querySelector('.Card__img').getBoundingClientRect().height;
                        node.style.setProperty('--carousel-arrow-vertical-offset', Math.floor(height / 2) + 'px');
                    }
                    verticalOffset();
                    window.addEventListener('resize', debounce(verticalOffset), {passive: true});
                },
            }
        });
    });
}

/**
 * Handle Savoir Faire homepage video.
 * It loops 3 times, then reverts to displaying poster image.
 */
(function(){
    let homepage_video = document.querySelector('#homepage_static_video');
    let homepage_video_loop_count = 0;
    if (homepage_video) {
        homepage_video.addEventListener('ended', (event) => {
            homepage_video_loop_count++;
            if(homepage_video_loop_count <= 3) {
                homepage_video.play();
            } else {
                // When the loops have been played,
                // we replace the video by it's poster image.
                let img = new Image();
                img.src = homepage_video.poster;
                img.className = 'EncycloHome__poster';
                let video_dimensions = homepage_video.getBoundingClientRect();
                img.height = video_dimensions.height;
                img.width = video_dimensions.width;
                homepage_video.parentElement.appendChild(img);
                homepage_video.remove();
                // When viewport ratio changes, let the intrinsic size of the image take over.
                document.addEventListener('resize', ev => {
                    img.removeAttribute('height');
                }, {passive: true, once: true});
            }
        });
    }
})();


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

    var fitVids = document.querySelectorAll(players.join(","));

    if (fitVids.length) {
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



class JumpNavComponent {
    constructor() {
        this.$navItems = document.querySelectorAll('*[data-js-jumpnav]');
        this.$articleTitle = document.querySelector('*[data-js-jumpnav-article-title]');

        // Array of objects
        // {
        //      id: <unique element ID attribute on the page>,
        //      title: <title string>
        // }
        this.titles = [];
        
        // Abort early if no data.
        if (this.$navItems.length == 0) {
            return;
        }

        this._gatherSectionTitles();
        this.render();
        this._bindEvents();
        this._setupScrollBehaviors();
	}

    _gatherSectionTitles() {
        // First item is the page header.
        this.titles.push({id: 'page-top', title: this.$articleTitle.textContent});

        // Other titles
        this.$navItems.forEach(i => {
            this.titles.push({
                id: i.id,
                title: i.querySelector('*[data-js-jumpnav-title]').textContent,
            });
        })
    }

    render() {
        const containerTemplate = items => `
            <div class="Article__index" data-js-jumpnav-index>
                <ol class="Article__index_list">
                    ${items}
                </ol>
            </div>`;
        const itemTemplate = (anchor, title) => `
            <li class="Article__index_item">
                <a href="#${anchor}" class="Article__index_link" data-js-jumpnav-scroll>
                    <span class="Article__index_label">
                        <span class="Article__index_label-inner">
                            ${title}
                        </span>
                    </span>
                </a>
            </li>`;

        const itemsMarkup = this.titles.map(o => {
            return itemTemplate(o.id, o.title);
        }).join('')
        
        const container = containerTemplate(itemsMarkup);
        const div = document.createElement('div');
        document.body.append(div);
        div.outerHTML = container;
    }

    _bindEvents() {
        // Set up the smooth scrolling behaviour.
        // We assume this will be only run once, at page load.
        document.querySelectorAll('*[data-js-jumpnav-scroll]').forEach(el => {
            el.addEventListener('click', (ev) => {
                ev.preventDefault();
                var target = document.querySelector(el.getAttribute('href'));
                var targetPosition = target.getBoundingClientRect().top;
                var targetTopMargin = parseInt(window.getComputedStyle(target).marginTop, 10);
                window.scrollTo({
                    top: (targetPosition + window.scrollY) - targetTopMargin,
                    left: 0,
                    behavior: "smooth"
                });
            });
        });
    }

    _setupScrollBehaviors() {
        // Show the currently visible section title in the jump nav.
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                if (entry.intersectionRatio === 1) {
                    document.querySelector(`a[data-js-jumpnav-scroll][href="#${id}"]`).classList.add('active');
                } else {
                    document.querySelector(`a[data-js-jumpnav-scroll][href="#${id}"]`).classList.remove('active');
                }
            });
        }, {threshold: 1});

        // Track all sections that have an `id` applied
        this.$navItems.forEach((el) => {
            observer.observe(el);
        });

        // Hide the component when it intersects with the header.
        const componentPosition = document.querySelector('*[data-js-jumpnav-index]').getBoundingClientRect();
        const topMargin = componentPosition.top - 20; // Add some extra margin.
        const headerObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelector('*[data-js-jumpnav-index]').classList.remove('visible');
                } else {
                    document.querySelector('*[data-js-jumpnav-index]').classList.add('visible');
                }
            });
        }, {rootMargin: `-${topMargin}px 0px 0px 0px`});

        headerObserver.observe(document.querySelector('#page-top'));


        // Hide the component when it intersects with the footer (+10px margin)
        const fromBottom = document.documentElement.clientHeight - (componentPosition.top + componentPosition.height + 10);
        const footerObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelector('*[data-js-jumpnav-index]').classList.remove('visible');
                } else {
                    document.querySelector('*[data-js-jumpnav-index]').classList.add('visible');
                }
            });
        }, {rootMargin: `0px 0px -${fromBottom}px 0px`});

        footerObserver.observe(document.querySelector('.SiteFooter'));
    }
}
new JumpNavComponent();




class PositionBackgroundHalos {
    constructor() {
        imagesLoaded( document.body, function() {
            console.log('all images are loaded YO');
            let support_els = document.querySelectorAll(':not(.on-dark-bg) + .on-dark-bg');
            if (support_els.length) {
                support_els.forEach(el => {
                    let pos = el.getBoundingClientRect();
                    let halo_el = document.createElement('div');
                    halo_el.className = 'has-halo-type-1';
                    halo_el.style.top = (Math.floor(pos.top) - 418) + 'px';
                    document.body.insertBefore(halo_el, document.body.firstChild);
                });
            }
            support_els = document.querySelectorAll('.on-dark-bg + :not(.on-dark-bg)');
            if (support_els.length) {
                support_els.forEach(el => {
                    let pos = el.getBoundingClientRect();
                    let halo_el = document.createElement('div');
                    halo_el.className = 'has-halo-type-2';
                    halo_el.style.top = (Math.floor(pos.top) - 246) + 'px';
                    document.body.insertBefore(halo_el, document.body.firstChild);
                });
            }
        });
    }
}
new PositionBackgroundHalos();

