import { Chart, registerables } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { getListagem } from '../../../actions/actions';
import { ListagemType } from '../../../types/types';
Chart.register(...registerables);
const BarChart = () => {
   const chartRef = useRef<HTMLCanvasElement | null>(null);
   const [data, setData] = useState<number[]>([]); 
   const chartInstanceRef = useRef<Chart | null>(null); 
   useEffect(() => {
       const fetchData = async () => {
           const listagemRaw = await getListagem(); 
           const listagem: ListagemType[] = listagemRaw.map(item => ({
               id: item.id,
               descricao: '', 
               valor: 0, 
               data: '', 
               categoria: '' 
           }));
           const monthlyExpenses = listagem.map(item => item.valor);
           setData(monthlyExpenses);
       };
       fetchData();
   }, []);
   useEffect(() => {
       const ctx = chartRef.current?.getContext('2d');
       if (ctx) {
           if (chartInstanceRef.current) {
               chartInstanceRef.current.destroy();
           }
           chartInstanceRef.current = new Chart(ctx, {
               type: 'bar',
               data: {
                   labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
                   datasets: [
                       {
                           label: 'Gastos do Mês',
                           data: data, 
                           backgroundColor: 'rgba(75, 192, 192, 0.2)',
                           borderColor: 'rgba(75, 192, 192, 1)',
                           borderWidth: 1,
                       },
                   ],
               },
               options: {
                   responsive: true,
                   plugins: {
                       legend: {
                           position: 'top',
                       },
                       title: {
                           display: true,
                           text: 'Gastos do Mês',
                       },
                   },
               },
           });
       }
   }, [data]); 
   return <canvas ref={chartRef} />;
};
export default BarChart;