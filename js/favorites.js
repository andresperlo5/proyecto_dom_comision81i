const cardsFav = document.getElementById('cardsFav')
const favoritesLs = JSON.parse(localStorage.getItem('favorites')) || []

cardsFav.innerHTML = favoritesLs.map((fav) =>
    `
<div class='col-12 col-md-4 col-lg-3 mx-3'>
    <div class="card" style="width: 18rem;" >
        <img src="${fav.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${fav.title}</h5>
            <button class="btn btn-outline-primary"  onclick="deleteFav(${fav.id})">Eliminar</button>
        </div>
    </div>
</div>
`
).join('')

const deleteFav = (id) => {
    const confirmDelete = confirm('Si estas seguro de que quieres eliminar este producto de Favoritos?')

    if (confirmDelete) {
        const filterFav = favoritesLs.filter((fav) => fav.id !== id)
        localStorage.setItem('favorites', JSON.stringify(filterFav))
        location.reload()
    }
}