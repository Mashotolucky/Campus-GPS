const {pool} = require("../config/dbconfig");


const createStudentDb = async ({userID, id_no, campus }) =>{

    try {
        const student = await pool.query(
            `INSERT INTO student(userID, id_no, campus)
             VALUES($1, $2, $3)
             RETURNING userID, id_no, campus`,
             [userID, id_no, campus]
        );
        const mytenant = student.rows[0];
        console.log(mytenant);
        return mytenant;
    } catch (error) {
        throw error;
    }
};

const getAllStudentsDb = async () =>{
    try {
        const student = await pool.query(
            "select * from users, student where users.ID = student.userID ORDER BY users.name"  
        );
        const allTenants = student.rows;
        console.log(allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getTotalStudentsDb = async () =>{
    try {
        const student = await pool.query(
            "select * from users, student where users.ID = student.userID ORDER BY users.name"  
        );
        const allTenants = student.rowCount;
        console.log("number", allTenants);

        return allTenants;
    } catch (error) {
        throw error;
    }
};

const getStudentById = async (id) => {
    const {rows: student} = await pool.query(`select * from users, student 
    where users.ID = student.userID
    AND student.ID = $1`,[id]);

    console.log(student[0]);
    return student[0]
};

module.exports = {
    createStudentDb,
    getAllStudentsDb,
    getTotalStudentsDb,
    getStudentById
}