$(document).ready(function () {
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
                    console.log("Erreur de Fetch: ", err);
                });
        },
        minLength: 3 // Le nombre minimum de caracteres a taper avant que les suggestions apparaissent
    });

    $("#vues").tabs({
        active: 1
    });

    // Getter
    var active = $("#vues").tabs("option", "active");

    // Setter
    $("#vues").tabs("option", "active", 1);

});
