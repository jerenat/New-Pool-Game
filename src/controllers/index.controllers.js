export const index = (req, res) => {
    res.render("index");
}

export const profile = (req, res) => {
    res.render("profile");
}

export const gameScene = async (req, res) => {

    // -- id de la sala
    const idroom = req.params.id;
    
    res.render("game");


}