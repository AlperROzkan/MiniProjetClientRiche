class Images {
    constructor() {
        this.images=[];
    }

    /**
     * Ajoute une image dans la liste des images
     * @param image
     */
    add(image) {
        this.images.push(image);
    }

    /**
     * Renvoie les images contenues dans l'array de cette classe
     */
    getEveryImage() {
        return this.images
    }


}