// select all thumbnails
const galleryThumbnail = document.querySelectorAll(".thumbnails-list li");
// select featured
const galleryFeatured = document.querySelector(".home-gallery-featured img");

// loop all items
galleryThumbnail.forEach((item) => {
    item.addEventListener("mouseover", function() {
        let image = item.children[0].src;
        galleryFeatured.src = image;
    });
});