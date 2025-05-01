
  const imageData = [
    { src: "images/1.jpg", title: "Alchemy of Souls" },
    { src: "images/2.jpg", title: "Start Up" },
    { src: "images/3.jpg", title: "Lovestruck in the City" },
    { src: "images/4.jpg", title: "Welcome to Samdal-ri" },
    { src: "images/5.jpg", title: "When Life Gives You Tangerines" },
    { src: "images/6.jpg", title: "Welcome to Samdal-ri" },
    { src: "images/7.jpg", title: "20th Century Girl" },
    { src: "images/8.jpg", title: "I'm Drunk, I Love You" },
    { src: "images/9.jpg", title: "I'm Drunk, I Love You" },
    { src: "images/10.jpg", title: "Soulmate" },
{ src: "assets/11.jpg", title: "Weightlifting Fairy" },
{ src: "assets/12.jpg", title: "Twenty-five Twenty-one" },
{ src: "assets/13.jpg", title: "Mr. Plankton" },
{ src: "assets/14.jpg", title: "Mr. Plankton" },
{ src: "assets/15.jpg", title: "When I Fly Towards You" },
{ src: "assets/16.jpg", title: "When I Fly Towards You" },
{ src: "assets/17.jpg", title: "Nevertheless" },
{ src: "assets/18.jpg", title: "Weightlifting Fairy" },
{ src: "assets/19.jpg", title: "When I Fly Towards You" },
{ src: "assets/20.jpg", title: "Twinkling Watermelon" },
{ src: "assets/21.jpg", title: "20th Century Girl" },
{ src: "assets/22.jpg", title: "Our Beloved Summer" },
{ src: "assets/23.jpg", title: "When I Fly Towards You" },
{ src: "assets/24.jpg", title: "Nevertheless" },
{ src: "assets/25.jpg", title: "Mr. Plankton" },
{ src: "assets/26.jpg", title: "Weightlifting Fairy" },
{ src: "assets/27.jpg", title: "Mr. Plankton" }
  ];

  // DOM elements
  const imageDisplay = document.getElementById('image-display');

  // Variables
  let currentIndex = 0;
  let intervalId;
  let imageWrappers = [];

  // Function to create image wrappers
  function createImageWrappers() {
    imageData.forEach((image, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';
      if (index === 0) wrapper.classList.add('active');
      
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.title;
      img.className = 'img-fluid';
      
      const title = document.createElement('div');
      title.className = 'image-title';
      title.textContent = image.title;
      
      wrapper.appendChild(img);
      wrapper.appendChild(title);
      imageDisplay.appendChild(wrapper);
      imageWrappers.push(wrapper);
    });
  }

  // Function to show next image with transition
  function showNextImage() {
    // Hide current image
    imageWrappers[currentIndex].classList.remove('active');
    
    // Get next random index (different from current)
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * imageData.length);
    } while (nextIndex === currentIndex && imageData.length > 1);
    
    currentIndex = nextIndex;
    
    // Show next image
    imageWrappers[currentIndex].classList.add('active');
  }

  // Function to start the slideshow
  function startSlideshow() {
    intervalId = setInterval(showNextImage, 4000);
  }

  // Initialize
  createImageWrappers();
  startSlideshow();
  
  
