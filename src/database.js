const mongoose = require("mongoose");
//import environment variables

mongoose.connect("mongodb+srv://imabhi:loveanjali@cluster0.2uce9kq.mongodb.net/?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then((db) => console.log("DB is connected")).catch((err) => console.error("There is a error", err));
