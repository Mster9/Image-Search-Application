const apiKey = "563492ad6f917000010000019b983f3b62fe43daa92e746d4553dd35";
const input = document.querySelector("input");
const searchBtn = document.querySelector(".search_btn");

let page_num = 1;
let search_text = "";
let search = false;

input.addEventListener("input", (event) => {
  event.preventDefault();
  search_text = event.target.value;
});

searchBtn.addEventListener("click", () => {
  if (input.value === "") {
    alert("Please enter some text");
    return;
  }
  cleargallery();
  search = true;
  SearchPhotos(search_text, page_num);
});

function cleargallery() {
  document.querySelector(".display_images").innerHTML = "";
  page_num = 1;
}

function displayImages(response) {
  response.photos.forEach((image) => {
    const photo = document.createElement("div");
    photo.innerHTML = `<img src=${image.src.large2x}>
        <figcaption> Photo By: ${image.photographer}</figcaption>`;
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

SearchPhotos(search_text, page_num);
