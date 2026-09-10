class UserService{
    constructor(){
        this.userMap = new Map()
    }
    insertUser({
        username,
        socketId,
    }){
        this.userMap.set(username,socketId)
        console.log(this.userMap)
    }
    findUserSocketId(username){
        const socketId = this.userMap.get(username)
        return socketId;
    }
}
export default UserService