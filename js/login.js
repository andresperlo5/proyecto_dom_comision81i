const inputUser = document.getElementById('idUser')
const inputPass = document.getElementById('idPass')
const buttonLog = document.getElementById('buttonLog')

const objForm = {
  user: '',
  pass: ''
}

const formValues = (ev) => {
  const { name, value } = ev.target
  objForm[name] = value
}

const sendForm = (ev) => {
  ev.preventDefault()
  const { user, pass } = objForm

  if (user && pass) {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const userExist = users.filter((userLS) => userLS.user === user)
      console.log(userExist)

      if (userExist.length === 0 || userExist[0].deleted) {
        return alert('usuario y/o contraseña incorrecto')
      }

      if(userExist[0].pass === pass){
        userExist[0].login = true
        localStorage.setItem('users', JSON.stringify(users))
        localStorage.setItem('user', JSON.stringify(userExist[0]))

        if(userExist[0].role === 'admin'){
          location.href='../html/admin.html'
        }else{
          location.href='../html/user.html'
        }

      }else{
        alert('usuario y/o contraseña incorrecto')
      }
  }
}

inputUser.addEventListener('input', formValues)
inputPass.addEventListener('input', formValues)
buttonLog.addEventListener('click', sendForm)
