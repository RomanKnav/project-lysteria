// given an array of urls and a callback function to call once all images are loaded.
function preloadImages(imageUrls, callback) {
    let loadedImages = 0;
    const imagesArray = [];
  
    for (let i = 0; i < imageUrls.length; i++) {
      imagesArray[i] = new Image();
      imagesArray[i].src = imageUrls[i];
  
      imagesArray[i].onload = () => {
        loadedImages++;
        if (loadedImages === imageUrls.length && callback) {
          callback();
        }
      };
  
      imagesArray[i].onerror = () => {
        console.error(`Failed to load image: ${imageUrls[i]}`);
        loadedImages++;
        if (loadedImages === imageUrls.length && callback) {
          callback();
        }
      };
    }
  }
  
  // Example usage
  const imagesToPreload = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ];
  
  preloadImages(imagesToPreload, () => {
    console.log('All images preloaded!');
  });
  