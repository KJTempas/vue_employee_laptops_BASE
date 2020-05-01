import Router from 'vue-router'

import components from '@/components'


export default new Router({
    routes: [
        {
            path: '/',
            component: components.Home
        },

        {
            path: '/employees',
            component: components.EmployeeList
        },
        
        {
            path: '/laptops',
            component: components.LaptopList
        },
        { 
            path: '/employee/:id',
            name: 'employee',
            component: components.Employee
        },
         

        // TODO /laptop/:id route 
        {
            path: '/create_employee',
            component: components.CreateEmployee
        },
        
        {
            path: '/create_laptop',
            component: components.CreateLaptop
        }
        
    ]
})