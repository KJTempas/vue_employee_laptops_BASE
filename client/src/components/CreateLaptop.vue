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
        // TODO handle form submit
        // TODO handle cancel 
    }
}

</script>

<style>
</style>