const {ObjectID} = require("mongodb")

const { mongoose } = require("./../server/db/mongoose")
const { Todo } = require("./../server/models/todo")
const { User } = require("./../server/models/user")

//var id = "5b9527a91afde56413c21bf9"

/*Todo.find({
  _id: id
}).then( (todos) => {
  console.log("Todos: " + todos)
})

Todo.findOne({
  _id: id
}).then( (todo) => {
  console.log("Todo: " + todo)
})*/

/*Todo.findById(id).then( (todo) => {
  if(!todo){
    console.log("id not found")
    return
  }
  console.log("Todo: " + todo)
}).catch((e) => console.log(e))*/

/*Todo.findById("5b9527a91afde56413c21bf9").then( (user) => {
  if(!user){
    console.log("Unable to find user")
    return
  }

  console.log(JSON.stringify(user,undefined,2))
}).catch((e) => console.log(e))*/

//deletes all data
/*Todo.remove({}).then( (result) => {
  console.log(result)
})*/

//Todo.findOneAndRemove
//Todo.findByIdAndRemove
