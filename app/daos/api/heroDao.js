const con = require('../../config/dbconfig')

const heroDao = { 
    table: 'hero',

    findHeroes: (res, table) => {
        con.execute(
            `SELECT ${table}.hero_id, ${table}.hero_name, ${table}.first_name, ${table}.last_name, ${table}.alias, f.franchise, s.species, ${table}.place_of_origin, ${table}.first_app, ${table}.alignment, ${table}.img_url
            FROM ${table}
            JOIN franchise f USING (franchise_id)
            JOIN species s USING (species_id)
            ORDER BY ${table}.hero_id;`,
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('Hero Dao Error: ', error)
                }
            }
        )
    },

    findHeroById: (res, table, id) => {
        let powers = [];
        let rivals = [];

        con.execute(
            `SELECT ${table}.hero_id, p.power
            FROM ${table}
            JOIN hero_to_power hp ON ${table}.hero_id = hp.hero_id
            JOIN power p ON p.power_id = hp.power_id
            WHERE ${table}.hero_id = ${id};`,
            (error, rows) => {
                if(!error) {
                    Object.values(rows).forEach( obj => { 
                        powers.push(obj.power)
                    })
                    con.execute(
                        `SELECT h1.hero_name,
                        CASE WHEN h1.hero_name IS NULL THEN
                        concat(h1.first_name, ' ', h1.last_name)
                        ELSE h1.hero_name
                        END hero,
                        CASE WHEN h2.hero_name IS NULL THEN
                        concat(h2.first_name, ' ', h2.last_name)
                        ELSE h2.hero_name
                        END rival
                        FROM hero_to_rival hr
                        JOIN hero h1 on h1.hero_id = hr.hero_id
                        JOIN hero h2 ON h2.hero_id = hr.rival_id
                        WHERE h1.hero_id = ${id};
                            `,
                            (error, rows) => {
                                if(!error) {
                                    Object.values(rows).forEach( obj => {
                                        rivals.push(obj.rival)
                                    })

                                    con.execute(
                                        `SELECT 
                                            ${table}.hero_id, 
                                            ${table}.hero_name, 
                                            ${table}.first_name, 
                                            ${table}.last_name, 
                                            ${table}.alias, 
                                            f.franchise,
                                            s.species, 
                                            ${table}.place_of_origin, 
                                            ${table}.first_app, 
                                            ${table}.alignment, 
                                            ${table}.img_url
                                        FROM ${table}
                                        JOIN franchise f USING (franchise_id)
                                        JOIN species s USING (species_id)
                                        WHERE ${table}.hero_id = ${id}`,
                                        (error, rows) => {
                                            rows.forEach(row => {
                                                row.powers = powers
                                                row.rivals = rivals
                                            })

                                            if(!error) {
                                                if(rows.length === 1) {
                                                    res.json(...rows)
                                                } else {
                                                    res.json(rows)
                                                }
                                            } else {
                                                console.log(`DAO Error: ${table} `, error)
                                            }
                                        }
                                    )
                                } else {
                                    console.log(error)
                                }
                            }
                    )
                }
            }
        )
    },

    findByAlignment: (res, table, alignment) => {
        con.execute(
            `SELECT ${table}.hero_id, ${table}.hero_name, ${table}.first_name, ${table}.last_name, ${table}.alias, f.franchise, s.species, ${table}.place_of_origin, ${table}.first_app, ${table}.alignment, ${table}.img_url
            FROM ${table}
            JOIN franchise f USING (franchise_id)
            JOIN species s USING (species_id)
            WHERE ${table}.alignment = '${alignment}'
            ORDER BY ${table}.hero_id;`,
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    }else {
                        res.json(rows)
                    }
                }else {
                    console.log(`DAO Error: ${table}`, error)
                }
            }

        )
    },

    sort: (res, table) => {
        con.execute(
            `SELECT ${table}.hero_id, ${table}.hero_name, ${table}.first_name, ${table}.last_name, ${table}.alias, f.franchise, s.species, ${table}.place_of_origin, ${table}.first_app, ${table}.alignment, ${table}.img_url
            FROM ${table}
            JOIN franchise f USING (franchise_id)
            JOIN species s USING (species_id)
            ORDER BY ${table}.hero_name, ${table}.last_name, ${table}.first_name;`,
            (error, rows) => {
                if(!error) {
                    if(rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('Hero Dao Error: ', error)
                }
            }
        )
    }
    
}

module.exports = heroDao


