const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";

window.onload = window.localStorage.clear();

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      localStorage.setItem("next_fetch", response.info.next);
      const characters = response.results;
      let output = characters
        .map(character => {
          return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `;
        })
        .join("");
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
};

const loadData = async () => {
  if (localStorage.getItem("next_fetch") === null) {
    return await getData(API);
  } else if (localStorage.getItem("next_fetch") === "") {
    intersectionObserver.unobserve($observe);
    return alert("Ya no hay personajes");
  } else {
    return await getData(localStorage.getItem("next_fetch"));
  }
};

const intersectionObserver = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    rootMargin: "0px 0px 100% 0px"
  }
);

intersectionObserver.observe($observe);

