<template>
  <div>
  <div id="searchBar">
          <input class="btnBar" type="text" placeholder="Recherche" v-model="nomRecherche">
          <input class="btnBar" type="button" value="rechercher" v-on:click="searchBook">
      </div>
    <article v-for="book in books" :key="book.id">
      <div class="book-img">
        <div :style="{ backgroundImage: 'url(' + book.image + ')' }">
        </div>
      </div>
      <div class="book-content" v-if="editingBook.id !== book.id">
        <div class="book-title">
          <h2>{{ book.name }}  de  {{ book.author }}</h2>
          <div id="btnMod">
            <button id="btnInMod" @click="deleteBook(book.id)">Supprimer</button>
            <button id="btnInMod" @click="editBook(book)">Modifier</button>
            <button id="btnInMod" @click="addPanier(book)">Ajouter au Panier</button>
          </div>
        </div>
        <p>{{ book.description }}</p>
      </div>
      <div class="book-content" v-else>
        <div class="book-title">
          <h2><input type="text" v-model="editingBook.name"> - <input type="number" v-model="editingBook.price"></h2>
          <div>
            <button @click="sendEditBook()">Valider</button>
            <button @click="abortEditBook()">Annuler</button>
          </div>
        </div>
        <p><textarea v-model="editingBook.description"></textarea></p>
        <input type="text" v-model="editingBook.image" placeholder="Lien vers l'image">
      </div>
    </article>
    <add-book @add-book='addBook' v-if="user.actif === 'admin'"></add-book>
  </div>
</template>

<script>
module.exports = {
  props: {
    user:{type: Object},
    books: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      editingBook: {
        id: -1,
        name: '',
        description: '',
        image: '',
        availlability: 0
      },
      bookToAddToCart: {
        id: -1,
        quantity : 1
      },
      nomRecherche:''
      
    }
  },
  methods: {
    addBook (newBook) {
      this.$emit('add-book', newBook)
    },
    deleteBook (bookId) {
      this.$emit('delete-book', bookId)
    },
    editBook (book) {
      this.editingBook.id = book.id
      this.editingBook.name = book.name
      this.editingBook.description = book.description
      this.editingBook.image = book.image
      this.editingBook.availlability = book.availlability
    },
    sendEditBook () {
      this.$emit('update-book', this.editingBook)
      this.abortEditBook()
    },
    abortEditBook () {
      this.editingBook = {
        id: -1,
        name: '',
        description: '',
        image: '',
        availlability: 0
      }
    },
    addPanier (book) {
      this.bookToAddToCart.id = book.id
      this.$emit('add-book-cart', this.bookToAddToCart)
    },
    searchBook(){
      this.$emit('searchbook', this.nomRecherche)
    }
  },
  components:{
        AddBook
    },
}
</script>

<style scoped>
article {
  display: flex;
  border: solid black;
  margin: 5px;
  box-shadow: 5px 5px 5px black;
  background-color: white;
}

#btnMod{
  display: flex;
  flex-direction: column;
}
#btnInMod{
  padding: 5px;
  margin: 5px;
}
.book-img {
  flex: 1;
}

.book-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.book-content {
  flex: 3;
}

.book-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
#searchBar {
    text-align: center;
    margin: 5%;
}
.btnBar{
    padding: 10px;
    border-radius: 10px;
}
</style>
