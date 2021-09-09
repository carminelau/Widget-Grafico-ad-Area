
<script>
    /* NON MODIFICARE -> INIZIO */ 
    export let showResult, showError, showLoading, showMaintenance, showProgressBar, updateProgressBar, getFormData, saveState, state, showOptions_;
    export let WIDGET_VISIBLE = false;
    /* NON MODIFICARE -> FINE */ 

    showOptions_();

    //import Line from "svelte-chartjs/src/Line.svelte"

    console.log(state);

    /* ESEMPIO FUNZIONAMENTO ->  INIZIO */
    import { Button } from 'svelte-materialify/src';
    setTimeout(() => {
        showResult();
    });
    /* ESEMPIO FUNZIONAMENTO ->  FINE */

    let data ;
  function createGraphic() {
    showLoading("Attendere il caricamento del grafico");

    //let a = parseInt(state.minutes);
    let params= getFormData();
    params.append("id",state.sensor);
    params.append("minuti",state.minutes);
    
    fetch("https://sqd.sensesquare.eu:5001/ozone_interval", {
        method: "POST",
        body:params
    })
    .then(response => response.json())
    .then(result => {
        if (result.response_code === 200){
            data= result.result;
            console.log(data);
            showResult();
        }
        else {
            showError("Problema con la route");
        }
    })
  }

</script>

<main id="widget-container" style={WIDGET_VISIBLE ? "" : "display: none"}>


    <!-- ESEMPIO FUNZIONAMENTO ->  INIZIO -->
    <Button on:click={() => showError("Esempio di errore")}>
        Mostra errore
    </Button>

    <Button class="primary title-text" on:click={() => showMaintenance("Esempio di manutenzione")}>
        Mostra manutenzione
    </Button>

    <Button class="secondary secondary-title-text" on:click={() => showLoading("Esempio di caricamento")}>
        Mostra caricamento generale
    </Button>

    <Button class="accent description-text" on:click={() => showProgressBar("Esempio di caricamento con barra", 75)}>
        Mostra caricamento con barra
    </Button>

    <Button on:click={() => createGraphic()}>
        Crea Grafico    
    </Button>

    
    <!-- ESEMPIO FUNZIONAMENTO ->  FINE -->
    
</main>