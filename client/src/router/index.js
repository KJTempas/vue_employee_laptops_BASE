import Router from 'vue-router'

import components from '@/components'


export default new Router({
    routes: [
        {
            path: '/',
            component: components.Home
        },

        // employees route
        {
            path: '/employees',
            component: components.EmployeeList
        },
        //laptops route
        {
            path: '/laptops',
            component: components.LaptopList
        },

        // TODO /employee/:id route 

        // TODO /laptop/:id route 

        // TODO /create_employee route 
        
        // TODO /create_laptop route 
        
    ]
})