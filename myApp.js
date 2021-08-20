require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const Smith = new Person({
    name: "Smith Smithson",
    age: 18,
    favoriteFoods: ["Kale", "Blueberries"]
  });
  Smith.save((err, data) => 
    {
      if (err) {
        return done(err);
      }
      done(null, Smith);
    });
};

const arrayOfPeople = [{name: "Amy Amyson", age: 19, favoriteFoods: ["Fries", "Coffee"]}, {name: "Tom Tomson", age: 20, favoriteFoods: ["Spinach", "Salad"]}, {name: "Jill Jackson", age: 21, favoriteFoods: ["Bacon", "Potato"]}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).exec((err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).exec((err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, result) => {
    if (err) {
      return done(err);
    }
    done(null, result);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, individual) => {
    if (err) {
      return done(err);
    }
    individual.favoriteFoods.push(foodToAdd);
    individual.save((err, individual) => {
      if (err) {
        return done(err);
      }
      done(null, individual);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}).exec((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).exec((err, individual) => {
    if (err) {
      return done(err);
    }
    done(null, individual);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}).exec((err, removalData) => {
    if (err) {
      return done(err);
    }
    done(null, removalData);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: "asc"}).limit(2).select("name favoriteFoods").exec((err, data) => {
    if (err) {
      return done(err);
    }
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
