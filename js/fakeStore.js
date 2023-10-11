const divCards = document.getElementById('idCards')
const products = JSON.parse(localStorage.getItem('products')) || []
const favorites = JSON.parse(localStorage.getItem('favorites')) || []

const divImg = document.getElementById('imgPrincipal')
const prodDest = JSON.parse(localStorage.getItem('prodDest'))

const inputSearch = document.getElementById('idInputSearch')



/* const keySecret = 'FgJBDxPQkYceta9a8DFjTDq9WIDCO5zF'
fetch(`https://api.giphy.com/v1/gifs/random?api_key=${keySecret}`)
.then(res => res.json())
.then(res => console.log(res.data.images.original.url)) */

/* fetch(`https://developer.marvel.com/v1/public/characters`)
.then(res => res.json())
.then(res => console.log(res.data.images.original.url)) */

if (prodDest.length > 0) {
  divImg.innerHTML = prodDest.map((prod) =>
    `
  <img src="${prod.image}" alt="" width="100%">
  
  `
  )
}

if (products.length === 0) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => localStorage.setItem('products', JSON.stringify(products)))
}

divCards.innerHTML = products.map((product) =>
  `
    <div class="card my-3 mx-3 card-class" style="width: 18rem;" >
      <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <div class="d-flex justify-content-center">
            <a href="../html/product.html?id=${product.id}" class="btn btn-primary w-75">Ver Mas</a>
            <button class="btn btn-success w-75" onclick="addFavorite(${product.id})">Añadir a Favoritos</button>
          </div>
        </div>
    </div>
    `
).join('')

const addFavorite = (id) => {
  const productFilter = products.filter((prod) => prod.id === id)

  if (favorites.length > 0) {
    const favFilter = favorites.filter((fav) => fav.id === id)
    favFilter.length > 0
      ?
      alert('El producto ya existe en favoritos')
      :
      favorites.push(productFilter[0])
    localStorage.setItem('favorites', JSON.stringify(favorites))
  } else {
    favorites.push(productFilter[0])
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

const searchFilter = (ev) => {
  const { value } = ev.target
  const filterSearch = products.filter((prod) => prod.title.toLowerCase().includes(value.toLowerCase()) || prod.description.toLowerCase().includes(value.toLowerCase()))
  filterSearch.length > 0
    ?
    divCards.innerHTML = filterSearch.map((product) =>
      `
    <div class="card my-3 mx-3 card-class" style="width: 18rem;" >
      <img src="${product.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <div class="d-flex justify-content-center">
            <a href="../html/product.html?id=${product.id}" class="btn btn-primary w-75">Ver Mas</a>
            <button class="btn btn-success w-75" onclick="addFavorite(${product.id})">Añadir a Favoritos</button>
          </div>
        </div>
    </div>
    `
    ).join('')

    :

    divCards.innerHTML = `<h2 class="text-center py-5">Lo que estas buscando no existe</h2>`

}

const sendEmail = () => {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "proferc23@gmail.com",
    Password: "2279791F8524FEC2EB826EC27556E24FC15E",
    To: 'andresperlo5@gmail.com',
    From: "proferc23@gmail.com",
    Subject: "Prueba",
    Body: "Probando..."
  }).then(
    message => alert(message)
  );
}

inputSearch.addEventListener('input', searchFilter)