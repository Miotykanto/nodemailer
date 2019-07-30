var SomeModel = require('../model/client.model')
var Prof = require('../model/prof.modele')

//Insertion enregistrement ELEVE (POST)
module.exports.Postliste = function (request, res) {

    var nom = request.body.nom;
    var prenom = request.body.prenom;
    var classe = request.body.classe;
    var age = request.body.age;

    SomeModel.find()
        .then(notes => {
            if (notes.length == 0) { //Verifie si le tableau est vide
                id = 0;
                console.log("tafiditra then", id);

            } else { //Verifie si le tableau n'est pas vide
                id = parseInt(notes[notes.length - 1].id) + 1;
            }


            const insertion = new SomeModel({ _id: id, nom: nom, prenom: prenom, age: age, classe: classe });
            (!nom || !prenom || !age || !classe) ? console.log('données insuffisantes') : insertion.save()
                .then(() => {
                    SomeModel.find()
                        .then(notes => {
                            res.send(notes);
                        })
                })
                .catch(e => {
                    res.status(500).send({ mes: e.mes || "Il y a d'erreur d'insertion" })
                })
        })
}


//Affichage enregistrement ELEVE SELECTIONNE (GET)
exports.GetSelected = (req, res) => {
    SomeModel.find({_id: req.params._id})
    .then(eleve => {
        Prof.find()
            .then(prof => {
                for( let i=0; i<prof.length; i++){
                    if(prof[i].classeOccupe.classe1==eleve[0].classe || prof[i].classeOccupe.classe2==eleve[0].classe || prof[i].classeOccupe.classe3==eleve[0].classe){
                        eleve.push(prof[i])
                    }
                }
                res.send(eleve)
            })
    })
}





//Affichage enregistrements ELEVES (GET)
exports.GetListe = (req, res) => {
    
      SomeModel.find()
      .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "GET impossible!!!"
        });
    });
    }
