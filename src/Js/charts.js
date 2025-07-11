import Chart from 'chart.js/auto';

function createCostBreakdownChart(ctx) {
    if (!ctx) return;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Salarios', 'Marketing y CAC', 'Infraestructura y Admin'],
            datasets: [{
                data: [65000, 40000, 9000],
                backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd'],
                borderColor: '#ffffff',
                borderWidth: 4,
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Distribución de Gastos Operativos Mensuales (MXN)' } }
        }
    });
}

function createMarketChart(ctx) {
    if (!ctx) return;
    // RESTAURADO: Gráfico de barras con escala logarítmica para visualizar todo
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mercado Total (TAM)', 'Mercado Útil (SAM)', 'Objetivo (SOM - Año 1)'],
            datasets: [{
                label: 'Oportunidad de Mercado (USD)',
                data: [610000000, 150000000, 760000],
                backgroundColor: ['#d1d5db', '#a855f7', '#22c55e'],
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Oportunidad de Mercado (USD)', font: { size: 16 } },
                tooltip: {
                    callbacks: {
                        label: (context) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw)
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    ticks: {
                        callback: (value) => {
                            if (value >= 1000000000) return '$' + (value / 1000000000) + 'B';
                            if (value >= 1000000) return '$' + (value / 1000000) + 'M';
                            if (value >= 1000) return '$' + (value / 1000) + 'k';
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function createBreakEvenChart(ctx) {
    if (!ctx) return;
    const monthlyCosts = 114000;
    const revenuePerService = 270;
    const servicesPerMonth = Array.from({length: 12}, (_, i) => (i + 1) * 40);
    const revenueProjection = servicesPerMonth.map(s => s * revenuePerService);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 12}, (_, i) => `Mes ${i + 1}`),
            datasets: [{
                label: 'Costos Fijos Mensuales (MXN)',
                data: Array(12).fill(monthlyCosts),
                borderColor: '#ef4444',
                backgroundColor: '#ef4444',
                borderDash: [5, 5],
                pointRadius: 0
            }, {
                label: 'Ingresos Proyectados (MXN)',
                data: revenueProjection,
                borderColor: '#22c55e',
                backgroundColor: '#22c55e',
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { title: { display: true, text: 'Proyección para Alcanzar Punto de Equilibrio' } },
            scales: { y: { ticks: { callback: (value) => (value / 1000) + 'k' } } }
        }
    });
}

function createFundingChart(ctx) {
    if (!ctx) return;
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pre-Seed', 'Seed', 'Serie A'],
            datasets: [{
                label: 'Desarrollo de Producto',
                data: [60000, 400000, 900000],
                backgroundColor: '#3b82f6',
            }, {
                label: 'Marketing y Ventas',
                data: [25000, 400000, 1350000],
                backgroundColor: '#60a5fa',
            }, {
                label: 'Operaciones y Admin',
                data: [15000, 200000, 750000],
                backgroundColor: '#93c5fd',
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Asignación de Fondos por Ronda (USD)' },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.dataset.label}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.raw)}`
                    }
                }
            },
            scales: { x: { stacked: true }, y: { stacked: true, ticks: { callback: (value) => '$' + (value / 1000) + 'k' } } }
        }
    });
}

function createFunctionsChart(ctx) {
     if(!ctx) return;
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Disparadores', 'Funciones HTTP', 'Notificaciones'],
            datasets: [{
                data: [65, 15, 20],
                backgroundColor: ['#1e40af', '#be185d', '#d97706'],
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Composición de Lógica Automatizada (%)' } }
        }
    });
}

export function initAllCharts() {
    const chartsToCreate = {
        'costBreakdownChart': createCostBreakdownChart,
        'marketChart': createMarketChart,
        'breakEvenChart': createBreakEvenChart,
        'fundingChart': createFundingChart,
        'functionsChart': createFunctionsChart,
    };

    for (const canvasId in chartsToCreate) {
        const ctx = document.getElementById(canvasId);
        if (ctx) {
            chartsToCreate[canvasId](ctx.getContext('2d'));
        }
    }
}