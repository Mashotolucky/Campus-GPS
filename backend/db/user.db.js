const {pool} = require("../config/dbconfig");


const createUserDb = async ({name,password, email, lastname, role}) =>{
    try {
        const user = await pool.query(
            `INSERT INTO users(name, password, email,lastname,role)
             VALUES($1, $2, $3, $4, $5)
             RETURNING ID, name, lastname, email, role, created_at`,
             [name, password, email, lastname, role]
        );
        const myuser = user.rows[0];
        console.log('user db',myuser);
        return myuser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const getUserByEmailDb = async (email) => {
    const {rows: exists} = await pool.query(
        "select * from users where lower(email) = lower($1)",
        [email]
    );
    return exists? exists[0]: false;
} 

// name varchar(100),
// 	lastname varchar(100),
// 	email varchar(100) unique,
// 	password varchar(100) not null,

module.exports = {
    createUserDb,
    getUserByEmailDb
}