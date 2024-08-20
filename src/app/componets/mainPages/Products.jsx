import React from "react";
import data from "../../data.json"; // Assuming this is how you import your JSON data
import { InfiniteMovingCards } from "../../componets/ui/infinite-moving-cards"; // Adjust the path as per your project structure

const Products = () => {
    // Filter the data for products
    const productsData = data.find((item) => item.id === "Products");
  
    // Prepare items array for InfiniteMovingCards component
    const items = Object.keys(productsData)
      .filter((key) => key.startsWith("Product"))
      .map((key) => ({
        productName: productsData[key].ProductName,
        p: productsData[key].p,
        backgroundImage: productsData[key].backgroundImage,
        productLink: productsData[key].ProductLink,
      }));
  
    return (
      <div className="">
        <div className="max-auto">
          <h1 className="mb-6 text-center text-4xl md:text-6xl font-bold mt-8">
            Products
          </h1>
          {/* Increase the height of the container */}
          <div className="h-[25rem] rounded-md flex flex-col antialiased dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards items={items} direction="right" speed="normal" />
          </div>
        </div>
      </div>
    );
  };
  
  export default Products;