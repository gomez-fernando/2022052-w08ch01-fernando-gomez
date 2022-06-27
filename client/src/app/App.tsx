/* eslint-disable no-undef */
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout/layout';
import { iRouterItem } from '../interfaces/interfaces';
import { loadRobotsAction } from '../reducers/robot/action.creators';
import { ApiRobot } from '../services/robot/api';

export function App() {
    const dispatcher = useDispatch();
    const apiRobot = useMemo(() => new ApiRobot(), []);

    useEffect(() => {
        apiRobot.getAll().then(robots => dispatcher(loadRobotsAction(robots)));
    }, [apiRobot, dispatcher]);

    const HomePage = React.lazy(() => import('../pages/home'));
    const DetailsPage = React.lazy(() => import('../pages/details'));
    const CreatePage = React.lazy(() => import('../pages/create'));
    const EditPage = React.lazy(() => import('../pages/edit'));

    const routerOptions: iRouterItem[] = [
        { path: '/', label: 'Home - Robots', page: <HomePage /> },
        { path: '/details/:id', label: 'Robot', page: <DetailsPage />,
        },
        { path: '/create', label: 'Create Robot', page: <CreatePage />,
        },
        { path: '/edit/:id', label: 'Edit Robot', page: <EditPage />,
        },
        { path: '*', label: '', page: <HomePage />,
        },
    ];
    return (
        <Layout navOptions={routerOptions}>
            <React.Suspense>
                <Routes>
                    {routerOptions.map((item) => (
                        <Route
                            key={item.label}
                            path={item.path}
                            element={item.page}
                        ></Route>
                    ))}
                </Routes>
            </React.Suspense>
        </Layout>
    );
}
