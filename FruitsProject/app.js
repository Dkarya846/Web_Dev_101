const mongoose = require("mongoose");

//connecting and creating the database persons
mongoose.connect("mongodb://localhost:27017/personsDB");

const fruitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Peaches",
    rate: 7,
    review: "Peaches are yummy!"
})


const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    favorite_fruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "John Wick",
    age: 37
});

// person.save();




const pineapple = new Fruit({
    name: "Pineapple",
    rate: 8,
    review: "Pineapple are awesome!!"
})

// pineapple.save()

const person2 = new Person({
    name: "Amy",
    age: 12,
    favorite_fruit: pineapple
})

// person2.save()
const grapes = new Fruit({
    name: "Grapes",
    rate: 10,
    review: "Grapes are so sweet"
})

grapes.save()

Person.updateOne({ _id: "618bf07e886d587d38593e54" }, { favorite_fruit: grapes }, (error) => { })

// person.save()



// Fruit.updateOne({ _id: "618bdab915e2d74a49e53bb5" }, { name: "Peaches Bugged" }, (error) => {
//     if (error) {
//         console.log(error)
//     } else {
//         console.log("Updated Successfully")
//     }
// })


// Fruit.deleteOne({ _id: "618beb9872c26ae98654be5a", function() { } });

// Person.deleteMany({ "name": "John Wick" }, function () { })

Person.find((err, fruits) => {
    if (err) {
        console.log(err)
    } else {
        // mongoose.connection.close()
        fruits.forEach(fruit => {
            console.log(fruit._id, fruit.name)
        })
    }
})
