// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "",
    redirect: "/artikels",
  },
  {
    path: "/artikels",
    component: () =>
      import(/* webpackChunkName: "articles" */ "@/views/Articles.vue"),
  },
  {
    path: "/artikels/:id",
    props: true,
    component: () =>
      import(/* webpackChunkName: "articles" */ "@/views/articles/Article.vue"),
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
        component: () =>
          import(
            /* webpackChunkName: "welcome" */ "@/views/club-info/Welcome.vue"
          ),
      },
      {
        path: "bestuur",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/Management.vue"
          ),
      },
      {
        path: "feestbestuur",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/PartyManagement.vue"
          ),
      },
      {
        path: "vertrouwenspersoon",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/Confidant.vue"
          ),
      },
      {
        path: "trainers",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/Trainers.vue"
          ),
      },
      {
        path: "trainingen",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/Trainings.vue"
          ),
      },
      {
        path: "lid-worden",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/BecomingAMember.vue"
          ),
      },
      {
        path: "sportongeval",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/SportingAccident.vue"
          ),
      },
      {
        path: "visie-en-werking",
        component: () =>
          import(
            /* webpackChunkName: "clubInfo" */ "@/views/club-info/VisionAndOperation.vue"
          ),
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
        component: () =>
          import(
            /* webpackChunkName: "contests" */ "@/views/contests/Contests.vue"
          ),
      },
      {
        path: "uitslagen",
        component: () =>
          import(
            /* webpackChunkName: "contests" */ "@/views/contests/Results.vue"
          ),
      },
      {
        path: "inschrijvingen",
        component: () =>
          import(
            /* webpackChunkName: "contests" */ "@/views/contests/Registrations.vue"
          ),
      },
    ],
  },
  {
    path: "/club-records",
    component: () =>
      import(
        /* webpackChunkName: "records" */ "@/views/club-records/ClubRecords.vue"
      ),
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
        component: () =>
          import(
            /* webpackChunkName: "webShop" */ "@/views/web-shop/RecreationalClothing.vue"
          ),
      },
      {
        path: "wedstrijd-kledij-en-specials",
        component: () =>
          import(
            /* webpackChunkName: "webShop" */ "@/views/web-shop/CompetitionClothing.vue"
          ),
      },
    ],
  },
  {
    path: "/natuurlopen/:date",
    component: () =>
      import(
        /* webpackChunkName: "natureRun" */ "@/views/nature-run/NatureRunRegistration.vue"
      ),
  },
  {
    path: "/not-found",
    component: () =>
      import(/* webpackChunkName: "notFound" */ "@/views/NotFound.vue"),
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
