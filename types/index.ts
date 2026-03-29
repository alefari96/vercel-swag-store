type CartItemWithProduct = {
  addedAt: string;
  lineTotal: number;
  product: Product;
  productId: string;
  quantity: number;
}

type CartWithProducts = {
  createdAt: string;
  currency: string;
  items: CartItemWithProduct[];
  subtotal: number;
  token: string;
  totalItems: number;
  updatedAt: string;
}

type Category = {
  name: string;
  productCount: number;
  slug: string;
}

type PaginationMeta = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

type Product = {
  category: string;
  createdAt: string;
  currency: string;
  description: string;
  featured: boolean;
  id: string;
  images: string [];
  name: string;
  price: number;
  slug: string;
  tags: string[];  
}

type StockInfo = {
  inStock: boolean;
  lowStock: boolean;
  productId: string;
  stock: number;
}

type Promotion = {
  active: boolean;
  code: string;
  description: string;
  discountPercent: number;
  id: string;
  title: string;
  validFrom: string;
  validUntil: string;
}

// API

type ProductListResponse = {
  data: Product[];
  meta: { pagination: PaginationMeta };
}

type ProductResponse = {
  data: Product;
  success: boolean;
}

type StockResponse = {
  data: StockInfo;
  success: boolean;
}

type CategoryListResponse = {
  data: Category[];
  success: boolean;
}

type PromotionResponse = {
  data: Promotion;
  success: boolean;
}

type CartResponse = {
  data: CartWithProducts;
  success: boolean;
}

type AddToCartRequest = {
  productId: string;
  quantity?: number;
}

type UpdateCartItemRequest = {
  quantity: number;
}

type ErrorObject = {
  code: string;
  message: string;
}

type ErrorResponse = {
  error: ErrorObject;
  success: boolean;
}

export type {
  CartItemWithProduct,
  CartWithProducts,
  Category,
  PaginationMeta,
  Product,
  StockInfo,
  Promotion,
  ProductListResponse,
  ProductResponse,
  StockResponse,
  CategoryListResponse,
  PromotionResponse,
  CartResponse,
  AddToCartRequest,
  UpdateCartItemRequest,
  ErrorObject,
  ErrorResponse
}
