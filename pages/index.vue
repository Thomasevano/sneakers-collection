<template>
  <main class="home">
    <section>
      <form class="flex items-center">
        <div class="flex-1 relative my-4 m-2 border-b-2 focus-within:border-black">
          <input
            v-model="sneakerName"
            @keyup="searchSneaker"
            type="text"
            id="sneakerName"
            placeholder
            class="block w-full appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="sneakerName"
            class="absolute top-0 left-0 -z-1 duration-300 origin-0"
          >Nom de la Sneaker</label>
        </div>
        <div class="flex-1 m-2">
          <!-- <label class="block tracking-wide mb-2" for="brand">Marque</label> -->
          <div class="relative">
            <select
              class="block w-full appearance-none bg-transparent border-b-2 focus:outline-none focus-within:border-black"
              id="brand"
              v-model="sneakerBrand"
            >
              <option value>Marque</option>
              <option v-for="brand in brands.results" :key="brand.id" :value="brand">{{ brand }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex-1 m-2">
          <!-- <label class="block tracking-wide mb-2" for="gender">Genre</label> -->
          <div class="relative">
            <select
              class="block w-full appearance-none bg-transparent border-b-2 focus:outline-none focus-within:border-black"
              id="gender"
            >
              <option value>Genre</option>
              <option
                v-for="gender in genders.results"
                :key="gender.id"
                :value="gender"
              >{{ gender }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex-1 relative my-4 m-2 border-b-2 focus-within:border-black">
          <input
            type="text"
            id="releaseDate"
            placeholder
            class="block w-full appearance-none focus:outline-none bg-transparent"
          />
          <label
            for="releaseDate"
            class="absolute top-0 left-0 -z-1 duration-300 origin-0"
          >Date de sortie</label>
        </div>
        <button @click.prevent="searchSneaker" class="btn">
          search
          <span class="badge badge-primary"></span>
        </button>
      </form>
    </section>
    <h2 class="section-title">Les {{ sneakers.length }} prochaines sorties</h2>

    <section class="latest-articles">
      <div v-for="sneaker in sneakers" :key="sneaker.id" class="article">
        <nuxt-link :to="'/sneaker/' + sneaker.id">
          <div class="gradient-overlay"></div>
          <figure class="article-img">
            <img v-if="sneaker.media" :src="sneaker.media.smallImageUrl" alt />
            <img v-else src="http://via.placeholder.com/450x250" alt />
          </figure>
          <div class="article-textblock">
            <div class="article-intro">
              <h3 class="article-title">{{ sneaker.title }}</h3>
              <p class="article-info">
                Sortie le
                {{ $moment(sneaker.releaseDate).format("dddd D MMMM YYYY") }}
              </p>
              <p class="article-info">{{ sneaker.retailPrice }} $</p>
            </div>
            <div class="article-description">
              <p class="description-text">{{ sneaker.description }}</p>
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
export default {
  name: "Home",
  computed: {
    nextRelease: function () {
      const inOneWeek = this.$moment().add(7, "days");
      return this.$moment(inOneWeek).format("YYYY-MM-DD");
    },
  },
  data() {
    return { sneakers: [], sneakerName: "", sneakerBrand: "" };
  },
  methods: {
    searchSneaker() {
      console.log(`Checking name: ${this.sneakerBrand} ${this.sneakerName}`);
      this.$axios
        .$get(
          "https://cors.io/?https://api.thesneakerdatabase.com/v1/sneakers?limit=10",
          {
            params: {
              name: this.sneakerName,
              brand: this.brand,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async fetch() {
    const sneakers = await this.$axios.$get(
      `https://api.thesneakerdatabase.com/v1/sneakers?limit=10&releaseDate=lte:${
        this.nextRelease
      }&releaseDate=gte:${this.$moment().format(
        "YYYY-MM-DD"
      )}&sort=releaseDate:asc`
    );
    this.sneakers = sneakers.results;
  },
  async asyncData({ $axios, $moment }) {
    const genders = await $axios.$get(
      "https://api.thesneakerdatabase.com/v1/genders"
    );
    const brands = await $axios.$get(
      "https://api.thesneakerdatabase.com/v1/brands"
    );
    return { genders, brands };
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
