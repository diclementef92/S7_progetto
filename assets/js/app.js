// fetch from url
// @param query text
// @return array of results
const getData = async function (query) {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
  );
  if (response.ok) {
    let data = await response.json();
    return data;
  } else {
    console.log("HTTP-Error:", response.status);
  }
};

//load songs searched by artist
//@param songs array to load
const loadSongsByArtist = function (songs, section) {
  const songs_div = document.querySelector(section);
  songs_div.innerHTML = "";

  songs.forEach((song) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mb-3");
    card.classList.add("p-0");

    card.innerHTML = `
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${song.album.cover_medium}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${song.title_short}</h5>
          <p class="card-text">${song.artist.name}</p>
          <a href="#" class="btn btn-primary">Play</a>
          </div>
      </div>
    </div>`;
    songs_div.appendChild(card);
  });
};

const loadSong = function (song, section) {
  const song_div = document.querySelector(section);
  song_div.innerHTML = "";
  let card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
      <img src="${song.album.cover_medium}" class="card-img-top" alt="album-cover">
      <div class="card-body">
        <h5 class="card-title">${song.title}</h5>
        <p class="card-text">${song.artist.name}</p>
        <a href="#" class="btn btn-primary">Play</a>
      </div>
    `;
  song_div.appendChild(card);
};

const createCarousel = function (albums, section) {
  console.log(albums);
  const albums_div = document.querySelector(section + " .carousel-inner");
  albums.forEach((album) => {
    albums_div.innerHTML += `<div class="carousel-item">
    <img src="${album.album.cover_medium}" class="d-block w-100" alt="...">
    <div class="carousel-caption d-none d-md-block">
        <h5>${album.album.title}</h5>
        <p>${album.artist.name}</p>
    </div>
</div> `;
  });

  const first_item_active = document.querySelector(
    ".carousel-item:first-of-type"
  );
  first_item_active.classList.add("active");
};

window.onload = () => {
  let preferredArtist = document.querySelector("#preferred-artist");
  let preferredSong = "Blue (Da Ba Dee)";
  let preferredAlbums = ["il ballo della vita", "celebration"];

  preferredArtist.textContent = "shakira";

  getData(preferredArtist.textContent).then((data) =>
    loadSongsByArtist(data.data, ".songs-section1")
  );

  getData(preferredSong).then((data) =>
    loadSong(data.data[0], ".songs-section2")
  );

  async function retriveAlbums(preferredAlbums) {
    let result = [];
    for (let i = 0; i < preferredAlbums.length; i++) {
      await getData(preferredAlbums[i]).then((data) =>
        result.push(data.data[0])
      );
    }
    return result;
  }
  retriveAlbums(preferredAlbums).then((albums) =>
    createCarousel(albums, ".songs-section3")
  );
};
