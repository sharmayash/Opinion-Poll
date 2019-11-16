const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Opinion = require("./models/Opinion");

const app = express();

app.use(express.static("views"));
app.set("view engine", "ejs");

// body parser middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to mongodb
const dbURL =
  "mongodb+srv://yash:yash1234@cluster0-y2c3v.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("mongoDb connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  let { name, email, party, pets, pl, game } = req.body;

  Opinion.findOne({ email }).then(alreadyPolled => {
    if (alreadyPolled) {
      res.status(400).json({ error: "You already Polled" });
      console.log("You already Polled");
    } else {
      const newPoll = new Opinion({
        name,
        email,
        party,
        pets,
        pl,
        game
      });

      newPoll
        .save()
        .then(poll => console.log(poll))
        .catch(err => console.log(err));
    }
  });

  res.render("index", {
    message:
      "You polled Successfully, Click on button to view Polls Current Stats."
  });
});

app.get("/survey", (req, res) => {
  let parties = {
    bjp: {
      count: 0
    },
    shivsena: {
      count: 0
    },
    congress: {
      count: 0
    }
  };
  let pets = {
    dogs: {
      count: 0
    },
    cats: {
      count: 0
    },
    rabits: {
      count: 0
    }
  };
  let pls = {
    py: {
      count: 0
    },
    js: {
      count: 0
    },
    java: {
      count: 0
    },
    "c++": {
      count: 0
    }
  };
  let games = {
    fortnite: {
      count: 0
    },
    pubg: {
      count: 0
    },
    apex: {
      count: 0
    },
    codm: {
      count: 0
    }
  };

  Opinion.find({})
    .then(opinions => {
      opinions.map(opinion => {
        if (opinion.party == "bjp") {
          parties.bjp.count += 1;
        }
        if (opinion.party == "congress") {
          parties.congress.count += 1;
        }
        if (opinion.party == "shivsena") {
          parties.shivsena.count += 1;
        }
        if (opinion.pets == "dog") {
          pets.dogs.count += 1;
        }
        if (opinion.pets == "cat") {
          pets.cats.count += 1;
        }
        if (opinion.pets == "rabit") {
          pets.rabits.count += 1;
        }
        if (opinion.pl == "Py") {
          pls.py.count += 1;
        }
        if (opinion.pl == "Js") {
          pls.js.count += 1;
        }
        if (opinion.pl == "Java") {
          pls.java.count += 1;
        }
        if (opinion.pl == "c++") {
          pls["c++"].count += 1;
        }
        if (opinion.game == "apex") {
          games.apex.count += 1;
        }
        if (opinion.game == "fortnite") {
          games.fortnite.count += 1;
        }
        if (opinion.game == "pubg") {
          games.pubg.count += 1;
        }
        if (opinion.game == "codm") {
          games.codm.count += 1;
        }
      });
    })
    .then(() => res.render("survey", { parties, pets, pls, games }))
    .catch(err => {
      console.log(err);
      res.render("index", { message: "Error Occurs" });
    });
});

app.listen(4000, () => console.log("server started"));
