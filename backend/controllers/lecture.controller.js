const {updateLectureDb} = require("../db/lecture.db");

const updateLecture = async(req, res, next) => {
    try {
        const data = req.body;

        if(!data.email.includes("@tut4life.co.za")) {throw Error("Not a tut email")}

        const student = await updateLectureDb(data);

        return res.status(200).send(student);
    } catch (error) {
        next(error);
    }
}

module.exports ={
    updateLecture
}