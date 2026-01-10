




function getUserRecordByName(name){
    const record = UserStorage.filter((user) => user.name == name);
    return record[0];
}


function getPosts(){
    
}


export default {getUserRecordByName, getPosts};

const UserStorage = [
    {id:1, name: "Tom", password:"abc"},
    {id:2, name: "Sam", password:"123"},
    {id:2, name: "Cherry", password:"q1w2"},
]

