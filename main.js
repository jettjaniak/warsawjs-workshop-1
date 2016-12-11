class Gallery {
    constructor() {
        this.photos = ['photo0.jpeg', 'photo1.jpeg', 'photo2.jpeg', 'photo3.jpeg', 'photo4.jpeg'];

        this.overlay = document.querySelector('#overlay');
        this.photo_viewer = this.overlay.getElementsByTagName('img')[0];
        this.photo_number = 0;
        this.gallery_visible = false;

        this.createThumbnails();
        this.setupListeners();

    }

    createThumbnails() {
        for (let i=0; i < this.photos.length; i++) {
            let img = document.createElement("img");
            img.setAttribute('data-photo-number', i);
            img.setAttribute('src', 'thumbnails/' + this.photos[i]);
            document.getElementById("thumbnails").appendChild(img);
        }
    }

    setupListeners() {
        window.addEventListener('keydown', (event) => {
           switch(event.keyCode) {
               case 27:  // escape
                   this.hideGallery();
                   break;
               case 37:  // left arrow
                   if (this.gallery_visible)
                       this.photo_number = (this.photo_number - 1 + this.photos.length) % this.photos.length;
                        this.loadImage();
                   break;
               case 39:  // right arrow
                   this.nextImage();
                   break;
            }
        });

        let thumbs = document.querySelectorAll("#thumbnails img"), i;
        console.log(thumbs);
        for (let i=0; i < thumbs.length; i++)
            thumbs[i].addEventListener('click', (event) => {
                this.photo_number = thumbs[i].dataset.photoNumber;
                this.loadImage();
            });

        this.overlay.addEventListener('click', (event) => this.hideGallery());
        this.photo_viewer.addEventListener('click', (event) => {
            event.cancelBubble=true;
            this.nextImage();
        });
    }

    nextImage() {
        if (this.gallery_visible) {
            this.photo_number = (this.photo_number + 1) % this.photos.length;
            this.loadImage();
        }
    }

    showGallery() {
        this.gallery_visible = true;
        this.overlay.style.visibility = 'visible';
    }

    hideGallery() {
        this.gallery_visible = false;
        this.overlay.style.visibility = 'hidden';
    }

    loadImage() {
        this.photo_viewer.setAttribute('src', 'images/'+this.photos[this.photo_number]);
        this.showGallery();
    }

}

let gallery = new Gallery();