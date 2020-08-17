const fs = require('fs');
const path = require('path');

let model = function (tableName) {
    return {

        filePath: path.join(__dirname, '../data/' + tableName +'.json'),

        readFile() {
            let fileContents = fs.readFileSync(this.filePath, 'utf-8');
        
            if(fileContents) {
                return JSON.parse(fileContents);
            }
        
            return [];
        },  

        all() {
            return this.readFile();
        },

        find(id) {
            let rows = this.readFile();
            return rows.find(row => row.id == id);
        },
    }

}

module.exports = model;