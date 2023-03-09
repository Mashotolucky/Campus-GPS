const {pool} = require("../config/dbconfig");

const createLecturetDb = async ({userID,  campus }) =>{

    try {
        const lecture = await pool.query(
            `INSERT INTO lecture(userID, campus)
             VALUES($1, $2)
             RETURNING userID, campus`,
             [userID, campus]
        );
        const mytenant = lecture.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

const getAllLecturesDb = async () =>{
    try {
        const lecture = await pool.query(
            "select * from users, lecture where users.ID = lecture.userID ORDER BY users.name"  
        );
        const allTenants = lecture.rows;
        console.log(allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getTotalLecturesDb = async () =>{
    try {
        const lecture = await pool.query(
            "select * from users, lecture where users.ID = lecture.userID ORDER BY users.name"  
        );
        const allTenants = lecture.rowCount;
        console.log("number", allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getLectureById = async (id) => {
    const {rows: lecture} = await pool.query(`select * from users, lecture 
    where users.ID = lecture.userID
    AND student.ID = $1`,[id]);

    console.log(lecture[0]);
    return lecture[0]
};

module.exports = {
    createLecturetDb,
    getAllLecturesDb,
    getTotalLecturesDb,
    getLectureById
}