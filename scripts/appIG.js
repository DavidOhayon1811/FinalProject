const auth = "563492ad6f9170000100000141bc0f91a3904f8bb60475c2e142ba57";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;
const errorMsg = document.querySelector(".error");

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  currentSearch = searchValue; // searchInput value
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateInput(event) {
  searchValue = event.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original} target="_blank">Download</a>
        </div>
        <img src=${photo.src.large}></img>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

async function searchPhotos(search) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  if (data.photos.length === 0) {
    const error = document.createElement("span");
    const back = document.createElement("a");
    back.setAttribute("href", "./ImageGallery.html");
    error.innerHTML = `
        A NEW SEARCH TRY ?
        <br>
        Found Nothing We Have
        <br>
        SORRY, WE COULDN'T FIND ANY PICTURES RELATED TO "${search}".
    `;
    back.innerHTML = "To get back";
    errorMsg.appendChild(error);
    errorMsg.appendChild(back);
    more.style.display = "none";
  }
  generatePhotos(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

curatedPhotos();

let darkmode = localStorage.getItem("darkmode");
const darkmodeBtn = document.querySelector(".darkmode");

const enableDarkmode = () => {
  document.body.classList.add("darkmode-active");
  localStorage.setItem("darkmode", "enabled");
};
const disableDarkmode = () => {
  document.body.classList.remove("darkmode-active");
  localStorage.setItem("darkmode", null);
};
if (darkmode === "enabled") {
  enableDarkmode();
}

darkmodeBtn.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  if (darkmode !== "enabled") {
    enableDarkmode();
    console.log(darkmode);
  } else {
    disableDarkmode();
    console.log(darkmode);
  }
});
