
"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, phones } from "../../data/phones";
import { motion } from "framer-motion";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  // -----------------------------
  // SORT LOGIC
  // -----------------------------
  const sortPhones = (list) => {
    switch (sortOption) {
      case "price-low":
        return [...list].sort(
          (a, b) =>
            Math.min(...a.variants.map(v => v.price)) -
            Math.min(...b.variants.map(v => v.price))
        );

      case "price-high":
        return [...list].sort(
          (a, b) =>
            Math.min(...b.variants.map(v => v.price)) -
            Math.min(...a.variants.map(v => v.price))
        );

      case "name-az":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));

      case "name-za":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));

      default:
        return list;
    }
  };

  // -----------------------------
  // FILTER → SEARCH → SORT
  // -----------------------------
  let filteredPhones =
    selectedCategory === "all"
      ? phones
      : phones.filter(p => p.category === selectedCategory);

  filteredPhones = filteredPhones.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredPhones = sortPhones(filteredPhones);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "220px",
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          padding: "25px 15px",
        }}
      >
        <h2 style={{ color: "#1dbf73", marginBottom: "20px" }}>
          Categories
        </h2>

        <button
          onClick={() => setSelectedCategory("all")}
          style={categoryBtn(selectedCategory === "all")}
        >
          All Phones
        </button>

        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={categoryBtn(selectedCategory === cat.key)}
          >
            {cat.name}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "30px" }}>
        <h1 style={{ fontSize: "36px", color: "#1dbf73", marginBottom: "20px" }}>
          Products
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search phones..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchStyle}
        />

        {/* SORT */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={sortStyle}
        >
          <option value="none">Sort By</option>
          <option value="price-low">Price: Low → High</option>
          <option value="price-high">Price: High → Low</option>
          <option value="name-az">Name: A → Z</option>
          <option value="name-za">Name: Z → A</option>
        </select>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredPhones.map((product, index) => {
            const startingPrice = Math.min(
              ...product.variants.map(v => v.price)
            );

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/products/${product.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={cardStyle}>
                    <h3 style={{ color: "white" }}>{product.name}</h3>

                    <p style={{ color: "#aaa", margin: "6px 0" }}>
                      {product.variants.length} storage options
                    </p>

                    <p style={{ color: "#1dbf73", fontWeight: "bold" }}>
                      From MWK {startingPrice.toLocaleString()}
                    </p>

                    <button style={viewBtn}>
                      View Details
                    </button>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

/* -----------------------------
   STYLES
----------------------------- */

const categoryBtn = (active) => ({
  padding: "10px",
  marginBottom: "10px",
  background: active ? "#1dbf73" : "transparent",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  color: active ? "#02130d" : "#d8e6df",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
});

const searchStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #1dbf73",
  background: "#02130d",
  color: "white",
  marginBottom: "15px",
  fontSize: "16px",
};

const sortStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  background: "#02130d",
  color: "white",
  border: "1px solid #1dbf73",
};

const cardStyle = {
  background: "rgba(255,255,255,0.03)",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  transition: "transform 0.2s ease",
};

const viewBtn = {
  marginTop: "12px",
  padding: "8px 14px",
  background: "#1dbf73",
  borderRadius: "8px",
  border: "none",
  color: "#02130d",
  cursor: "pointer",
  fontWeight: "600",
};

