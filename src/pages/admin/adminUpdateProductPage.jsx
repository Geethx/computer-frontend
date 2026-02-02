import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/media-upload";

export default function AdminUpdateProductPage(){

    const location = useLocation();
    const [productId, setProductId] = useState(location.state.productId);
    const [productName, setProductName] = useState(location.state.name);
    const [description, setDescription] = useState(location.state.description);
    const [altNames, setAltNames] = useState(location.state.altNames.join(","));
    const [price, setPrice] = useState(location.state.price);
    const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
    const [category, setCategory] = useState(location.state.category);
    const [brand, setBrand] = useState(location.state.brand);
    const [model, setModel] = useState(location.state.model);
    const [isVisible, setIsVisible] = useState(location.state.isVisible);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    console.log(location)

    async function handleUpdateProduct(){
        try {
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("You are not authorized to perform this action");
                navigate("/login");
                return;
            }
            const fileUploadPromises = [];

                for (let i = 0; i <files.length; i++){
                    fileUploadPromises[i] = uploadFile(files[i])
                }        

            
            let imageURLs = await Promise.all(fileUploadPromises);
                if(imageURLs.length === 0){
                    imageURLs = location.state.images
                }

            await axios.put(import.meta.env.VITE_API_URL + "/products/" + productId,{
                name : productName,
                description : description,
                images: imageURLs,
                price : price,
                altNames : altNames.split(","),
                isVisible : isVisible,
                labeledPrice : labeledPrice,
                category : category,
                brand : brand,
                model : model,
        },{
            headers : {
                Authorization: "Bearer " + token
            }
        });
        toast.success("Product Updated successfully");
        navigate("/admin/products");

        } catch (error) {
          toast.error(error?.response?.data?.message || "Failed to update product");
            return;  
        }
    }   

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll">
                <h1 className="w-full font-bold text-3xl mb-4 sticky top-0 bg-primary">Edit Product</h1>
                <div className="w-[50%] h-[120px] flex flex-col"> 
                    <label className="text-black font-bold ml-2">Product ID:</label>
                    <input value={productId} disabled onChange={(e) => {setProductId(e.target.value)}} type="text" placeholder="Ex:ID001"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Product Name:</label>
                    <input value={productName} onChange={(e) => {setProductName(e.target.value)}} type="text" placeholder="Ex:Laptop"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Description:</label>
                    <textarea value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder="Ex:High-performance laptop for gaming and work"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white resize-none" rows="3"></textarea>
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Images:</label>
                    <input multiple type="file" onChange={(e) => {setFiles(e.target.files)}} className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-full h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Alternative Names:</label>
                    <input value={altNames} onChange={(e) => {setAltNames(e.target.value)}} type="text" placeholder="Ex:Gaming Laptop, Notebook"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Price:</label>
                    <input value={price} onChange={(e) => {setPrice(e.target.value)}} type="number" placeholder="Ex:50000"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-[50%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Labeled Price:</label>
                    <input value={labeledPrice} onChange={(e) => {setLabeledPrice(e.target.value)}} type="number" placeholder="Ex:55000"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Category:</label>
                    <select value={category} onChange={(e) => {setCategory(e.target.value)}} className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white">
                        <option value="">Select Category</option>
                        <option value="laptops">Laptops</option>
                        <option value="desktops">Desktops</option>
                        <option value="accessories">Accessories</option>
                        <option value="components">Components</option>
                    </select>
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Brand:</label>
                    <select value={brand} onChange={(e) => {setBrand(e.target.value)}} className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white">
                        <option value="">Select Brand</option>
                        <option value="dell">Dell</option>
                        <option value="hp">HP</option>
                        <option value="asus">Asus</option>
                        <option value="lenovo">Lenovo</option>
                        <option value="acer">Acer</option>
                    </select>
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Model:</label>
                    <input value={model} onChange={(e) => {setModel(e.target.value)}} type="text" placeholder="Ex:XPS 15"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
                </div>

                <div className="w-[25%] h-[120px] flex flex-col">
                    <label className="text-black font-bold ml-2">Is Visible:</label>
                    <div className="flex items-center m-2">
                        <input checked={isVisible} onChange={(e) => {setIsVisible(e.target.checked)}} type="checkbox" className="w-5 h-5 accent-accent"/>
                        <span className="ml-2 text-sm">Show product on website</span>
                    </div>
                </div>
                <div className="w-full h-20 sticky bottom-0 rounded-b-2xl flex justify-center items-center">
                    <button onClick={handleUpdateProduct} className="w-[180px] h-10 bg-accent text-white font-bold rounded-md hover:scale-105 transition-all">Update Product</button>
                    <button onClick={() => navigate("/admin/products")} className="w-[180px] h-10 bg-red-600 text-white font-bold rounded-md hover:scale-105 transition-all ml-4">Cancel</button>

                </div>
        </div>
    )
}