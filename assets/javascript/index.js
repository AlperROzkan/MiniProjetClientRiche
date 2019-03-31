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

    // La date que l'on peut choisir
    $( "#datepicker" ).datepicker();

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

                        // Pour recuperer d'autres informations en plus a propos de photos et les ajouter dans les images
                        Fetch.getInfoPhoto(monImage.getId(), monImage.getSecret()).then((data) => {
                            monImage.setTimestamp(data.photo.dates.taken);
                            monImage.setAuthor(data.photo.owner.username);
                            mesImages.add(monImage);

                        }).then(() => {
                            console.log(1, monImage.getTimestamp());

                            // Datatables ici car on veut avoir des infos une fois que les photos seront venues
                            let t = $('#example').DataTable();
                            mesImages.getEveryImage().forEach((element) => {
                                t.row.add([
                                    element.getTitle(),
                                    element.getAuthor(),
                                    element.getTimestamp(),
                                    element.getFarmId(),
                                    element.getServerId(),
                                    element.getId(),
                                    element.getSecret()
                                ]).draw(false);
                            });
                        });

                        // Nous ajoutons les images dans la page.
                        $("#photo").append("<img alt=imageRequete" + i + " id=image" + i + " src=" + monImage.getUrl() + "/>");

                        // La boite de dialogue
                        $("#dialogImg").dialog({autoOpen: false});
                        $("#image" + i).click(function () { // Au clic d'une image
                            $("#dialogImg").dialog("open")
                                .dialog({
                                    title: monImage.getTitle()
                                })
                                .empty()
                                // Ici on rajoute des infos sur la boite de dialogue
                                .append("<div>Timestamp de prise de vue: " + monImage.getTimestamp() + "</div>")
                                .append("<div>Pseudo de l'uploader : " + monImage.getAuthor() + "</div>");
                        });
                        i++;
                    });
                })
            })
            .catch(function (err) {
                console.log("Erreur de Fetch sur la recherche et l'affichage d'image");
            });


    });


});
