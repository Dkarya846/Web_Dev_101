const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin_dkarya:3Qn2fpIgfjo4BR1Q@cluster0.yndge.mongodb.net/todolistDB");

const itemsSchema = mongoose.Schema({
  name: { type: String, required: true }
})

const listSchema = mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const workItems = [];

app.get("/", (req, res) => {
  const day = date.getDate();


  Item.find({}, function (error, items) {
    if (error) {
      console.log(error);
    }
    else {
      if (items.length === 0) {
        Item.insertMany(defaultItems, function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("Task added sucessfully!!");
          }
        })
        res.redirect("/");
      }
      else {
        res.render("list", { listTitle: day, items });
      }
    }
  })
});


app.get("/:listName", (req, res) => {
  const customListName = _.capitalize(req.params.listName);

  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", { listTitle: customListName, items: foundList.items })
      }
    }
  });
});


app.post("/", (req, res) => {
  const listTitle = req.body.list;
  const item = req.body.new_item;

  const day = date.getDate();

  const newItem = new Item({
    name: item
  })

  if (day.includes(listTitle)) {
    newItem.save();
    res.redirect("/");
  }
  else {
    List.findOne({ name: listTitle }, (err, foundList) => {
      console.log("Called", foundList);
      if (err) {
        console.log(err);
      } else {
        foundList.items.push(newItem);
        foundList.save();
        res.redirect("/" + listTitle);
      }
    })
  }

});

//3Qn2fpIgfjo4BR1Q

app.post("/delete", (req, res) => {
  const checkedId = req.body.checkbox;
  const listName = req.body.list;
  const day = date.getDate();
  if (day.includes(listName)) {
    Item.findByIdAndDelete(checkedId, function (error) {
      if (!error) {
        console.log("Sucessfull deleted the task")
      }
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedId } } }, (err) => {
      if (!err) {
        res.redirect("/" + listName);
      }
    })
  }
})

// app.get("/work", (req, res) => {
//   res.render("list", { listTitle: "Work List", items: workItems });
// });


app.listen("3000", () => {
  console.log("Server started at http://localhost:3000");
});
