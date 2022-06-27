import { Link } from "react-router-dom";
import { iRouterItem } from "../../../interfaces/interfaces";


export function Header({navOptions}: {navOptions: iRouterItem[]}){

    navOptions = navOptions.filter(item => item.path !== '*' ? item : '' )
    navOptions = navOptions.filter(item => item.path !== '/details/:id' ? item : '' );
    navOptions = navOptions.filter(item => item.path !== '/edit/:id' ? item : '' );

    return (
        <header>
            <hgroup>
                <h1>Robots by Willy Wonka 🍫🍫🍫🍪🍪🍪</h1>
            </hgroup>
            <nav>
                <ul>
                    {navOptions.map( item =>
                        <li key={item.label}>
                            <Link to={item.path} >{item.label}</Link>
                        </li>
                        )

                    }
                </ul>
            </nav>
        </header>
    )
}