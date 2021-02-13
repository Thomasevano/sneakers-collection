<template>
  <div v-if="sneaker" class="post">
    <h1 class="article_title">{{ sneaker.name }}</h1>

    <img :src="sneaker.imgUrl" alt="sneaker image" />

    <div class="article_details">
      <span class="article_author">{{ sneaker.brand }}</span>
      <span class="article_author">Prix de vente: {{ sneaker.retailPrice }} $</span>
      <span class="article_author">Prix de revente estimé: {{ sneaker.estimatedMarketValue }} $</span>
      <span
        class="article_date"
      >Sortie le {{ $moment(sneaker.releaseDate).format("dddd D MMMM YYYY") }}</span>
    </div>

    <p class="article_content intro">{{ sneaker.story }}</p>
    <div v-if="resellLinks.length > 0">
      <div v-for="(link, index) in resellLinks" :key="index">
          <a :href="link" class="article_author">Acheter sur: {{ link }}</a>
      </div>
    </div>
    <p v-else>Il n'y a pas de liens de revente connu</p>
  </div>
</template>

<script>
export default {
  created() {
    fetch(
      `https://api.thesneakerdatabase.dev/v2/sneakers/${this.$route.params.index}`
    ).then((response) => {
      response.json().then((data) => {
        this.sneaker = data.results[0];
        this.resellLinks = this.sneaker.links.slice(1, -1).split(', ');
      });
    });
  },
  data() {
    return { sneaker: {}, resellLinks: [] };
  },
  head() {
    let sneaker = this.sneaker;

    return {
      title: `${sneaker.name} - Sneakers Collection`,
    };
  },
};
</script>

<style scoped>
li {
  list-style: none;
}

.post {
  width: 375px;
}

.article_title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin: 20px auto;
}

img {
  width: 100%;
  height: 297px;
  margin-bottom: 20px;
  object-fit: cover;
}

.article_img {
  padding-left: 0;
}
.article_img li {
  width: 100%;
}

.article_details {
  display: inline-block;
  width: 100%;
  font-weight: bold;
  margin-bottom: 20px;
}
.article_author,
.article_date {
  text-decoration: underline;
}
.article_details .article_author {
  float: left;
  margin-left: 30px;
}
.article_details .article_date {
  float: right;
  margin-right: 30px;
}
.article_content {
  width: 335px;
  margin: 0 auto 20px;
  font-size: 14px;
  text-align: left;
}
.intro {
  font-weight: bold;
}
.buy_button {
  display: inline-block;
  background-color: black;
  color: white;
  border: 2px solid transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 10px 55px;
  text-decoration: none;
  margin: 20px 0 40px;
}
.buy_button:hover {
  background-color: white;
  color: black;
  border-color: black;
}

@media (min-width: 600px) {
  .post {
    width: calc(100% - 10px);
    max-width: 1000px;
    margin: 0 auto;
  }
  .article_img {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .article_img li {
    width: calc(100% / 2 - 5px);
  }
  .article_img li:nth-last-child(1) {
    width: 100%;
  }
  img {
    width: 100%;
    height: 500px;
  }
  .article_title {
    font-size: 42px;
    margin: 60px auto 40px;
  }
  .article_content {
    font-size: 18px;
    width: calc(100% - 50px);
    max-width: 950px;
  }
}
</style>