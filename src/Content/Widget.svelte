<script>
    /* NON MODIFICARE -> INIZIO */
    export let showResult,
        showError,
        showLoading,
        showMaintenance,
        showProgressBar,
        updateProgressBar,
        getFormData,
        saveState,
        state,
        showOptions_;
    export let WIDGET_VISIBLE = false;
    /* NON MODIFICARE -> FINE */

    import { SlideGroup, SlideItem } from "svelte-materialify";
    import Carousel from "svelte-carousel";
    import chartjs from "chart.js/auto";
    import { getRelativePosition } from "chart.js/helpers";

    let canvas;
    showOptions_();

    console.log(state);

    /* ESEMPIO FUNZIONAMENTO ->  INIZIO */
    import { Button } from "svelte-materialify/src";
    setTimeout(() => {
        showResult();
    });
    /* ESEMPIO FUNZIONAMENTO ->  FINE */

    let data;
    let dati = [];
    let timestamp = [];

    function createGraphic() {
        //showLoading("Attendere il caricamento del grafico");

        //let a = parseInt(state.minutes);
        let params = getFormData();

        params.append("id", state.sensor);
        params.append("minuti", state.minutes);

        fetch("https://sqd.sensesquare.eu:5001/ozone_interval", {
            method: "POST",
            body: params,
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.response_code === 200) {
                    data = result.result;

                    for (let i = 0; i < data.length; i++) {
                        const array = data[i].timestamp.split(" ");
                        //dati.push(data[i].o3);
                        timestamp.push(array[4]);
                    }
                }
            });
    }

    let chartData;
    import { onMount } from "svelte";

    createGraphic();

    //GRAFICO LOCALE
    let chartValues = [
        "0",
        "0",
        "0",
        "20",
        "50",
        "70",
        "80",
        "100",
        "130",
        "200",
        "170",
        "150",
        "120",
        "80",
        "50",
        "0",
    ];
    let chartLabels=["12:10:22","12:10:50","12:11:02","12:11:22","12:11:50","12:12:02","12:12:22","12:12:50","12:13:02","12:13:22","12:13:50","12:14:02","12:14:22","12:14:50","12:15:02","12:15:32"];
    
    //GRAFICO CON ROUTE
    //let chartValues = dati;
    //let chartLabels = timestamp;
    
    let ctx;
    let chartCanvas;

    onMount(async (promise) => {
        ctx = chartCanvas.getContext("2d");
        var chart = new chartjs(ctx, {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: "Ozone [ppb]",
                        data: chartValues,
                        borderColor: "rgb(54, 162, 235)",
                        backgroundColor: "rgba(54, 162, 235,0.5)",
                        fill: true,
                    },
                ],
            },
            options: {
                plugins: {
                    filler: {
                        propagate: false,
                    },
                    title: {
                        display: true,
                        text: (ctx) => "Grafico ad Area",
                    },
                },
                pointBackgroundColor: "#fff",
                radius: 5,
                interaction: {
                    intersect: false,
                },
                elements: {
                    line: {
                        tension: 0.5,
                    },
                },
            },
        });
    });
</script>

<main id="widget-container" style={WIDGET_VISIBLE ? "" : "display: none"}>
    <canvas bind:this={chartCanvas} id="myChart" />
<div class=spazio>

</div>
        <SlideGroup centerActive activeClass="white-text" >
          {#each Array(3) as _, i}
            <SlideItem let:active>
              <Button size="x-large" class="mr-2 ml-2 light-blue darken-1 dark-text {active ? 'primary-color' : ''}" >Visualizza Report {i + 1}</Button>
            </SlideItem>
          {/each}
        </SlideGroup>
<style>
    
 Button {
    width: fit-content;
    align-items:center;
    max-width:300px;
    min-width:100px;
 }
 Button:hover{
    background-color: rgb(54, 162, 235);
 }

 .spazio{
     height:30px;
 }
</style>
</main>

