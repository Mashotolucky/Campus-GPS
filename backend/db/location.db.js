const {pool} = require("../config/dbconfig");

const getLocationByNameDb = async(name) =>{
    
    try {
       const location = await pool.query(
        `SELECT json_build_object(
            'location', json_agg(location.*),
            'waypoints', json_agg(waypoints.*)
        ) AS data
    FROM location
    LEFT JOIN waypoints ON location.id = waypoints.locationID
    WHERE location.name = $1;
        `,[name]
    );

    const alternative = await pool.query(
        `SELECT json_build_object(
            'location', json_agg(location.*),
            'alternatives', json_agg(alternative_waypoints.*)
        ) AS data
    FROM location
    LEFT JOIN alternative_waypoints ON location.id = alternative_waypoints.locationID
    WHERE location.name = $1;
        `,[name]
    );

    const alternative_two = await pool.query(
        `SELECT json_build_object(
            'location', json_agg(location.*),
            'alternatives_two', json_agg(alternative_waypoints_two.*)
        ) AS data
    FROM location
    LEFT JOIN alternative_waypoints_two ON location.id = alternative_waypoints_two.locationID
    WHERE location.name = $1;
        `,[name]
    );
    const data = {
        mainroute: location.rows[0],
        alternative: alternative.rows[0],
        alternative_two: alternative_two.rows[0]
    }
    console.log(data);
    return data; 
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getLocationByNameDb
}