<template>
  <main class="home">
    <h2 class="section-title">Rechercher</h2>
    <section>
      <form class="md:flex items-center">
        <Input
          inputType="text"
          inputName="Nom de la Sneaker"
          inputId="sneakerName"
          v-model="sneakerName"
        />
        <!-- <Select :items="brands" selectName="Marque" selectId="brands" v-model="sneakerBrand"></Select>
        <Select :items="genders" selectName="Genre" selectId="genders" v-model="sneakerGender"></Select> -->
        <!-- <Input
          inputType="number"
          minNumber="1900"
          maxNumber="2030"
          inputName="Année de sortie"
          inputId="releaseYear"
          v-model="sneakerReleaseYear"
        />
        <Input
          inputType="date"
          inputName="Date de sortie"
          inputId="releaseDate"
          v-model="sneakerReleaseDate"
        /> -->
        <button @click.prevent="searchSneaker" class="button">Rechercher</button>
      </form>
    </section>

    <h2 class="section-title">{{ sectionTitle }}</h2>
     <section class="container mx-auto p-10 md:py-20 px-0 md:p-10 md:px-0">
      <section class="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
        <section v-for="sneaker in sneakers" :key="sneaker.styleID" class="p-5 py-12 text-left transform duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer relative">
          <img :src="sneaker.thumbnail" alt="sneaker image" class="p-5">
          <h2 class="font-semibold mb-2 mt-12 text-cyan-600">Sortie le {{ sneaker.releaseDate}}</h2>
          <h1 v-if="sneaker.shoeName.length>=25" class="text-3xl mb-5 h-16" >{{ sneaker.shoeName.substring(0,25)+"..." }}</h1>
          <h1 v-else class="text-3xl mb-5 h-16">{{ sneaker.shoeName }}</h1>
          
          <p v-if="sneaker.description.length>=80" class="mb-5">{{ sneaker.description.substring(0,70)+"..." }}</p>
          <p v-else class="mb-5">{{ sneaker.description }}</p>
          <h2 class="font-semibold mb-5">${{ sneaker.retailPrice }}</h2>
          <a href="/" class="p-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600">Voir plus</a>
        </section>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from "../components/atoms/Input.vue";
import Select from "../components/atoms/Select.vue";

export default defineComponent({
  components: {
    Input,
    Select,
  },
  computed: {
    // nextRelease: function () {
    //   const inOneWeek = this.$moment().add(7, "days");
    //   return this.$moment(inOneWeek).format("YYYY-MM-DD");
    // },
  },
  methods: {
    searchSneaker() {
      fetch(`http://localhost:4000/search/${this.sneakerName}`)
        .then((response) => response.json())
        .then((result) => (this.sneakers = result))
        .then((number) => (this.sectionTitle = `${number.length} sneakers trouvées`))
    },
  },
  data() {
    return {
      sneakers: [],
      brands: {},
      genders: {},
      sneakerName: '',
      sneakerBrand: '',
      sneakerGender: '',
      sneakerReleaseYear: '',
      sneakerReleaseDate: '',
      sectionTitle: '',
    };
  },
  created() {
    fetch('http://localhost:4000/home')
      .then((response) => response.json())
      .then((result) => (this.sneakers = result))
      .then(() => (this.sectionTitle = `Les ${this.sneakers.length} paires populaires du moment`))
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: auto;
}

.button {
  display: inline-block;
  background: #000000;
  border: 3px solid #000000;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;
}

.button:hover {
  cursor: pointer;
  background: #ffffff;
  border: 3px solid #000000;
  color: #000000;
}

.button.large {
  width: 200px;
}

.section-title {
  font-weight: bold;
  font-size: 2rem;
  text-transform: uppercase;
  margin: 40px 0;
}

.latest-articles {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 40px;
}

.article {
  position: relative;
  width: 100vw;
}

.gradient-overlay {
  height: 100%;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  opacity: 0.6;
  position: absolute;
  transition: all 0.2s ease;
}

.article:hover .gradient-overlay {
  opacity: 1;
}

.article-img {
  height: 250px;
  overflow: hidden;
  display: flex;
}

.article-img img {
  min-width: 100%;
  object-fit: cover;
}

.article-textblock {
  /* max-width: 350px; */
  position: absolute;
  left: 10px;
  bottom: 10px;
  text-align: left;
  color: white;
}

.article-intro {
  margin-bottom: 10px;
  transform: translateY(175%);
  transition: all 0.2s ease;
}

.article:hover .article-intro {
  transform: translateY(0);
}

.article-description {
  opacity: 0;
  transition: all 0.2s ease;
}

.article:hover .article-description {
  opacity: 1;
}

.article-info {
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.article-title {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.description-text {
  font-size: 1rem;
  margin-bottom: 5px;
}

.article .button {
  background: #ffffff;
  color: #000000;
  margin-top: 40px;
}

@media (min-width: 600px) {
  .home {
    margin: 40px auto;
  }

  .button {
    margin-left: 15px;
  }

  .first-article-img {
    height: 500px;
  }

  .article {
    position: relative;
    width: calc(100% / 2 - 5px);
    margin-bottom: 10px;
  }
}
</style>
