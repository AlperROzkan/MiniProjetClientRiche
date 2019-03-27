class Image{
    constructor(title, farm_id, server_id, id, secret) {
        this.title=title;
        this.farm_id=farm_id;
        this.server_id=server_id;
        this.id=id;
        this.secret=secret;
    }

    getUrl() {
        return "https://farm"+ this.farm_id +".staticflickr.com/"+this.server_id+"/"+this.id+"_"+this.secret+".jpg";
    }

    getTitle() {
        return this.title.toString();
    }

}
