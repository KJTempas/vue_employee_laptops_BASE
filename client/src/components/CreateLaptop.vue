<template>

<div>

    <h2>Create new laptop</h2>

    <!-- create LaptopForm component, 
    provide slot data to set button text  -->
    <LaptopForm v-on:laptopFormSubmit = "laptopFormSubmit">
        Create
    </LaptopForm>

</div>
</template>

<script>

import LaptopForm from '@/components/forms/LaptopForm'

export default {
    name: 'CreateLaptop',
    components: {
        LaptopForm
    },
    methods:{
        laptopFormSubmit(laptop) {
            //laptop service sends a message to API server to create new laptop
            this.$services.laptops.addLaptop(laptop).then( data => {
                //router navigates to laptop list
                this.$router.push('/laptops')
            }).catch( err => { //400 error means it's the client's fault
                if (err.response.status == 400) {  //display specific error message
                    alert('Error creating laptop because ' + err.response.data)
                } else {
                    alert('Error creating laptop.') 
                }
                
            })
        },
        cancel() {
            this.$router.push('/laptops')
        }
        }
    }
 
    


</script>

<style>
</style>