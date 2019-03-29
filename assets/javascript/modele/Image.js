class Image{
    constructor(title, farm_id, server_id, id, secret) {
        this.title=title;
        this.farm_id=farm_id;
        this.server_id=server_id;
        this._id = id;
        this._secret = secret;
    }

    getUrl() {
        return "https://farm"+ this.farm_id +".staticflickr.com/"+this.server_id+"/"+this._id+"_"+this._secret+".jpg";
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
}
