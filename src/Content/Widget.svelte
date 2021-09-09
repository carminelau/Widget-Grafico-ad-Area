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

    function createGraphic() {
        showLoading("Attendere il caricamento del grafico");

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
                    console.log(data);
                } else {
                    showError("Problema con la route");
                }
            });
    }

    let chartData;
    import { onMount } from "svelte";

    let chartValues = [20, 10, 5, 2, 20, 30, 45];
    let chartLabels = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
    ];
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
                        borderColor: "rgb(0, 51, 153)",
                        backgroundColor: "rgb(30, 144, 255)",
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
