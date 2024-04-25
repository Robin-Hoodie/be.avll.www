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
      <a
        href="https://www.facebook.com/AVLyraLierse"
        target="_blank"
        class="ml-4"
      >
        <VIcon class="facebook-link">mdi-facebook</VIcon>
      </a>
      <a
        href="https://www.instagram.com/lyralierse_oneteam_onedream/"
        target="_blank"
        class="ml-4"
      >
        <VIcon class="instagram-link">mdi-instagram</VIcon>
      </a>
      <a href="https://www.bloggen.be/aclyra/" target="_blank" class="ml-4">
        <VIcon color="primary">mdi-post-outline</VIcon>
      </a>
      <a :href="adminLink" target="_blank" class="mx-4">
        <VIcon color="primary">mdi-shield-crown</VIcon>
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

const links = ref<MenuLink[]>([
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
        title: "Welkom",
        to: "/club-info/welcome",
      },
      {
        title: "Contacteer ons",
        to: "/club-info/contact",
      },
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
        title: "Lid worden",
        to: "/club-info/lid-worden",
      },
      {
        title: "Sportongeval",
        to: "/club-info/sportongeval",
      },
      {
        title: "Visie en werking",
        to: "/club-info/visie-en-werking",
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
      {
        title: "Hoe inschrijven?",
        to: "/wedstrijden/hoe-inschrijven",
      },
    ],
  },
  {
    title: "Info Atleten",
    value: "infoAthletes",
    icon: "mdi-torch",
    children: [
      { title: "Kalenders", to: "/info-atleten/kalenders" },
      { title: "Jeugdwerking", to: "/info-atleten/jeugdwerking" },
      { title: "G-team", to: "/info-atleten/g-team" },
      { title: "Prestatievergoeding", to: "/info-atleten/prestatievergoeding" },
      { title: "Records", to: "/info-atleten/records" },
      {
        title: "Gedragscode",
        href: "https://www.atletiek.be/admin/storage/main/gedragscode.pdf",
      },
    ],
  },
  {
    title: "Webshops",
    value: "web-shops",
    icon: "mdi-store",
    children: [
      {
        title: "Vrijetijdskledij",
        to: "/webshop/vrijetijdskledij",
      },
      {
        title: "Wedstrijdkledij en specials",
        to: "/webshop/wedstrijd-kledij-en-specials",
      },
    ],
  },
  {
    title: "Multimedia",
    value: "multimedia",
    icon: "mdi-multimedia",
    to: "/multimedia",
  },
  {
    title: "Sponsors",
    value: "sponsors",
    icon: "mdi-trophy",
    to: "/sponsors",
  },
]);

onMounted(async () => {
  const privacyStatementLink = (await getFileLinks(["privacyStatement"]))[0];
  links.value = links.value.map((link) => {
    if (
      "value" in link &&
      link.value === "clubInfo" &&
      privacyStatementLink.attributes.file.data
    ) {
      return {
        ...link,
        children: link.children?.concat({
          title: "Privacyverklaring",
          href: privacyStatementLink.attributes.file.data.attributes.url,
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
</script>

<style scoped>
.home-link {
  text-decoration-line: none;
}

.facebook-link {
  color: #4267b2;
}

.instagram-link {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #fd5949 45%,
    #d6249f 60%,
    #285aeb 90%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
