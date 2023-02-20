import {API_URL} from "../config.js";

export default {
    data() {
        return{
            isChecked: "unchecked",
            places: [],
            name: "",
            lat: "",
            lng: ""
        }
    },

    template: `
<div class="row">
    <div class="col-12 col-md-6">
        <ul v-for="(place, index) in places" :key="place.id">
            <li> 
                <input type="checkbox" name="place" :id="place.id" > 
                <label :for="place.id"> {{place.name}} [<a @click.prevent="updatePlace" href="#">update</a> | <a @click.prevent="deletePlace(place.id)" href="#">delete</a>] </label>
            </li>
        </ul>
    </div>
</div>
    `,
    methods: {
        updatePlace(){
            const formPost = new FormData()
            formPost.append('name', this.name)
            formPost.append('lat', this.lat)
            formPost.append('lng', this.lng)

            fetch(`${API_URL}/place/`, {
                method: 'PUT',
                body: formPost
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la mise à jour de l\'élément');
                    }
                    // this.fetchItems();
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deletePlace(index){
            fetch(`${API_URL}/places/${index}`, {method: 'delete'})
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
        onPageChange() {
            localStorage.setItem('myCheckboxState', JSON.stringify(this.isChecked));
        }

    },
    mounted(){
        const location_id = this.$route.params.id

        fetch(`${API_URL}/locations/${location_id}/places`).then((response) => {response.json().then((data) => {
            this.places = data})
        })

        const checkboxState = localStorage.getItem('myCheckboxState');
        console.log(checkboxState)
        if (checkboxState) {
            this.isChecked = JSON.parse(checkboxState);
        }
    }

}