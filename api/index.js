var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/providers/provider.route.ts
import { Router } from "express";

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN"
};
var OrderStatus = {
  PLACED: "PLACED",
  PREPARING: "PREPARING",
  READY: "READY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED"
};
var PaymentStatus = {
  UNPAID: "UNPAID",
  PAID: "PAID",
  REFUNDED: "REFUNDED"
};
var PaymentMethod = {
  CASH_ON_DELIVERY: "CASH_ON_DELIVERY",
  ONLINE: "ONLINE"
};

// src/middleware/auth.ts
import jwt from "jsonwebtoken";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config = {
  port: process.env.PORT || 3e3,
  jwtSecret: process.env.JWT_SECRET || "devsecret",
  openai_api_key: process.env.OPENAI_API_KEY
};
var config_default = config;

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Cart {\n  id         String    @id @default(uuid())\n  customerId String    @unique\n  createdAt  DateTime  @default(now())\n  updatedAt  DateTime? @updatedAt\n\n  customer User       @relation(fields: [customerId], references: [id])\n  items    CartItem[]\n}\n\nmodel CartItem {\n  id             String    @id @default(uuid())\n  cartId         String\n  mealId         String\n  quantity       Int       @default(1)\n  priceAtAddTime Decimal   @db.Decimal(10, 2)\n  createdAt      DateTime? @default(now())\n\n  cart Cart @relation(fields: [cartId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  @@unique([cartId, mealId])\n}\n\nmodel Category {\n  id          String    @id @default(uuid())\n  name        String    @unique\n  slug        String?   @unique\n  icon        String?\n  image       String?\n  description String?\n  createdAt   DateTime  @default(now())\n  updatedAt   DateTime? @updatedAt\n\n  meals Meal[]\n}\n\nmodel Meal {\n  id               String    @id @default(uuid())\n  title            String\n  slug             String?   @unique\n  shortDescription String?\n  description      String?\n  ingredients      String?\n  price            Decimal   @db.Decimal(10, 2)\n  discountPrice    Decimal?  @db.Decimal(10, 2)\n  imageUrl         String?\n  isAvailable      Boolean   @default(true)\n  isFeatured       Boolean   @default(false)\n  averageRating    Float     @default(0)\n  totalReviews     Int       @default(0)\n  preparationTime  Int?\n  calories         Int?\n  tags             String?\n  createdAt        DateTime  @default(now())\n  updatedAt        DateTime? @updatedAt\n\n  providerId String\n  categoryId String\n\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n  category Category        @relation(fields: [categoryId], references: [id])\n\n  reviews       Review[]\n  orderItems    OrderItem[]\n  cartItems     CartItem[]\n  wishlist      Wishlist[]\n  reviewSummary ReviewSummary?\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  MANAGER\n  ADMIN\n  SUPER_ADMIN\n}\n\nenum AuthProvider {\n  CREDENTIALS\n  GOOGLE\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  REFUNDED\n}\n\nenum PaymentMethod {\n  CASH_ON_DELIVERY\n  ONLINE\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nmodel Review {\n  id        String    @id @default(uuid())\n  rating    Int\n  comment   String?\n  isVisible Boolean   @default(true)\n  createdAt DateTime  @default(now())\n  updatedAt DateTime? @updatedAt\n\n  userId String\n  mealId String\n\n  user User @relation(fields: [userId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  @@unique([userId, mealId])\n}\n\nmodel Wishlist {\n  id        String   @id @default(uuid())\n  userId    String\n  mealId    String\n  createdAt DateTime @default(now())\n\n  user User @relation(fields: [userId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  @@unique([userId, mealId])\n}\n\nmodel ReviewSummary {\n  id          String   @id @default(uuid())\n  mealId      String   @unique\n  summary     String\n  generatedAt DateTime @default(now())\n\n  meal Meal @relation(fields: [mealId], references: [id])\n}\n\nmodel ContactMessage {\n  id        String   @id @default(uuid())\n  name      String\n  email     String\n  subject   String?\n  message   String\n  createdAt DateTime @default(now())\n}\n\nmodel NewsletterSubscriber {\n  id           String   @id @default(uuid())\n  email        String   @unique\n  subscribedAt DateTime @default(now())\n}\n\nmodel Offer {\n  id          String   @id @default(uuid())\n  title       String\n  description String?\n  discount    Int?\n  imageUrl    String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel Blog {\n  id          String   @id @default(uuid())\n  title       String\n  slug        String   @unique\n  excerpt     String?\n  content     String\n  imageUrl    String?\n  isPublished Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel AIChatLog {\n  id        String   @id @default(uuid())\n  userId    String?\n  prompt    String\n  response  String\n  createdAt DateTime @default(now())\n}\n\nmodel Order {\n  id            String        @id @default(uuid())\n  customerId    String\n  providerId    String\n  status        OrderStatus   @default(PLACED)\n  paymentStatus PaymentStatus @default(UNPAID)\n  paymentMethod PaymentMethod @default(CASH_ON_DELIVERY)\n  address       String\n  phone         String?\n  notes         String?\n  totalPrice    Decimal       @db.Decimal(10, 2)\n  createdAt     DateTime      @default(now())\n  updatedAt     DateTime?     @updatedAt\n\n  customer User            @relation(fields: [customerId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  items OrderItem[]\n}\n\nmodel OrderItem {\n  id        String   @id @default(uuid())\n  orderId   String\n  mealId    String\n  quantity  Int\n  price     Decimal  @db.Decimal(10, 2)\n  createdAt DateTime @default(now())\n\n  order Order @relation(fields: [orderId], references: [id])\n  meal  Meal  @relation(fields: [mealId], references: [id])\n}\n\nmodel User {\n  id       String     @id @default(uuid())\n  name     String\n  email    String     @unique\n  password String?\n  avatar   String?\n  phone    String?\n  address  String?\n  bio      String?\n  role     Role       @default(CUSTOMER)\n  status   UserStatus @default(ACTIVE)\n\n  authProvider    AuthProvider @default(CREDENTIALS)\n  providerId      String?\n  isEmailVerified Boolean      @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  providerProfile ProviderProfile?\n  orders          Order[]\n  reviews         Review[]\n  cart            Cart?\n  wishlistItems   Wishlist[]\n}\n\nmodel ProviderProfile {\n  id             String    @id @default(uuid())\n  userId         String    @unique\n  restaurantName String\n  restaurantLogo String?\n  bannerImage    String?\n  address        String\n  phone          String\n  description    String?\n  cuisineType    String?\n  openingTime    String?\n  closingTime    String?\n  deliveryArea   String?\n  isApproved     Boolean   @default(false)\n  averageRating  Float     @default(0)\n  totalReviews   Int       @default(0)\n  createdAt      DateTime  @default(now())\n  updatedAt      DateTime? @updatedAt\n\n  user   User    @relation(fields: [userId], references: [id])\n  meals  Meal[]\n  orders Order[]\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceAtAddTime","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"ingredients","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"discountPrice","kind":"scalar","type":"Decimal"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"totalReviews","kind":"scalar","type":"Int"},{"name":"preparationTime","kind":"scalar","type":"Int"},{"name":"calories","kind":"scalar","type":"Int"},{"name":"tags","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"MealToWishlist"},{"name":"reviewSummary","kind":"object","type":"ReviewSummary","relationName":"MealToReviewSummary"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"isVisible","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"UserToWishlist"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToWishlist"}],"dbName":null},"ReviewSummary":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"summary","kind":"scalar","type":"String"},{"name":"generatedAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReviewSummary"}],"dbName":null},"ContactMessage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"NewsletterSubscriber":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"subscribedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Offer":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"discount","kind":"scalar","type":"Int"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Blog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"AIChatLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"prompt","kind":"scalar","type":"String"},{"name":"response","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"isEmailVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"wishlistItems","kind":"object","type":"Wishlist","relationName":"UserToWishlist"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"restaurantLogo","kind":"scalar","type":"String"},{"name":"bannerImage","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"cuisineType","kind":"scalar","type":"String"},{"name":"openingTime","kind":"scalar","type":"String"},{"name":"closingTime","kind":"scalar","type":"String"},{"name":"deliveryArea","kind":"scalar","type":"String"},{"name":"isApproved","kind":"scalar","type":"Boolean"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"totalReviews","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AIChatLogScalarFieldEnum: () => AIChatLogScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BlogScalarFieldEnum: () => BlogScalarFieldEnum,
  CartItemScalarFieldEnum: () => CartItemScalarFieldEnum,
  CartScalarFieldEnum: () => CartScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  ContactMessageScalarFieldEnum: () => ContactMessageScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MealScalarFieldEnum: () => MealScalarFieldEnum,
  ModelName: () => ModelName,
  NewsletterSubscriberScalarFieldEnum: () => NewsletterSubscriberScalarFieldEnum,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OfferScalarFieldEnum: () => OfferScalarFieldEnum,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  ProviderProfileScalarFieldEnum: () => ProviderProfileScalarFieldEnum,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  ReviewSummaryScalarFieldEnum: () => ReviewSummaryScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  WishlistScalarFieldEnum: () => WishlistScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Cart: "Cart",
  CartItem: "CartItem",
  Category: "Category",
  Meal: "Meal",
  Review: "Review",
  Wishlist: "Wishlist",
  ReviewSummary: "ReviewSummary",
  ContactMessage: "ContactMessage",
  NewsletterSubscriber: "NewsletterSubscriber",
  Offer: "Offer",
  Blog: "Blog",
  AIChatLog: "AIChatLog",
  Order: "Order",
  OrderItem: "OrderItem",
  User: "User",
  ProviderProfile: "ProviderProfile"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var CartScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CartItemScalarFieldEnum = {
  id: "id",
  cartId: "cartId",
  mealId: "mealId",
  quantity: "quantity",
  priceAtAddTime: "priceAtAddTime",
  createdAt: "createdAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  slug: "slug",
  icon: "icon",
  image: "image",
  description: "description",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MealScalarFieldEnum = {
  id: "id",
  title: "title",
  slug: "slug",
  shortDescription: "shortDescription",
  description: "description",
  ingredients: "ingredients",
  price: "price",
  discountPrice: "discountPrice",
  imageUrl: "imageUrl",
  isAvailable: "isAvailable",
  isFeatured: "isFeatured",
  averageRating: "averageRating",
  totalReviews: "totalReviews",
  preparationTime: "preparationTime",
  calories: "calories",
  tags: "tags",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  providerId: "providerId",
  categoryId: "categoryId"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  isVisible: "isVisible",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  userId: "userId",
  mealId: "mealId"
};
var WishlistScalarFieldEnum = {
  id: "id",
  userId: "userId",
  mealId: "mealId",
  createdAt: "createdAt"
};
var ReviewSummaryScalarFieldEnum = {
  id: "id",
  mealId: "mealId",
  summary: "summary",
  generatedAt: "generatedAt"
};
var ContactMessageScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  subject: "subject",
  message: "message",
  createdAt: "createdAt"
};
var NewsletterSubscriberScalarFieldEnum = {
  id: "id",
  email: "email",
  subscribedAt: "subscribedAt"
};
var OfferScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  discount: "discount",
  imageUrl: "imageUrl",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BlogScalarFieldEnum = {
  id: "id",
  title: "title",
  slug: "slug",
  excerpt: "excerpt",
  content: "content",
  imageUrl: "imageUrl",
  isPublished: "isPublished",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var AIChatLogScalarFieldEnum = {
  id: "id",
  userId: "userId",
  prompt: "prompt",
  response: "response",
  createdAt: "createdAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  customerId: "customerId",
  providerId: "providerId",
  status: "status",
  paymentStatus: "paymentStatus",
  paymentMethod: "paymentMethod",
  address: "address",
  phone: "phone",
  notes: "notes",
  totalPrice: "totalPrice",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  orderId: "orderId",
  mealId: "mealId",
  quantity: "quantity",
  price: "price",
  createdAt: "createdAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  avatar: "avatar",
  phone: "phone",
  address: "address",
  bio: "bio",
  role: "role",
  status: "status",
  authProvider: "authProvider",
  providerId: "providerId",
  isEmailVerified: "isEmailVerified",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ProviderProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  restaurantName: "restaurantName",
  restaurantLogo: "restaurantLogo",
  bannerImage: "bannerImage",
  address: "address",
  phone: "phone",
  description: "description",
  cuisineType: "cuisineType",
  openingTime: "openingTime",
  closingTime: "closingTime",
  deliveryArea: "deliveryArea",
  isApproved: "isApproved",
  averageRating: "averageRating",
  totalReviews: "totalReviews",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/middleware/auth.ts
var auth = (...roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const cookieToken = req.cookies?.token;
    const token = bearerToken || cookieToken;
    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }
    try {
      const decoded = jwt.verify(
        token,
        config_default.jwtSecret
      );
      req.user = decoded;
      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email
        }
      });
      if (!userData) {
        return res.status(401).json({ message: "User not found" });
      }
      if (userData.status !== "ACTIVE") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message || "Unauthorized" });
    }
  };
};
var auth_default = auth;

// src/modules/providers/provider.service.ts
var createProviderProfile = async (userId, payload) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error("PROVIDER_PROFILE_EXISTS");
  }
  return prisma.providerProfile.create({
    select: {
      userId: true,
      restaurantName: true,
      address: true,
      phone: true,
      restaurantLogo: true,
      bannerImage: true,
      description: true,
      cuisineType: true,
      openingTime: true,
      closingTime: true,
      deliveryArea: true
    },
    data: { userId, ...payload }
  });
};
var getProviderDashboardStats = async (userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: {
      id: true,
      restaurantName: true
    }
  });
  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  const providerId = provider.id;
  const [
    totalMeals,
    totalOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    deliveredOrders,
    cancelledOrders,
    revenueAgg,
    recentOrders,
    providerMeals
  ] = await Promise.all([
    prisma.meal.count({
      where: { providerId }
    }),
    prisma.order.count({
      where: { providerId }
    }),
    prisma.order.count({
      where: { providerId, status: "PLACED" }
    }),
    prisma.order.count({
      where: { providerId, status: "PREPARING" }
    }),
    prisma.order.count({
      where: { providerId, status: "READY" }
    }),
    prisma.order.count({
      where: { providerId, status: "DELIVERED" }
    }),
    prisma.order.count({
      where: { providerId, status: "CANCELLED" }
    }),
    prisma.order.aggregate({
      where: {
        providerId,
        status: "DELIVERED"
      },
      _sum: {
        totalPrice: true
      }
    }),
    prisma.order.findMany({
      where: { providerId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: {
          include: {
            meal: {
              select: {
                id: true,
                title: true,
                imageUrl: true
              }
            }
          }
        }
      }
    }),
    prisma.meal.findMany({
      where: { providerId },
      select: {
        id: true,
        title: true,
        averageRating: true,
        totalReviews: true,
        orderItems: {
          select: {
            quantity: true,
            price: true
          }
        }
      }
    })
  ]);
  const totalReviews = providerMeals.reduce(
    (sum, meal) => sum + (meal.totalReviews || 0),
    0
  );
  const totalRatingValue = providerMeals.reduce(
    (sum, meal) => sum + (meal.averageRating || 0) * (meal.totalReviews || 0),
    0
  );
  const averageRating = totalReviews > 0 ? Number((totalRatingValue / totalReviews).toFixed(1)) : 0;
  const orderStatusDistribution = [
    { status: "PLACED", count: pendingOrders },
    { status: "PREPARING", count: preparingOrders },
    { status: "READY", count: readyOrders },
    { status: "DELIVERED", count: deliveredOrders },
    { status: "CANCELLED", count: cancelledOrders }
  ];
  const monthlyBase = Array.from({ length: 6 }, (_, index) => {
    const date = /* @__PURE__ */ new Date();
    date.setMonth(date.getMonth() - (5 - index));
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      count: 0,
      revenue: 0
    };
  });
  const sixMonthsAgo = /* @__PURE__ */ new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  const ordersForCharts = await prisma.order.findMany({
    where: {
      providerId,
      createdAt: {
        gte: sixMonthsAgo
      }
    },
    select: {
      createdAt: true,
      totalPrice: true,
      status: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  for (const order of ordersForCharts) {
    const date = new Date(order.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const found = monthlyBase.find((item) => item.key === key);
    if (found) {
      found.count += 1;
      if (order.status === "DELIVERED") {
        found.revenue += Number(order.totalPrice || 0);
      }
    }
  }
  const monthlyOrders = monthlyBase.map((item) => ({
    month: item.month,
    count: item.count
  }));
  const monthlyRevenue = monthlyBase.map((item) => ({
    month: item.month,
    revenue: item.revenue
  }));
  const topMeals = providerMeals.map((meal) => {
    const totalSold = meal.orderItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const revenue = meal.orderItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
    return {
      mealId: meal.id,
      title: meal.title,
      totalSold,
      revenue,
      averageRating: meal.averageRating || 0,
      totalReviews: meal.totalReviews || 0
    };
  }).sort((a, b) => b.totalSold - a.totalSold).slice(0, 5);
  return {
    provider: {
      id: provider.id,
      restaurantName: provider.restaurantName
    },
    overview: {
      totalMeals,
      totalOrders,
      pendingOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: Number(revenueAgg._sum.totalPrice || 0),
      totalReviews,
      averageRating
    },
    orderStatusDistribution,
    monthlyOrders,
    monthlyRevenue,
    topMeals,
    recentOrders
  };
};
var getMyProviderProfile = async (userId) => {
  return prisma.providerProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          bio: true,
          role: true,
          status: true
        }
      },
      meals: true,
      orders: true
    }
  });
};
var updateProviderProfile = async (userId, payload) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!existingProfile) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  return prisma.providerProfile.update({
    where: { userId },
    data: {
      restaurantName: payload.restaurantName,
      restaurantLogo: payload.restaurantLogo,
      bannerImage: payload.bannerImage,
      address: payload.address,
      phone: payload.phone,
      description: payload.description,
      cuisineType: payload.cuisineType,
      openingTime: payload.openingTime,
      closingTime: payload.closingTime,
      deliveryArea: payload.deliveryArea
    }
  });
};
var getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    select: {
      id: true,
      restaurantName: true,
      restaurantLogo: true,
      bannerImage: true,
      address: true,
      phone: true,
      description: true,
      cuisineType: true,
      openingTime: true,
      closingTime: true,
      deliveryArea: true,
      isApproved: true,
      averageRating: true,
      totalReviews: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true
        }
      }
    }
  });
};
var getProviderById = async (id) => {
  return prisma.providerProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          bio: true,
          role: true,
          status: true
        }
      },
      meals: true,
      orders: true
    }
  });
};
var getProviderOrders = async (userId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  return prisma.order.findMany({
    where: { providerId: providerProfile.id },
    include: {
      items: {
        include: { meal: true }
      },
      customer: true
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateOrderStatus = async (orderId, userId, status) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      providerId: providerProfile.id
    }
  });
  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }
  return prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
};
var ProviderService = {
  createProviderProfile,
  updateProviderProfile,
  getMyProviderProfile,
  getAllProviders,
  getProviderById,
  getProviderOrders,
  updateOrderStatus,
  getProviderDashboardStats
};

// src/utils/upload.ts
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
var cloudName = process.env.CLOUDINARY_CLOUD_NAME;
var apiKey = process.env.CLOUDINARY_API_KEY;
var apiSecret = process.env.CLOUDINARY_API_SECRET;
if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Cloudinary environment variables are missing");
}
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
});
var uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) return reject(new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// src/modules/providers/provider.controller.ts
var createProfile = async (req, res) => {
  try {
    const {
      restaurantName,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea
    } = req.body;
    if (!restaurantName?.trim() || !address?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "restaurantName, address and phone are required"
      });
    }
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    const existingProfile = await ProviderService.getMyProviderProfile(req.user.id);
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Provider profile already exists"
      });
    }
    const files = req.files;
    let restaurantLogo;
    let bannerImage;
    if (files?.restaurantLogo?.[0]) {
      restaurantLogo = await uploadToCloudinary(
        files.restaurantLogo[0].buffer,
        "foodhub/providers"
      );
    }
    if (files?.bannerImage?.[0]) {
      bannerImage = await uploadToCloudinary(
        files.bannerImage[0].buffer,
        "foodhub/providers"
      );
    }
    const payload = {
      restaurantName,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea
    };
    if (restaurantLogo) payload.restaurantLogo = restaurantLogo;
    if (bannerImage) payload.bannerImage = bannerImage;
    const profile = await ProviderService.createProviderProfile(
      req.user.id,
      payload
    );
    return res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: profile
    });
  } catch (error) {
    console.error("CREATE PROVIDER PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create profile",
      error: error.message
    });
  }
};
var getDashboardStats = async (req, res) => {
  try {
    const result = await ProviderService.getProviderDashboardStats(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Provider dashboard stats fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "Provider profile not found" : "Failed to fetch provider dashboard stats",
      error: error.message
    });
  }
};
var getMyProfile = async (req, res) => {
  try {
    const profile = await ProviderService.getMyProviderProfile(req.user.id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get provider profile",
      error: error.message
    });
  }
};
var updateProfile = async (req, res) => {
  try {
    const {
      restaurantName,
      restaurantLogo,
      bannerImage,
      address,
      phone,
      description,
      cuisineType,
      openingTime,
      closingTime,
      deliveryArea
    } = req.body;
    const profile = await ProviderService.updateProviderProfile(
      req.user?.id,
      {
        restaurantName,
        restaurantLogo,
        bannerImage,
        address,
        phone,
        description,
        cuisineType,
        openingTime,
        closingTime,
        deliveryArea
      }
    );
    return res.status(200).json({
      success: true,
      message: "Provider profile updated successfully",
      data: profile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "Provider profile not found" : "Failed to update profile",
      error: error.message
    });
  }
};
var getProviders = async (_req, res) => {
  try {
    const providers = await ProviderService.getAllProviders();
    return res.status(200).json({
      success: true,
      data: providers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get providers",
      error: error.message
    });
  }
};
var getProvider = async (req, res) => {
  try {
    const provider = await ProviderService.getProviderById(req.params.id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: provider
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get provider",
      error: error.message
    });
  }
};
var getOrders = async (req, res) => {
  try {
    const orders = await ProviderService.getProviderOrders(req.user.id);
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No orders found"
      });
    }
    console.log(req.user);
    return res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "No provider profile found" : "Failed to get provider orders",
      error: error.message
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }
    const result = await ProviderService.updateOrderStatus(
      req.params.id,
      req.user.id,
      status
    );
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "No provider profile found" : error.message === "ORDER_NOT_FOUND" ? "Order not found" : "Failed to update order status",
      error: error.message
    });
  }
};
var ProviderController = {
  createProfile,
  getMyProfile,
  updateProfile,
  getProviders,
  getProvider,
  getOrders,
  updateOrderStatus: updateOrderStatus2,
  getDashboardStats
};

// src/middleware/upload.ts
import multer from "multer";
var storage = multer.memoryStorage();
var fileFilter = (_req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg, png, and webp files are allowed"));
  }
};
var upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter
});

// src/modules/providers/provider.route.ts
var router = Router();
router.get("/providers", ProviderController.getProviders);
router.get("/providers/:id", ProviderController.getProvider);
router.post("/provider/profile", auth_default(Role.PROVIDER), upload.fields([
  {
    name: "restaurantLogo",
    maxCount: 1
  },
  {
    name: "bannerImage",
    maxCount: 1
  }
]), ProviderController.createProfile);
router.get("/provider/dashboard-stats", auth_default(Role.PROVIDER), ProviderController.getDashboardStats);
router.get("/provider/dashboard", auth_default(Role.PROVIDER), ProviderController.getMyProfile);
router.patch(
  "/provider/profile",
  auth_default(Role.PROVIDER),
  upload.fields([
    {
      name: "restaurantLogo",
      maxCount: 1
    },
    {
      name: "bannerImage",
      maxCount: 1
    }
  ]),
  ProviderController.updateProfile
);
router.get(
  "/provider/orders",
  auth_default(Role.PROVIDER),
  ProviderController.getOrders
);
router.patch(
  "/provider/order/:id",
  auth_default(Role.PROVIDER),
  ProviderController.updateOrderStatus
);
var providerRouter = router;

// src/modules/meals/meal.route.ts
import { Router as Router2 } from "express";

// src/modules/meals/meal.service.ts
var slugify = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
var generateUniqueSlug = async (title) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const existingMeal = await prisma.meal.findFirst({
      where: { slug },
      select: { id: true }
    });
    if (!existingMeal) return slug;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};
var createMeal = async (userId, payload) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true, isApproved: true }
  });
  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  if (!provider.isApproved) {
    throw new Error("PROVIDER_NOT_APPROVED");
  }
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
    select: { id: true }
  });
  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }
  const slug = await generateUniqueSlug(payload.title);
  return prisma.meal.create({
    data: {
      title: payload.title,
      slug,
      shortDescription: payload.shortDescription,
      description: payload.description,
      ingredients: payload.ingredients,
      price: payload.price,
      discountPrice: payload.discountPrice,
      imageUrl: payload.imageUrl,
      categoryId: payload.categoryId,
      providerId: provider.id,
      isAvailable: payload.isAvailable ?? true,
      isFeatured: payload.isFeatured ?? false,
      preparationTime: payload.preparationTime,
      calories: payload.calories,
      tags: payload.tags
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true
        }
      }
    }
  });
};
var getMeals = async (query) => {
  const {
    searchTerm,
    categoryId,
    minPrice,
    maxPrice,
    isAvailable,
    isFeatured,
    providerId,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = "1",
    limit = "8"
  } = query;
  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 8;
  const skip = (currentPage - 1) * perPage;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          shortDescription: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          tags: {
            contains: searchTerm,
            mode: "insensitive"
          }
        },
        {
          provider: {
            restaurantName: {
              contains: searchTerm,
              mode: "insensitive"
            }
          }
        },
        {
          category: {
            name: {
              contains: searchTerm,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (categoryId) {
    andConditions.push({
      categoryId
    });
  }
  if (providerId) {
    andConditions.push({
      providerId
    });
  }
  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        ...minPrice ? { gte: Number(minPrice) } : {},
        ...maxPrice ? { lte: Number(maxPrice) } : {}
      }
    });
  }
  if (isAvailable !== void 0) {
    if (isAvailable === "true" || isAvailable === "false") {
      andConditions.push({
        isAvailable: isAvailable === "true"
      });
    }
  }
  if (isFeatured !== void 0) {
    if (isFeatured === "true" || isFeatured === "false") {
      andConditions.push({
        isFeatured: isFeatured === "true"
      });
    }
  }
  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
  const allowedSortFields = [
    "createdAt",
    "price",
    "title",
    "averageRating"
  ];
  const finalSortBy = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
  const finalSortOrder = sortOrder === "asc" ? "asc" : "desc";
  const meals = await prisma.meal.findMany({
    where: whereConditions,
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
          averageRating: true,
          totalReviews: true
        }
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      [finalSortBy]: finalSortOrder
    },
    skip,
    take: perPage
  });
  const total = await prisma.meal.count({
    where: whereConditions
  });
  return {
    meta: {
      page: currentPage,
      limit: perPage,
      total,
      totalPage: Math.ceil(total / perPage)
    },
    data: meals
  };
};
var getMealById = async (id) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              phone: true
            }
          }
        }
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
};
var updateMeal = async (mealId, data, userId) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  const mealData = await prisma.meal.findUnique({
    where: { id: mealId },
    select: {
      id: true,
      providerId: true,
      title: true
    }
  });
  if (!mealData) {
    throw new Error("MEAL_NOT_FOUND");
  }
  if (mealData.providerId !== provider.id) {
    throw new Error("UNAUTHORIZED_UPDATE");
  }
  let updatedSlug = void 0;
  if (data.title && data.title !== mealData.title) {
    updatedSlug = await generateUniqueSlug(data.title);
  }
  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true }
    });
    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
  }
  const result = await prisma.meal.update({
    where: {
      id: mealData.id
    },
    data: {
      ...data,
      ...updatedSlug ? { slug: updatedSlug } : {}
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true
        }
      }
    }
  });
  return result;
};
var deleteMeal = async (mealId, userId) => {
  const mealData = await prisma.meal.findUnique({
    where: {
      id: mealId
    },
    select: {
      id: true,
      providerId: true
    }
  });
  if (!mealData) throw new Error("MEAL_NOT_FOUND");
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }
  if (mealData.providerId !== provider.id) {
    throw new Error("UNAUTHORIZED_DELETE");
  }
  return prisma.meal.delete({
    where: { id: mealId }
  });
};
var MealService = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal
};

// src/modules/meals/meal.controller.ts
var createMeal2 = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      description,
      ingredients,
      price,
      discountPrice,
      categoryId,
      isAvailable,
      isFeatured,
      preparationTime,
      calories,
      tags
    } = req.body;
    if (!title || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "title, price and categoryId are required"
      });
    }
    const imageUrl = req.file ? await uploadToCloudinary(req.file.buffer, "foodhub/users") : void 0;
    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image is required"
      });
    }
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: req.user.id },
      select: { id: true, isApproved: true }
    });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    if (!provider.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Provider is not approved yet"
      });
    }
    const mealPayload = {
      title,
      shortDescription,
      description,
      ingredients,
      price: Number(price),
      imageUrl,
      categoryId,
      isAvailable,
      isFeatured,
      tags,
      ...discountPrice !== void 0 && {
        discountPrice: Number(discountPrice)
      },
      ...preparationTime !== void 0 && {
        preparationTime: Number(preparationTime)
      },
      ...calories !== void 0 && {
        calories: Number(calories)
      }
    };
    const meal = await MealService.createMeal(req.user.id, mealPayload);
    return res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: meal
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "Provider profile not found" : error.message === "PROVIDER_NOT_APPROVED" ? "Provider is not approved yet" : error.message === "CATEGORY_NOT_FOUND" ? "Category not found" : "Failed to create meal",
      error: error.message
    });
  }
};
var getMeals2 = async (req, res) => {
  try {
    const meals = await MealService.getMeals(
      req.query
    );
    return res.status(200).json({
      success: true,
      data: meals.data,
      meta: meals.meta
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch meals",
      error: error.message
    });
  }
};
var getMyMeals = async (req, res) => {
  try {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: req.user.id },
      select: { id: true }
    });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    const meals = await prisma.meal.findMany({
      where: {
        providerId: provider.id
      },
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            restaurantName: true,
            restaurantLogo: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return res.status(200).json({
      success: true,
      data: meals
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch provider meals",
      error: error.message
    });
  }
};
var getMeal = async (req, res) => {
  try {
    const meal = await MealService.getMealById(req.params.id);
    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found"
      });
    }
    return res.status(200).json({
      success: true,
      data: meal
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch meal",
      error: error.message
    });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    const result = await MealService.updateMeal(
      mealId,
      req.body,
      req.user.id
    );
    return res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "Provider profile not found" : error.message === "MEAL_NOT_FOUND" ? "Meal not found" : error.message === "UNAUTHORIZED_UPDATE" ? "You are not authorized to update this meal" : error.message === "CATEGORY_NOT_FOUND" ? "Category not found" : "Failed to update meal",
      error: error.message
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    const userId = req.user.id;
    const result = await MealService.deleteMeal(mealId, userId);
    return res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message === "PROVIDER_PROFILE_NOT_FOUND" ? "Provider profile not found" : error.message === "MEAL_NOT_FOUND" ? "Meal not found" : error.message === "UNAUTHORIZED_DELETE" ? "You are not authorized to delete this meal" : "Meal deletion failed",
      error: error.message
    });
  }
};
var MealController = {
  createMeal: createMeal2,
  getMeals: getMeals2,
  getMyMeals,
  getMeal,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2
};

// src/modules/meals/meal.route.ts
var router2 = Router2();
router2.get("/meals", MealController.getMeals);
router2.get("/meals/:id", MealController.getMeal);
router2.post(
  "/meals",
  auth_default(Role.PROVIDER),
  upload.single("imageUrl"),
  MealController.createMeal
);
router2.put(
  "/meals/:id",
  auth_default(Role.PROVIDER),
  MealController.updateMeal
);
router2.delete(
  "/meals/:id",
  auth_default(Role.PROVIDER),
  MealController.deleteMeal
);
var MealRouter = router2;

// src/modules/category/category.router.ts
import { Router as Router3 } from "express";

// src/modules/category/category.service.ts
var slugify2 = (text) => text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
var createCategory = async (name) => {
  const existing = await prisma.category.findUnique({
    where: { name }
  });
  if (existing) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }
  const slug = slugify2(name);
  return prisma.category.create({
    data: {
      name,
      slug
    }
  });
};
var getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" }
  });
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await createCategory(name);
    res.status(201).json({
      success: true,
      message: "Category created",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message === "CATEGORY_ALREADY_EXISTS" ? "Category already exists" : "Failed to create category",
      error: error.message
    });
  }
};
var getAllCategories2 = async (req, res) => {
  try {
    const result = await getAllCategories();
    return res.json({
      success: true,
      message: "Category fetched",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message === "CATEGORY_NOT_FOUND",
      error: error.message
    });
  }
};

// src/modules/category/category.router.ts
var router3 = Router3();
router3.post(
  "/categories",
  auth_default(Role.ADMIN),
  createCategory2
);
router3.get("/categories", getAllCategories2);
var categoryRoutes = router3;

// src/modules/orders/order.router.ts
import { Router as Router4 } from "express";

// src/modules/orders/order.service.ts
var addToCart = async (customerId, mealId) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
    select: {
      id: true,
      price: true,
      discountPrice: true,
      providerId: true,
      isAvailable: true
    }
  });
  if (!meal) {
    throw new Error("MEAL_NOT_FOUND");
  }
  if (!meal.isAvailable) {
    throw new Error("MEAL_NOT_AVAILABLE");
  }
  let cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: {
            select: {
              providerId: true
            }
          }
        }
      }
    }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
      include: {
        items: {
          include: {
            meal: {
              select: {
                providerId: true
              }
            }
          }
        }
      }
    });
  }
  if (cart.items.length > 0) {
    const existingProviderId = cart.items[0]?.meal.providerId;
    if (existingProviderId !== meal.providerId) {
      throw new Error("ONE_PROVIDER_ONLY");
    }
  }
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      mealId
    }
  });
  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + 1
      },
      include: {
        meal: true
      }
    });
  }
  const finalPrice = meal.discountPrice && Number(meal.discountPrice) > 0 ? meal.discountPrice : meal.price;
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      quantity: 1,
      priceAtAddTime: finalPrice
    },
    include: {
      meal: true
    }
  });
};
var getMyCart = async (customerId) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: {
            include: {
              category: true,
              provider: {
                select: {
                  id: true,
                  restaurantName: true,
                  restaurantLogo: true
                }
              }
            }
          }
        }
      }
    }
  });
  if (!cart) return null;
  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + Number(item.priceAtAddTime) * item.quantity;
  }, 0);
  return {
    ...cart,
    totalPrice
  };
};
var updateQuantity = async (customerId, cartItemId, quantity) => {
  if (!Number.isInteger(quantity)) {
    throw new Error("QUANTITY_MUST_BE_INTEGER");
  }
  const item = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        customerId
      }
    },
    include: {
      meal: true
    }
  });
  if (!item) {
    throw new Error("CART_ITEM_NOT_FOUND");
  }
  if (quantity < 1) {
    return prisma.cartItem.delete({
      where: { id: cartItemId }
    });
  }
  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: {
      meal: true
    }
  });
};
var removeCartItem = async (customerId, cartItemId) => {
  const item = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        customerId
      }
    }
  });
  if (!item) {
    throw new Error("CART_ITEM_NOT_FOUND");
  }
  return prisma.cartItem.delete({
    where: { id: cartItemId }
  });
};
var clearCart = async (customerId) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId }
  });
  if (!cart) {
    throw new Error("CART_NOT_FOUND");
  }
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
  return null;
};
var createOrder = async (customerId, payload) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: true
        }
      }
    }
  });
  if (!cart || cart.items.length === 0) {
    throw new Error("CART_IS_EMPTY");
  }
  const providerId = cart.items[0]?.meal.providerId;
  if (!providerId) {
    throw new Error("INVALID_PROVIDER");
  }
  const sameProvider = cart.items.every(
    (item) => item.meal.providerId === providerId
  );
  if (!sameProvider) {
    throw new Error("ONE_PROVIDER_ONLY");
  }
  let totalPrice = 0;
  const orderItems = cart.items.map((item) => {
    const linePrice = Number(item.priceAtAddTime) * item.quantity;
    totalPrice += linePrice;
    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.priceAtAddTime
    };
  });
  const order = await prisma.order.create({
    data: {
      customerId,
      providerId,
      address: payload.address,
      phone: payload.phone,
      notes: payload.notes,
      status: OrderStatus.PLACED,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: payload.paymentMethod ?? PaymentMethod.CASH_ON_DELIVERY,
      totalPrice,
      items: {
        create: orderItems
      }
    },
    include: {
      items: {
        include: {
          meal: true
        }
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true
        }
      }
    }
  });
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
  return order;
};
var getCustomerOrders = async (customerId) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: true
        }
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
          phone: true,
          address: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getOrderById = async (customerId, orderId) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId
    },
    include: {
      items: {
        include: {
          meal: true
        }
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
          phone: true,
          address: true
        }
      }
    }
  });
  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }
  return order;
};
var OrderServices = {
  addToCart,
  getMyCart,
  updateQuantity,
  removeCartItem,
  clearCart,
  createOrder,
  getCustomerOrders,
  getOrderById
};

// src/modules/orders/order.controller.ts
var addToCart2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { mealId } = req.body;
    if (!mealId) {
      return res.status(400).json({
        success: false,
        message: "mealId is required"
      });
    }
    const result = await OrderServices.addToCart(customerId, mealId);
    return res.status(200).json({
      success: true,
      message: "Added to cart successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "MEAL_NOT_FOUND" ? "Meal not found" : error.message === "MEAL_NOT_AVAILABLE" ? "Meal is not available" : error.message === "ONE_PROVIDER_ONLY" ? "You can order from only one provider at a time" : error.message || "Failed to add to cart"
    });
  }
};
var getMyCart2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const cart = await OrderServices.getMyCart(customerId);
    return res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch cart"
    });
  }
};
var updateQuantity2 = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const customerId = req.user.id;
    if (quantity === void 0) {
      return res.status(400).json({
        success: false,
        message: "quantity is required"
      });
    }
    const result = await OrderServices.updateQuantity(
      customerId,
      cartItemId,
      Number(quantity)
    );
    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "QUANTITY_MUST_BE_INTEGER" ? "Quantity must be an integer" : error.message === "CART_ITEM_NOT_FOUND" ? "Cart item not found" : error.message || "Failed to update cart item"
    });
  }
};
var removeCartItem2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const cartItemId = req.params.id;
    const result = await OrderServices.removeCartItem(customerId, cartItemId);
    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "CART_ITEM_NOT_FOUND" ? "Cart item not found" : error.message || "Failed to remove cart item"
    });
  }
};
var clearCart2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    await OrderServices.clearCart(customerId);
    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: null
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "CART_NOT_FOUND" ? "Cart not found" : error.message || "Failed to clear cart"
    });
  }
};
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { address, phone, notes, paymentMethod } = req.body;
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required"
      });
    }
    const order = await OrderServices.createOrder(customerId, {
      address,
      phone,
      notes,
      paymentMethod
    });
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "CART_IS_EMPTY" ? "Cart is empty" : error.message === "INVALID_PROVIDER" ? "Invalid provider" : error.message === "ONE_PROVIDER_ONLY" ? "You can order from only one provider at a time" : error.message || "Failed to create order"
    });
  }
};
var getMyOrders = async (req, res) => {
  try {
    const orders = await OrderServices.getCustomerOrders(req.user.id);
    return res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders"
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const order = await OrderServices.getOrderById(
      req.user.id,
      req.params.id
    );
    return res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message === "ORDER_NOT_FOUND" ? "Order not found" : error.message || "Failed to fetch order"
    });
  }
};
var OrderController = {
  addToCart: addToCart2,
  getMyCart: getMyCart2,
  updateQuantity: updateQuantity2,
  removeCartItem: removeCartItem2,
  clearCart: clearCart2,
  createOrder: createOrder2,
  getMyOrders,
  getOrderById: getOrderById2
};

// src/modules/orders/order.router.ts
var router4 = Router4();
router4.post("/addtocart", auth_default(Role.CUSTOMER), OrderController.addToCart);
router4.get("/mycart", auth_default(Role.CUSTOMER), OrderController.getMyCart);
router4.patch("/cart/:id", auth_default(Role.CUSTOMER), OrderController.updateQuantity);
router4.delete("/cart/:id", auth_default("CUSTOMER"), OrderController.removeCartItem);
router4.delete("/cart", auth_default("CUSTOMER"), OrderController.clearCart);
router4.post("/orders", auth_default(Role.CUSTOMER), OrderController.createOrder);
router4.get("/orders", auth_default(Role.CUSTOMER), OrderController.getMyOrders);
router4.get("/orders/:id", auth_default(Role.CUSTOMER), OrderController.getOrderById);
var orderRoutes = router4;

// src/modules/admin/admin.router.ts
import { Router as Router5 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async (query) => {
  const {
    searchTerm,
    role,
    status,
    page = "1",
    limit = "10"
  } = query;
  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 10;
  const skip = (currentPage - 1) * perPage;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        {
          providerProfile: {
            restaurantName: {
              contains: searchTerm,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (role) {
    andConditions.push({ role });
  }
  if (status) {
    andConditions.push({ status });
  }
  const where = andConditions.length ? { AND: andConditions } : {};
  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      phone: true,
      address: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          id: true,
          restaurantName: true,
          isApproved: true,
          restaurantLogo: true
        }
      }
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: perPage
  });
  const total = await prisma.user.count({ where });
  return {
    meta: {
      page: currentPage,
      limit: perPage,
      total,
      totalPage: Math.ceil(total / perPage)
    },
    data: users
  };
};
var updateUserStatus = async (userId, status) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }
  return prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var getAllProviders2 = async () => {
  return prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          status: true
        }
      },
      meals: {
        select: {
          id: true,
          title: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var approveProvider = async (providerId, isApproved) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id: providerId }
  });
  if (!provider) {
    throw new Error("PROVIDER_NOT_FOUND");
  }
  return prisma.providerProfile.update({
    where: { id: providerId },
    data: { isApproved }
  });
};
var getAllMeals = async () => {
  return prisma.meal.findMany({
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          isApproved: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var deleteMeal3 = async (mealId) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId }
  });
  if (!meal) {
    throw new Error("MEAL_NOT_FOUND");
  }
  return prisma.meal.delete({
    where: { id: mealId }
  });
};
var getAllOrders = async (query) => {
  const {
    status,
    paymentStatus,
    page = "1",
    limit = "10"
  } = query;
  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 10;
  const skip = (currentPage - 1) * perPage;
  const andConditions = [];
  if (status) {
    andConditions.push({ status });
  }
  if (paymentStatus) {
    andConditions.push({ paymentStatus });
  }
  const where = andConditions.length ? { AND: andConditions } : {};
  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true
        }
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          phone: true,
          address: true
        }
      },
      items: {
        include: {
          meal: true
        }
      }
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: perPage
  });
  const total = await prisma.order.count({ where });
  return {
    meta: {
      page: currentPage,
      limit: perPage,
      total,
      totalPage: Math.ceil(total / perPage)
    },
    data: orders
  };
};
var getDashboardStats2 = async () => {
  const [
    totalUsers,
    totalProviders,
    totalMeals,
    totalOrders,
    activeUsers,
    pendingOrders,
    deliveredOrders,
    totalRevenueAgg,
    recentOrders
  ] = await Promise.all([
    prisma.user.count(),
    prisma.providerProfile.count(),
    prisma.meal.count(),
    prisma.order.count(),
    prisma.user.count({
      where: { status: "ACTIVE" }
    }),
    prisma.order.count({
      where: { status: "PLACED" }
    }),
    prisma.order.count({
      where: { status: "DELIVERED" }
    }),
    prisma.order.aggregate({
      _sum: { totalPrice: true }
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: { name: true, email: true }
        },
        provider: {
          select: { restaurantName: true }
        }
      }
    })
  ]);
  return {
    overview: {
      totalUsers,
      totalProviders,
      totalMeals,
      totalOrders,
      activeUsers,
      pendingOrders,
      deliveredOrders,
      totalRevenue: Number(totalRevenueAgg._sum.totalPrice || 0)
    },
    recentOrders
  };
};
var AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllProviders: getAllProviders2,
  approveProvider,
  getAllMeals,
  deleteMeal: deleteMeal3,
  getAllOrders,
  getDashboardStats: getDashboardStats2
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const result = await AdminService.getAllUsers(req.query);
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      meta: result.meta,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users"
    });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const result = await AdminService.updateUserStatus(
      req.params.id,
      req.body.status
    );
    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "USER_NOT_FOUND" ? "User not found" : error.message || "Failed to update user status"
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const result = await AdminService.getAllOrders(req.query);
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      meta: result.meta,
      data: result.data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders"
    });
  }
};
var getAllProviders3 = async (_req, res) => {
  try {
    const result = await AdminService.getAllProviders();
    return res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch providers"
    });
  }
};
var approveProvider2 = async (req, res) => {
  try {
    const result = await AdminService.approveProvider(
      req.params.id,
      Boolean(req.body.isApproved)
    );
    return res.status(200).json({
      success: true,
      message: "Provider approval updated successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "PROVIDER_NOT_FOUND" ? "Provider not found" : error.message || "Failed to update provider approval"
    });
  }
};
var getAllMeals2 = async (_req, res) => {
  try {
    const result = await AdminService.getAllMeals();
    return res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch meals"
    });
  }
};
var deleteMeal4 = async (req, res) => {
  try {
    const result = await AdminService.deleteMeal(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "MEAL_NOT_FOUND" ? "Meal not found" : error.message || "Failed to delete meal"
    });
  }
};
var getDashboardStats3 = async (_req, res) => {
  try {
    const result = await AdminService.getDashboardStats();
    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard stats"
    });
  }
};
var AdminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  getAllProviders: getAllProviders3,
  approveProvider: approveProvider2,
  getAllMeals: getAllMeals2,
  deleteMeal: deleteMeal4,
  getAllOrders: getAllOrders2,
  getDashboardStats: getDashboardStats3
};

// src/modules/admin/admin.router.ts
var router5 = Router5();
router5.get("/admin/users", auth_default(Role.ADMIN), AdminController.getAllUsers);
router5.patch("/admin/users/:id/status", auth_default("ADMIN"), AdminController.updateUserStatus);
router5.get("/admin/providers", auth_default(Role.ADMIN), AdminController.getAllProviders);
router5.patch("/admin/providers/:id/approve", auth_default(Role.ADMIN), AdminController.approveProvider);
router5.get("/admin/meals", auth_default(Role.ADMIN), AdminController.getAllMeals);
router5.delete("/admin/meals/:id", auth_default(Role.ADMIN), AdminController.deleteMeal);
router5.get("/admin/orders", auth_default(Role.ADMIN), AdminController.getAllOrders);
router5.get("/admin/dashboard-stats", auth_default(Role.ADMIN), AdminController.getDashboardStats);
var adminRouter = router5;

// src/modules/review/review.route.ts
import { Router as Router6 } from "express";

// src/modules/review/review.service.ts
var createReview = async (userId, mealId, rating, comment) => {
  if (rating < 1 || rating > 5) {
    throw new Error("INVALID_RATING");
  }
  const ordered = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: { customerId: userId }
    }
  });
  if (!ordered) {
    throw new Error("NOT_ELIGIBLE_TO_REVIEW");
  }
  const existingReview = await prisma.review.findFirst({
    where: {
      userId,
      mealId
    }
  });
  if (existingReview) {
    throw new Error("REVIEW_ALREADY_EXISTS");
  }
  const review = await prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment: comment ?? null
    }
  });
  await updateMealRating(mealId);
  return review;
};
var updateReview = async (userId, reviewId, rating, comment) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId }
  });
  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }
  if (review.userId !== userId) {
    throw new Error("UNAUTHORIZED");
  }
  if (rating < 1 || rating > 5) {
    throw new Error("INVALID_RATING");
  }
  const updated = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating,
      comment: comment ?? null
    }
  });
  await updateMealRating(review.mealId);
  return updated;
};
var deleteReview = async (userId, reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId }
  });
  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }
  if (review.userId !== userId) {
    throw new Error("UNAUTHORIZED");
  }
  await prisma.review.delete({
    where: { id: reviewId }
  });
  await updateMealRating(review.mealId);
  return null;
};
var updateMealRating = async (mealId) => {
  const reviews = await prisma.review.findMany({
    where: { mealId },
    select: { rating: true }
  });
  const totalReviews = reviews.length;
  const averageRating = totalReviews === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  await prisma.meal.update({
    where: { id: mealId },
    data: {
      averageRating: Number(averageRating.toFixed(2)),
      totalReviews
    }
  });
};
var getMealReviews = async (mealId) => {
  return prisma.review.findMany({
    where: {
      mealId,
      isVisible: true
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getMyReviews = async (userId) => {
  return prisma.review.findMany({
    where: {
      userId
    },
    include: {
      meal: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
          slug: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getTestimonials = async () => {
  return prisma.review.findMany({
    where: {
      isVisible: true,
      rating: {
        gte: 4
      },
      comment: {
        not: null
      }
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      meal: {
        select: {
          id: true,
          title: true,
          imageUrl: true
        }
      }
    },
    orderBy: [
      { rating: "desc" },
      { createdAt: "desc" }
    ],
    take: 6
  });
};
var ReviewService = {
  createReview,
  updateReview,
  deleteReview,
  getMealReviews,
  getMyReviews,
  getTestimonials
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mealId, rating, comment } = req.body;
    if (!mealId || rating === void 0) {
      return res.status(400).json({
        success: false,
        message: "mealId and rating are required"
      });
    }
    const review = await ReviewService.createReview(
      userId,
      mealId,
      Number(rating),
      comment
    );
    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "INVALID_RATING" ? "Rating must be between 1 and 5" : error.message === "NOT_ELIGIBLE_TO_REVIEW" ? "You can only review meals you ordered" : error.message === "REVIEW_ALREADY_EXISTS" ? "You have already reviewed this meal" : error.message || "Failed to create review"
    });
  }
};
var updateReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    if (rating === void 0) {
      return res.status(400).json({
        success: false,
        message: "rating is required"
      });
    }
    const review = await ReviewService.updateReview(
      userId,
      reviewId,
      Number(rating),
      comment
    );
    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "REVIEW_NOT_FOUND" ? "Review not found" : error.message === "UNAUTHORIZED" ? "You are not allowed to update this review" : error.message === "INVALID_RATING" ? "Rating must be between 1 and 5" : error.message || "Failed to update review"
    });
  }
};
var deleteReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviewId = req.params.id;
    await ReviewService.deleteReview(userId, reviewId);
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message === "REVIEW_NOT_FOUND" ? "Review not found" : error.message === "UNAUTHORIZED" ? "You are not allowed to delete this review" : error.message || "Failed to delete review"
    });
  }
};
var getMealReviews2 = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const reviews = await ReviewService.getMyReviews(mealId);
    return res.status(200).json({
      success: true,
      message: "Meal reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch meal reviews"
    });
  }
};
var getMyReviews2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await ReviewService.getMyReviews(userId);
    return res.status(200).json({
      success: true,
      message: "My reviews fetched successfully",
      data: reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch your reviews"
    });
  }
};
var getTestimonials2 = async (req, res) => {
  try {
    const result = await ReviewService.getTestimonials();
    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch testimonials"
    });
  }
};
var ReviewController = {
  createReview: createReview2,
  updateReview: updateReview2,
  deleteReview: deleteReview2,
  getMealReviews: getMealReviews2,
  getMyReviews: getMyReviews2,
  getTestimonials: getTestimonials2
};

// src/modules/review/review.route.ts
var router6 = Router6();
router6.post("/review", auth_default(Role.CUSTOMER), ReviewController.createReview);
router6.get("/meal/:mealId", ReviewController.getMealReviews);
router6.get("/my-reviews", auth_default(Role.CUSTOMER), ReviewController.getMyReviews);
router6.get("/testimonials", ReviewController.getTestimonials);
router6.patch("/:id", auth_default(Role.CUSTOMER), ReviewController.updateReview);
router6.delete("/:id", auth_default(Role.CUSTOMER), ReviewController.deleteReview);
var reviewRoutes = router6;

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errMessage = "Internal server Error!";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400, errMessage = "Incorrect body or missing a fields";
  }
  res.status(statusCode);
  res.json({ success: false, meeage: errMessage, error: errorDetails });
}

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "This route is not available!!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/auth/auth.route.ts
import { Router as Router7 } from "express";

// src/modules/auth/auth.service.ts
import bcrypt from "bcrypt";
import jwt2 from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
var googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
var createAccessToken = (user) => {
  return jwt2.sign(
    { id: user.id, email: user.email, role: user.role },
    config_default.jwtSecret,
    { expiresIn: "7d" }
  );
};
var register = async (payload) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email }
  });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
      authProvider: "CREDENTIALS"
    }
  });
  const token = createAccessToken(user);
  return { user, token };
};
var login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  if (!user.password) {
    throw new Error("This account uses social login. Please continue with Google.");
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    throw new Error("Invalid credentials");
  }
  const token = createAccessToken(user);
  return { user, token };
};
var googleLogin = async (token) => {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  if (!payload?.email) {
    throw new Error("Invalid Google token");
  }
  let user = await prisma.user.findUnique({
    where: { email: payload.email }
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: payload.name || "Google User",
        email: payload.email,
        password: null,
        avatar: payload.picture || null,
        role: "CUSTOMER",
        authProvider: "GOOGLE",
        providerId: payload.sub || null,
        isEmailVerified: true
      }
    });
  } else {
    user = await prisma.user.update({
      where: { email: payload.email },
      data: {
        avatar: user.avatar || payload.picture || null,
        providerId: user.providerId || payload.sub || null,
        isEmailVerified: true
      }
    });
  }
  const accessToken = createAccessToken(user);
  return { user, token: accessToken };
};
var authService = {
  register,
  login,
  googleLogin
};

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  const { statusCode, success, message, data: DataReponse } = data;
  res.status(statusCode).json({
    success,
    message,
    data: DataReponse
  });
};
var sendResponse_default = sendResponse;

// src/modules/auth/auth.controller.ts
var setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/"
  });
};
var register2 = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    setAuthCookie(res, result.token);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "Registration successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var login2 = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    setAuthCookie(res, result.token);
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var googleLogin2 = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await authService.googleLogin(token);
    setAuthCookie(res, result.token);
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Google login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var authController = {
  register: register2,
  login: login2,
  googleLogin: googleLogin2
};

// src/middleware/validate.ts
var validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues
      });
    }
    req.body = result.data;
    next();
  };
};

// src/modules/auth/auth.validation.ts
import { z } from "zod";
var registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "PROVIDER", "ADMIN", "MANAGER", "SUPER_ADMIN"])
});
var loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password is required")
});
var googleLoginSchema = z.object({
  token: z.string().min(1, "Google token is required")
});

// src/modules/auth/auth.route.ts
var router7 = Router7();
router7.post("/auth/register", validateRequest(registerSchema), authController.register);
router7.post("/auth/login", validateRequest(loginSchema), authController.login);
router7.post("/auth/google-login", authController.googleLogin);
var authRouter = router7;

// src/modules/users/users.route.ts
import { Router as Router8 } from "express";

// src/modules/users/users.server.ts
var getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { providerProfile: true }
  });
  if (!user) throw new Error("User not found");
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
var updateProfile2 = async (userId, payload) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: payload
  });
  return user;
};
var userService = {
  getProfile,
  updateProfile: updateProfile2
};

// src/modules/users/users.controller.ts
var getProfile2 = async (req, res) => {
  const user = await userService.getProfile(req.user?.id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Profile fetched successfully",
    data: user
  });
};
var updateProfile3 = async (req, res) => {
  const imageUrl = req.file ? await uploadToCloudinary(req.file.buffer, "foodhub/users") : void 0;
  const user = await userService.updateProfile(req.user?.id, {
    name: req.body.name,
    phone: req.body.phone,
    avatar: imageUrl ?? req.body.avatar,
    bio: req.body.bio,
    address: req.body.address
  });
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: user
  });
};
var userController = {
  getProfile: getProfile2,
  updateProfile: updateProfile3
};

// src/modules/users/users.route.ts
var router8 = Router8();
router8.get("/users/me", auth_default(), userController.getProfile);
router8.patch("/users/me", auth_default(), upload.single("avatar"), userController.updateProfile);
var userRouter = router8;

// src/modules/ai/ai.route.ts
import { Router as Router9 } from "express";

// src/modules/ai/ai.service.ts
import OpenAI from "openai";
var openai = new OpenAI({
  apiKey: config_default.openai_api_key
});
var getChatReply = async (messages) => {
  const formattedMessages = messages.map(
    (message) => ({
      role: message.role,
      content: message.content
    })
  );
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: formattedMessages
  });
  return response.choices[0]?.message?.content || "";
};
var getMealRecommendations = async (prompt) => {
  const meals = await prisma.meal.findMany({
    select: {
      title: true,
      price: true,
      category: {
        select: { name: true }
      }
    },
    take: 20
  });
  const context = meals.map(
    (m) => `${m.title} - ${m.price} taka (${m.category?.name || "General"})`
  ).join("\n");
  const messages = [
    {
      role: "system",
      content: `You are a food recommendation assistant.
Only suggest meals from the given list below:

${context}`
    },
    {
      role: "user",
      content: prompt
    }
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });
  return response.choices[0]?.message?.content || "";
};
var generateMealContent = async (payload) => {
  const { title, category, ingredients } = payload;
  const messages = [
    {
      role: "system",
      content: "Generate JSON with shortDescription, description, tags"
    },
    {
      role: "user",
      content: `Title: ${title}, Category: ${category}, Ingredients: ${ingredients}`
    }
  ];
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });
  return response.choices[0]?.message?.content || "";
};
var getSearchSuggestions = async (query) => {
  if (!query) return [];
  const meals = await prisma.meal.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive"
      }
    },
    select: {
      id: true,
      title: true
    },
    take: 5
  });
  return meals;
};
var AiService = {
  getChatReply,
  getMealRecommendations,
  generateMealContent,
  getSearchSuggestions
};

// src/modules/ai/ai.controller.ts
var chatAssistant = async (req, res) => {
  try {
    const { messages } = req.body;
    const reply = await AiService.getChatReply(messages);
    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: { reply }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "AI chat failed",
      error: error.message
    });
  }
};
var recommendMeals = async (req, res) => {
  try {
    const { prompt } = req.body;
    const reply = await AiService.getMealRecommendations(prompt);
    res.status(200).json({
      success: true,
      message: "Meal recommendations generated successfully",
      data: { reply }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Recommendation failed",
      error: error.message
    });
  }
};
var generateMealContent2 = async (req, res) => {
  try {
    const result = await AiService.generateMealContent(req.body);
    res.status(200).json({
      success: true,
      message: "Meal content generated successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Content generation failed",
      error: error.message
    });
  }
};
var searchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    const result = await AiService.getSearchSuggestions(query);
    res.status(200).json({
      success: true,
      message: "Suggestions fetched",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Suggestion failed",
      error: error.message
    });
  }
};
var AiController = {
  chatAssistant,
  recommendMeals,
  generateMealContent: generateMealContent2,
  searchSuggestions
};

// src/modules/ai/ai.route.ts
var router9 = Router9();
router9.post("/ai/chat", AiController.chatAssistant);
router9.post("/ai/recommend-meals", AiController.recommendMeals);
router9.post(
  "/ai/generate-meal-content",
  auth_default("PROVIDER", "ADMIN"),
  AiController.generateMealContent
);
router9.post("/ai/search-suggestions", AiController.searchSuggestions);
var AiRoutes = router9;

// src/app.ts
var app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://foodhub-client-six.vercel.app",
      "https://quickplatter.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", providerRouter);
app.use("/api/v1", MealRouter);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1", adminRouter);
app.use("/api/v1", AiRoutes);
app.get("/", (req, res) => {
  res.send("foodhub server running");
});
app.use(errorHandler);
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
