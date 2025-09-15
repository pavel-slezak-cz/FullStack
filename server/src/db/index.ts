import Database from 'better-sqlite3';
import * as fs from 'fs';
import * as path from 'path';

console.log('✅ Inicializace databáze startuje...');

const dbFile = path.resolve(__dirname, 'events.db');
const schemaFile = path.resolve(__dirname, 'schema.sql');

console.log('📂 DB file bude na:', dbFile);
console.log('📂 Schema file hledám na:', schemaFile);

if (!fs.existsSync(schemaFile)) {
    console.error('❌ Soubor schema.sql nebyl nalezen!');
} else {
    console.log('✅ Soubor schema.sql nalezen.');
}

const db = new Database(dbFile);

const schema = fs.readFileSync(schemaFile, 'utf8');
db.exec(schema);

console.log('✅ Schéma bylo načteno a databáze připravena.');

export default db;
