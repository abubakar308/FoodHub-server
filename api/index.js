var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/users/users.route.ts
import { Router } from "express";

// src/modules/users/users.server.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Cart {\n  id         String   @id @default(uuid())\n  customerId String   @unique\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  customer User       @relation(fields: [customerId], references: [id])\n  items    CartItem[]\n}\n\nmodel CartItem {\n  id             String   @id @default(uuid())\n  cartId         String\n  mealId         String\n  quantity       Int      @default(1)\n  priceAtAddTime Decimal  @db.Decimal(10, 2)\n  createdAt      DateTime @default(now())\n\n  cart Cart @relation(fields: [cartId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  @@unique([cartId, mealId])\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String   @unique\n  slug        String   @unique\n  icon        String?\n  image       String?\n  description String?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  meals Meal[]\n}\n\nmodel Meal {\n  id               String   @id @default(uuid())\n  title            String\n  slug             String   @unique\n  shortDescription String?\n  description      String?\n  ingredients      String?\n  price            Decimal  @db.Decimal(10, 2)\n  discountPrice    Decimal? @db.Decimal(10, 2)\n  imageUrl         String?\n  isAvailable      Boolean  @default(true)\n  isFeatured       Boolean  @default(false)\n  averageRating    Float    @default(0)\n  totalReviews     Int      @default(0)\n  preparationTime  Int?\n  calories         Int?\n  tags             String?\n  createdAt        DateTime @default(now())\n  updatedAt        DateTime @updatedAt\n\n  providerId String\n  categoryId String\n\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n  category Category        @relation(fields: [categoryId], references: [id])\n\n  reviews       Review[]\n  orderItems    OrderItem[]\n  cartItems     CartItem[]\n  wishlist      Wishlist[]\n  reviewSummary ReviewSummary?\n}\n\nenum Role {\n  CUSTOMER\n  PROVIDER\n  MANAGER\n  ADMIN\n  SUPER_ADMIN\n}\n\nenum AuthProvider {\n  CREDENTIALS\n  GOOGLE\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  REFUNDED\n}\n\nenum PaymentMethod {\n  CASH_ON_DELIVERY\n  ONLINE\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String?\n  isVisible Boolean  @default(true)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  userId String\n  mealId String\n\n  user User @relation(fields: [userId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  @@unique([userId, mealId])\n}\n\nmodel Wishlist {\n  id        String   @id @default(uuid())\n  userId    String\n  mealId    String\n  createdAt DateTime @default(now())\n\n  user User @relation(fields: [userId], references: [id])\n  meal Meal @relation(fields: [mealId], references: [id])\n\n  @@unique([userId, mealId])\n}\n\nmodel ReviewSummary {\n  id          String   @id @default(uuid())\n  mealId      String   @unique\n  summary     String\n  generatedAt DateTime @default(now())\n\n  meal Meal @relation(fields: [mealId], references: [id])\n}\n\nmodel ContactMessage {\n  id        String   @id @default(uuid())\n  name      String\n  email     String\n  subject   String?\n  message   String\n  createdAt DateTime @default(now())\n}\n\nmodel NewsletterSubscriber {\n  id           String   @id @default(uuid())\n  email        String   @unique\n  subscribedAt DateTime @default(now())\n}\n\nmodel Offer {\n  id          String   @id @default(uuid())\n  title       String\n  description String?\n  discount    Int?\n  imageUrl    String?\n  isActive    Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel Blog {\n  id          String   @id @default(uuid())\n  title       String\n  slug        String   @unique\n  excerpt     String?\n  content     String\n  imageUrl    String?\n  isPublished Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}\n\nmodel AIChatLog {\n  id        String   @id @default(uuid())\n  userId    String?\n  prompt    String\n  response  String\n  createdAt DateTime @default(now())\n}\n\nmodel Order {\n  id            String        @id @default(uuid())\n  customerId    String\n  providerId    String\n  status        OrderStatus   @default(PLACED)\n  paymentStatus PaymentStatus @default(UNPAID)\n  paymentMethod PaymentMethod @default(CASH_ON_DELIVERY)\n  address       String\n  phone         String?\n  notes         String?\n  totalPrice    Decimal       @db.Decimal(10, 2)\n  createdAt     DateTime      @default(now())\n  updatedAt     DateTime      @updatedAt\n\n  customer User            @relation(fields: [customerId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  items OrderItem[]\n}\n\nmodel OrderItem {\n  id        String   @id @default(uuid())\n  orderId   String\n  mealId    String\n  quantity  Int\n  price     Decimal  @db.Decimal(10, 2)\n  createdAt DateTime @default(now())\n\n  order Order @relation(fields: [orderId], references: [id])\n  meal  Meal  @relation(fields: [mealId], references: [id])\n}\n\nmodel User {\n  id       String     @id @default(uuid())\n  name     String\n  email    String     @unique\n  password String?\n  avatar   String?\n  phone    String?\n  address  String?\n  bio      String?\n  role     Role       @default(CUSTOMER)\n  status   UserStatus @default(ACTIVE)\n\n  authProvider    AuthProvider @default(CREDENTIALS)\n  providerId      String?\n  isEmailVerified Boolean      @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  providerProfile ProviderProfile?\n  orders          Order[]\n  reviews         Review[]\n  cart            Cart?\n  wishlistItems   Wishlist[]\n}\n\nmodel ProviderProfile {\n  id             String   @id @default(uuid())\n  userId         String   @unique\n  restaurantName String\n  restaurantLogo String?\n  bannerImage    String?\n  address        String\n  phone          String\n  description    String?\n  cuisineType    String?\n  openingTime    String?\n  closingTime    String?\n  deliveryArea   String?\n  isApproved     Boolean  @default(false)\n  averageRating  Float    @default(0)\n  totalReviews   Int      @default(0)\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  user   User    @relation(fields: [userId], references: [id])\n  meals  Meal[]\n  orders Order[]\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"CartToUser"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"priceAtAddTime","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"shortDescription","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"ingredients","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"discountPrice","kind":"scalar","type":"Decimal"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"totalReviews","kind":"scalar","type":"Int"},{"name":"preparationTime","kind":"scalar","type":"Int"},{"name":"calories","kind":"scalar","type":"Int"},{"name":"tags","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"},{"name":"wishlist","kind":"object","type":"Wishlist","relationName":"MealToWishlist"},{"name":"reviewSummary","kind":"object","type":"ReviewSummary","relationName":"MealToReviewSummary"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"isVisible","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"}],"dbName":null},"Wishlist":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"UserToWishlist"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToWishlist"}],"dbName":null},"ReviewSummary":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"summary","kind":"scalar","type":"String"},{"name":"generatedAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReviewSummary"}],"dbName":null},"ContactMessage":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"message","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"NewsletterSubscriber":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"subscribedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Offer":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"discount","kind":"scalar","type":"Int"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Blog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"excerpt","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isPublished","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"AIChatLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"prompt","kind":"scalar","type":"String"},{"name":"response","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"notes","kind":"scalar","type":"String"},{"name":"totalPrice","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"}],"dbName":null},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"avatar","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"authProvider","kind":"enum","type":"AuthProvider"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"isEmailVerified","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"wishlistItems","kind":"object","type":"Wishlist","relationName":"UserToWishlist"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"restaurantLogo","kind":"scalar","type":"String"},{"name":"bannerImage","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"cuisineType","kind":"scalar","type":"String"},{"name":"openingTime","kind":"scalar","type":"String"},{"name":"closingTime","kind":"scalar","type":"String"},{"name":"deliveryArea","kind":"scalar","type":"String"},{"name":"isApproved","kind":"scalar","type":"Boolean"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"totalReviews","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
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

// generated/prisma/enums.ts
var Role = {
  CUSTOMER: "CUSTOMER",
  PROVIDER: "PROVIDER",
  MANAGER: "MANAGER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/config/index.ts
import dotenv from "dotenv";
import path2 from "path";
dotenv.config({ path: path2.join(process.cwd(), ".env") });
var config2 = {
  port: process.env.PORT || 3e3,
  jwtSecret: process.env.JWT_SECRET || "devsecret"
};
var config_default = config2;

// src/modules/users/users.server.ts
var register = async (payload) => {
  if (!["CUSTOMER", "PROVIDER"].includes(payload.role)) {
    throw new Error("Only CUSTOMER and PROVIDER can register");
  }
  const hashPassword = await bcrypt.hash(payload.password, 8);
  const user = await prisma.user.create({
    data: { ...payload, password: hashPassword }
  });
  return user;
};
var login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid user");
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) throw new Error("Invalid Password");
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config_default.jwtSecret,
    { expiresIn: "7d" }
  );
  return { user, token };
};
var getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { providerProfile: true }
  });
  if (!user) throw new Error("User not found");
  return user;
};
var userService = {
  register,
  login,
  getProfile
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

// src/modules/users/users.controller.ts
var register2 = async (req, res) => {
  try {
    const payload = req.body;
    const result = await userService.register(payload);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "Register successfull",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      secces: false,
      error: "Registration failed",
      details: error.message
    });
  }
};
var login2 = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      // localhost এ false, production এ true
      sameSite: "lax",
      // localhost এ lax works
      path: "/"
      // add this
    });
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "LogedIn successfull",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      seccess: false,
      error: "Login failed",
      details: error.message
    });
  }
};
var getProfile2 = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ success: true, message: "Profile fetched successfully", data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
var userController = {
  register: register2,
  login: login2,
  getProfile: getProfile2
};

// src/middleware/auth.ts
import jwt2 from "jsonwebtoken";
var auth = (...roles) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token required" });
    }
    const token = authHeader.startsWith("Bearer") ? authHeader.split(" ")[1] : authHeader;
    try {
      const decoded = jwt2.verify(token, config_default.jwtSecret);
      req.user = decoded;
      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email
        }
      });
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      if (userData?.status !== "ACTIVE") {
        throw new Error("Unauthorized!!");
      }
      next();
    } catch (errror) {
      return res.status(401).json({ message: errror.message });
    }
  };
};
var auth_default = auth;

// src/modules/users/users.route.ts
var router = Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", auth_default(), userController.getProfile);
var userRouter = router;

// src/modules/providers/provider.route.ts
import { Router as Router2 } from "express";

// src/modules/providers/provider.service.ts
var createProviderProfile = async (userId, restaurantName, address, phone) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (existingProfile) {
    throw new Error("PROVIDER_PROFILE_EXISTS");
  }
  return prisma.providerProfile.create({
    data: {
      userId,
      restaurantName,
      address,
      phone
    }
  });
};
var getMyProviderProfile = async (userId) => {
  return prisma.providerProfile.findUnique({
    where: { userId },
    include: {
      meals: true
    }
  });
};
var getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    select: {
      id: true,
      restaurantName: true,
      address: true,
      phone: true
    }
  });
};
var getProviderById = async (id) => {
  return prisma.providerProfile.findUnique({
    where: { id },
    include: {
      meals: true
    }
  });
};
var getProviderOrders = async (providerId) => {
  return prisma.order.findMany({
    where: { providerId },
    include: {
      items: {
        include: { meal: true }
      },
      customer: true
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateOrderStatus = async (orderId, providerId, status) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      providerId
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
  getMyProviderProfile,
  getAllProviders,
  getProviderById,
  getProviderOrders,
  updateOrderStatus
};

// src/modules/providers/provider.controller.ts
var createProfile = async (req, res) => {
  try {
    const { restaurantName, address, phone } = req.body;
    if (!restaurantName || !address) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const profile = await ProviderService.createProviderProfile(
      req.user.id,
      restaurantName,
      address,
      phone
    );
    return res.status(201).json({
      success: true,
      data: profile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create profile"
    });
  }
};
var getMyProfile = async (req, res) => {
  console.log("provider", req.user);
  const profile = await ProviderService.getMyProviderProfile(req.user.id);
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }
  res.json({ success: true, data: profile });
};
var getProviders = async (_req, res) => {
  const providers = await ProviderService.getAllProviders();
  res.json({ success: true, data: providers });
};
var getProvider = async (req, res) => {
  const provider = await ProviderService.getProviderById(
    req.params.id
  );
  if (!provider) {
    return res.status(404).json({ message: "Provider not found" });
  }
  res.json({ success: true, data: provider });
};
var getOrders = async (req, res) => {
  const profile = await ProviderService.getMyProviderProfile(req.user.id);
  console.log(profile);
  if (!profile) {
    return res.status(403).json({ message: "No provider profile" });
  }
  const orders = await ProviderService.getProviderOrders(profile.id);
  console.log(orders);
  res.json({ success: true, data: orders });
};
var updateOrderStatus2 = async (req, res) => {
  const { status } = req.body;
  const profile = await ProviderService.getMyProviderProfile(req.user.id);
  if (!profile) {
    return res.status(403).json({ message: "No provider profile" });
  }
  const result = await ProviderService.updateOrderStatus(
    req.params.id,
    profile.id,
    status
  );
  res.json({ success: true, data: result });
};
var ProviderController = {
  createProfile,
  getMyProfile,
  getProviders,
  getProvider,
  getOrders,
  updateOrderStatus: updateOrderStatus2
};

// src/modules/providers/provider.route.ts
var router2 = Router2();
router2.get("/providers", ProviderController.getProviders);
router2.get("/provider/:id", ProviderController.getProvider);
router2.post("/provider/profile", auth_default(Role.PROVIDER), ProviderController.createProfile);
router2.get("/providers/dashboard", auth_default(Role.PROVIDER), ProviderController.getMyProfile);
router2.get(
  "/providers/orders",
  auth_default(Role.PROVIDER),
  ProviderController.getOrders
);
router2.patch(
  "/provider/order/:id",
  auth_default(Role.PROVIDER),
  ProviderController.updateOrderStatus
);
var providerRouter = router2;

// src/modules/meals/meal.route.ts
import { Router as Router3 } from "express";

// src/modules/meals/meal.service.ts
var createMeal = async (data) => {
  return prisma.meal.create({ data });
};
var getMeals = async (categoryId) => {
  return prisma.meal.findMany({
    where: categoryId ? { categoryId } : {},
    include: {
      category: true,
      provider: {
        select: { restaurantName: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var getMealById = async (id) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: true,
      reviews: true
    }
  });
};
var updateMeal = async (mealId, data, userId) => {
  const mealsData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealId
    },
    select: {
      id: true
    }
  });
  const result = await prisma.meal.update({
    where: {
      id: mealsData.id
    },
    data: {
      ...data
    }
  });
  return result;
};
var deleteMeal = async (mealId, userId) => {
  const mealData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealId
    },
    select: {
      id: true,
      providerId: true
    }
  });
  if (!mealData) throw new Error("Meal not found");
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (mealData.providerId !== provider?.id) {
    throw new Error("Unauthorized delete");
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
    const { title, description, price, imageUrl, categoryId } = req.body;
    if (!title || !price || !categoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: req.user.id }
    });
    if (!providerProfile) {
      return res.status(403).json({ message: "Provider profile not found" });
    }
    const meal = await MealService.createMeal({
      title,
      description,
      price,
      imageUrl,
      categoryId,
      providerId: providerProfile.id
    });
    res.status(201).json({
      success: true,
      message: "mail create successfull",
      data: meal
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create meal",
      error: error.message
    });
  }
};
var getMeals2 = async (req, res) => {
  try {
    const meals = await MealService.getMeals(
      req.query.categoryId
    );
    res.json({ success: true, data: meals });
  } catch {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};
var getMeal = async (req, res) => {
  const meal = await MealService.getMealById(req.params.id);
  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }
  res.json({ success: true, data: meal });
};
var updateMeal2 = async (req, res) => {
  try {
    const mealId = req.params.id;
    const user = req.user;
    const result = await MealService.updateMeal(mealId, req.body, user?.id);
    res.status(200).json({
      success: true,
      message: "meal update successfull",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create meal",
      error: error.message
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const mealid = req.params.id;
    const userId = req.user.id;
    const result = await MealService.deleteMeal(mealid, userId);
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: req.user.id }
    });
    if (!provider) throw new Error("Provider not found");
    res.status(200).json({
      success: true,
      message: "meal delete successfull",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Meal delation failed",
      error: error.message
    });
  }
};
var MealController = {
  createMeal: createMeal2,
  getMeals: getMeals2,
  getMeal,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2
};

// src/modules/meals/meal.route.ts
var router3 = Router3();
router3.get("/meals", MealController.getMeals);
router3.get("/meal/:id", MealController.getMeal);
router3.post(
  "/provider/meals",
  auth_default(Role.PROVIDER),
  MealController.createMeal
);
router3.put(
  "/provider/meals/:id",
  auth_default(Role.PROVIDER),
  MealController.updateMeal
);
router3.delete(
  "/provider/meals/:id",
  auth_default(Role.PROVIDER),
  MealController.deleteMeal
);
var MealRouter = router3;

// src/modules/category/category.router.ts
import { Router as Router4 } from "express";

// src/modules/category/category.service.ts
var createCategory = async (name) => {
  console.log(name);
  return prisma.category.create({
    data: { name }
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
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const category = await createCategory(name);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Category already exists"
      });
    }
    res.status(500).json({ message: "Failed to create category" });
  }
};
var getCategories = async (_req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

// src/modules/category/category.router.ts
var router4 = Router4();
router4.post(
  "/admin/categories",
  auth_default(Role.ADMIN),
  createCategory2
);
router4.get("/categories", getCategories);
var categoryRoutes = router4;

// src/modules/orders/order.router.ts
import { Router as Router5 } from "express";

// src/modules/orders/order.service.ts
var addToCart = async (customerId, mealId) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
    select: { id: true, price: true, providerId: true }
  });
  if (!meal) throw new Error("Meal not found");
  let cart = await prisma.cart.findFirst({
    where: { customerId },
    include: { items: true }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
      include: { items: true }
    });
  }
  if (cart.items.length > 0) {
    const existingProvider = cart.items[0]?.providerId;
    if (existingProvider !== meal.providerId) {
      throw new Error("You can order from only one provider at a time");
    }
  }
  let quantity = 1;
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      mealId
    }
  });
  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  }
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      providerId: meal.providerId,
      quantity,
      priceAtAddTime: meal.price
    }
  });
};
var getMyCart = async (customerId) => {
  const cart = await prisma.cart.findFirst({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: true
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
    throw new Error("Quantity must be integer");
  }
  const item = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        customerId
      }
    }
  });
  if (!item) {
    throw new Error("Cart item not found");
  }
  if (quantity < 1) {
    return prisma.cartItem.delete({
      where: { id: cartItemId }
    });
  }
  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity }
  });
};
var createOrder = async (customerId, address) => {
  const cart = await prisma.cart.findFirst({
    where: { customerId },
    include: {
      items: {
        include: { meal: true }
      }
    }
  });
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  const providerId = cart.items[0].meal.providerId;
  let totalPrice = 0;
  const orderItems = cart.items.map((item) => {
    const price = item.meal.price * item.quantity;
    totalPrice += price;
    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.meal.price
    };
  });
  const order = await prisma.order.create({
    data: {
      customerId,
      providerId,
      address,
      totalPrice,
      items: {
        create: orderItems
      }
    },
    include: {
      items: { include: { meal: true } }
    }
  });
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id }
  });
  return order;
};
var getCustomerOrders = async (customerId) => {
  console.log(customerId);
  return prisma.order.findMany({
    where: { customerId },
    include: {
      items: { include: { meal: true } },
      provider: true
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
      items: { include: { meal: true } },
      provider: true
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};
var OrderServices = {
  addToCart,
  getMyCart,
  updateQuantity,
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
    res.status(200).json({
      success: true,
      message: "Added to cart",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getMyCart2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const cart = await OrderServices.getMyCart(customerId);
    res.status(200).json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var updateQuantity2 = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const customerId = req.user.id;
    const result = await OrderServices.updateQuantity(
      customerId,
      cartItemId,
      quantity
    );
    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var createOrder2 = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required"
      });
    }
    const order = await OrderServices.createOrder(customerId, address);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create order"
    });
  }
};
var getMyOrders = async (req, res) => {
  try {
    const orders = await OrderServices.getCustomerOrders(req.user.id);
    res.json({
      success: true,
      data: orders
    });
  } catch {
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const order = await OrderServices.getOrderById(
      req.user.id,
      req.params.id
    );
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || "Order not found"
    });
  }
};
var OrderController = {
  addToCart: addToCart2,
  getMyCart: getMyCart2,
  updateQuantity: updateQuantity2,
  createOrder: createOrder2,
  getMyOrders,
  getOrderById: getOrderById2
};

// src/modules/orders/order.router.ts
var router5 = Router5();
router5.post("/addtocart", auth_default(Role.CUSTOMER), OrderController.addToCart);
router5.get("/mycart", auth_default(Role.CUSTOMER), OrderController.getMyCart);
router5.patch("/cart/:id", auth_default(Role.CUSTOMER), OrderController.updateQuantity);
router5.post("/orders", auth_default(Role.CUSTOMER), OrderController.createOrder);
router5.get("/orders", auth_default(Role.CUSTOMER), OrderController.getMyOrders);
router5.get("/order/:id", auth_default(Role.CUSTOMER), OrderController.getOrderById);
var orderRoutes = router5;

// src/modules/admin/admin.router.ts
import { Router as Router6 } from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateUserStatus = async (userId, status) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  return prisma.user.update({
    where: { id: userId },
    data: { status }
  });
};
var getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      provider: true,
      items: {
        include: { meal: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json({ success: true, data: users });
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
var updateUserStatus2 = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }
    const user = await AdminService.updateUserStatus(id, status);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update user status"
    });
  }
};
var getAllOrders2 = async (req, res) => {
  try {
    const orders = await AdminService.getAllOrders();
    res.json({ success: true, data: orders });
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
var AdminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  getAllOrders: getAllOrders2
};

// src/modules/admin/admin.router.ts
var router6 = Router6();
router6.get("/users", auth_default(Role.ADMIN), AdminController.getAllUsers);
router6.patch(
  "/user/:id",
  auth_default(Role.ADMIN),
  AdminController.updateUserStatus
);
router6.get("/orders", auth_default(Role.ADMIN), AdminController.getAllOrders);
var adminRouter = router6;

// src/modules/review/review.route.ts
import { Router as Router7 } from "express";

// src/modules/review/review.service.ts
var createReview = async (userId, mealId, rating, comment) => {
  const ordered = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: { customerId: userId }
    }
  });
  if (!ordered) {
    throw new Error("You can only review meals you ordered");
  }
  return prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment: comment ?? null
    }
  });
};
var ReviewService = {
  createReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const { mealId, rating, comment } = req.body;
    const review = await ReviewService.createReview(
      userId,
      mealId,
      rating,
      comment
    );
    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var ReviewController = {
  createReview: createReview2
};

// src/modules/review/review.route.ts
var router7 = Router7();
router7.post("/review", auth_default(Role.CUSTOMER), ReviewController.createReview);
var reviewRoutes = router7;

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

// src/app.ts
var app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://foodhub-client-six.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());
app.use("/api/auth", userRouter);
app.use("/api", providerRouter);
app.use("/api", MealRouter);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api", reviewRoutes);
app.use("/api/admin", adminRouter);
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
