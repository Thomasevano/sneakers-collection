<template>
  <form class="flex items-center">
    <Input inputName="Nom de la Sneaker" inputId="sneakerName" v-model="sneakerName" />
    <Select :items="brands" selectName="Marque" selectId="brands" v-model="sneakerBrand"></Select>
    <Select :items="genders" selectName="Genre" selectId="genders" v-model="sneakerGender"></Select>
    <Input inputName="Date de sortie" inputId="releaseYear" v-model="sneakerReleaseYear" />
    <button @click.prevent="searchSneaker" class="btn">
      search
      <span class="badge badge-primary"></span>
    </button>
  </form>
</template>

<script>
import Select from "~/components/atoms/Select";

export default {
  name: "Form",
  props: {
    // sneakerName: String,
    // sneakerBrand: String,
    // sneakerGender: String,
    // sneakerReleaseYear: String,
    searchSneaker: Function,
  },
  components: {
    Select,
  },
  created() {
    fetch("https://api.thesneakerdatabase.com/v1/brands")
      .then((response) => response.json())
      .then((result) => (this.brands = result.results));
    fetch("https://api.thesneakerdatabase.com/v1/genders")
      .then((response) => response.json())
      .then((result) => (this.genders = result.results));
  },
  data() {
    return {
      brands: [],
      genders: [],
      sneakerName: "",
      sneakerBrand: "",
      sneakerGender: "",
      sneakerReleaseYear: "",
    };
  },
};
</script>