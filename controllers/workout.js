const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");


module.exports.addWorkout = (req, res) => {

    let newWorkout = new Workout({
        userId: req.user.id,
        name: req.body.name,
        duration: req.body.duration
    })

    Workout.findOne({name: req.body.name})
    .then(workout => {

        if (workout){
            return res.status(409).send({ error: "Workout already exists"});
        } else {

            return newWorkout.save()
            .then(savedWorkout => res.status(201).send(savedWorkout))
            .catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.getMyWorkouts = (req, res) => {

    Workout.find({userId: req.user.id})
    .then(workouts => {

        if (workouts.length > 0){

            return res.status(200).send({ workouts: workouts })

        } else {

            return res.status(404).send({ message: "No workouts found "});
        }
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.updateWorkout = (req, res) => {

    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration
    }

    Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, {new: true})
    .then(updatedWorkout => {

        if (updatedWorkout){

            return res.status(200).send({
                message: "Workout updated successfully",
                updatedWorkout: updatedWorkout
            })

        } else {

            return res.status(404).send({ error: "Workout not found"});
        }
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.completeWorkoutStatus = (req, res) => {

    let updatedWorkoutStatus = {
        status: "completed"
    }

    Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkoutStatus, {new: true})
    .then(updatedWorkout => {

        if (updatedWorkout){

            return res.status(200).send({
                message: "Workout updated successfully",
                updatedWorkout: updatedWorkout
            })

        } else {

            return res.status(404).send({ error: "Workout not found"});
        }
    })
    .catch(error => errorHandler(error, req, res));
}

module.exports.deleteWorkout = (req, res) => {

    Workout.findByIdAndDelete(req.params.workoutId)
    .then(deletedWorkout => {

        if (deletedWorkout){

            return res.status(200).send({ message: "Workout deleted successfully" });

        } else {

            return res.status(404).send({ error: "Workout not found" });
        }
    })
    .catch(error => errorHandler(error, req, res));
}