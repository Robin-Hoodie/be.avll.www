// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// Statically importing these, as they both import TabsPerYear.
// TabsPerYear uses "generic" in its "<script>" tag, which for some reason triggers Netlify to serve it as a text/html file
import Results from "@/views/contests/Results.vue";
import Contests from "@/views/contests/Contests.vue";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "",
    redirect: "/artikels",
  },
  {
    path: "/artikels",
    component: () => import("@/views/articles/Articles.vue"),
  },
  {
    path: "/artikels/:id",
    props: true,
    component: () => import("@/views/articles/Article.vue"),
  },
  {
    path: "/club-info",
    children: [
      {
        path: "",
        redirect: "/club-info/welcome",
      },
      {
        path: "welcome",
        component: () => import("@/views/club-info/Welcome.vue"),
      },
      {
        path: "contact",
        component: () => import("@/views/club-info/Contact.vue"),
      },
      {
        path: "bestuur",
        component: () => import("@/views/club-info/Management.vue"),
      },
      {
        path: "feestbestuur",
        component: () => import("@/views/club-info/PartyManagement.vue"),
      },
      {
        path: "vertrouwenspersoon",
        component: () => import("@/views/club-info/Confidant.vue"),
      },
      {
        path: "trainers",
        component: () => import("@/views/club-info/Trainers.vue"),
      },
      {
        path: "trainingen",
        component: () => import("@/views/club-info/Trainings.vue"),
      },
      {
        path: "lid-worden",
        component: () => import("@/views/club-info/BecomingAMember.vue"),
      },
      {
        path: "sportongeval",
        component: () => import("@/views/club-info/SportingAccident.vue"),
      },
      {
        path: "visie-en-werking",
        component: () => import("@/views/club-info/VisionAndOperation.vue"),
      },
    ],
  },
  {
    path: "/wedstrijden",
    children: [
      {
        path: "",
        redirect: "/wedstrijden/onze-organisaties",
      },
      {
        path: "onze-organisaties",
        component: Contests,
      },
      {
        path: "uitslagen",
        component: Results,
      },
      {
        path: "inschrijvingen",
        component: () => import("@/views/contests/Registrations.vue"),
      },
      {
        path: "hoe-inschrijven",
        component: () =>
          import("@/views/contests/ContestRegistrationInstructions.vue"),
      },
    ],
  },
  {
    path: "/info-atleten",
    children: [
      {
        path: "",
        redirect: "/info-atleten/kalenders",
      },
      {
        path: "kalenders",
        component: () => import("@/views/info-athletes/Calendars.vue"),
      },
      {
        path: "jeugdwerking",
        component: () => import("@/views/info-athletes/YouthWork.vue"),
      },
      {
        path: "g-team",
        component: () => import("@/views/info-athletes/GTeam.vue"),
      },
      {
        path: "prestatievergoeding",
        component: () => import("@/views/info-athletes/PerformanceFee.vue"),
      },
      {
        path: "records",
        component: () => import("@/views/info-athletes/Records.vue"),
      },
    ],
  },
  {
    path: "/webshop",
    children: [
      {
        path: "",
        redirect: "/webshop/vrijetijdskledij",
      },
      {
        path: "vrijetijdskledij",
        component: () => import("@/views/web-shop/RecreationalClothing.vue"),
      },
      {
        path: "wedstrijd-kledij-en-specials",
        component: () => import("@/views/web-shop/CompetitionClothing.vue"),
      },
    ],
  },
  {
    path: "/multimedia",
    component: () => import("@/views/multimedia/Multimedia.vue"),
  },
  {
    path: "/sponsors",
    component: () => import("@/views/sponsors/Sponsors.vue"),
  },
  {
    path: "/natuurlopen/succes",
    component: () =>
      import("@/views/nature-run/NatureRunRegistrationSuccess.vue"),
  },
  {
    path: "/natuurlopen/nope",
    component: () =>
      import("@/views/nature-run/NatureRunRegistrationFailed.vue"),
  },
  {
    path: "/natuurlopen",
    component: () => import("@/views/nature-run/NatureRunRegistration.vue"),
  },
  {
    path: "/not-found",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/not-found",
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
