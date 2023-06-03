<template>
  <v-app-bar>
    <v-app-bar-nav-icon
      v-if="smAndDown"
      color="primary"
      @click="toggleNavigationDrawer"
    />
    <v-app-bar-title
      ><router-link to="/" class="home-link font-weight-bold"
        >AV Lyra-Lierse
      </router-link>
    </v-app-bar-title>
    <template v-if="!smAndDown" #append>
      <component
        :is="getAppBarLinkComponent(link)"
        v-for="link in links"
        :key="link.to"
        v-bind="link"
        class="mx-1"
      />

      <v-divider vertical inset />
      <a href="https://www.facebook.com/aclyra" class="mx-4">
        <v-icon>mdi-facebook</v-icon>
      </a>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-if="smAndDown" v-model="isDrawerOpen">
    <v-list>
      <component
        v-for="link in links"
        :key="link.to"
        :is="getNavigationDrawerLinkComponent(link)"
        v-bind="link"
        class="my-1"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import AppBarLinkButton from "@/components/layout/AppBarLinkButton.vue";
import AppBarMenu from "@/components/layout/AppBarMenu.vue";
import NavigationDrawerListGroup from "@/components/layout/NavigationDrawerListGroup.vue";
import NavigationDrawerListItem from "@/components/layout/NavigationDrawerListItem.vue";

const isDrawerOpen = ref(false);
const { smAndDown } = useDisplay();

function toggleNavigationDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function getAppBarLinkComponent(link: (typeof links)[number]) {
  return "children" in link ? AppBarMenu : AppBarLinkButton;
}

function getNavigationDrawerLinkComponent(link: (typeof links)[number]) {
  return "children" in link
    ? NavigationDrawerListGroup
    : NavigationDrawerListItem;
}

const links = [
  {
    title: "Welkom",
    to: "/welcome",
    icon: "mdi-home",
  },
  {
    title: "Artikels",
    to: "/artikels",
    icon: "mdi-post",
  },
  {
    title: "Club Info",
    value: "clubInfo",
    icon: "mdi-account-group",
    children: [
      {
        title: "Bestuur",
        to: "/club-info/bestuur",
      },
      {
        title: "Feestbestuur",
        to: "/club-info/feestbestuur",
      },
      {
        title: "Vertrouwenspersoon",
        to: "/club-info/vertrouwenspersoon",
      },
      {
        title: "Officiëlen",
        to: "/club-info/officielen",
      },
    ],
  },
  {
    title: "Wedstrijden",
    value: "contests",
    icon: "mdi-run-fast",
    children: [
      {
        title: "Onze organisaties",
        to: "/wedstrijden/onze-organisaties",
      },
      {
        title: "Uitslagen",
        to: "/wedstrijden/uitslagen",
      },
      {
        title: "Inschrijvingen",
        to: "/wedstrijden/inschrijvingen",
      },
    ],
  },
  {
    title: "Atleten",
    value: "athletes",
    icon: "mdi-torch",
    children: [
      {
        title: "Jeugd",
        to: "/atleten/jeugd",
      },
      {
        title: "Vanaf Cadet",
        to: "/atleten/vanaf-cadet",
      },
      {
        title: "G-team",
        to: "/atleten/g-team",
      },
      {
        title: "Records",
        to: "/atleten/records",
      },
    ],
  },
];
</script>

<style scoped>
.home-link {
  color: rgb(var(--v-theme-primary));
  text-decoration-line: none;
}
</style>
