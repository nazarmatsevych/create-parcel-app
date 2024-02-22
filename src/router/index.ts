import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:id/create",
      name: "CreateRequest",
      component: () => import("../views/CreateRequest.vue"),
    },
    {
      path: "/:id/create/order",
      name: "OrderRequest",
      component: () => import("../views/OrderRequest.vue"),
    },
    {
      path: "/:id/create/deliver",
      name: "DeliverRequest",
      component: () => import("../views/DeliverRequest.vue"),
    },
    {
      path: "/:id/requests",
      name: "UserRequests",
      component: () => import("../views/UserRequests.vue"),
    },
    {
      path: "/:id",
      redirect: (to) => `/${to.params.id}/requests`,
    },
    {
      path: "/requests",
      name: "AllRequests",
      component: () => import("../views/AllRequests.vue"),
    },
  ],
});

export default router;
