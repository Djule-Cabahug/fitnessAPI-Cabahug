//[SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

//[SECTION] Routes
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user")

//[SECTION] Environment Setup
// const port = 4008;

//[SECTION] Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const corsOptions = {
	origin: ['http://localhost:3000'], 
	credentials: true,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://admin:admin1234@cluster0.nfz2mrq.mongodb.net/MTE?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))


//[SECTION] Backend Routes
//http://localhost:4000/users

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);


//[SECTION] Server Gateway Response

if(require.main === module){
	app.listen(process.env.PORT || 4000, () => {
		console.log(`API is now online on port ${process.env.PORT || 4000 }`)
	});
}

module.exports = {app, mongoose};