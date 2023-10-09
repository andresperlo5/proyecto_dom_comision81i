const buttonLogout = document.getElementById('idLogout')

const logoutUser = () => {
    const users = JSON.parse(localStorage.getItem('users'))
    const user = JSON.parse(localStorage.getItem('user'))
    const posicionUser = users.findIndex((userLS) => userLS.id === user.id)

    user.login = false
    users[posicionUser] = user
    localStorage.removeItem('user')
    localStorage.setItem('users', JSON.stringify(users))

    setTimeout(() => {
        location.href = '../index.html'
    }, 2000)
}


buttonLogout.addEventListener('click', logoutUser)