import Database from "better-sqlite3";

const db = new Database("./data/equipments.db");

export function getById(id){
    return db.prepare(`SELECT * FROM equipments WHERE id = ?`).get(id)
}

export function getByCategory(category){
    return db.prepare(`SELECT * FROM equipments WHERE category = ?`).all(category)
}

export function del(id){
    return db.prepare(`DELETE FROM equipments WHERE id = ?`).run(id)
}

export function puti(n,c,b,p,q,id){
    return db.prepare(`UPDATE equipments SET name = ?, category = ?, brand = ?, price = ?, quantity = ? WHERE id = ?`).run(n,c,b,p,q,id)
}