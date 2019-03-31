class Image {
    constructor(title, farm_id, server_id, id, secret) {
        this.title = title;
        this.farm_id = farm_id;
        this.server_id = server_id;
        this.id = id;
        this.secret = secret;
    }

    getTitle() {
        return this.title.toString();
    }

    getFarmId() {
        return this.farm_id;
    }

    getServerId() {
        return this.server_id;
    }

    getId() {
        return this.id;
    }

    getSecret() {
        return this.secret;
    }

    getUrl() {
        return "https://farm" + this.farm_id + ".staticflickr.com/" + this.server_id + "/" + this.id + "_" + this.secret + ".jpg";
    }

    /**
     * Met en place le propriétaire de la photo
     * @param auteur
     */
    setAuthor(auteur) {
        this.auteur = auteur;
    }

    /**
     * Retourne l'auteur de la photo
     * @return {*}
     */
    getAuthor() {
        return this.auteur;
    }

    /**
     * Met en place le timestamp de l'image
     * @param timestamp
     */
    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }

    /**
     * Retourne le timestamp de l'image
     */
    getTimestamp() {
        return this.timestamp;
    }
}
