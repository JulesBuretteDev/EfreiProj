<template>
    <Body>
        <form v-on:submit.prevent="connex" id="formulaire" v-if="isconnected == false">  
			<div id="textInfo">
				<input type="text" id="Username" class="button" name="Username" placeholder="Username" required> 
				<input type="password" id="Password" class="button" name="Password" placeholder="Password" required> 
			</div>
			<br>
            <input type="submit" class="button" id="Create" value="Create account" >
			<input type="submit" class="button" id="Connexion" value="Connexion" >
		</form>
    </Body>
</template>


<script>
module.exports = {
	data() {
		return {
		}
	},
	props : {
		isconnected : Boolean
	},
	methods : {
		connex(){
			this.$emit("connex")
		}
	}
}

</script>

<style scoped>
#backG {
	width: 100%;
	opacity: 80%;
}

form {
    align-items: center;
	display: block;
	background-color: white;
	filter: drop-shadow(10px 10px 10px black);
	text-align: center;
    margin: 10%;
}
.button {
	text-transform: uppercase;
	border: none;
	filter: drop-shadow(5px 5px 5px grey);
	background-color: #f3f6f4;
	padding: 20px;
	margin: 20px;
}
</style>	