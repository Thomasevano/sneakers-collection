<template>
  <main class="home">
    <h2 class="section-title">Recherchez des sneakers</h2>
    <section>
      <form class="md:flex items-center">
        <Input
          inputType="text"
          inputName="Nom de la Sneaker"
          inputId="sneakerName"
          v-model="sneakerName"
        />
        <Select :items="brands" selectName="Marque" selectId="brands" v-model="sneakerBrand"></Select>
        <Select :items="genders" selectName="Genre" selectId="genders" v-model="sneakerGender"></Select>
        <Input
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
        />
        <button @click.prevent="searchSneaker" class="button">Rechercher</button>
      </form>
    </section>
    <h2 class="section-title">{{ sectionTitle }}</h2>
    <section class="latest-articles">
      <div v-for="sneaker in sneakers" :key="sneaker.sku" class="article">
        <nuxt-link :to="'/sneaker/' + sneaker.sku">
          <div class="gradient-overlay"></div>
          <figure class="article-img">
            <img :src="sneaker.imgUrl" alt="sneaker image" />
          </figure>
          <div class="article-textblock">
            <div class="article-intro">
              <h3 v-if="sneaker.name.length<45" class="article-title">{{ sneaker.name }}</h3>
              <h3 v-if="sneaker.name.length>=45" class="article-title">{{ sneaker.name.substring(0,45)+"..." }}</h3>
              <p class="article-info">
                Sortie le
                {{ $moment(sneaker.releaseDate).format("dddd D MMMM YYYY") }}
              </p>
              <p class="article-info">{{ sneaker.retailPrice }} $</p>
            </div>
            <div class="article-description">
              <p v-if="sneaker.story.length<80" class="description-text">{{ sneaker.story }}</p>
              <p v-if="sneaker.story.length>=80" class="description-text">{{ sneaker.story.substring(0,70)+"..." }}</p>
              <p v-else class="description-text">{{ sneaker.name }}</p>
              <div class="button">
                <p>Plus d'infos</p>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </section>
  </main>
</template>

<script>
import Input from "~/components/atoms/Input";
import Select from "~/components/atoms/Select";

export default {
  name: "Home",
  components: {
    Input,
    Select,
  },
  computed: {
    nextRelease: function () {
      const inOneWeek = this.$moment().add(7, "days");
      return this.$moment(inOneWeek).format("YYYY-MM-DD");
    },
  },
  methods: {
    searchSneaker() {
      fetch(
        `https://api.thesneakerdatabase.dev/v2/sneakers?limit=100&` +
          new URLSearchParams({
            ...(this.sneakerName && { name: this.sneakerName }),
            ...(this.sneakerBrand && { brand: this.sneakerBrand }),
            ...(this.sneakerGender && { gender: this.sneakerGender }),
            ...(this.sneakerReleaseYear && {
              releaseYear: this.sneakerReleaseYear,
            }),
            ...(this.sneakerReleaseDate && {
              releaseDate: this.sneakerReleaseDate,
            }),
          })
      )
        .then((response) => response.json())
        .then((result) => (this.sneakers = result.results))
        .then((number) => (this.sectionTitle = `${number.length} résultats correponsdant`))
    },
  },
  data() {
    return {
      sneakers: [],
      brands: {},
      genders: {},
      sneakerName: "",
      sneakerBrand: "",
      sneakerGender: "",
      sneakerReleaseYear: "",
      sneakerReleaseDate: "",
      sectionTitle: "",
    };
  },
  created() {
    fetch(
      `https://api.thesneakerdatabase.dev/v2/sneakers?limit=10&gender=men&gender=women&releaseDate=lte:${
        this.nextRelease
      }&releaseDate=gte:${this.$moment().format(
        "YYYY-MM-DD"
      )}&sort=releaseDate:asc`
    )
      .then((response) => response.json())
      .then((result) => (this.sneakers = result.results))
      .then(() => (this.sectionTitle = `Les ${this.sneakers.length} prochaines sorties`))

    fetch("https://api.thesneakerdatabase.dev/v2/brands")
      .then((response) => response.json())
      .then((result) => (this.brands = result));

    fetch("https://api.thesneakerdatabase.dev/v2/genders")
      .then((response) => response.json())
      .then((result) => (this.genders = result));
  },
};
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
  margin-bottom: 40px;
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
