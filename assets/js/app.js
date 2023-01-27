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
//   });
//   switch (section) {
//     case ".songs-section1":
//       break;

//     case ".songs-section2":
//       let card = document.createElement("div");
//       card.classList.add("card");

//       card.innerHTML = `
//       <img src="${songs[0].album.cover_medium}" class="card-img-top" alt="album-cover">
//       <div class="card-body">
//         <h5 class="card-title">${songs[0].title}</h5>
//         <p class="card-text">${songs[0].artist.name}</p>
//         <a href="#" class="btn btn-primary">Play</a>
//       </div>
//     `;
//       songs_div.appendChild(card);

//       break;
//     case ".songs-section3":
//       let card2 = document.createElement("div");
//       card2.innerHTML = createCarousel

//       songs_div.appendChild(card2);

//       break;

//     default:
//       break;

const loadSong = function (song, section) {
  const songs_div = document.querySelector(section);
  songs_div.innerHTML = "";
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
  songs_div.appendChild(card);
};
const loadAlbum = function (section, ...albums) {
  const songs_div = document.querySelector(section);
  let card = document.createElement("div");
  card.innerHTML = createCarousel();
  songs_div.appendChild(card);
};

const createCarousel = function () {};

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

  const creaCarosolleconAlbiums = async function (params) {};
};
