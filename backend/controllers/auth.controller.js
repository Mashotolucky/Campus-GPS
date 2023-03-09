const USerService = require('../service/user.service');
const { roles } = require('../helpers/constant');
const userService = require('../service/user.service');

const register = async (req, res, next) => {
    if (!req.body)
        return next(new Error("All fields required"));

    const { name, password, email, lastname, role, campus, id_no} = req.body;
    let data = {};
    data = {
        name: name ? String(name).trim() : null,
        password: password ? String(password).trim() : null,
        email: email ? String(email).trim() : null,
        lastname: lastname ? String(lastname).trim() : null,
        campus: campus ? String(campus).trim() : null,
        id_no: id_no ? Number(id_no) : null,
        role: role
    }

    try {
        if (!data) return next(new Error("all fields required"));

        if (!data.role || !data.name || !data.password || !data.email || !data.lastname)
            return res.status(400).json({ message: `Missing/empty field found`, ...data });

        const user = await USerService.createUser(data);

        if(!user) return res.status(500).send("Something went wrong");
        

        return res.status(200).send(user);
    }catch(error){
        next(error);
    }
}

module.exports ={
    register
}