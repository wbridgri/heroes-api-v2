router.get(`/${endpoint}/:${endpoint}`, (req, res) => {
    const node = req.params.node
    const url; = `http://localhost:${PORT}/api/${endpoint}/${endpoint}}/${node}`

    axios.get(url)
        .then(resp => {
            res.render('pages/dataSingle', {
                title: node,
                name: node,
                data: data.resp,
                endpoints

            })
        })
})