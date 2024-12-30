import { db } from "../lib/firebaseConfig";
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, getDoc } from "firebase/firestore";

export async function getListagem() {
    const listagem = await getDocs(collection(db, 'listagem'));
    return listagem.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data()
    }));
}

export async function addListagem(listagem: any) {
    await addDoc(collection(db, 'listagem'), listagem);
}

export async function deleteListagem(id: string) {
    await deleteDoc(doc(db, 'listagem', id));
}

export async function updateListagem(id: string, listagem: any) {
    console.log('Updating listagem with id:', id, 'and data:', listagem);
    try {
        const docRef = doc(db, 'listagem', id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
            throw new Error(`No document found with ID: ${id}`);
        }

        console.log('Attempting to update document:', docRef.id);
        console.log('Data being sent for update:', listagem);
        try {
            await updateDoc(docRef, listagem);
        } catch (error) {
            console.error("Error updating document:", error);
        }
        console.log('Document updated successfully');
    } catch (error) {
        console.error("Erro ao atualizar a listagem:", error);
    }
}

