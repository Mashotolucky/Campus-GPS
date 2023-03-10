const {updateStudentDb} = require("../db/student.db");

const updateStudent = async(req, res, next) => {
    try {
        const data = req.body;

        if(!data.email.includes("@tut4life.co.za")) {throw Error("Not a tut email")}

        const student = await updateStudentDb(data);

        return res.status(200).send(student);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateStudent
}