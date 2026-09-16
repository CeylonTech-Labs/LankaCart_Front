type PriceDisplayProps = {
  price: string | number;
  discountPrice?: string | number | null;
  compact?: boolean;
};

const formatPrice = (value: string | number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 0
  }).format(Number(value));

export function PriceDisplay({ price, discountPrice, compact }: PriceDisplayProps) {
  const hasDiscount = discountPrice && Number(discountPrice) < Number(price);

  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-1"}>
      <span className={compact ? "text-sm font-semibold text-primary" : "text-2xl font-semibold text-primary"}>
        {formatPrice(hasDiscount ? discountPrice : price)}
      </span>
      {hasDiscount ? (
        <span className="text-sm text-muted-foreground line-through">{formatPrice(price)}</span>
      ) : null}
    </div>
  );
}
