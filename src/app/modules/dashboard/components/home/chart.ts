export const chartOptions = {
    title:{
        text: "Indicadores Cumplidos"
      },
      animationEnabled: true,
      axisY: {
        includeZero: true,
        suffix: "K"
      },
    data: [{
        type: "bar",
        indexLabel: "{y}",
        yValueFormatString: "#,### Indicadores Cumplidos",
        dataPoints: [
            { label: 'Perspeciva Espiritual', y: 71 },
            { label: 'Perspectiva Financiera', y: 55 },
            { label: 'Perspectiva Clientes y Mercados', y: 50 },
            { label: 'Perspectiva Asistencia (Procesos Internos)', y: 65 },
            { label: 'Perspectiva Persona (Aprendizaje y crecimiento)', y: 71 },
            { label: 'Perspectiva Ambiental', y: 92, indexLabel: "Highest\u2191" },
            { label: 'Perspectiva Social', y: 68 },
        ]
    }]
}