import intro from "./components/Intro.js";
import addLocation from "./components/AddLocation.js"
import listLocation from "./components/ListLocation.js";
import places from "./components/Places.js";
import addPlace from "./components/addPlace.js";

const { createApp } = Vue

const NotFound = {
    template: `<div>not found retour à 
    <router-link to="/" >l'accueil</router-link>
  </div>`}

const Home = {
    components: {
        intro,
        addLocation,
        listLocation

    },
    template: `
<intro></intro>
<listLocation></listLocation>
<addLocation></addLocation>
`
}

const SingleLocation = {
    components: {
        places,
        addPlace
    },
    template: `
<router-link to="/">Retour homepage</router-link>
    <h1>Ville de {{locationName}}</h1>
    <p>Places à visiter</p>
    <places></places>
    <addPlace></addPlace>
    `,
    data() {
        return{
            locationName: this.locations
        }
    },
    props: ["locations"],
}


const app = createApp({
    data() {
        return {
            title: 'Todo list vacances'
        }
    }
})

const routes = [
    { path: '/', component: Home },
    { path: '/locations/:id', component: SingleLocation },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]


const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    },
})


app.use(router)
app.mount('#app')