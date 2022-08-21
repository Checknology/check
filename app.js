const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
// const dateData = require(__dirname,"date.js")

const app = express();
app.set("view engine", "ejs");// View engines allow us to render web pages using template files.

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")) //serve images, CSS files, and JavaScript files in a directory named public:

const dbname = "Items"
const uri ='mongodb+srv://Check:123456l@cluster0.28cvv.mongodb.net/'+dbname+'?retryWrites=true&w=majority';
mongoose.connect(uri)

const itemSchema = new mongoose.Schema({
    name : String,
})
const item = mongoose.model("Item",itemSchema)

const day = "Monday"// change later
const item1 = new item({
    name : "Happy "+day+" heres your task"
})

const item2 = new item({
    name : "Add Column"
})

const item3 = new item({
    name :"Delete Column"
})

const defaultItem = [item1,item2,item3]
// Check Remember this
// insert: array/variable
// delete: object

// item.deleteMany({name : "aefafa"},(err)=>{
//   if(err) console.log(err);
//   else 
//   console.log("Deleted")
// })



app.get("/",(req, res)=> {

item.find({},(err,founditems)=>{
  if(err) console.log(err);
  
  else

  if(founditems.length <1)
  {
    item.insertMany(defaultItem,(err)=>
    {
    if (err) console.log(err);
    else console.log("SuccessFully inSerted An Array");
    })
  }
  res.render("list", {listTitle: "Today", newListItems: founditems});
})
 
});

app.post("/", function(req, res){

  const newname = req.body.newItem; // from input
  const newItem = new item({
    name : newname
  })
  newItem.save()
  res.redirect("/")


});
app.post("/delete", function(req, res){
const delId = req.body.delBtn
item.findByIdAndRemove(delId,(err)=>{
  if(err)
  {
    console.log(err);
  }
  else
  console.log("ok");
  res.redirect("/")
})


});
app.get("/:custom", function(req,res){
  res.render(req.params.custom)
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000,(err)=> {
  if(err)console.log(err);
  console.log("Server started on port 3000");
});
