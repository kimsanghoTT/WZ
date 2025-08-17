import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8.0.3/+esm';

export const callDB = openDB("boardDB", 1, {
    upgrade(db){
        if(!db.objectStoreNames.contains('posts')){
            db.createObjectStore('posts', {keyPath:'id', autoIncrement:true});
        }
    }
})

export const addPost = async () => {
    const db = await callDB;
    return db.add('posts', post);
}

export const getAllPosts = async () => {
    const db = await callDB;
    return db.getAll('posts');
}

export const getPostDetail = async (id) => {
    const db = await callDB;
    return db.get('posts', id);
}