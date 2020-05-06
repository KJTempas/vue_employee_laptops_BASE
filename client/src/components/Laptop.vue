<template>
<div>
   
    <h2>Laptop ID {{ laptop.id }}</h2>

   <LaptopForm v-bind:laptop="laptop" v-on:laptopFormSubmit="laptopFormSubmit">
       Edit
    </LaptopForm>

    <hr>
    <!--  show info about which employee this laptop is assigned to  -->
    <h2 v-if="laptop.employeeId">This laptop is assigned to employee
        <router-link :to="{ name: 'employee', params: { id: laptop.employeeId }}">
            #{{ laptop.employeeId }}
        </router-link>
    </h2>
    <!--  select to choose employee -->
    <h2 v-else>This laptop is not assigned to an employee </h2>

    <select v-model="selectedEmployee">
        <option v-for="employee in employees"
            v-bind:value="employee.id"
            v-bind:key="employee.id">{{employee.id}} {{employee.name }}
        </option>
    </select>

    <!-- buttons to assign/unassign laptop -->
    <hr>
    <button class="btn btn-primary mt-2" v-on:click="updateEmployee">Change employee</button>
    <br>
    <button class="btn btn-secondary mt-2" v-on:click="unassign">Unassign Laptop</button>
    <br>
    <!--  delete laptop button -->
    <button class="btn btn-danger mt-3" v-on:click="deleteLaptop"> Delete Laptop </button>
    
</div>
</template>

<script>

import LaptopForm from '@/components/forms/LaptopForm'

export default {
    name: "Laptop",
    components: {
        LaptopForm
    },
    data() {
        return {
            id: undefined,
            laptop: {},
            employees: [], //provide list of employees to choose from
            selectedEmployee: {}
        }
    },
    mounted() {
        //  get ID from router params 
        this.id = this.$route.params.id
        // load this laptop's data
        this.loadData()
    },
    methods:{
        loadData() {//gets data from server
            // load data for laptop, and list of employees 
            this.$services.laptops.getLaptop(this.id).then(data => {
                this.laptop = data

                this.$services.employees.getAllEmployees().then(data => {
                    this.employees = data
                    this.selectedEmployee = this.laptop.employeeId
                })
            })
        },
        laptopFormSubmit(laptop) { //to update laptop info
            this.$services.laptops.updateLaptop(laptop).then( data => {
                this.$router.push('./laptops')
            }).catch( err => {
                if (err.response.status == 400) {
                    alert('Error editing laptop because ' + err.response.data)
                } else {
                    alert('Error editing laptop.')
                }
            })
        },
        updateEmployee() {
            if (!this.selectedEmployee) {
                alert('Select an employee')
                return
            }
            this.$services.laptops.assignLaptop(this.laptop.id, this.selectedEmployee).then( data => {
                this.loadData()
            })
        },
        unassign() {
            this.$services.laptops.assignLaptop(this.laptop.id, null).then(data => {
                this.loadData()
            })
        },


        deleteLaptop() {
            if (confirm(`Delete laptop with serial number ${this.laptop.serialNumber}?`)) {
                this.$services.laptops.deleteLaptop(this.laptop.id).then( () => {
                    this.$router.push('/laptops')
                })
            }
        }
    }
        

        
}

</script>

<style>
</style>