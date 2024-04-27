import {
    ADMIN_ROUTE,
    BOOKSHELF_ROUTE,
    BOOK_EDIT_ROUTE,
    BOOK_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    BOOKSTORE_ROUTE, BOOK_LIST_EDIT_ROUTE,
} from './utils/consts';

import Admin from "./pages/Admin";
import Bookstore from "./pages/Bookstore";
import Auth from "./pages/Auth";
import BookPage from "./pages/BookPage";
import BookshelfPage from "./pages/BookshelfPage";
import BookEditPage from "./pages/BookEditPage";
import EditItemPage from "./pages/EditItemPage";

// пути, которые требуют аутентификации
export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BOOK_EDIT_ROUTE + '/:id',
        Component: BookEditPage
    },
    {
        path: BOOK_LIST_EDIT_ROUTE,
        Component: EditItemPage
    },

];

// пути, которые yt требуют аутентификации, публичные
export const publicRouters = [
    {
        path: BOOKSTORE_ROUTE,
        Component: Bookstore
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: BookPage
    },
    {
        path: BOOKSHELF_ROUTE,
        Component: BookshelfPage
    },
];
