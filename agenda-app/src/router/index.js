import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login/Login.vue";
import ListarContatos from "@/components/ListarContatos/ListarContatos.vue";
import FormContato from "@/components/FormContato/FormContato.vue"; 
const routes = [

  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/contatos",
    name: "ListarContatos",
    component: ListarContatos,
    meta: { requiresAuth: true },
  },
  {
    path: "/contato/create",
    name: "CreateContato",
    component: FormContato,
    meta: { requiresAuth: true },
  },
  {
    path: "/contato/edit/:id",
    name: "EditContato",
    component: FormContato,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("jwtToken");
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
