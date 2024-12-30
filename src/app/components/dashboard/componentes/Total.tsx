import React from 'react';
import { ListagemType } from "@/app/types/types";
import { getListagem } from '@/app/actions/actions';

export async function calculateTotalExpenses() {
    const listagemRaw = await getListagem();
    const listagem: ListagemType[] = listagemRaw.map((item: any) => ({
        id: item.id,
        descricao: item.descricao,
        valor: Number(item.valor),
        data: item.data,
        categoria: item.categoria,
    }));
    const totalExpenses = listagem.reduce((total, item) => {
        return total + (Number(item.valor) || 0);
    }, 0);
    console.log('Total Expenses:', totalExpenses);
    return totalExpenses;
}

export default function TotalExpensesDisplay({ total }: { total: number }) {
    const salario = 1800; 
    const sobra = salario - total; 

    return (
        <div className="p-5 md:p-10 flex items-center justify-center">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 w-full max-w-lg space-y-8">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
                    Resumo Financeiro
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-red-50 rounded-2xl p-5 transform transition hover:scale-105 flex flex-col justify-between shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-red-800 font-semibold">Total de Despesas</span>
                            <span className="text-red-600 font-bold">R$ {total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-5 transform transition hover:scale-105 flex flex-col justify-between shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-blue-800 font-semibold">Salário</span>
                            <span className="text-blue-600 font-bold">R$ {salario.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-5 transform transition hover:scale-105 flex flex-col justify-between shadow-md">
                        <div className="flex justify-between items-center">
                            <span className="text-green-800 font-semibold">Sobra</span>
                            <span className="text-green-600 font-bold">R$ {sobra.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-block animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Atualizado agora</p>
                </div>
            </div>
        </div>
    );
}
