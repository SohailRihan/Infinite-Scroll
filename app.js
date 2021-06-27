const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false
let imagesLoaded = 0;
let totalImages =0;
let photosArray = []


// unsplash API
const count = 30;
const apiKey = 'JZm3TTokfe41jqps7M3x5iPaPkEe5xMWy6XQKA38Fv8';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    

    if(imagesLoaded == totalImages){
        ready = true;
        loader.hidden = true;
        
    }
}

// create elements for links & photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length
    // run for each loop
    photosArray.forEach((photo) => {

        // create <a> to link to Unsplash

        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // add event listener, check when each is finished
        img.addEventListener('load', imageLoaded)

        // put image into <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// get photos from splash from unsplash API

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray= await response.json();
        

        displayPhotos();
        

       
        
    } catch (error) {
        
    }
}

// check to see if scrolling near bottom of page, Load More Photos

window.addEventListener('scroll', () =>{

    if(window.innerHeight + window.scrollY>=document.body.offsetHeight - 1000 && ready){
        ready = false
        getPhotos();
        
        
    }

})

// On Load
getPhotos()