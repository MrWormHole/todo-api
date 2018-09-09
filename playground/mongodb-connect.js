//const MongoClient = require("mongodb").MongoClient
const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err,client) => {
  if(err){
    console.log("Error!Couldn't connect!!!")
    return
  }
  console.log("Success!Connected to MongoDB server")
  const db = client.db("ToDoApp")
  //CRUD(create,retrive,update,delete)

  //write(creating)
  /*db.collection("ToDos").insertOne({
    text: "Something to do",
    completed: false
  },(err,res) => {
    if(err){
      console.log("Error!Couldn't insert")
      return
    }
    console.log("Success!Inserted this one: " + JSON.stringify(res.ops,undefined,2))
  })*/

  //read(retriving)
  /*db.collection("ToDos").find({completed: false}).toArray().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2))
  }, (err) => {
    console.log("Failed to fetch data")
  })*/

  //deleteMany
  /*db.collection("ToDos").deleteMany({
    text: "Eat lunch"
  }).then( (result) => {console.log(result)} )*/

  //deleteOne
  /*db.collection("ToDos").deleteOne({
    text: "Eat lunch"
  }).then( (result) => {console.log(result)} )*/

  //findOneAndDelete
  /*db.collection("ToDos").findOneAndDelete({
    completed : false
  }).then( (result) => {console.log(result)})*/

  //client.close()
})
