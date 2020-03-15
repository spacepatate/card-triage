import Card from "../models/Card";

export default class CardService {
    constructor($api) {
        this.$api = $api;
    }

    fetchCards() {
        return this.$api.get('/cards').then((response) => {
            return response.data.map((cardData) => Card.mapJsonToModel(cardData));
        });
    }
}
