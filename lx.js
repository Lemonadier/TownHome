let imageFolders = {
        _1stFloor: [],
        _2ndFloor: [],
        Bathroom: [],
        Front: []
    };

const folders = ["_1stFloor", "_2ndFloor", "Bathroom", "Front"]

folders.forEach(foldername => {
    const ThatFolder = foldername;
    const fs = require('fs');

    fs.readdirSync(ThatFolder).forEach(file => {
    imageFolders[foldername].push(file.toString())
    });
})

console.log(imageFolders)