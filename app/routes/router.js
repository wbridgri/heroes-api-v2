const express = require('express');
const router = express.Router();
const axios = require('axios')

const PORT = process.env.PORT || 3000

router.use(express.static('public'));

//  Root Route => localhost:3000/api
router.get('/api', (req, res) => {
    res.json({
        'Heroes': `http://localhost:${PORT}/api/hero`, //this endpoint 'hero' needs to match the same name for the mysql table
        'Franchises': `http://localhost:${PORT}/api/franchise`,
        'Powers': `http://localhost:${PORT}/api/power`,
        'Species': `http://localhost:${PORT}/api/species`,
        'Teams': `http://localhost:${PORT}/api/team`
    })
});
let heroCount = 0

axios.get(`http://localhost:${PORT}/api/hero/count`).then(resp => heroCount = resp.data.count)

const endpoints = [
    'hero',
    'power',
    'species',
    'franchise',
    'team'
]

for(let i =0; i < endpoints.length; i++) {
    const endpoint = endpoints[i]
    if( endpoint == 'hero') {
        router.get(`/${endpoints}`, (req, res) => {

            const url = `http://localhost:${PORT}/api/${endpoint}`

            axios.get(url)
                .then(resp => {
                    res.render('pages/allHero', {
                        title: 'All Heroes',
                        name: 'All Heroes',
                        data: resp.data,
                        endpoints
                    })
                })
            
        })
            router.get(`/${endpoints}/:id`, (req, res) => {
                const id = req.params.id

                const url = `http://localhost:${PORT}/api/${ensdpoint}/${id}`

                axios.get(url)
                    .then(resp => {
                        let heroName = resp.data.hero_name == null ? `${resp.data.first_name} ${resp.data.last_name}` : resp.data.hero_name

                        res.render('pages/heroSingle', {
                            title: heroName,
                            name: heroName,
                            data: resp.data,
                            count: heroCount,
                            endpoints
                        })
                    })
        })
    } else {
        router.get(`/${endpoint}`, (req, res) => {
            const url = `http://localhost:${PORT}/api/${endpoint}`
        })
    }

} 


//  homepage
router.get('/', (req, res)=> {
    //res.render(path =>where are we rendering, obj => what are we rendering)
    res.render('pages/home', {
        title: 'Home Page',
        name: 'My Hero Website'
    })
})

//  hero page => localhost:3000/heroes
// router.get('/heroes', (req, res)=> {
//     //  make our fetch call
//     const url = `http://localhost:${PORT}/api/hero`

//     axios.get(url).then(resp => {


//         res.render('pages/allHero', {
//             title: 'All Heroes',
//             name: 'All Heroes ...and some villains too',
//             data: resp.data,
//             endpoints
//         })
//     })
// })

// router.get('/heroes/:id', (req, res) =>{

//     const id = req.params.id

//     const url = `http://localhost:${PORT}/api/hero/${id}`

//     axios.get(url)
//         .then(resp => {
//             let heroName = resp.data.hero_name == null ? `${resp.data.first_name} ${resp.data.last_name}` : resp.data.hero_name

//             res.render('pages/heroSingle', {
//                 title: heroName,
//                 name : heroName,
//                 data: resp.data,
//                 count: heroCount,
//                 endpoints
//             })
//         })
// })

//powers

// router.get('/power', (req, res)=> {

//     axios.get('http://localhost:3000/api/power')
//     .then(resp => {
//         // console.log(resp)
//         res.render('pages/allPower', {
//             title: 'Powers',
//             name: 'All of the Powers',
//             data: resp.data,
//             endpoints
//         })
//     })
// } )

// router.get('/power/:power', (req, res)=> {

//     const power = req.params.power

//     const url = `http://localhost:${PORT}/api/power/pow/${power}`

//     axios.get(url)
//         .then(resp => {

//             res.render('pages/powerSingle', {
//                 title: power,
//                 name: power,
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })

// router.get('/species', (req, res)=> {

//     const url = `http://localhost:${PORT}/api/species`

//     axios.get(url)
//         .then(resp=> {
//             res.render('pages/allSpecies', {
//                 title: 'Species',
//                 name: 'All Species',
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })

// router.get('/species/:species', (req, res)=> {

//     const species = req.params.species

//     const url = `http://localhost:${PORT}/api/species/species/${species}`

//     axios.get(url)
//         .then(resp => {
//             res.render('pages/speciesSingle', {
//                 title: species,
//                 name: species,
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })

// router.get('/franchise', (req, res)=> {

//     const url = `http://localhost:${PORT}/api/franchise`

//     axios.get(url)
//         .then(resp => {
//             res.render('pages/allFranchise', {
//                 title: 'Franchise',
//                 name: 'All Franchises',
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })

// router.get('/franchise/:franchise', (req, res)=> {

//     const franchise = req.params.franchise

//     const url = `http://localhost:${PORT}/api/franchise/fran/${franchise}`

//     axios.get(url)
//         .then(resp => {
//             res.render('pages/franchiseSingle', {
//                 title: franchise,
//                 name: franchise,
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })

// router.get('/team', (req, res)=> {

//     const url = `http://localhost:${PORT}/api/team`

//     axios.get(url)
//         .then(resp => {
//             res.render('pages/allTeam', {
//                 title: 'Team',
//                 name: 'All Teams',
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })

// router.get('/team/:team', (req, res)=> {

//     const team = req.params.team

//     const url = `http://localhost:${PORT}/api/team/team/${team}`

//     axios.get(url)
//         .then(resp => {
//             res.render('pages/teamSingle', {
//                 title: team,
//                 name: team,
//                 data: resp.data,
//                 endpoints
//             })
//         })
// })



module.exports = router;