import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields" };
        }
    
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("stock", newProduct.stock);
        formData.append("category", newProduct.category);
        formData.append("description", newProduct.description);
        formData.append("image", newProduct.image); // Append image file
    
        const res = await fetch("/api/products", {
            method: "POST",
            body: formData, // Send as FormData, not JSON
        });
    
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
    
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },
    fetchProduct:async ()=>{
        const res=await fetch("/api/products")
        const data=await res.json();
        set({products:data.data})
    },
    deleteProduct:async (pid)=>{
        const res =await fetch(`/api/products/${pid}`,{
            method:"DELETE",
        });
        const data=await res.json();
        if(!data.success) return{success:false,message: data.message}
        set(state=>({products: state.products.filter(product=>product._id!==pid)}))
        return{success:true,message:data.message}
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            const data = await res.json();
    
            if (!data.success) {
                return { success: false, message: data.message || "Failed to update product" };
            }
    
            // Update the product in the state
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === pid ? data.data : product
                ),
            }));
    
            return { success: true, message: "Product updated successfully" };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "An error occurred while updating the product" };
        }
    },
    deleteAllProducts: async () => {
        try {
            const res = await fetch("/api/products", {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                set({ products: [] }); // Clears the product list in the store
                return { success: true, message: "All products deleted successfully" };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Error deleting all products:", error);
            return { success: false, message: "An error occurred while deleting all products" };
        }
    },
    searchProducts: async (searchTerm) => {
        const res = await fetch(`/api/products/search?search=${searchTerm}`);
        const data = await res.json();
        set({ products: data.data });},
    

          
          
        

}));
