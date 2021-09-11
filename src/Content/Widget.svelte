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
    //let chartLabels=["1","2","3"];
    //let chartValues = dati;
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
                        label: "Ozone",
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
    <br />

        <SlideGroup centerActive activeClass="white-text" >
          {#each Array(3) as _, i}
            <SlideItem let:active>
              <Button class="mr-2 ml-2 {active ? 'primary-color' : ''}" style="width-max:600px; align-items:center;">Visualizza Report {i + 1}</Button>
            </SlideItem>
          {/each}
        </SlideGroup>

</main>

