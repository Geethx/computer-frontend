import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";

export default function DeleteModel(props) {
    const [isVisible, setIsVisible] = useState(false);
    const product = props.product;
    const setLoading = props.setLoading;
    return (
        <div>
            <AiOutlineDelete onClick={() => { setIsVisible(true) }} className="hover:text-red-600 cursor-pointer" />
            {
                isVisible && (
                    <div className="fixed z-100 bg-black/50 w-screen h-screen top-0 left-0 flex justify-center items-center">
                        <div className="bg-white w-[400px] h-[200px] relative">
                            <button onClick={() => { setIsVisible(false) }} className="w-10 h-10 text-red-600 absolute right-0 text-sm font-bold hover:bg-red-600 hover:text-white cursor-pointer">
                                X
                            </button>
                            <h1 className="p-4 text-xl text-center mt-10">Are you sure you want to delete the product with Product ID <span className="font-bold">{product.productId}</span>?</h1>
                            <div className="text-sm flex items-center justify-center gap-5 font-semibold">
                                <button className="bg-red-600 w-15 h-8 rounded-xl"
                                    onClick={
                                        () => {
                                            const token = localStorage.getItem("token");

                                            axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId, {
                                                headers : {
                                                    Authorization : `Bearer ${token}`
                                                }
                                            }).then(() => {
                                                setIsVisible(!isVisible)
                                                toast.success("Product deleted Successfully")
                                                setLoading(true)
                                            }).catch((error) => {
                                                toast.error(error?.res?.data?.message || "Failed to delete product")
                                                setIsVisible(!isVisible)
                                            })


                                        }}>Delete</button>
                                <button onClick={() => { setIsVisible(false) }} className="w-15 h-8 rounded-xl bg-gray-500">Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}