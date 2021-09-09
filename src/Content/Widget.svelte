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

    let canvas;
    showOptions_();

    import chartjs from "chart.js/auto";
    //import Utils from "chart.js/types";
    import { getRelativePosition } from "chart.js/helpers";

    console.log(state);

    /* ESEMPIO FUNZIONAMENTO ->  INIZIO */
    import { Button } from "svelte-materialify/src";
    setTimeout(() => {
        showResult();
    });
    /* ESEMPIO FUNZIONAMENTO ->  FINE */

    let data;
    let dati=[];
    let timestamp=[];

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
                    
                    for (let i=0;i<data.length;i++){
                        dati.push(data[i].o3);
                        timestamp.push(data[i].timestamp);
                    }
                } else {
                    showError("Problema con la route");
                }
            });
    }

    let chartData;
    import { onMount } from "svelte";

    createGraphic();

    let chartValues = dati;
    let chartLabels = timestamp;
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
                        label: "Revenue",
                        data: chartValues,
                        borderColor: "rgb(54, 162, 235)",
                        backgroundColor: "rgb(54, 162, 235)",
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
                        text: (ctx) =>
                            "drawTime: " +
                            ctx.chart.options.plugins.filler.drawTime,
                    },
                },
                pointBackgroundColor: "#fff",
                radius: 5,
                interaction: {
                    intersect: false,
                },
            },
        });
    });
</script>

<main id="widget-container" style={WIDGET_VISIBLE ? "" : "display: none"}>
    <!--<Button on:click={() => createGraphic()}>Crea Grafico</Button> -->

    <canvas bind:this={chartCanvas} id="myChart" />

    <!-- ESEMPIO FUNZIONAMENTO ->  FINE -->
</main>
