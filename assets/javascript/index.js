$(document).ready(function () {
    let mesImages = new Images();
    // On utilise autocomplete afin de proposer automatiquement des suggestions pour l'input de l'utilisateur
    $("#nomCommune").autocomplete({
        source: function (req, response) {
            Fetch.autocompleteNomsCommunes(req, response)
        },
        minLength: 3 // Le nombre minimum de caracteres a taper avant que les suggestions apparaissent
    });

    // Pour setup les tabs vue et table
    $("#vues").tabs({
        active: 0
    });

    // Au clic sur l'icone
    $("#boutonRecherche").click(function () {
        mesImages = new Images(); // Une liste d'images qui contiendra les images qu'on recupère du fetch
        $("#photo").empty(); // On vide les images avant d'en ajouter de nouvelles

        // On retrouve les photos
        fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ca403b53ea426ebac5643c0211488a76" +
            "&tags=" + $("#nomCommune").val() +
            "&per_page=" + $("#nbPhotos").val() +
            "&format=json&nojsoncallback=1")

            .then(function (response) {
                if (response.status !== 200) {
                    console.log("Probleme avec la requete pour trouver les photos. Code de status : " + response.status);
                    return;
                }

                response.json().then(function (data) {
                        let i = 0;
                        // Nous parcourons le resultat de la requete pour recuperer les infos dont nous avons besoins
                        data.photos.photo.forEach(function (photo) {

                            // Nous gardons les images en mémoire pour utilisation plus tard
                            let monImage = new Image(photo.title, photo.farm, photo.server, photo.id, photo.secret);
                            mesImages.add(monImage);

                            // Nous ajontons les images dans la page.
                            $("#photo").append("<img alt=imageRequete" + i + " id=image" + i + " src=" + monImage.getUrl() + "/>");

                            // La boite de dialogue
                            $("#dialogImg").dialog({autoOpen: false});
                            $("#image" + i).click(function () {
                                $("#dialogImg")
                                    .dialog("open")
                                    .dialog({
                                        title: monImage.getTitle()
                                    })
                                    .empty();

                                // Pour recuperer des informations a propos de photos
                                Fetch.getInfoPhoto(monImage.getId(), monImage.getSecret())
                                    .then(function (data) {
                                        // Ici on rajoute des infos sur la boite de dialogue
                                        $("#dialogImg")
                                            .append("<div>Timestamp de prise de vue: " + data.photo.dates.taken + "</div>")
                                            .append("<div>Pseudo de l'uploader : " + data.photo.owner.username + "</div>");
                                    })
                            });
                            i++;
                        })
                    })
            })
            .catch(function (err) {
                console.log("Erreur de Fetch sur la recherche et l'affichage d'image");
            });
    });


});
