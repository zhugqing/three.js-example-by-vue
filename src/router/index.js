import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeView = () => import('../pages/001-square')
const RotatingCube = () => import('../pages/002-Rotating-cube')
const MultipleCubes= () => import('../pages/003-Multiple-cubes')
const ResponsiveDesign= () => import('../pages/004-responsive-design')
const SceneGraphOne = () => import('../pages/005-scene-graph-01');
const SceneGraphTwo = () => import('../pages/006-scene-graph-02');
const SceneGraphThree = () => import('../pages/007-scene-graph-03');
const SceneGraphFour = () => import('../pages/008-scene-graph-04');
const SceneGraphFive = () => import('../pages/009-scene-graph-05');

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
]

const router = new VueRouter({
  routes
})

export default router