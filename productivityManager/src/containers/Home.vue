<template>
	<div class=" home-wrapper">

			<!-- The App -->
		<div class="container-fluid">

		<div class="page-header">
		<h1>Home</h1>
		</div>




<button type="button" class="button" v-on:click="testSecured()">Test API - Secured</button>


		<!-- container-fluid ends -->
		</div>

	<!--wrapper ends -->
	</div>
</template>


<script>
import axios from 'axios'

export default{
	name:'homeapp',
	data:function() {
		return{

		}
	},
	methods:{
		testSecured: function () {
      console.log('sending secured test call to api ...')
      axios.get('/secured/ping').then((response) => {
        console.log(response)
      }, (response) => {
        console.log(response)
      })
    }
	}
}

</script>


<style>
	
	#form{
		border-radius: 10px;
		border: 1px #ccc solid;
	}
</style>
