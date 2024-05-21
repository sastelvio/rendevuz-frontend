import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface StackedAreaChartProps {
    legendData: string[]; // Ou um tipo adequado para os dados da legenda
    data: echarts.LineSeriesOption[]; // Corrigindo o tipo para LineSeriesOption
}

const StackedAreaChartComponent: React.FC<StackedAreaChartProps> = ({ legendData, data }) => {
    useEffect(() => {
        const chartDom = document.getElementById('stacked-area-chart') as HTMLDivElement;
        const myChart = echarts.init(chartDom);

        const options: echarts.EChartsOption = {
            backgroundColor: 'transparent', // Fundo do gráfico para contraste
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none', // Tipo de ponteiro do eixo
                },
                borderColor: 'none',
                borderWidth: 0,
                backgroundColor: '#001219', // Cor de fundo da tooltip
                textStyle: {
                    color: '#fff', // Cor do texto da tooltip
                    textBorderColor: 'transparent'
                },
                position: ['60%', '80%'], // Posição fixa para exibir o tooltip

                /*formatter: (params: any) => {
                    // Mostrar apenas o valor na tooltip
                    const value = params[0]?.value || 0;
                    return value.toString();
                },*/
            },
            legend: {
                data: legendData,
                textStyle: { // Altera a cor do texto da legenda
                    color: '#fff'
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: {
                    lineStyle: {
                        color: 'transparent', // Cor da linha do eixo x
                    },
                },
                axisLabel: {
                    color: '#fff', // Cor das etiquetas do eixo x
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: 'transparent', // Cor da linha do eixo y
                    },
                },
                axisLabel: {
                    color: '#fff', // Cor das etiquetas do eixo y
                },
                splitLine: {
                    lineStyle: {
                        color: 'transparent', // Cor das linhas de divisão horizontal
                    },
                },
            },
            series: data.map(series => ({
                ...series,
                type: 'line', // Definindo o tipo de série como "line"
                label: {
                    show: false,
                    position: 'top',
                    color: '#fff' // Altera a cor do texto que aparece no topo das linhas
                }
            })),
        };

        myChart.setOption(options);

        return () => {
            myChart.dispose();
        };
    }, [legendData, data]);

    return <div id="stacked-area-chart" style={{ width: '100%', height: '100%' }} />;
};

export default StackedAreaChartComponent;