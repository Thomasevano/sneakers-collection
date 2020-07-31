<template>
  <header>
    <div class="header__container">
      <input id="burger" class="burger__checkbox" type="checkbox" />
      <label for="burger" class="burger__menu">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <nav class="nav burger__nav">
        <nuxt-link to="/">Accueil</nuxt-link>
      </nav>
      <nuxt-link to="/" class="logo-container">
        <img class="logo" src="~/assets/img/logo.svg" alt />
      </nuxt-link>
    </div>
    <nav class="nav desktop__nav">
      <nuxt-link to="/">Accueil</nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
body {
  margin: 0;
}

header {
  background-color: black;
  padding: 10px 20px;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  position: relative;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.logo {
  height: 35px;
}

input {
  opacity: 0;
  position: absolute;
  z-index: 10;
}

input[type="checkbox"] {
  position: absolute;
  z-index: 5;
  opacity: 0;
}

.burger__menu {
  height: 25px;
  width: 30px;
  position: relative;
}

.burger__menu span {
  position: absolute;
  width: 100%;
  height: 2px;
  top: 11px;
  left: 0;
  display: block;
  background: #ffffff;
  transition: all 0.2s ease;
}

.burger__menu span:first-child {
  top: 0px;
}

.burger__menu span:last-child {
  top: 21px;
}

input[type="checkbox"]:checked + .burger__menu span {
  opacity: 0;
  top: 50%;
}

input[type="checkbox"]:checked + .burger__menu span:first-child {
  opacity: 1;
  transform: rotate(45deg);
}

input[type="checkbox"]:checked + .burger__menu span:last-child {
  opacity: 1;
  transform: rotate(-45deg);
}

.nav a {
  color: white;
  text-decoration: none;
  position: relative;
}

.nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  height: 2px;
  width: 0%;
  background: #ffffff;
  transition: all 0.2s ease;
}

.nav a:hover::after {
  width: 100%;
}

.burger__nav {
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 80px;
  z-index: 5;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
}

.burger__nav a:first-child {
  margin-right: 60px;
}

input[type="checkbox"]:checked ~ .burger__nav {
  opacity: 1;
  pointer-events: all;
}

input[type="checkbox"]:checked ~ .logo-container {
  opacity: 0;
  pointer-events: none;
}

.desktop__nav {
  display: none;
}

@media (min-width: 800px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 80px;
  }

  .burger__menu {
    display: none;
  }

  .burger__nav {
    display: none;
  }

  .nav {
    display: block;
    color: white;
    padding: 0;
  }

  .desktop__nav a {
    margin-left: 40px;
  }
}
</style>
