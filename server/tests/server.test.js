const expect = require("expect")
const request = require("supertest")
const {ObjectID} = require("mongodb")

const {app} = require("./../server")
const {Todo} = require("./../models/todo")

const todos = [{
  _id: new ObjectID(),
  text: "First test to do"
},{
  _id: new ObjectID(),
  text: "Second test to do"
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos)
    done()
  })
})

describe("POST /todos" , () => {
  it("should create a new todo" , (done) => {
    var text = "MY TEST TEXT"

    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect( (res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res) => {
        if(err) {
          done(err)
          return
        }

        Todo.find({text}).then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done()
        }).catch((e) => done(e))
      })
  })

  it("should not create todo with invalid body data" , (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err){
          done(err)
          return
        }

        Todo.find().then( (todos) => {
          expect(todos.length).toBe(2);
          done()
        }).catch( (e) => done(e))
      })
  })
})


describe("GET /todos" , () => {
    it("should get all todos" , (done) => {
      request(app)
        .get("/todos")
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
  })

describe("Get /todos/:id" , () => {
    it("should return todo doc" , (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    })

    it("should return 404 if todo not found" , (done) => {
      var hexId = new ObjectID().toHexString()
      request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    })

    it("should return 404 for non-object ids" , (done) => {
      request(app)
        .get("/todos/123abc")
        .expect(404)
        .end(done)
    })
})

describe("Delete /todos/:id" , () => {
    it("should remove a todo", (done) => {
      var hexId = todos[1]._id.toHexString()
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect( (res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end( (err,res) => {
          if(err){
            done(err)
            return
          }

          Todo.findById(hexId).then( (todo) => {
            expect(todo).toNotExist()
            done()
          }).catch( (err) => done(e))
        })
    })

    it("should return 404 if todo is not found",(done) => {
      var hexId = new ObjectID().toHexString()
      request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    })

    it("should return 404 if object id is not valid",(done) => {
      request(app)
        .delete("/todos/123abc")
        .expect(404)
        .end(done)
      })
})

describe("Patch /todos/:id" , () => {
  it("should update the todo" , (done) => {
    var hexId = todos[0]._id.toHexString()
    var text = "my test text"
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA("number")
      })
      .end(done)
  })

  it("should clear completedAt when todo is not completed" , (done) => {
    var hexId = todos[1]._id.toHexString()
    var text = "my second test text"
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  })
})
