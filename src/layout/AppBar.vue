<template>
  <VAppBar>
    <VAppBarNavIcon
      v-if="smAndDown"
      color="primary"
      @click="toggleNavigationDrawer"
    />
    <VAppBarTitle
      ><RouterLink to="/" class="home-link text-primary font-weight-bold"
        ><VImg src="/logo.jpg" height="64" width="64" />
      </RouterLink>
    </VAppBarTitle>
    <template v-if="!smAndDown" #append>
      <component
        :is="getAppBarLinkComponent(link)"
        v-for="link in links"
        :key="link.title"
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
        :key="link.title"
        :is="getNavigationDrawerLinkComponent(link)"
        v-bind="link"
        class="my-1"
      />
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import AppBarLinkButton from "@/components/layout/AppBarLinkButton.vue";
import AppBarMenu from "@/components/layout/AppBarMenu.vue";
import NavigationDrawerListGroup from "@/components/layout/NavigationDrawerListGroup.vue";
import NavigationDrawerListItem from "@/components/layout/NavigationDrawerListItem.vue";
import { BASE_URL_CONTENT } from "@/env";
import { getFileLinks } from "@/api-client";
import { MenuLink } from "@/types";

const isDrawerOpen = ref(false);
const { smAndDown } = useDisplay();
const adminLink = `${BASE_URL_CONTENT}/admin`;

onMounted(async () => {
  const privacyStatementLink = (await getFileLinks(["privacyStatement"]))[0];
  links.value = links.value.map((link) => {
    if ("value" in link && link.value === "clubInfo") {
      return {
        ...link,
        children: link.children?.concat({
          title: "Privacystatement",
          href: privacyStatementLink.file.url,
        }),
      };
    }
    return link;
  });
});

function toggleNavigationDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function getAppBarLinkComponent(link: MenuLink) {
  return "children" in link ? AppBarMenu : AppBarLinkButton;
}

function getNavigationDrawerLinkComponent(link: MenuLink) {
  return "children" in link
    ? NavigationDrawerListGroup
    : NavigationDrawerListItem;
}

const links = ref<MenuLink[]>([
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
        title: "Trainers",
        to: "/club-info/trainers",
      },
      {
        title: "Trainingen",
        to: "/club-info/trainingen",
      },
      {
        title: "Visie en werking",
        to: "/club-info/visie-en-werking",
      },
      {
        title: "Lyra-Lierse webshop",
        href: "https://www.vermarcsport.be/nl/store/avlyralierse",
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
    title: "Clubrecords",
    value: "clubRecords",
    icon: "mdi-torch",
    to: "/club-records",
  },
]);
</script>

<style scoped>
.home-link {
  text-decoration-line: none;
}
</style>
