import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeView = () => import('../pages/001-square')
const RotatingCube = () => import('../pages/002-Rotating-cube')
const RotatingLightCube = () => import('../pages/003-Rotating-light-cube')
const MultipleCubes= () => import('../pages/004-Multiple-cubes')
const ResponsiveDesign= () => import('../pages/005-responsive-design')
const SceneGraphOne = () => import('../pages/006-scene-graph-01');
const SceneGraphTwo = () => import('../pages/007-scene-graph-02');
const SceneGraphThree = () => import('../pages/008-scene-graph-03');
const SceneGraphFour = () => import('../pages/009-scene-graph-04');
const SceneGraphFive = () => import('../pages/010-scene-graph-05');
const materialsOne = () => import('../pages/011-materials-01');
const materialsTwo = () => import('../pages/012-materials-02');
const materialsThree = () => import('../pages/013-materials-03');
const materialsFour = () => import('../pages/014-materials-04');
const materialsFive = () => import('../pages/015-materials-05');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/rotating_cube',
    name: 'rotating_cube',
    component: RotatingCube
  },
  {
    path: '/rotating_light_cube',
    name: 'rotating_light_cube',
    component: RotatingLightCube
  },
  {
    path: '/multiple_ubes',
    name: 'multiple_ubes',
    component: MultipleCubes
  },
  {
    path: '/responsive_design',
    name: 'responsive_design',
    component: ResponsiveDesign
  },
  {
    path: '/scene_graph_one',
    name: 'scene_graph_one',
    component: SceneGraphOne
  },
  {
    path: '/scene_graph_two',
    name: 'scene_graph_two',
    component: SceneGraphTwo
  },
  {
    path: '/scene_graph_three',
    name: 'scene_graph_three',
    component: SceneGraphThree
  },
  {
    path: '/scene_graph_four',
    name: 'scene_graph_four',
    component: SceneGraphFour
  },
  {
    path: '/scene_graph_five',
    name: 'scene_graph_five',
    component: SceneGraphFive
  },
  {
    path: '/materials_one',
    name: 'materials_one',
    component: materialsOne
  },
  {
    path: '/materials_two',
    name: 'materials_two',
    component: materialsTwo
  },
  {
    path: '/materials_three',
    name: 'materials_three',
    component: materialsThree
  },
  {
    path: '/materials_four',
    name: 'materials_four',
    component: materialsFour
  },
  {
    path: '/materials_five',
    name: 'materials_five',
    component: materialsFive
  },
]

const router = new VueRouter({
  routes
})

export default router
