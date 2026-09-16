export type UserRole = "CUSTOMER" | "SELLER" | "ADMIN" | "DELIVERY_STAFF";

export type SellerStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export type SellerProfile = {
  id: string;
  businessName?: string;
  businessType?: string;
  shopName: string;
  description?: string;
  pickupAddress?: string;
  status: SellerStatus;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  sellerProfile?: SellerProfile;
};

export type Product = {
  id: string;
  name: string;
  title?: string;
  slug: string;
  sku?: string;
  shortDescription?: string;
  description?: string;
  price: string | number;
  discountPrice?: string | number | null;
  compareAtPrice?: string | number | null;
  status?: "PENDING" | "APPROVED" | "REJECTED" | "INACTIVE";
  isFeatured?: boolean;
  warranty?: string | null;
  returnPolicy?: string | null;
  deliveryInfo?: string | null;
  images?: ProductImage[];
  category?: Category;
  brand?: Brand;
  seller?: SellerProfile;
  reviews?: Review[];
  inventoryRecords?: Inventory[];
};

export type ProductImage = {
  id: string;
  url: string;
  altText?: string | null;
  isPrimary?: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  _count?: { products: number };
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  _count?: { products: number };
};

export type Review = {
  id: string;
  rating: number;
};

export type Inventory = {
  id: string;
  quantity: number;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string | number;
  product: Product;
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: number;
};

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "PACKED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED"
  | "RETURNED"
  | "REFUNDED";

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED" | "PARTIALLY_REFUNDED";

export type OrderItem = {
  id: string;
  productName: string;
  sellerShopName: string;
  quantity: number;
  unitPrice: string | number;
  totalPrice: string | number;
  status: OrderStatus;
  product?: Product;
};

export type Order = {
  id: string;
  orderNumber: string;
  subtotal: string | number;
  shippingFee: string | number;
  discountAmount: string | number;
  totalAmount: string | number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  items: OrderItem[];
  statusHistory?: { id: string; status: OrderStatus; note?: string | null; createdAt: string }[];
  shipping?: { trackingNumber?: string | null; status?: string; carrierName?: string | null };
  payment?: { method: string; status: PaymentStatus; amount: string | number };
  shippingAddress?: Address;
};

export type Address = {
  id: string;
  fullName: string;
  phone: string;
  line1: string;
  line2?: string | null;
  city: string;
  district?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country: string;
  isDefault: boolean;
};

export type ReturnRequest = {
  id: string;
  reason: string;
  status: string;
  quantity: number;
  createdAt: string;
  order?: Order;
  orderItem?: OrderItem;
  refundRequest?: { id: string; status: string; amount: string | number };
};

export type DashboardStat = {
  label: string;
  value: string | number;
};

export type WishlistItem = {
  id: string;
  productId: string;
  product: Product;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export type AuthPayload = {
  user: User;
  tokens: AuthTokens;
};
