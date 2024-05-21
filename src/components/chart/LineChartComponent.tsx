import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChartComponent: React.FC = () => {
    useEffect(() => {
        const chart = echarts.init(document.getElementById('line-chart') as HTMLDivElement);

        const options: echarts.EChartsOption = {
            backgroundColor: 'transparent', // Fundo do gráfico para contraste
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line', // Tipo de ponteiro do eixo
                },
                borderColor: 'none',
                borderWidth: 0,
                backgroundColor: '#001219', // Cor de fundo da tooltip
                textStyle: {
                    color: '#fff', // Cor do texto da tooltip
                    textBorderColor: 'transparent'
                },
                formatter: (params: any) => {
                    // Mostrar apenas o valor na tooltip
                    const value = params[0]?.value || 0;
                    return value.toString();
                },
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
                type: 'line',
                itemStyle: {
                    color: '#fff', // Cor da linha
                },
                lineStyle: {
                    width: 2, // Largura da linha
                    color: '#fff', // Cor da linha
                },
                symbol: 'circle', // Tipo de símbolo nos pontos de dados
                symbolSize: 9, // Tamanho dos símbolos
                smooth: false, // Linha suave
            }],
        };

        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, []);

    return <div id="line-chart" style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} />;
};

export default LineChartComponent;