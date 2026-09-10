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
}
export default UserService