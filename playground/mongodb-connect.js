//const MongoClient = require("mongodb").MongoClient
const {MongoClient, ObjectID} = require("mongodb")

MongoClient.connect("mongodb://localhost:27017/ToDoApp", (err,client) => {
  if(err){
    console.log("Error!Couldn't connect!!!")
    return
  }
  console.log("Success!Connected to MongoDB server")
  const db = client.db("ToDoApp")

  //read
  /*db.collection("ToDos").find({completed: false}).toArray().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2))
  }, (err) => {
    console.log("Failed to fetch data")
  })*/

  //write
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

  //client.close()
})
