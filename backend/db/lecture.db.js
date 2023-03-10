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

const updateLectureDb = async ({name,lastname, email, id, campus}) => {
    try {
     
     console.log(name);
     const { rows: user } = await pool.query(
       `UPDATE users set name = $1, lastname = $2, email = $3
         where ID = $4 returning name, email, lastname, ID`,
       [name, lastname, email, id]
     );
     const myuser=user[0];
   console.log(myuser);
     const {rows:lecture} = await pool.query(
         `UPDATE lecture set campus=$1 WHERE userID=$2  returning campus`,
     [campus, myuser.id]);
 
     return {myuser,lecture:lecture[0]}
 
    } catch (error) {
      throw error;
    }
 };

module.exports = {
    createLecturetDb,
    getAllLecturesDb,
    getTotalLecturesDb,
    getLectureById,
    updateLectureDb
}