/* ******* CHANGE PHOTO_AMOUNT ONLY ************ */
const PHOTO_AMOUNT = 53;
const modal = document.getElementById("gallery-modal");
const modalImg = document.getElementById("modal-img");
let selectedPhoto = "";
// gallery elements
const galleryElements = document.getElementsByClassName("is-parent");
const gallery = document.getElementById("gallery");
const galleryOverlay = document.getElementById("gallery-overlay");
const galleryTrigger = document.getElementById("gallery-trigger");
const arrows = document.getElementsByClassName("arrow");
// for the scroll
const scrollingElements = document.querySelectorAll(".navbar-item li");
const pageHash = window.location.hash.substr(1);

function toggleClass(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

function toggleGallery(trigger) {
    // trigger overlay
    const galleryStatus = trigger.currentTarget.getAttribute("data-value");

    // toggle overlay
    toggleClass(galleryOverlay, "is-hidden");

    // toggle overflow wrapper
    toggleClass(gallery, "gallery-wrapper");
    if (galleryStatus === "minimized") {
        trigger.currentTarget.setAttribute("data-value", "expanded");
        trigger.currentTarget.innerHTML = `<span class="is-size-6">&#9650;</span><span> Minimize Gallery</span>`;
    } else {
        trigger.currentTarget.setAttribute("data-value", "minimized");
        trigger.currentTarget.innerHTML = `<span class="is-size-6">&#9660;</span><span> Expand Gallery</span>`
    }
}
function insertGalleryPhotos() {
    // insert gallery photos
    let j = 0;
    for (var i = 1; i <= PHOTO_AMOUNT; i++) {
        if (i % Math.ceil(PHOTO_AMOUNT / 3) === 0) {
            j = (j < 2) ? j + 1 : j;
        }
        var newcontent = document.createElement('div');
        newcontent.innerHTML = `
              <div class="tile is-child">
                <img src="/assets/images/${i}.jpg" alt="garden photo" value="${i}">
               </div>
           `;

        // attach click handler to clicked photo
        newcontent.onclick = (chosenPhoto) => {
            selectedPhoto = chosenPhoto.target.attributes.value.value;
            toggleClass(modal, "is-active");
            modalImg.src = `/assets/images/${selectedPhoto}.jpg`;
        };

        galleryElements[j].appendChild(newcontent);
    }
}
function triggerModal() {
    // trigger modal
    const closeModal = modal.querySelectorAll('.modal-background, .modal-close');
    Array.from(closeModal).forEach((el) => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            toggleClass(modal, "is-active");
        });
    });
}
function incrementDecrementPhotos(galleryDirection) {
    if ((galleryDirection) && (galleryDirection === "increment" || galleryDirection === "ArrowRight" ) ) {
        if (parseInt(selectedPhoto) === (PHOTO_AMOUNT)) {
            selectedPhoto = 1;
        } else {
            selectedPhoto++;
        }
    } else if ((galleryDirection) && (galleryDirection === "decrement" || galleryDirection === "ArrowLeft")) {
        if (parseInt(selectedPhoto) === (1)) {
            selectedPhoto = PHOTO_AMOUNT;
        } else {
            selectedPhoto--;
        }
    }
    modalImg.src = `/assets/images/${selectedPhoto}.jpg`;
}
function triggerGalleryFunctionality() {
    Array.from(arrows).forEach((arrow) => {
        arrow.addEventListener('click', (e) => {
            const galleryDirection = e.currentTarget.getAttribute("data-value");
            incrementDecrementPhotos(galleryDirection);
        });
    });
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        if( modal.classList.contains("is-active") && (keyName === "ArrowRight" || keyName === "ArrowLeft" )) {
            incrementDecrementPhotos(keyName);
        }
    });
}

function jumpToSection() {
    for (let i = 0; i < scrollingElements.length; i++) {
        scrollingElements[i].addEventListener("click", (event) => {
            jump(scrollingElements[i].dataset.value, {
                duration: 1000,
                offset: 0,
                callback: undefined,
                a11y: false
            });
        });

        if (scrollingElements[i].dataset.value === pageHash) {
            jump("#" + pageHash, {
                duration: 1000,
                offset: 0,
                callback: undefined,
                a11y: false
            });
        }
    }
}

galleryTrigger.addEventListener('click', (trigger) => {
    toggleGallery(trigger);
});

insertGalleryPhotos();
triggerModal();
triggerGalleryFunctionality();
jumpToSection();