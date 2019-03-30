class Image {
    constructor(title, farm_id, server_id, id, secret) {
        this.title = title;
        this.farm_id = farm_id;
        this.server_id = server_id;
        this._id = id;
        this._secret = secret;
    }

    getUrl() {
        return "https://farm" + this.farm_id + ".staticflickr.com/" + this.server_id + "/" + this._id + "_" + this._secret + ".jpg";
    }

    getTitle() {
        return this.title.toString();
    }

    getId() {
        return this._id;
    }

    getSecret() {
        return this._secret;
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
