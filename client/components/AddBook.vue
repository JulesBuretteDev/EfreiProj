<template>
    <div>
        <form @submit.prevent="addbook">
        <h2>Nouveau produit à ajouter</h2>
        <input type="text" v-model="newbook.name" placeholder="Nom du produit" required>
        <input type="number" v-model="newbook.price" placeholder="Prix" required>
        <textarea type="text" v-model="newbook.description" required></textarea>
        <input type="text" v-model="newbook.image" placeholder="Lien vers l'image">
        <button type="submit">Ajouter</button>
    </form>
    </div>
</template>

<script>
module.exports = {
    
    props:{

    },
    data (){
        return{
            newbook: {
                name: '',
                description: '',
                image: '',
                price: 0
            }
        }
    },
    methods:{
        addbook () {
            this.$emit('add-book', this.newbook)
        }
    }
}
</script>
