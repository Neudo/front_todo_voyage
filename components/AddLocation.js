import {API_URL} from "../config.js";


export default {
    data(){
        return {
            name: "",
            lat: "",
            lng: ""
        }
    },
    template: `        <div class="row">
            <div class="col-12 col-md-6 offset-md-3">
                <form action="" v-on:submit.prevent="addLocation" method="POST">
                    <h2>Ajouter un lieu</h2>

                    <label for="name">Nom
                        <input type="text" id="name" v-model="name" name="name">
                    </label>

                    <div class="wrapper-pos">
                        <label for="lat">Latitude
                            <input type="text" id="lat" v-model="lat" name="lat">
                        </label>
                        <label for="lng">Longitude
                            <input type="text" id="lng" v-model="lng" name="lng">
                        </label>
                    </div>

                    <button type="submit">Ajouter ce lieu</button>

                </form>
            </div>
        </div>`,
    methods:{
        addLocation(){
            const formPost = new FormData()
            formPost.append('name', this.name)
            formPost.append('lat', this.lat)
            formPost.append('lng', this.lng)


            fetch(`${API_URL}/locations/`, {
                method: 'POST',
                body: formPost
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de l ajout de l\'élément');
                    }
                    // this.fetchItems();
                })
                .catch(error => {
                    console.log(error)
                })
        },

    }
}