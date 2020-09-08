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
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);

            this.writeFile(rows);

            return row.id;
        },
        update(row) {
            let rows = this.readFile();
            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            }); 

            this.writeFile(updatedRows);

            return row.id;
        },
        destroy(id) {
            let items = this.readFile();
            
            let filteredItems = items.filter(currentItem => currentItem.id != id );
            
            this.writeFile(filteredItems);
        }
    }

}

module.exports = model;