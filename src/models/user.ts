interface User {
    id: string
    name: string
    email: string
    surName: string
    role: string
    imageUrl: string
    [key: string]:string
}

export default User;