'use client'
import { useEffect, useState } from 'react';
import { getListagem, updateListagem, deleteListagem } from '../../actions/actions';
import { ListagemType } from '../../types/types';
import { DocumentData } from 'firebase/firestore';
import NewEntryModal from '../modal/Modal';
import Dashboard from '../dashboard/Dashboard';
import { calculateTotalExpenses } from '../dashboard/componentes/Total';
import TotalExpensesDisplay from '../dashboard/componentes/Total';
export default function Listagem() {
    
    const [items, setItems] = useState<ListagemType[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ListagemType | null>(null);
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
     useEffect(() => {
        const fetchData = async () => {
            const data = await getListagem();
            const formattedData = data.map((item: DocumentData) => ({
                id: item.id,
                descricao: item.descricao,
                valor: Number(item.valor),
                data: item.data,
                categoria: item.categoria,
            })); 
            setItems(formattedData); 
            const total = await calculateTotalExpenses();
            setTotalExpenses(total);
        };
        fetchData();
    }, []);

    const handleEdit = async (id: string, item: ListagemType) => {
        setEditingItem(item);
        handleOpenModal();
    };

    const handleDelete = async (id: string) => {
        await deleteListagem(id);
        const data = await getListagem();
        const formattedData = data.map((item: DocumentData) => ({
            id: item.id,
            descricao: item.descricao,
            valor: item.valor,
            data: item.data,
            categoria: item.categoria,
        }));
        setItems(formattedData);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            <span className="ml-2 text-xl font-semibold text-gray-900">Finanças Pessoais</span>
                        </div>
                        <div className="flex items-center">
                            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleOpenModal}>
                                Nova Entrada
                            </button>
                            <NewEntryModal isOpen={isModalOpen} onClose={handleCloseModal} item={editingItem} />
                        </div>
                    </div>
                </div>
            </nav>

            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
                    <div className="relative">
                        <input type="text" className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Buscar..." />
                        <svg className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    <select className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Todos os Meses</option>
                        <option>Janeiro</option>
                        <option>Fevereiro</option>
                        <option>Março</option>
                    </select>
                    <select className="px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Todas as Categorias</option>
                        <option>Alimentação</option>
                        <option>Transporte</option>
                        <option>Moradia</option>
                    </select>
                </div>

                <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Data</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Descrição</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Categoria</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Valor</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ações</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {items.map((item, index) => (
                                <tr key={`${item.id}-${index}`} className="transition-colors hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{item.data}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{item.descricao}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 text-xs font-semibold leading-5 ${item.categoria === 'Alimentação' ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'} rounded-full`}>
                                            {item.categoria}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right text-gray-900 whitespace-nowrap">R$ {item.valor}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                        <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleEdit(item.id, item)}>Editar</button>
                                        <button className="ml-4 text-red-600 hover:text-red-900" onClick={() => handleDelete(item.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
                        <div className="flex justify-between flex-1 sm:hidden">
                            <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Anterior</button>
                            <button className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Próxima</button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">Mostrando <span className="font-medium">1</span> a <span className="font-medium">2</span> de <span className="font-medium">20</span> resultados</p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">Anterior</button>
                                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">1</button>
                                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">2</button>
                                    <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">3</button>
                                    <button className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">Próxima</button>
                                </nav>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <TotalExpensesDisplay total={totalExpenses} />
                <Dashboard />
            </div>
        </div>
    );
}