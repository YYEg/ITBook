import {$authHost, $host} from "./index";

//Класс отвечает за запросы к API к беку

//Запрос создать жанр
export const createGenre = async (genre) => {
    const {data} = await $authHost.post('api/genre', genre);
    return data;
}

//Запрос получить жанры
export const fetchGenres = async () => {
    const {data} = await $host.get('api/genre');
    return data;
}

//Запрос удалить жанр
export const deleteGenre = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/genre/'+id});
    return data;
}

//Запрос создать автора
export const createAuthor = async (author) => {
    const {data} = await $authHost.post('api/author', author);
    return data;
}

//Запрос получить авторов
export const fetchAuthor = async () => {
    const {data} = await $host.get('api/author');
    return data;
}

//Запрос удалить автора
export const deleteAuthor = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/author/'+id});
    return data;
}

//Запрос создать книгу
export const createBook = async (book) => {
    const {data} = await $authHost.post('api/book', book);
    return data;
}

//Запрос получить книги
export const fetchBook = async (genreId, authorId, page, limit = 15) => {
    const {data} = await $host.get('api/book', {params: {
            genreId, authorId, page, limit
        }});
    return data;
}

//Запрос получить одну книгу
export const fetchOneBook = async (id) => {
    const {data} = await $host.get(`api/book/${id}`);
    return data;
}

//Запрос удалить книгу
export const fetchDeleteBook = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/book/${id}`});
    return data;
}

//Запрос обновить книгу
export const updateBook = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/book/${id}`, data: body});
    return data;
}

//Запрос получаить все книги в админке
export const getAllBooksInAdminPage = async (name, page = 1, filter = "All") => {
    const {data} = await $authHost({method:'GET', url:`api/book/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}

//Запрос добавить книгу на полку т.е. в список избранных
export const addBookToBookshelf = async (book) => {
    const {data} = await $authHost.post('api/bookshelf', book);
    return data;
}

//Запрос получить книгу из списка избранных
export const getBookFromBookshelf = async () => {
    const {data} = await $authHost.get('api/bookshelf');
    return data;
}

//Запрос удалить книгу из списка избранных
export const deleteBookFromBookshelf = async (id) => {
    const {data} = await $authHost.delete(`api/bookshelf/${id}`);
    return data;
}