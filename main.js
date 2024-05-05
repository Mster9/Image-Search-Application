const apiKey = "563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35";
const input = document.querySelector(".input");
const searchBtn = document.querySelector(".search_btn");
const loadMoreBtn = document.querySelector(".load_more_btn");
let page_num = 1;
let search_text = "";
let search = false;


async function fetchCategories() {
  const data = await fetch("https://api.pexels.com/v1/categories", {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  });
  const categories = await data.json();
  const categoryOptions = categories.map(category => `<option value="${category.name}">${category.name}</option>`).join("");
  input.insertAdjacentHTML("beforeend", categoryOptions);
}

fetchCategories();

input.addEventListener("input", (event) => {
  event.preventDefault();
  search_text = event.target.value;
});

searchBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter some text");
    return;
  }
  clearGallery();
  search = true;
  loadMoreBtn.classList.remove("hidden"); 
  SearchPhotos(search_text, page_num);
});

function clearGallery() {
  document.querySelector(".display_images").innerHTML = "";
  page_num = 1;
  loadMoreBtn.classList.add("hidden"); 
}

function displayImages(response) {
  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.classList.add("bg-white", "rounded-lg", "shadow-md", "p-4");
    photo.innerHTML = `<img src=${image.src.large2x} class="w-full h-48 object-cover rounded-lg mb-2">
                       <figcaption class="text-gray-700 font-semibold">${image.photographer}</figcaption>`;
    document.querySelector(".display_images").appendChild(photo);
  });
}

async function SearchPhotos(query, page_num) {
  const data = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  });
  const response = await data.json();
  console.log(response);
  displayImages(response);
}


loadMoreBtn.addEventListener("click", () => {
  page_num++;
  SearchPhotos(search_text, page_num);
});