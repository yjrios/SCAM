import Vue from 'vue'
import Router from 'vue-router'
import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "app" */ './views/app'),
    redirect: '/app/piaf',
    beforeEnter: AuthRequired,
    children: [
      {
        path: 'app/piaf',
        component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf'),
        redirect: '/app/piaf/start',
        children: [
          { path: 'start', component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Start') },
          { path: 'actualizarkm', component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/ActualizarKm') },
          { path: 'status', component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Status') },
          { path: 'historial', component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Historico') },
          { path: 'statusmensual', component: () => import(/* webpackChunkName: "piaf" */ './views/app/piaf/Mensual') }
        ]
      },
      {
        path: 'app/second-menu',
        component: () => import(/* webpackChunkName: "second-menu" */ './views/app/secondMenu'),
        redirect: '/app/second-menu/second',
        children: [
          { path: 'second', component: () => import(/* webpackChunkName: "second-menu" */ './views/app/secondMenu/Second') }
        ]
      },
      {
        path: 'app/mttos',
        component: () => import(/* webpackChunkName: "pages" */ './views/app/mttos'),
        redirect: '/app/mttos/maestro_servicios',
        children: [
          { path: 'nuevo_mtto', component: () => import(/* webpackChunkName: "pages" */ './views/app/mttos/NuevoMtto') },
          { path: 'listado_mttos', component: () => import(/* webpackChunkName: "pages" */ './views/app/mttos/ListadoMtto') },
          { path: 'visualizar_mtto', component: () => import(/* webpackChunkName: "pages" */ './views/app/mttos/Visualizar') },
          { path: 'editar_mtto', component: () => import(/* webpackChunkName: "pages" */ './views/app/mttos/Editar') }
        ]
      },
      {
        path: '/app/amc',
        component: () => import(/* webpackChunkName: "amc" */ './views/app/amc/AgendaView'),
        redirect: '/amc/all',
        children: [
          { path: '/amc/all', name: 'mostrarlistado', component: () => import(/* webpackChunkName: "pages" */ './components/Amc/DisplayAmc') },
          { path: 'registrar', component: () => import(/* webpackChunkName: "pages" */ './components/Amc/AgendaMaestraCarga') },
          { path: 'editar', component: () => import(/* webpackChunkName: "pages" */ './components/Amc/ModificarAmc') },
          { path: 'anular', component: () => import(/* webpackChunkName: "pages" */ './components/Amc/AnularAmc') },
          { path: 'centros', component: () => import(/* webpackChunkName: "pages" */ './components/Amc/SedesAmc') }
        ]
      },
      {
        path: 'app/single',
        component: () => import(/* webpackChunkName: "single" */ './views/app/single')
      }
    ]
  },
  { path: '/error', component: () => import(/* webpackChunkName: "error" */ './views/Error') },
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ './views/user'),
    redirect: '/user/login',
    children: [
      { path: 'login', component: () => import(/* webpackChunkName: "user" */ './views/user/Login') },
      { path: 'register', component: () => import(/* webpackChunkName: "user" */ './views/user/Register') },
      { path: 'forgot-password', component: () => import(/* webpackChunkName: "user" */ './views/user/ForgotPassword') }
    ]
  },
  { path: '*', component: () => import(/* webpackChunkName: "error" */ './views/Error') }
]

const router = new Router({
  linkActiveClass: 'active',
  routes,
  mode: 'history'
})

export default router
