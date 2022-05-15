<template>
    <Body>
		<div>
			<form v-on:submit.prevent="testConnexion" id="formulaire" v-if="CreateAccount == false">  
				<div id="textInfo">
					<input type="email" id="Username" class="button" name="mail" placeholder="Username" v-model="connexionPers.email" required> 
					<input type="password" id="Password" class="button" name="Password" placeholder="Password" v-model="connexionPers.password" required> 
				</div>
				<br>
				<input type="button" class="button" id="change" value="Create account" v-on:click="windowSwitch">
				<input type="submit" class="button" id="Connexion" value="Connexion">
				
			</form>
			<form  v-on:submit.prevent="CreateAccountdb" id="inscription"  v-if="CreateAccount == true">
				<input type="email" id="mail" class="button" name="mail" placeholder="email adress" v-model="inscriptionPers.email" required> 
				<input type="password" id="Password" class="button" name="Password" placeholder="Password" v-model="inscriptionPers.password" required> 
				<input type="text" id="name" class="button" name="name" placeholder="name" v-model="inscriptionPers.name" required> 
				<input type="text" id="surname" class="button" name="suname" placeholder="surname" v-model="inscriptionPers.surname" required> 
				<br>
				<input type="button" class="button" id="change" value="Connect to account" v-on:click="windowSwitch">
				<input type="submit" class="button" id="Connexion" value="inscription">
				
			</form>
		</div>
    </Body>
</template>


<script>
module.exports = {
	data() {
		return {
			CreateAccount : false,
			inscriptionPers :{
				email :'',
				password:'',
				actif:'user',
				name:'',
				surname:''
			},
			connexionPers: {
				email:'',
				password:''
			}
		}
	},
	props : {
		isconnected : Boolean
	},
	methods : {
		connex(){
			this.$emit("connex")
		},
		goHome(){
			this.$router.push('/home'); 
			this.$emit("connex")
    	},
		windowSwitch(){
			this.CreateAccount = !this.CreateAccount
		},
		async CreateAccountdb(){
			const createAcc = await axios.post('/api/inscription', this.inscriptionPers)
		},
		testConnexion() {
			this.$emit('connexion', this.connexionPers)
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
	border-radius: 50px;
}
.button {
	border: none;
	filter: drop-shadow(5px 5px 5px grey);
	background-color: #f3f6f4;
	padding: 20px;
	margin: 20px;
	min-width: 20%;
	border-radius: 10px;
}
</style>	