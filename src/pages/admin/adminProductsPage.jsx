import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom"
import axios from "axios";
import formatPrice from "../../utils/price-format";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import LoadingAnimation from "../../components/loadingAnim";
import DeleteModel from "../../components/deleteModel";

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (loading) {
            const token = localStorage.getItem("token");
            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((res) => {
                setProducts(res.data)
                setLoading(!loading)
            })
        }
    }, [loading]);

    return (
        <div className="w-full h-full overflow-y-scroll overflow-x-scroll">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="flex justify-end p-4">
                    <div className="bg-accent rounded-2xl text-center font-medium px-3 py-1 flex items-center">
                        {products.length} Items
                    </div>
                </div>
                {loading ? (<div className="w-full h-full flex items-center justify-center"><LoadingAnimation /></div>) : (<table className="w-full table-auto">
                    <thead className="bg-blue-300 text-white sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">ProductId</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Name</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Price</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Labeled Price</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Images</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Category</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Brand</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider border-r last:border-r-0">Model</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Is Visible</th>
                            <th className="px-4 py-3 text-left font-semibold text-sm uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-50 divide-y divide-gray-200">
                        {
                            products.map(
                                (item) => (

                                    <tr key={item.productId} className="even:bg-blue-300 duration-200 bg-white">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900 border-r border-gray-200 last:border-r-0">{item.productId}</td>
                                        <td className="px-4 py-4 text-sm text-gray-900 border-r border-gray-200 last:border-r-0 font-medium">{item.name}</td>
                                        <td className="px-4 py-4 text-sm text-green-600 font-semibold border-r border-gray-200 last:border-r-0">{formatPrice(item.price)}</td>
                                        <td className="px-4 py-4 text-sm text-red-500 font-semibold border-r border-gray-200 last:border-r-0 line-through">{formatPrice(item.labeledPrice)}</td>
                                        <td className="px-4 py-4 border-r border-gray-200 last:border-r-0"><img src={item.images[0]} alt={item.name} loading="lazy" className="w-16 h-16" /></td>
                                        <td className="px-4 py-4 border-r border-gray-200 last:border-r-0"><span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{item.category}</span></td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0 font-medium">{item.brand}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200 last:border-r-0">{item.model}</td>
                                        <td className="px-4 py-4"><span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${item.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.isVisible ? "visible" : "hidden"}</span></td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center text-2xl gap-2">
                                                <Link to="/admin/update-product" state={item} className="hover:text-accent">
                                                    <CiEdit />
                                                </Link>
                                                <DeleteModel product={item} setLoading={setLoading} />
                                            </div>
                                        </td>
                                    </tr>

                                )
                            )
                        }

                    </tbody>
                </table>)}
            </div>

            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-10 right-14">
                <FaPlus />
            </Link>
        </div>
    )
}