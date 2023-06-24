<template>
  <VAppBar>
    <VAppBarNavIcon
      v-if="smAndDown"
      color="primary"
      @click="toggleNavigationDrawer"
    />
    <VAppBarTitle
      ><RouterLink to="/" class="home-link text-primary font-weight-bold"
        >AV Lyra-Lierse
      </RouterLink>
    </VAppBarTitle>
    <template v-if="!smAndDown" #append>
      <component
        :is="getAppBarLinkComponent(link)"
        v-for="link in links"
        :key="link.to"
        v-bind="link"
        class="mx-1"
      />

      <VDivider vertical inset />
      <a href="https://www.facebook.com/aclyra" target="_blank" class="mx-4">
        <VIcon>mdi-facebook</VIcon>
      </a>
      <a :href="adminLink" target="_blank" class="mr-4">
        <VIcon>mdi-shield-crown</VIcon>
      </a>
    </template>
  </VAppBar>
  <VNavigationDrawer v-if="smAndDown" v-model="isDrawerOpen">
    <VList>
      <component
        v-for="link in links"
        :key="link.to"
        :is="getNavigationDrawerLinkComponent(link)"
        v-bind="link"
        class="my-1"
      />
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDisplay } from "vuetify";
import AppBarLinkButton from "@/components/layout/AppBarLinkButton.vue";
import AppBarMenu from "@/components/layout/AppBarMenu.vue";
import NavigationDrawerListGroup from "@/components/layout/NavigationDrawerListGroup.vue";
import NavigationDrawerListItem from "@/components/layout/NavigationDrawerListItem.vue";
import { BASE_URL_CONTENT } from "@/env";

const isDrawerOpen = ref(false);
const { smAndDown } = useDisplay();
const adminLink = `${BASE_URL_CONTENT}/admin`;

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
      {
        title: "Trainers",
        to: "/club-info/trainers",
      },
      {
        title: "Trainingen",
        to: "/club-info/trainingen",
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
    title: "Records",
    value: "records",
    icon: "mdi-torch",
    to: "/records",
  },
];
</script>

<style scoped>
.home-link {
  text-decoration-line: none;
}
</style>
