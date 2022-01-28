import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { userSelector, retriveUserData } from "../slices/userSlice";

const User = () => {
    const { 
        name, 
        email,
        is_superuser,
        is_sales_director,
        is_sales_manager,
        is_puchase_manager,
        is_tech_inspector,
        isAuthenticated: userIsAuthenticated, 
        loading: userLoading, 
        hasErrors: userHasErrors 
    } = useSelector(userSelector);

        return (
                <div>
                    <h4>{name}</h4>
                    <p>{email}</p>
                    {/* {? is_superuser === true && <p>is_superuser - true</p> : <p>is_superuser - false</p>} */}
                    <p>is_superuser - {is_superuser ? 'true' : 'false'}</p>
                    <p>is_sales_director - {is_sales_director ? 'true' : 'false'}</p>
                    <p>is_sales_manager - {is_sales_manager ? 'true' : 'false'}</p>
                    <p>is_puchase_manager - {is_puchase_manager ? 'true' : 'false'}</p>
                    <p>is_tech_inspector - {is_tech_inspector ? 'true' : 'false'}</p>
                </div>
        );

        // {/* <p>{user.email}</p>
        // <p>{'is_superuser ' + user.is_superuser}</p>
        // <p>{'is_sales_director ' + user.is_sales_director}</p>
        // <p>{'is_sales_manager ' + user.is_sales_manager}</p>
        // <p>{'is_puchase_manager ' + user.is_puchase_manager}</p>
        // <p>{'is_tech_inspector ' + user.is_tech_inspector}</p> */}
};

export default User;