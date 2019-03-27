$(document).ready(function () {

    let mesImages = new Images();

    // On utilise autocomplete afin de proposer automatiquement des suggestions pour l'input de l'utilisateur
    $("#nomCommune").autocomplete({
        source: function (req, response) {
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
                    }
                )
                .catch(function (err) {
                    console.log("Erreur de Fetch sur l'autocompletion: ", err);
                });
        },
        minLength: 3 // Le nombre minimum de caracteres a taper avant que les suggestions apparaissent
    });

    // Pour setup les tabs
    $("#vues").tabs({
        active: 0
    });

    // Au click sur l'icone
    $("#boutonRecherche").click(function () {
        mesImages = new Images();
        $("#photo").empty(); // On vide les images avant d'en ajouter de nouvelles

        // On retrouve les photos
        fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ca403b53ea426ebac5643c0211488a76" +
            "&tags=" + $("#nomCommune").val() +
            "&per_page=" + $("#nbPhotos").val() +
            "&format=json&nojsoncallback=1")
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log("Probleme avec la requete pour trouver les photos. Code de status : " + response.status);
                        return;
                    }

                    response.json().then(
                        function (data) {
                            // Nous parcourons le resultat de la requete pour recuperer les infos dont nous avons besoins
                            data.photos.photo.forEach(function (photo) {
                                // Nous gardons les images en mémoire pour plus tard
                                let monImage = new Image(photo.farm, photo.server, photo.id, photo.secret);
                                mesImages.add(monImage);
                                $("#photo").append("<img src="+monImage.getUrl()+"/>"); // Nous ajontons les images dans la page.
                            })
                        })
                })
            .catch(function (err) {
                console.log("Erreur de Fetch sur la recherche et l'affichage d'image");
            });
    });

});
