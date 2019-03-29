/**
 * Classe modèle qui fait les fetch
 */
class Fetch {

    /**
     * Remplit les sugestions avec des noms de communes
     * @param req
     * @param response
     */
    static autocompleteNomsCommunes(req, response) {
        fetch("https://geo.api.gouv.fr/communes?nom=" + $("#nomCommune").val() + "&fields=departement&boost=population")
            .then(
                function (responseFetch) {
                    // Si on ne recoit rien
                    if (responseFetch.status !== 200) {
                        console.log("Probleme avec la requete pour trouver le nom de commune. Code de status : " + response.status);
                        return;
                    }

                    // On fait des choses avec les données reçues
                    responseFetch.json().then(
                        function (data) {
                            // Ici on recupere le nom de la commune
                            const resultat = data.map(function (item) {
                                return item.nom;
                            });
                            response(resultat);
                        });
                })
            .catch(function (err) {
                console.log("Erreur de Fetch sur l'autocompletion: ", err);
            });
    }
    
    /**
     * Trouve des informations sur une photo
     * @param idPhoto Id de la photo
     * @param secretPhoto Secret de la photo
     */
    static getInfoPhoto(idPhoto, secretPhoto) {
        fetch("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo" +
            "&api_key=ca403b53ea426ebac5643c0211488a76" +
            "&photo_id=" + idPhoto +
            "&secret=" + secretPhoto +
            "&format=json&nojsoncallback=1")
            .then(function (response) {
                // Erreur
                if (response.status !== 200) {
                    console.log("Problème avec la requete de récuperation des infos de photos. Status code : " + response.status);
                    return
                }

                // Pas d'erreur
                response.json().then(function (data) {
                    console.log(data);
                })
            })
    }
}