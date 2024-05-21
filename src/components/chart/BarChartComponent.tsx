import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const BarChartComponent: React.FC = () => {
    useEffect(() => {
        const chart = echarts.init(document.getElementById('bar-chart') as HTMLDivElement);

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
                /*formatter: (params: any) => {
                    // Mostrar apenas o valor na tooltip
                    const value = params[0]?.value || 0;
                    return value.toString();
                },*/
            },
            xAxis: {
                type: 'category',
                data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
            series: [{
                data: [50, 75, 150, 100, 200, 80, 90],
                type: 'bar',
                barWidth: '10px', // Define a largura das barras
                itemStyle: {
                    color: '#fff', // Cor das barras
                    borderRadius: [10, 10, 10, 10], // Define bordas arredondadas para as barras
                },
            }],
        };

        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, []);

    return <div id="bar-chart" style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} />;
};

export default BarChartComponent;