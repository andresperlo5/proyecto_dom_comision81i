const inputUser = document.getElementById('idInputUser')
const inputPass = document.getElementById('idInputPass')
const inputRpass = document.getElementById('idInputRpass')
const check = document.getElementById('idCheck')
const buttonReg = document.getElementById('buttonReg')

const objForm = {
    user:'',
    pass:'',
    rpass:'',
    check: false
}

const formValues = (ev) => {
    const { name, value } = ev.target
    if(name === 'check'){
       objForm[name] = check.checked
    }
    objForm[name] = value
}

const sendForm = (ev) => {
    ev.preventDefault()
    console.log(objForm)
    const { user, pass, rpass, check } = objForm

    if(user && pass && rpass){
        if(pass === rpass){
            const users = JSON.parse(localStorage.getItem('users')) || []
            const userExist = users.filter((userLS) => userLS.user === user)

            if(userExist.length > 0){
                return alert('el usuario ya existe')
            }

            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                user,
                pass,
                role: 'user',
                login: true
            }

            users.push(newUser)
            
            localStorage.setItem('users', JSON.stringify(users))
            localStorage.setItem('user', JSON.stringify(newUser))

            setTimeout(() => {
                location.href = '../html/user.html'
            }, 1000)
        }else{
            alert('las contraseñas no coinciden')
        }
    }


}

inputUser.addEventListener('input', formValues)
inputPass.addEventListener('input', formValues)
inputRpass.addEventListener('input', formValues)
check.addEventListener('click', formValues)
buttonReg.addEventListener('click', sendForm)