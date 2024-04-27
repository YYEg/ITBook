import React, {useContext} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';

import {authRouters, publicRouters} from "../routes";
import {BOOKSTORE_ROUTE} from "../utils/consts";
import {Context} from "../index";

// маршрутизация приложения, ставлю стартовую страницу и что если не существующий урл то на стартовую
const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRouters.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<Navigate to={BOOKSTORE_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
