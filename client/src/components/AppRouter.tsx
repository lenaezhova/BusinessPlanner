import React, {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
const AppRouter : FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        isAuth
            ?
                <Routes>
                    {privateRoutes.map(({path, component : Component}) =>
                        <Route
                               key={path}
                               path={path}
                               element={<Component/>}
                        />
                    )}
                    <Route path="*" element={<Navigate to = {RouteNames.EVENT} replace/>}/>
                </Routes>
            :
                <Routes>
                    {publicRoutes.map(({path, component : Component}) =>
                        <Route
                            key={path}
                            path={path}
                            element={<Component/>}
                        />
                    )}
                    <Route path="*" element={<Navigate to = {RouteNames.LOGIN} replace/>}/>
                </Routes>
    );
};

export default AppRouter;