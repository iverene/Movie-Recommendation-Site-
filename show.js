document.addEventListener('DOMContentLoaded', function() {

  const urlParams = new URLSearchParams(window.location.search);
  const showId = urlParams.get('id');
  

  const showContainer = document.getElementById('show-container');
  if (showContainer && showId) {
    fetch('show.json')
      .then(response => response.json())
      .then(shows => {
        const show = shows.find(m => m.id === showId);
        if (show) {
          renderShow(show);
          initializeHeartButton(show.id);
        } else {
          showContainer.innerHTML = '<h1>Show not found</h1>';
        }
      });
  }

  const watchlistContainer = document.getElementById('watchlist-container');
  if (watchlistContainer) {
    loadWatchlist();
  }
});

function renderShow(show) {
  const container = document.getElementById('show-container');
  container.innerHTML = `
    <div class="row align-items-center">
      <div class="col-12 col-md-6 text-center mb-4 mb-md-0">
       <img src="${show.image}" class="main-img img-fluid rounded shadow-sm mt-4">
      </div>
      <div class="col-12 col-md-6">
       <h1 class="show-title mt-3">${show.title}</h1>
      <button type="button" class="btn-heart" data-show-id="${show.id}" id="heart-${show.id}">
        <i class="bi bi-heart"></i>
        <i class="bi bi-heart-fill"></i>
      </button>
       <h1 class="mt-0 mb-0">Genres</h1>
       <p>${show.genres}</p>
       <h1 class="mt-3 mb-0">Episodes/Duration</h1>
       <p>${show.episodes}</p>
       <h1 class="mt-3 mb-0">Casts</h1>
       <p>${show.casts}</p>
       <h1 class="mt-3 mb-0">Synopsis</h1>
       <p>${show.synopsis}</p>
      </div>
    </div>
    <div class="row custom-row border border-2 rounded">
      <div class="col-12 col-md-6 mt-3">
      <h1>Review</h1>
      <div class="text-center">
      <img src="${show.reaction}" class="reaction-img rounded shadow-sm mt-0">
      <p class="mt-3">${show.review}</p>
      </div>
      </div>
      <div class="col-12 col-md-6 mt-3 px-3">
      <h1>Ratings</h1>
      <h1 class="mt-3 mb-0 fs-2">Plot</h1>
       <p>${show.plot}</p>
       <h1 class="mt-3 mb-0 fs-2">Cinematography</h1>
       <p>${show.cinematography}</p>
       <h1 class="mt-3 mb-0 fs-2">Emotional Impact</h1>
       <p>${show.emotional_impact}</p>
       <h1 class="mt-3 mb-0 fs-2">Soundtrack</h1>
       <p>${show.soundtrack}</p>
      </div>
    </div>
  `;
}

function initializeHeartButton(showId) {
  const heartBtn = document.getElementById(`heart-${showId}`);
  if (!heartBtn) return;

  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  if (watchlist.includes(showId)) {
    heartBtn.classList.add('active');
  }

  heartBtn.addEventListener('click', function() {
    toggleWatchlist(showId);
  });
}

function toggleWatchlist(showId) {
  const heartBtn = document.getElementById(`heart-${showId}`);
  if (!heartBtn) return;

  heartBtn.classList.toggle('active');
  
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
  if (heartBtn.classList.contains('active')) {
    if (!watchlist.includes(showId)) {
      watchlist.push(showId);
    }
  } else {
    watchlist = watchlist.filter(id => id !== showId);
  }
  
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

function loadWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const container = document.getElementById('watchlist-container');
  const emptyMessage = document.getElementById('empty-watchlist');
  
  if (!container) return;
  
  if (watchlist.length === 0) {
    if (emptyMessage) emptyMessage.style.display = 'block';
    if (container) container.innerHTML = '';
    return;
  } else {
    if (emptyMessage) emptyMessage.style.display = 'none';
  }
  
  fetch('show.json')
    .then(response => response.json())
    .then(shows => {
      const watchlistedShows = shows.filter(show => watchlist.includes(show.id));
      
      container.innerHTML = ''; 
      
      watchlistedShows.forEach(show => {
        const showElement = document.createElement('div');
        showElement.className = 'col-6 col-md-3 mb-3';
        showElement.innerHTML = `
          <a href="shows-template.html?id=${show.id}">
              <img src="${show.image}" class="watchlist-img mt-3 rounded shadow-sm">
          </a>
        `;
        container.appendChild(showElement);
      });
    })
    .catch(error => {
      console.error('Error loading watchlist:', error);
      if (emptyMessage) {
        emptyMessage.style.display = 'block';
        emptyMessage.innerHTML = 'Error loading watchlist. Please try again.';
      }
    });
}