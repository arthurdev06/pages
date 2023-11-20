function showPokemon(data) {
  document.querySelector(".medium-box").style.display = "flex";
  document.querySelector(".pokemon-name").innerHTML = `${data.name}`;
  document.querySelector(
    ".card"
  ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
  document.querySelector(
    ".small-box"
  ).innerHTML = `<h3 class="caracteristics-title">Características</h3>
          <p class="pokemon-type">Tipo: ${data.types[0].type.name}</p>
          <p class="pokemon-height">Altura: ${data.height}</p>
          <p class="pokemon-weight">Peso: ${data.weight}</p>
          <p>Vida: </p>
          <progress value="${data.stats[0].base_stat}" max="200" class="pokemon-hp">${data.stats[0].base_stat}%</progress>
          <p>Attack: </p>
          <progress value="${data.stats[1].base_stat}" max="200" class="pokemon-attack">${data.stats[1].base_stat}%</progress>
          <p>Defesa: </p>
          <progress value="${data.stats[2].base_stat}" max="200" class="pokemon-defense">${data.stats[2].base_stat}%</progress>
          <p>Atack Especial: </p>
          <progress value="${data.stats[3].base_stat}" max="200" class="pokemon-especial-attack">${data.stats[3].base_stat}%</progress>
          <p>Defesa Especial: </p>
          <progress value="${data.stats[4].base_stat}" max="200" class="pokemon-especial-defense">${data.stats[4].base_stat}%</progress>
          <p>Velocidade: </p>
          <progress value="${data.stats[5].base_stat}" max="200" class="pokemon-speed">${data.stats[5].base_stat}%</progress>`;
}

async function fetchApi(inputValue) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}?limit=251`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showPokemon(data);
    })
    .catch((err) => {
      window.alert("Pokemon não encontrado", err);
    });
}

function getInputValue() {
  const inputValue = document.querySelector("#search-pokemon").value;
  fetchApi(inputValue);
}
