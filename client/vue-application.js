
const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Livres = window.httpVueLoader('./components/Livres.vue')
const Recherche = window.httpVueLoader('./components/Recherche.vue')


const routes = [
  { path: '/', component: Connexion },
  { path: '/Home', component: Home },
  { path: '/Home/panier', component: Panier },
  { path: '/Home/Livres', component: Livres },
  { path: '/Home/Recherche', component: Recherche }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    isConnected : false,
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    // const res2 = await axios.get('/api/panier')
    // this.panier = res2.data
  },
  methods: {
    async connex(){
      this.isConnected = !this.isConnected
      console.log(this.isConnected)
    },
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
      
    }
  }
})
