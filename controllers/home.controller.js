const getHomePage = async(req, res, next) => {
    res.render("index", {title: "Dream Boarding House"})
}

module.exports = {
    getHomePage
}