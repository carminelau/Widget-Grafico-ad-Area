// Widget ID
export const WIDGET_ID = "widget_analytics_area_graphics";

// Widget name
export const WIDGET_NAME = "Grafico ad Area"

// Widget permission
export const ADMIN = false;

// Widget dimension
export const isResizable = true;
export const WIDGET_DEFAULT_DIMENSION =  { w: 7, h: 8 };
export const WIDGET_MAX_DIMENSION =  { w: 10, h: 10 };
export const WIDGET_MIN_DIMENSION =  { w: 2, h: 4 };

// Widget style
export const BACKGROUND = "#fff";

// Widget configuration
export const CONFIGURATION = [
    {
        name: "Generale",
        options: [
            
            {
                name: "Sensore",
                key: "sensor",
                type: "select",
                options: [
                    {
                        name: "OZONEANDRIA001",
                        value: "OZONEANDRIA001"
                    }
                ]
            },
            {
                name: "Ultimi Minuti",
                key: "minutes",
                type: "select",
                options: [
                    {
                        name: "10 Minuti",
                        value: 10
                    },
                    {
                        name: "20 Minuti",
                        value: 20
                    },
                    {
                        name: "30 Minuti",
                        value: 30
                    },
                    {
                        name: "40 Minuti",
                        value: 40
                    },
                    {
                        name: "50 Minuti",
                        value: 50
                    },
                    {
                        name: "60 Minuti",
                        value: 60
                    },
                    {
                        name: "120 Minuti",
                        value: 120
                     },
                     {
                         name: "180 Minuti",
                         value: 180
                     },
                     {
                         name: "360 Minuti",
                         value: 360
                      }
                ]
            }
        ]
    }
];

export const DEFAULT_CONFIGURATION = {
    sensor: "OZONEANDRIA001",
    minutes: "20"
};

// Author
export const AUTHOR = "Carmine Laudato";
