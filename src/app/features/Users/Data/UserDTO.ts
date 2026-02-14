export default class UserDTO{
    userId:number = 0;
    username:string = "";
    isActive:boolean = false;
    permissions:number = 0;
}

export const sampleUsersList:UserDTO[] = [
    {userId:1, username: "AhmedM204", isActive:true, permissions: 2},
    {userId:2, username: "BaraaBarmo", isActive:true, permissions: 6},
    {userId:3, username: "KhalidNass", isActive:false, permissions: 5},
    {userId:4, username: "MohammedAbdo", isActive:true, permissions: 0},
    {userId:5, username: "MohamedBakri", isActive:true, permissions: 1},
]

