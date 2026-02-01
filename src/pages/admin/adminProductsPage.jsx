import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom"
import axios from "axios";
import formatPrice from "../../utils/price-format";

const sampleProducts = [
  {
    productId: "PRD-001",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and long battery life.",
    altNames: ["Bluetooth Headset", "Wireless Headphones"],
    price: 7500,
    labeledPrice: 8900,
    category: "Electronics",
    images: [
      "/images/headphones-1.png",
      "/images/headphones-2.png"
    ],
    isVisible: true,
    brand: "SoundMax",
    model: "SM-WH100"
  },
  {
    productId: "PRD-002",
    name: "Smart Fitness Watch",
    description: "Fitness tracking smartwatch with heart rate monitor and sleep tracking.",
    altNames: ["Fitness Tracker", "Smart Watch"],
    price: 12500,
    labeledPrice: 14900,
    category: "Wearables",
    images: [
      "/images/watch-1.png",
      "/images/watch-2.png"
    ],
    isVisible: true,
    brand: "FitPro",
    model: "FP-X2"
  },
  {
    productId: "PRD-003",
    name: "Laptop Backpack",
    description: "Water-resistant laptop backpack with multiple compartments.",
    altNames: ["Notebook Bag", "Office Backpack"],
    price: 4200,
    labeledPrice: 5000,
    category: "Accessories",
    images: [
      "/images/backpack-1.png",
      "/images/backpack-2.png"
    ],
    isVisible: true,
    brand: "UrbanCarry",
    model: "UC-15"
  },
  {
    productId: "PRD-004",
    name: "USB-C Fast Charger",
    description: "65W USB-C fast charger compatible with laptops, tablets, and smartphones.",
    altNames: ["Type-C Charger", "Fast Charger"],
    price: 3500,
    labeledPrice: 4200,
    category: "Electronics",
    images: [
      "/images/charger-1.png",
      "/images/charger-2.png"
    ],
    isVisible: true,
    brand: "PowerBolt",
    model: "PB-65W"
  },
  {
    productId: "PRD-005",
    name: "Ergonomic Office Chair",
    description: "Comfortable ergonomic chair with adjustable height and lumbar support.",
    altNames: ["Office Chair", "Work Chair"],
    price: 48500,
    labeledPrice: 52000,
    category: "Furniture",
    images: [
      "/images/chair-1.png",
      "/images/chair-2.png"
    ],
    isVisible: true,
    brand: "ComfortZone",
    model: "CZ-Pro"
  }
];


export default function AdminProductPage(){
    const [products,setProducts] = useState(sampleProducts);
    useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(import.meta.env.VITE_API_URL + "/products", {
    headers: {
        Authorization: "Bearer " + token
      }
    }).then((res) => {
      setProducts(res.data)
    })
    }, []);

    return(
        <div className="w-full h-full overflow-y-scroll overflow-x-scroll">
            <div className="bg-white rounded-lg shadow-lg">
                <table className="w-full table-auto">
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
                                        <td className="px-4 py-4 border-r border-gray-200 last:border-r-0"><img src={item.images[0]} alt={item.name} loading="lazy"/></td>
                                        <td className="px-4 py-4 border-r border-gray-200 last:border-r-0"><span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{item.category}</span></td>
                                        <td className="px-4 py-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0 font-medium">{item.brand}</td>
                                        <td className="px-4 py-4 text-sm text-gray-600 border-r border-gray-200 last:border-r-0">{item.model}</td>
                                        <td className="px-4 py-4"><span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${item.isVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.isVisible ? "visible" : "hidden"}</span></td>
                                    </tr>
                                
                        )
                        )
                    }

                </tbody>
            </table>
            </div>

            <Link to="/admin/add-product" className="text-white bg-accent w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-10 right-14">
                <FaPlus />
            </Link>
        </div>
    )
}