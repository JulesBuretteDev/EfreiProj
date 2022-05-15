<template>
  <div>
    <h2>Mon Panier</h2>
    <div>
      <div class="panier">
        <article v-for="basketitem in basketLine.bookId" :key="basketitem.id">
          <div class="basketitem-img">
            <div :style="{ backgroundImage: 'url(' + bookId[basketitem.id -1].image + ')' }">
            </div>
          </div>
          <div class="basketitem-content">
            <div class="basketitem-title" v-if="editingbasketitem.id != basketitem.id">
              <h2>{{ bookId[basketitem.id -1].name }} - {{ bookId[basketitem.id -1].price }}€  - x{{basketitem.quantity}}</h2>
              <button @click='editbasketitemInCart(basketitem)'>Modifier</button>
              <button @click="removeFromCart(basketitem)">Supprimer</button>
              <div>

              </div>
            </div>
            <div v-else class="basketitem-title">
              <h2>{{ bookId[basketitem.id -1].name }} - {{ bookId[basketitem.id -1].price }}€  - x<input type="number" v-model="editingbasketitem.quantity" /> </h2>
              <button @click='editbasketitemInCart(basketitem)'>Modifier</button>
              <button @click="updateFromPanier(basketitem.id, editingbasketitem.quantity)">Valider</button>
              <button @click="abortEditbasketitem()">Annuler</button>
            </div>
            <p >{{ bookId[basketitem.id -1].description }}</p>
          </div>
        </article>
        <div class="payer" v-if="basketLine.bookId.length !== 0">
          <br>
          <h3>Informations de payement</h3>
          <label for="payNom">Nom : </label>
          <input type="text" v-model="personne.firstName">
          <label for="payPrenom">Prenom : </label>
          <input type="text" v-model="personne.lastName">
          <button @click="payer()">Payer</button>
        </div>        
      </div>
    </div>
    <!-- TODO -->
  </div>
</template>

<script>
module.exports = {
  props: {
    bookId: { type: Array, default: [] },
    basketLine: { type: Object },
  },
  data () {
    return {
      editingbasketitem:{
        id: -1,
        quantity: 1
      },
      personne:{
        firstName:'',
        lastName:''
      },
    }
  },
  async mounted () {
  },
  methods: {
    editbasketitemInCart (basketitem) {
      this.editingbasketitem.id = basketitem.id
      this.editingbasketitem.quantity = basketitem.quantity
    },
    abortEditbasketitem () {
      this.editingbasketitem = {
        id: -1,
        quantity: -1
      }
    },
    updateFromPanier(id,quantity){
      this.$emit("update-from-panier",{id,quantity})
      this.abortEditbasketitem()
    },
    removeFromCart(basketitem){
      this.$emit("remove-from-cart", basketitem.id)
    },
    async payer(){
      const res = this.$emit("pay-cart", this.personne)
    }
  }
}
</script>
<style scoped>
basketitem {
  display: flex;
}

.basketitem-img {
  flex: 1;
}

.basketitem-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

.basketitem-content {
  flex: 3;
}



textarea {
  width: 100%;
}

.basketitem-title > button{
  float: right;
}
</style>



