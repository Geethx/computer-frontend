import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/media-upload";

export default function AdminAddProductPage(){

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [altNames, setAltNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    async function handleAddProduct(){
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

            
            const imageURLs = await Promise.all(fileUploadPromises);

            await axios.post(import.meta.env.VITE_API_URL + "/products/",{
                productId : productId,
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
        toast.success("Product added successfully");
        navigate("/admin/products");

        } catch (error) {
          toast.error(error?.response?.data?.message || "Failed to add product");
            return;  
        }
    }   

    return(
        <div className="w-full max-h-full flex flex-wrap items-start overflow-y-scroll">
                <h1 className="w-full font-bold text-3xl mb-4 sticky top-0 bg-primary">Add New Product</h1>
                <div className="w-[50%] h-[120px] flex flex-col"> 
                    <label className="text-black font-bold ml-2">Product ID:</label>
                    <input value={productId} onChange={(e) => {setProductId(e.target.value)}} type="text" placeholder="Ex:ID001"  className="rounded-md border-2 border-accent p-2 m-2 focus:outline-white"/>
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
                    <button onClick={handleAddProduct} className="w-[180px] h-10 bg-accent text-white font-bold rounded-md hover:scale-105 transition-all">Add Product</button>
                    <button className="w-[180px] h-10 bg-red-600 text-white font-bold rounded-md hover:scale-105 transition-all ml-4">Cancel</button>

                </div>
        </div>
    )
}