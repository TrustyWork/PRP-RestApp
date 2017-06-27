const usersDB = require('../user');
const dbSaver = require('./dbSaver');


const saveModelsToDb = function(...models){
    //models[0]['594838ead864db14ec3de590']['username']="Lena" //modify some property
    models.forEach(function (docs){
        for(let document in docs){
            if (!(docs[document].isModified())) {
                continue;
            }
            console.log(`${docs[document]} ${docs[document].isModified()}`)
            docs[document].save();
        }
    })

};

module.exports = dbSaver(function(){
    saveModelsToDb(usersDB)
});
