const user = JSON.parse(localStorage.getItem('user'))

if (!user) {
    location.href = '../index.html';
} else {
    if (user.role === 'admin' && window.location.pathname !== '/html/admin.html') {
        location.href = '../html/admin.html';
    } else if (user.role === 'user' && window.location.pathname !== '/html/user.html') {
        location.href = '../html/user.html';
    }
}



