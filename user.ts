type User = {
    id: number
    username: string
    role: "member" | "contributor" | "admin"
}

type UpdateUser = Partial<User>

let nextUserId = 1

const users: User[] = [
    { id: nextUserId++, username: "john_doe", role: "member" },
    { id: nextUserId++, username: "jane_smith", role: "contributor" }
];


function updateUser(id: number, updates: UpdateUser) {
    const user = users.find(user => user.id === id)
    if (!user) {
        console.error("No user found")
        return
    }
    Object.assign(user, updates)
}

// Example updates:
updateUser(1, { username: "new_john_doe" });
updateUser(2, { role: "admin" });

console.log(users)

function addNewUser(newUser: Omit<User, "id">): User {
    const user: User = {
        id: nextUserId++,
        ...newUser
    }
    users.push(user as User)
    return user as User
}

// example usage:
addNewUser({ username: "joe_schmoe", role: "member" })

console.log(users)
