import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
    devtools((set) => ({
        productos: [],
        setProductos: (productos) => set({productos}),
        fetchProductos: async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            set({productos: data});
        }
    })));

    export default useStore;