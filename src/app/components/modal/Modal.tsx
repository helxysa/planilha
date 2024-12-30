import React, { useState, useEffect } from 'react';
import { addListagem } from '../../actions/actions'; 

const NewEntryModal = ({ isOpen, onClose, item }: { isOpen: boolean; onClose: () => void; item: ListagemType | null }) => {
   const [descricao, setDescricao] = useState(item ? item.descricao : '');
   const [valor, setValor] = useState(item ? item.valor : '');
   const [data, setData] = useState(item ? item.data : new Date().toISOString().split('T')[0]);
   const [categoria, setCategoria] = useState(item ? item.categoria : '');

   useEffect(() => {
       if (item) {
           setDescricao(item.descricao);
           setValor(item.valor);
           setData(item.data);
           setCategoria(item.categoria);
       }
   }, [item]);

   const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       await addListagem({ descricao, valor, data, categoria }); 
       onClose(); 
   };

   if (!isOpen) return null;

   return (
       <div className={`modal fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50 ${isOpen ? 'flex' : 'hidden'}`}>
           <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
               <h2 className="text-2xl font-semibold text-gray-800 mb-6">Formulário</h2>
               <form onSubmit={handleSubmit}>
                   <input 
                       className="w-full  mb-4 p-2  text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                       type="text" 
                       value={descricao} 
                       onChange={(e) => setDescricao(e.target.value)} 
                       placeholder="Descrição" 
                       required
                   />
                   <input 
                       className="w-full mb-4 text-gray-800 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                       type="number" 
                       value={valor} 
                       onChange={(e) => setValor(e.target.value)} 
                       placeholder="Valor" 
                       required
                   />
                   <input 
                       className="w-full text-gray-500 mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                       type="date" 
                       value={data} 
                       onChange={(e) => setData(e.target.value)} 
                       required
                   />
                   <select 
                       className="w-full mb-4 text-gray-500 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                       value={categoria} 
                       onChange={(e) => setCategoria(e.target.value)} 
                       required
                   >
                       <option value="">Selecione a Categoria</option>
                       <option value="Alimentação">Alimentação</option>
                       <option value="Transporte">Transporte</option>
                       <option value="Moradia">Moradia</option>
                   </select>
                   <div className="text-right mt-6">
                       <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition duration-200">
                           Salvar
                       </button>
                       <button type="button" className="ml-2 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition duration-200" onClick={onClose}>
                           Cancelar
                       </button>
                   </div>
               </form>
           </div>
       </div>
   );
};

export default NewEntryModal;