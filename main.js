$(window).on('load', function () {
  var body = $("body"),
    universe = $("#universe"),
    solarsys = $("#solar-system");

  var init = function () {
    body
      .removeClass("view-2D opening")
      .addClass("view-3D")
      .delay(2000)
      .queue(function () {
        $(this).removeClass("hide-UI").addClass("set-speed");
        $(this).dequeue();
      });

    // Inicializa os links no modo normal
    setNormalLinks();
  };

  var setView = function (view) {
    universe.removeClass().addClass(view);
  };

  // Função para ativar os links no modo normal
  var setNormalLinks = function () {
    $("#data a").removeClass("inactive").off("click").on("click", function (e) {
      var ref = $(this).attr("class");
      solarsys.removeClass().addClass(ref);
      $(this).parent().find("a").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });
  };

  // Função para ativar os links no modo 3D
  var set3DLinks = function () {
    $("#data a").removeClass("inactive").off("click").on("click", function (e) {
      var planetClass = $(this).attr("class").split(' ')[0];
      var planetUrl = "3d/" + planetClass + ".html";
      window.open(planetUrl, "_blank"); // Abre o link do planeta em uma nova aba
      e.preventDefault(); // Evita o comportamento padrão de navegação
    });
  };

  // Função para ativar o modo 3D
  $(".set-3d").click(function () {
    setView("scale-3d set-3d");

    // Desabilita a navegação normal para os links, garantindo que apenas o set-3d seja ativado
    body.addClass("set-3d-active");
    $("dl, dt").hide(); // Esconde os elementos

    // Altera diretamente os links para abrir as páginas 3D
    set3DLinks();
  });

  // Funções para os outros modos (set-size, set-distance, etc.)
  $(".set-size, .set-distance, .set-speed, .set-zoom").click(function () {
    setView("scale-normal");

    body.removeClass("set-3d-active");
    $("dl, dt").show(); // Mostra os elementos novamente

    // Reativa os links no modo normal
    setNormalLinks();
  });

  // Funções anteriores, sem alterações
  $("#toggle-data").click(function (e) {
    body.toggleClass("data-open data-close");
    e.preventDefault();
  });

  $("#toggle-controls").click(function (e) {
    body.toggleClass("controls-open controls-close");
    e.preventDefault();
  });

  $(".set-view").click(function () {
    body.toggleClass("view-3D view-2D");
  });

  $(".set-zoom").click(function () {
    body.toggleClass("zoom-large zoom-close");
  });

  $(".set-speed").click(function () {
    setView("scale-stretched set-speed");
  });

  $(".set-size").click(function () {
    setView("scale-s set-size");
  });

  $(".set-distance").click(function () {
    setView("scale-d set-distance");
  });

  init();
});
