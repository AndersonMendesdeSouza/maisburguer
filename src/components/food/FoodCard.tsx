import { Plus } from "lucide-react";
import styles from "./FoodCard.module.css";
import { toast } from "react-toastify";

type FoodCardProps = {
  id?: number;
  name?: string;
  desc?: string;
  price?: number;
  img?: string;
  badge?: string;
  onDetails?: () => void;
  functions?: () => void;
};

function formatMoney(value?: number) {
  if (value === undefined) return "";
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function addCart(item: any) {
  const raw = localStorage.getItem("product");
  let arr: any[] = [];

  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      arr = Array.isArray(parsed) ? parsed.filter(Boolean) : [parsed].filter(Boolean);
    } catch {
      arr = [];
    }
  }

  const id = Number(item.id ?? Date.now());
  const idx = arr.findIndex((p) => Number(p?.id) === id);

  if (idx >= 0) {
    const prevQty = Number(arr[idx]?.qty ?? arr[idx]?.quantity ?? 1);
    arr[idx] = { ...arr[idx], ...item, id, qty: prevQty + 1 };
  } else {
    arr.push({ ...item, id, qty: Number(item.qty ?? 1) });
  }

  localStorage.setItem("product", JSON.stringify(arr));
}

export function FoodCard({ id, name, functions, desc, price, img, badge, onDetails }: FoodCardProps) {
  const priceMin = price !== undefined ? price + 7 : undefined;

  const item = {
    id,
    name,
    price,
    img,
    badge,
  };

  return (
    <article className={styles.card}>
      {!!badge && <div className={styles.badge}>{badge}</div>}

      <div className={styles.imgWrap}>
        <img src={img} alt={name} className={styles.img} />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addCart(item);
            toast.success('Produto adicionado ao carrinho', { autoClose: 1500 })
            functions?.()
          }}
          className={styles.addBtn}
          aria-label="Adicionar ao carrinho"
        >
          <Plus size={22} color="#ffffffff" />
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.desc}>{desc}</p>

        <div className={styles.bottom}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className={styles.minPrice}>{formatMoney(priceMin)}</span>
            <span className={styles.price}>{formatMoney(price)}</span>
          </div>
          <button type="button" className={styles.button} onClick={onDetails}>
            Ver detalhes
          </button>
        </div>
      </div>
    </article>
  );
}
