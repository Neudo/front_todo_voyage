import { API_URL } from "/config.js";

export default {
    data() {
        return {
            title: 'Todo list vacances',
            locations: []
        }
    },
    methods: {
        fetchItems() {
            fetch(`${API_URL}/locations`).then(response => response.json()).then(data => {
                    this.locations = data.results;
                });
        },
        deleteLocation(index){
            fetch(`${API_URL}/locations/${index}`, {method: 'delete'})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la suppression de l\'élément');
                    }
                    this.fetchItems();
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    mounted(){
        fetch(`${API_URL}/locations`).then((response) => {response.json().then((data) => {
            this.locations = data.results})
        })
    },
    template: `<div class="row">
            <div class="col-12">
                <h2>Liste de vos lieux</h2>
            </div>
        </div>
        <div class="row">
            <div v-for="(location, index) in locations " :key="location.id" class="col-12 col-md-6 col-lg-4">
                <div class="card-location">
                    <router-link :to="'/locations/' + location.id" >{{location.name}}</router-link><a @click.prevent="deleteLocation(location.id)" href="#">[supprimer]</a>
                    
                </div>
            </div>
        </div>`
}