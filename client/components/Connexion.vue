<template>
    <Body>
        <form id="formulaire">  
			<div id="textInfo">
				<input type="text" id="Username" class="button" name="Username" placeholder="Username" required> 
				<input type="password" id="Password" class="button" name="Password" placeholder="Password" required> 
			</div>
			<br>
            <input type="submit" class="button" id="Create" value="Create account" onclick="create()" @onclick="phototest">
			<input type="submit" class="button" id="Connexion" value="Connexion             " onclick="connex()" >
		</form>
    </Body>
</template>

<!--
<script>
import { photos } from '../../server/data/photos'

export default({
	data() {
		//console.log(this.photos[1])
		return{
			photos
		}
	
	},
	computed:{
		phototest(){ console.log(this.photos)
		}
	}
})
</script> -->

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