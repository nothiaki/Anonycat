export const isAuth = () => {

    const user = localStorage.getItem('name');
    if (!user) return false

    return true
}