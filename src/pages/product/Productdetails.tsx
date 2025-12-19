// ProductDetails.tsx
import React, { useMemo, useState } from "react";
import styles from "./Productdetails.module.css";
import { Share2, Minus, Plus, Check } from "lucide-react";
import { FoodCard } from "../../components/food/FoodCard";

type Addon = {
  id: string;
  name: string;
  desc: string;
  price: number;
};

type Complement = {
  id: string;
  name: string;
  desc: string;
  price: number;
  img?: string;
};

const BRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ProductDetails() {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>(
    {}
  );

  const product = {
    title: "X-Monster Bacon",
    price: 32.9,
    badge: "Mais vendido",
    desc:
      "Pão brioche selado na manteiga, dois smash burgers de 100g, muito cheddar inglês, fatias crocantes de bacon e maionese defumada da casa.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1400&q=80",
  };

  const addons: Addon[] = [
    { id: "bacon", name: "Bacon Extra", desc: "Fatia extra crocante", price: 4 },
    { id: "cheddar", name: "Queijo Cheddar", desc: "Extra cremosidade", price: 3 },
    { id: "maionese", name: "Maionese Verde", desc: "Maionese da casa", price: 2 },
    { id: "ovo", name: "Ovo Frito", desc: "Gema mole", price: 2.6 },
  ];

  const complements: Complement[] = [
    {
      id: "batata",
      name: "Batata Rústica",
      desc: "Porção com ervas finas",
      price: 14,
      img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1000&q=70",
    },
    {
      id: "coca",
      name: "Coca-Cola Lata",
      desc: "350ml, bem gelada",
      price: 6,
      img: "https://images.unsplash.com/photo-1610873167013-2dd675d30ef4?auto=format&fit=crop&w=1000&q=70",
    },
    {
      id: "onion",
      name: "Onion Rings",
      desc: "Anéis crocantes (8un)",
      price: 16.9,
      img: "https://images.unsplash.com/photo-1550547660-9dff7b68fb28?auto=format&fit=crop&w=1000&q=70",
    },
    {
      id: "milk",
      name: "Milkshake Morango",
      desc: "Cremoso e gelado",
      price: 18.9,
      img: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=1000&q=70",
    },
    {
      id: "agua",
      name: "Água Mineral",
      desc: "Sem gás, 500ml",
      price: 4.5,
      img: "https://images.unsplash.com/photo-1560847468-5eef330d6b1a?auto=format&fit=crop&w=1000&q=70",
    },
  ];

  const addonsTotal = useMemo(
    () =>
      addons.reduce((acc, a) => acc + (selectedAddons[a.id] ? a.price : 0), 0),
    [addons, selectedAddons]
  );

  const total = (product.price + addonsTotal) * qty;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles.page}>
      {/* TOPO: imagem + conteúdo */}
      <div className={styles.top}>
        <div className={styles.media}>
          <img className={styles.mediaImg} src={product.image} alt={product.title} />
        </div>

        <div className={styles.content}>
          <button className={styles.shareBtn} aria-label="Compartilhar">
            <Share2 size={18} />
          </button>

          <div className={styles.header}>
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.priceRow}>
              <span className={styles.price}>{BRL(product.price)}</span>
              <span className={styles.badge}>{product.badge}</span>
            </div>

            <p className={styles.desc}>{product.desc}</p>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>Adicionais</h2>
              <span className={styles.sectionChip}>Opcional</span>
            </div>

            <div className={styles.addons}>
              {addons.map((a) => {
                const active = !!selectedAddons[a.id];
                return (
                  <button
                    key={a.id}
                    type="button"
                    className={`${styles.addonRow} ${active ? styles.addonActive : ""}`}
                    onClick={() => toggleAddon(a.id)}
                  >
                    <span className={styles.toggle} aria-hidden="true">
                      <span className={`${styles.toggleKnob} ${active ? styles.toggleOn : ""}`}>
                        {active ? <Check size={14} /> : null}
                      </span>
                    </span>

                    <span className={styles.addonInfo}>
                      <span className={styles.addonName}>{a.name}</span>
                      <span className={styles.addonDesc}>{a.desc}</span>
                    </span>

                    <span className={styles.addonPrice}>+ {BRL(a.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Alguma observação?</h2>
            <textarea
              className={styles.note}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Tirar cebola, maionese à parte..."
            />
          </div>
        </div>
      </div>
      {/* BOTTOM BAR: FULL WIDTH */}
      <div className={styles.bottomBar}>
        <div className={styles.stepper}>
          <button
            className={styles.stepBtn}
            onClick={() => setQty((v) => Math.max(1, v - 1))}
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </button>

          <div className={styles.stepValue}>{qty}</div>

          <button
            className={styles.stepBtn}
            onClick={() => setQty((v) => v + 1)}
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </button>
        </div>

        <button className={styles.addBtn} type="button">
          <span>Adicionar</span>
          <span className={styles.addBtnPrice}>{BRL(total)}</span>
        </button>
      </div>
      {/* COMPLEMENTOS: FULL WIDTH embaixo da imagem */}
      <div className={styles.complementsSection}>
        <h2 className={styles.sectionTitle}>Complementos</h2>

        <div className={styles.complements}>
          {complements.map((c) => (
            <div key={c.id} className={styles.compItem}>
              <FoodCard img={c.img} name={c.name} desc={c.desc} />
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
