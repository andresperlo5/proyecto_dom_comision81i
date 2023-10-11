const usersLs = JSON.parse(localStorage.getItem('users')) || []

if (usersLs.length === 0) {
    const users = [
        {
            id: 1,
            user: 'admin1',
            pass: '123456789',
            role: 'admin',
            login: false,
            deleted: false
        },
        {
            id: 2,
            user: 'admin2',
            pass: '123456789',
            role: 'admin',
            login: false,
            deleted: false
        },
    ]

    localStorage.setItem('users', JSON.stringify(users))
}

