let express = require("express")
let mongoose = require("mongoose")
let bodyParser = require("body-parser")
let axios = require("axios")
let cors = require("cors")
let multer = require("multer")
let Users = require("./models/Users")
let Employees = require("./models/Employees")

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


mongoose.connect("mongodb://127.0.0.1:27017/MernStack")
mongoose.connection
    .once("open", () => { console.log("Connected to DB....."); })
    .on("error", () => { console.log("Problem to connect to DB ..!!!!!"); })


let storage = multer.diskStorage({
    destination: function (req, image, cb) {
        return cb(null, "./Images")
    },
    filename: function (req, image, cb) {
        return cb(null, `${image.originalname}`)
    }
});
let upload = multer({ storage });


app.post("/register", (req, res) => {
    Users.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered..")
            }
            else {
                let dataForDB = new Users(req.body)
                dataForDB.save()
                    .then((data) => { res.json("User registered successfully..."); })
                    .catch((error) => (res.json("Error while saving...")))
            }
        })
        .catch(() => {
            res.json("Error while registration..")
        })


})


app.post("/login", (req, res) => {
    Users.findOne({ email: req.body.email})
        .then((user) => {
            if (user.cnfPassword == req.body.password) {
                res.json({ "status": "success", "id": user._id});
            }
            else {
                res.json({ "status": "fail"})
            }
        })
        .catch(() => { res.json({ "status": "noUser"}) })

})

app.get("/user/:ID", (req, res) => {
    let ID = req.params.ID
    Users.findOne({ _id: ID })
        .then((e) => { res.json(e.name) })
        .catch(() => { console.log("User not found..."); })
})



app.post("/employees", upload.single("image"), (req, res) => {
    console.log(req.body);
    Employees.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("Email already registered..")
            }
            else {
                let dataForDB = new Employees({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    designation: req.body.designation,
                    gender: req.body.gender,
                    course: req.body.course,
                    image: req.file.filename
                })
                dataForDB.save()
                    .then((data) => { res.json("Employee registered successfully..."); })
                    .catch((error) => (res.json("Error while saving...")))
            }
        })
        .catch(() => {
            res.json("Error while registration...")
        })
})


app.get("/employee-list", (req, res) => {
    Employees.find()
        .then((e) => {
            res.send(e)
        })
})

app.get("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID
    Employees.findOne({ _id: ID })
        .then((e) => {
            res.send(e)
        })
        .catch(() => {
            res.send("Employee not found")
        })
})

app.put("/employee-list/:ID",upload.single('image'), (req, res) => {
    let ID = req.params.ID
    Employees.updateOne({ _id: ID }, req.body)
        .then((e) => { res.send("Data updated successfully..") })
        .catch(() => { res.send("Error while updating..."); })
})


app.delete("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID
   Employees.deleteOne({ _id: ID }, req.body)
        .then(() => { res.send("Employee deleted successfully..."); })
        .catch(() => { res.send("Error while deleting..."); })
})


app.listen(5000, () => {
    console.log("server listening at 5000....");
})
