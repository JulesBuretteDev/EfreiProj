
const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Livres = window.httpVueLoader('./components/Livres.vue')
const AddBook= window.httpVueLoader('./components/addBook.vue')


const routes = [
  { path: '/', component: Connexion },
  { path: '/Home', component: Home },
  { path: '/Home/panier', component: Panier },
  { path: '/Home/Livres', component: Livres }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    isConnected : true,
    //wrongInscri : false, pb ici
    //wrongConnex : false,
    books: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      books: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/books')
    this.books = res.data
    // const res2 = await axios.get('/api/panier')
    // this.panier = res2.data
  },
  methods: {
    async connex(){
      this.isConnected = !this.isConnected
      console.log(this.isConnected)
    },
    async goConnex(){
      this.$router.push('/'); 
    },
    async goHome(){
      this.$router.push('/home'); 
    },
    
    async addBook (book) {
      const res = await axios.post('/api/book', book)
      this.books.push(res.data)
    },
    async updateBook (newBook) {
      await axios.put('/api/book/' + newBook.id, newBook)
      const book = this.books.find(a => a.id === newBook.id)
      book.name = newBook.name
      book.description = newBook.description
      book.image = newBook.image
      book.price = newBook.price
    },
    async deleteBook (bookId) {
      await axios.delete('/api/book/' + bookId)
      const index = this.books.findIndex(a => a.id === bookId)
      this.books.splice(index, 1)
    },
    async addBookCart(book){
      const res = await axios.post('api/panier/', book)
      this.panier = res.data
    },
    async editBookInCart(newBook) {
      const res = await axios.put(`/api/panier/${newBook.id}`, newBook)
      this.panier = res.data
    },
    async removeFromPanier(id){
      const res = await axios.delete(`/api/panier/${id}`)
      this.panier = res.data
    },
    async testConnexion(data) {
      await axios.post('/api/Connexion', data).then(async response => {
          this.user = response.data.data;
          this.panier.articles = response.data.panier;
          router.replace('/home');
      }).catch(error => {
          alert('Informations non valides !')
          //this.wrongInscri = true plutot ici
      });
  }
  }
})
