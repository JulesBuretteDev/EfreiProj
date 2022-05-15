<template>
  <div>
  <div id="searchBar">
          <input type="text" placeholder="Recherche">
          <input type="button" value="rechercher">
          <input type="button" value="cancel">
      </div>
    <article v-for="book in books" :key="book.id">
      <div class="book-img">
        <div :style="{ backgroundImage: 'url(' + book.image + ')' }">
        </div>
      </div>
      <div class="book-content" v-if="editingBook.id !== book.id">
        <div class="book-title">
          <h2>{{ book.name }}  de  {{ book.author }}</h2>
          <div>
          <button @click="deleteBook(book.id)">Supprimer</button>
          <button @click="editBook(book)">Modifier</button>
          <button @click="addPanier(book)">Ajouter au Panier</button>
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
    <!--<add-book @add-book='addBook'></add-book>-->
  </div>
</template>

<script>
module.exports = {
  props: {
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
      }
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
</style>
