const fs = require('fs');
const path = require('path');

let model = function (tableName) {
    return {

        filePath: path.join(__dirname, '../data/' + tableName +'.json'),
        nextId() {
            let rows = this.readFile();
            let lastRow = rows.pop();

            if (lastRow) {
                return ++lastRow.id;
            }

            return 1;
        },
        writeFile(contents) {
            let fileContents = JSON.stringify(contents, null, " ");
            fs.writeFileSync(this.filePath, fileContents);
        },

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
        create(row) {
            // Microdesafío
            // 1. Leer el archivo
            // 2. Generar un nuevo id
            // 3. Agregar el registro
            // 4. guardar los cambios
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);

            return row.id;
        }
    }

}

module.exports = model;