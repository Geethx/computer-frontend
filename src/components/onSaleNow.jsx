import ProductCard from "./productCard.jsx";

export default function OnSaleNow(){

    return(

        <div>
            
        <h1>On Sale Now!</h1>
    
    <ProductCard
      name = "Iphone"
      image = "https://picsum.photos/seed/picsum/200/200"
      price = "$400"
    />
    
    <ProductCard
      name = "IPad"
      image = "https://picsum.photos/seed/picsum/200/200"
      price = "$600"
    />
        </div>
    )
}