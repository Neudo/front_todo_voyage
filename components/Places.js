import {API_URL} from "../config.js";

export default {
    data() {
        return{
            places: []
        }
    },

    template: `
<div class="row">
    <div class="col-12 col-md-6">
        <ul v-for="(place, index) in places" :key="place.id">
            <li > {{place.name}} </li>
        </ul>
    </div>
</div>
    `,
    methods: {

    },
    mounted(){

        const location_id = this.$route.params.id
        console.log(this.$route.params.id)

        fetch(`${API_URL}/locations/${location_id}/places`).then((response) => {response.json().then((data) => {
            console.log(data)
            this.places = data})
        })
    }

}