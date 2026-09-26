class UserService {

    constructor() {

        this.userMap = new Map()
    }

    insertUser({
        username,
        socketId,
        serverId
    }) {

        this.userMap.set(username, {
            socketId,
            serverId
        })
        console.log(this.userMap)
    }

    findUser(username) {

        return this.userMap.get(username)
    }

    removeUser(username) {

        this.userMap.delete(username)
    }
}

export default UserService