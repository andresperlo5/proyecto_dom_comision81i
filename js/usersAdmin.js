const tBody = document.getElementById('tBody');
const users = JSON.parse(localStorage.getItem('users'))
const userLs = JSON.parse(localStorage.getItem('user'))

tBody.innerHTML =
  users
    .filter((user) => user.id !== userLs.id)
    .map((user) =>
      `
    <tr>
        <th scope="row">${user.id}</th>
        <td>${user.user}</td>
        <td product-id="${user.id}">${user.role}</td>

        <td>
        <button class="btn btn-danger" onclick="borrarProd(${user.id})">Eliminar</button>

        <!-- Button trigger modal -->
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal-${user.id}">
              Editar
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal-${user.id}" tabindex="-1" aria-labelledby="exampleModalLabel-${user.id}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel-${user.id}">Modificar Usuario: ${user.user}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="inputNameProd" aria-describedby="emailHelp" value="${user.user}" name="nameProd">
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">Role</label>
                      <select class="form-select" aria-label="Seleccione un role" onchange="selectedRole(${user.id})">
                      <option id='${user.id}-option1' value="${user.role === 'user' ? 'admin' : 'user'}">Role Actual: ${user.role === 'user' ? 'Usuario' : 'Administrador'}</option>
                      <option id='${user.id}-option2' value="${user.role === 'user' ? 'admin' : 'user'}">${user.role === 'user' ? 'Administrador' : 'Usuario'}</option>
                  </select>
                    </div>
                    
                    <button type="button" class="btn btn-primary" onclick="editarUsuario(${user.id})">Guardar Cambios</button>
                </form>
                </div>
                
                </div>
            </div>
            </div>
        </td>
    </tr>
    `
    ).join('')

const userOptions = {
  user: '',
  role: ''
}


const selectedRole = (id) => {
  const optionSelect = document.getElementById(`${id}-option1`).value;

  console.log(optionSelect);
}

const editarUsuario = (id) => {
  console.log(id)
}