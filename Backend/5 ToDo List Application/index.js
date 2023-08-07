import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const day = new Date().getDay();
const month = new Date().getMonth();
const date = new Date().getDate();
const year = new Date().getFullYear();

const tasks = {
    today: [],
    work: []
};

const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get("/", (req, res) => {
    res.render("./index.ejs", {
        day: allDays[day],
        month: allMonths[month],
        date: date,
        year: year,
        task: tasks.today
    });
});

app.get("/work", (req, res) => {
    res.render("./work.ejs", { task: tasks.work });
});

app.post("/", (req, res) => {
    tasks.today.push(req.body["taskItem"]);
    res.render("./index.ejs", {
        day: allDays[day],
        month: allMonths[month],
        date: date,
        year: year,
        task: tasks.today
    });
});

app.post("/work", (req, res) => {
    tasks.work.push(req.body["taskItem"]);
    res.render("./work.ejs", { task: tasks.work });
});

app.listen(port, () => {console.log(`Server has been started at port ${port}`)});