
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_express7 = __toESM(require("express"), 1);

// src/modules/booking/booking.router.ts
var import_express = __toESM(require("express"), 1);

// src/generated/client.ts
var path = __toESM(require("path"), 1);
var import_node_url = require("url");

// src/generated/internal/class.ts
var runtime = __toESM(require("@prisma/client/runtime/client"), 1);
var config = {
  "previewFeatures": [],
  "clientVersion": "7.5.0",
  "engineVersion": "280c870be64f457428992c43c1f6d557fab6e29e",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum UserStatus {\n  ACTIVE\n  BANNED\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n\n  tutorProfile      TutorProfile?\n  bookingsAsStudent Booking[]     @relation("StudentBookings")\n  reviewsGiven      Review[]\n\n  role   String? @default("STUDENT")\n  phone  String?\n  status String? @default("ACTIVE")\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Availability {\n  id        String  @id @default(uuid())\n  tutorId   String\n  dayOfWeek Int // 0 = Sunday, 6 = Saturday\n  startTime String // "19:00"\n  endTime   String // "22:00"\n  isActive  Boolean @default(true)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tutor TutorProfile @relation(fields: [tutorId], references: [id])\n}\n\nenum BookingStatus {\n  BOOKED\n  COMPLETED\n  CANCELLED\n}\n\nmodel Booking {\n  id        String @id @default(uuid())\n  studentId String\n  tutorId   String\n\n  date      DateTime\n  startTime String\n  endTime   String\n  duration  Int // minutes\n  status    BookingStatus @default(BOOKED)\n\n  student User         @relation("StudentBookings", fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n  review  Review?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Category {\n  id   String @id @default(uuid())\n  name String @unique // "Physics", "Math", "Chemistry"\n\n  // \u098F\u0987 \u09AB\u09BF\u09B2\u09CD\u09A1\u099F\u09BF \u099F\u09BF\u0989\u099F\u09B0\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u0995\u09BE\u09A8\u09C7\u0995\u09CD\u099F \u0995\u09B0\u09AC\u09C7\n  tutorProfiles TutorProfile[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nmodel Review {\n  id      String @id @default(uuid())\n  rating  Int\n  comment String\n\n  tutorId   String\n  studentId String\n  bookingId String @unique\n\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id])\n  student User         @relation(fields: [studentId], references: [id])\n  booking Booking      @relation(fields: [bookingId], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  // output   = "../../generated/prisma"\n  output   = "../../src/generated"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel TutorProfile {\n  id     String @id @default(uuid())\n  userId String @unique\n\n  bio        String\n  hourlyFee  Float // Tuition fee per hour\n  monthlyFee Float? // Optional monthly fee\n  experience Int // years\n  rating     Float  @default(0)\n\n  user         User           @relation(fields: [userId], references: [id])\n  categories   Category[]\n  availability Availability[]\n  bookings     Booking[]\n  reviews      Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"bookingsAsStudent","kind":"object","type":"Booking","relationName":"StudentBookings"},{"name":"reviewsGiven","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Availability":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"dayOfWeek","kind":"scalar","type":"Int"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"AvailabilityToTutorProfile"}],"dbName":null},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"DateTime"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"duration","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"student","kind":"object","type":"User","relationName":"StudentBookings"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"tutorProfiles","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourlyFee","kind":"scalar","type":"Float"},{"name":"monthlyFee","kind":"scalar","type":"Float"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"rating","kind":"scalar","type":"Float"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categories","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"availability","kind":"object","type":"Availability","relationName":"AvailabilityToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","sessions","accounts","tutorProfiles","_count","categories","tutor","availability","student","booking","review","bookings","reviews","tutorProfile","bookingsAsStudent","reviewsGiven","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","Availability.findUnique","Availability.findUniqueOrThrow","Availability.findFirst","Availability.findFirstOrThrow","Availability.findMany","Availability.createOne","Availability.createMany","Availability.createManyAndReturn","Availability.updateOne","Availability.updateMany","Availability.updateManyAndReturn","Availability.upsertOne","Availability.deleteOne","Availability.deleteMany","_avg","_sum","Availability.groupBy","Availability.aggregate","Booking.findUnique","Booking.findUniqueOrThrow","Booking.findFirst","Booking.findFirstOrThrow","Booking.findMany","Booking.createOne","Booking.createMany","Booking.createManyAndReturn","Booking.updateOne","Booking.updateMany","Booking.updateManyAndReturn","Booking.upsertOne","Booking.deleteOne","Booking.deleteMany","Booking.groupBy","Booking.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","TutorProfile.findUnique","TutorProfile.findUniqueOrThrow","TutorProfile.findFirst","TutorProfile.findFirstOrThrow","TutorProfile.findMany","TutorProfile.createOne","TutorProfile.createMany","TutorProfile.createManyAndReturn","TutorProfile.updateOne","TutorProfile.updateMany","TutorProfile.updateManyAndReturn","TutorProfile.upsertOne","TutorProfile.deleteOne","TutorProfile.deleteMany","TutorProfile.groupBy","TutorProfile.aggregate","AND","OR","NOT","id","userId","bio","hourlyFee","monthlyFee","experience","rating","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","comment","tutorId","studentId","bookingId","name","date","startTime","endTime","duration","BookingStatus","status","dayOfWeek","isActive","identifier","value","expiresAt","accountId","providerId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","email","emailVerified","image","role","phone","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "ugRUkAESBAAAoQIAIAUAAKICACAQAACjAgAgEQAApAIAIBIAAKUCACCrAQAAngIAMKwBAAAtABCtAQAAngIAMK4BAQAAAAG1AUAAlAIAIbYBQACUAgAhxgEBAJMCACHMAQEAoAIAId4BAQAAAAHfASAAnwIAIeABAQCgAgAh4QEBAKACACHiAQEAoAIAIQEAAAABACAMAwAAqQIAIKsBAAC4AgAwrAEAAAMAEK0BAAC4AgAwrgEBAJMCACGvAQEAkwIAIbUBQACUAgAhtgFAAJQCACHRAUAAlAIAIdsBAQCTAgAh3AEBAKACACHdAQEAoAIAIQMDAACBBAAg3AEAALkCACDdAQAAuQIAIAwDAACpAgAgqwEAALgCADCsAQAAAwAQrQEAALgCADCuAQEAAAABrwEBAJMCACG1AUAAlAIAIbYBQACUAgAh0QFAAJQCACHbAQEAAAAB3AEBAKACACHdAQEAoAIAIQMAAAADACABAAAEADACAAAFACARAwAAqQIAIKsBAAC2AgAwrAEAAAcAEK0BAAC2AgAwrgEBAJMCACGvAQEAkwIAIbUBQACUAgAhtgFAAJQCACHSAQEAkwIAIdMBAQCTAgAh1AEBAKACACHVAQEAoAIAIdYBAQCgAgAh1wFAALcCACHYAUAAtwIAIdkBAQCgAgAh2gEBAKACACEIAwAAgQQAINQBAAC5AgAg1QEAALkCACDWAQAAuQIAINcBAAC5AgAg2AEAALkCACDZAQAAuQIAINoBAAC5AgAgEQMAAKkCACCrAQAAtgIAMKwBAAAHABCtAQAAtgIAMK4BAQAAAAGvAQEAkwIAIbUBQACUAgAhtgFAAJQCACHSAQEAkwIAIdMBAQCTAgAh1AEBAKACACHVAQEAoAIAIdYBAQCgAgAh1wFAALcCACHYAUAAtwIAIdkBAQCgAgAh2gEBAKACACEDAAAABwAgAQAACAAwAgAACQAgEQMAAKkCACAIAACyAgAgCgAAswIAIA4AAKQCACAPAAClAgAgqwEAAK8CADCsAQAACwAQrQEAAK8CADCuAQEAkwIAIa8BAQCTAgAhsAEBAJMCACGxAQgAsAIAIbIBCACxAgAhswECAKcCACG0AQgAsAIAIbUBQACUAgAhtgFAAJQCACEBAAAACwAgCAYAALUCACCrAQAAtAIAMKwBAAANABCtAQAAtAIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIcYBAQCTAgAhAQYAAIYEACAIBgAAtQIAIKsBAAC0AgAwrAEAAA0AEK0BAAC0AgAwrgEBAAAAAbUBQACUAgAhtgFAAJQCACHGAQEAAAABAwAAAA0AIAEAAA4AMAIAAA8AIAYDAACBBAAgCAAAhAQAIAoAAIUEACAOAAD_AwAgDwAAgAQAILIBAAC5AgAgEQMAAKkCACAIAACyAgAgCgAAswIAIA4AAKQCACAPAAClAgAgqwEAAK8CADCsAQAACwAQrQEAAK8CADCuAQEAAAABrwEBAAAAAbABAQCTAgAhsQEIALACACGyAQgAsQIAIbMBAgCnAgAhtAEIALACACG1AUAAlAIAIbYBQACUAgAhAwAAAAsAIAEAABEAMAIAABIAIAEAAAALACAMCQAAqAIAIKsBAACuAgAwrAEAABUAEK0BAACuAgAwrgEBAJMCACG1AUAAlAIAIbYBQACUAgAhwwEBAJMCACHIAQEAkwIAIckBAQCTAgAhzQECAKcCACHOASAAnwIAIQEJAAD-AwAgDAkAAKgCACCrAQAArgIAMKwBAAAVABCtAQAArgIAMK4BAQAAAAG1AUAAlAIAIbYBQACUAgAhwwEBAJMCACHIAQEAkwIAIckBAQCTAgAhzQECAKcCACHOASAAnwIAIQMAAAAVACABAAAWADACAAAXACAQCQAAqAIAIAsAAKkCACANAACtAgAgqwEAAKsCADCsAQAAGQAQrQEAAKsCADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHDAQEAkwIAIcQBAQCTAgAhxwFAAJQCACHIAQEAkwIAIckBAQCTAgAhygECAKcCACHMAQAArALMASIDCQAA_gMAIAsAAIEEACANAACDBAAgEAkAAKgCACALAACpAgAgDQAArQIAIKsBAACrAgAwrAEAABkAEK0BAACrAgAwrgEBAAAAAbUBQACUAgAhtgFAAJQCACHDAQEAkwIAIcQBAQCTAgAhxwFAAJQCACHIAQEAkwIAIckBAQCTAgAhygECAKcCACHMAQAArALMASIDAAAAGQAgAQAAGgAwAgAAGwAgDgkAAKgCACALAACpAgAgDAAAqgIAIKsBAACmAgAwrAEAAB0AEK0BAACmAgAwrgEBAJMCACG0AQIApwIAIbUBQACUAgAhtgFAAJQCACHCAQEAkwIAIcMBAQCTAgAhxAEBAJMCACHFAQEAkwIAIQEAAAAdACADCQAA_gMAIAsAAIEEACAMAACCBAAgDgkAAKgCACALAACpAgAgDAAAqgIAIKsBAACmAgAwrAEAAB0AEK0BAACmAgAwrgEBAAAAAbQBAgCnAgAhtQFAAJQCACG2AUAAlAIAIcIBAQCTAgAhwwEBAJMCACHEAQEAkwIAIcUBAQAAAAEDAAAAHQAgAQAAHwAwAgAAIAAgAQAAAA0AIAEAAAAVACABAAAAGQAgAQAAAB0AIAMAAAAZACABAAAaADACAAAbACADAAAAHQAgAQAAHwAwAgAAIAAgAQAAAAMAIAEAAAAHACABAAAAGQAgAQAAAB0AIAEAAAABACASBAAAoQIAIAUAAKICACAQAACjAgAgEQAApAIAIBIAAKUCACCrAQAAngIAMKwBAAAtABCtAQAAngIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIcYBAQCTAgAhzAEBAKACACHeAQEAkwIAId8BIACfAgAh4AEBAKACACHhAQEAoAIAIeIBAQCgAgAhCQQAAPwDACAFAAD9AwAgEAAA_gMAIBEAAP8DACASAACABAAgzAEAALkCACDgAQAAuQIAIOEBAAC5AgAg4gEAALkCACADAAAALQAgAQAALgAwAgAAAQAgAwAAAC0AIAEAAC4AMAIAAAEAIAMAAAAtACABAAAuADACAAABACAPBAAA9wMAIAUAAPgDACAQAAD5AwAgEQAA-gMAIBIAAPsDACCuAQEAAAABtQFAAAAAAbYBQAAAAAHGAQEAAAABzAEBAAAAAd4BAQAAAAHfASAAAAAB4AEBAAAAAeEBAQAAAAHiAQEAAAABARgAADIAIAquAQEAAAABtQFAAAAAAbYBQAAAAAHGAQEAAAABzAEBAAAAAd4BAQAAAAHfASAAAAAB4AEBAAAAAeEBAQAAAAHiAQEAAAABARgAADQAMAEYAAA0ADAPBAAAwwMAIAUAAMQDACAQAADFAwAgEQAAxgMAIBIAAMcDACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIcwBAQC3AwAh3gEBAL8CACHfASAA-wIAIeABAQC3AwAh4QEBALcDACHiAQEAtwMAIQIAAAABACAYAAA3ACAKrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxgEBAL8CACHMAQEAtwMAId4BAQC_AgAh3wEgAPsCACHgAQEAtwMAIeEBAQC3AwAh4gEBALcDACECAAAALQAgGAAAOQAgAgAAAC0AIBgAADkAIAMAAAABACAfAAAyACAgAAA3ACABAAAAAQAgAQAAAC0AIAcHAADAAwAgJQAAwgMAICYAAMEDACDMAQAAuQIAIOABAAC5AgAg4QEAALkCACDiAQAAuQIAIA2rAQAAnQIAMKwBAABAABCtAQAAnQIAMK4BAQD3AQAhtQFAAPsBACG2AUAA-wEAIcYBAQD3AQAhzAEBAJYCACHeAQEA9wEAId8BIACOAgAh4AEBAJYCACHhAQEAlgIAIeIBAQCWAgAhAwAAAC0AIAEAAD8AMCQAAEAAIAMAAAAtACABAAAuADACAAABACABAAAABQAgAQAAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAkDAAC_AwAgrgEBAAAAAa8BAQAAAAG1AUAAAAABtgFAAAAAAdEBQAAAAAHbAQEAAAAB3AEBAAAAAd0BAQAAAAEBGAAASAAgCK4BAQAAAAGvAQEAAAABtQFAAAAAAbYBQAAAAAHRAUAAAAAB2wEBAAAAAdwBAQAAAAHdAQEAAAABARgAAEoAMAEYAABKADAJAwAAvgMAIK4BAQC_AgAhrwEBAL8CACG1AUAAwwIAIbYBQADDAgAh0QFAAMMCACHbAQEAvwIAIdwBAQC3AwAh3QEBALcDACECAAAABQAgGAAATQAgCK4BAQC_AgAhrwEBAL8CACG1AUAAwwIAIbYBQADDAgAh0QFAAMMCACHbAQEAvwIAIdwBAQC3AwAh3QEBALcDACECAAAAAwAgGAAATwAgAgAAAAMAIBgAAE8AIAMAAAAFACAfAABIACAgAABNACABAAAABQAgAQAAAAMAIAUHAAC7AwAgJQAAvQMAICYAALwDACDcAQAAuQIAIN0BAAC5AgAgC6sBAACcAgAwrAEAAFYAEK0BAACcAgAwrgEBAPcBACGvAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHRAUAA-wEAIdsBAQD3AQAh3AEBAJYCACHdAQEAlgIAIQMAAAADACABAABVADAkAABWACADAAAAAwAgAQAABAAwAgAABQAgAQAAAAkAIAEAAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAMAAAAHACABAAAIADACAAAJACAOAwAAugMAIK4BAQAAAAGvAQEAAAABtQFAAAAAAbYBQAAAAAHSAQEAAAAB0wEBAAAAAdQBAQAAAAHVAQEAAAAB1gEBAAAAAdcBQAAAAAHYAUAAAAAB2QEBAAAAAdoBAQAAAAEBGAAAXgAgDa4BAQAAAAGvAQEAAAABtQFAAAAAAbYBQAAAAAHSAQEAAAAB0wEBAAAAAdQBAQAAAAHVAQEAAAAB1gEBAAAAAdcBQAAAAAHYAUAAAAAB2QEBAAAAAdoBAQAAAAEBGAAAYAAwARgAAGAAMA4DAAC5AwAgrgEBAL8CACGvAQEAvwIAIbUBQADDAgAhtgFAAMMCACHSAQEAvwIAIdMBAQC_AgAh1AEBALcDACHVAQEAtwMAIdYBAQC3AwAh1wFAALgDACHYAUAAuAMAIdkBAQC3AwAh2gEBALcDACECAAAACQAgGAAAYwAgDa4BAQC_AgAhrwEBAL8CACG1AUAAwwIAIbYBQADDAgAh0gEBAL8CACHTAQEAvwIAIdQBAQC3AwAh1QEBALcDACHWAQEAtwMAIdcBQAC4AwAh2AFAALgDACHZAQEAtwMAIdoBAQC3AwAhAgAAAAcAIBgAAGUAIAIAAAAHACAYAABlACADAAAACQAgHwAAXgAgIAAAYwAgAQAAAAkAIAEAAAAHACAKBwAAtAMAICUAALYDACAmAAC1AwAg1AEAALkCACDVAQAAuQIAINYBAAC5AgAg1wEAALkCACDYAQAAuQIAINkBAAC5AgAg2gEAALkCACAQqwEAAJUCADCsAQAAbAAQrQEAAJUCADCuAQEA9wEAIa8BAQD3AQAhtQFAAPsBACG2AUAA-wEAIdIBAQD3AQAh0wEBAPcBACHUAQEAlgIAIdUBAQCWAgAh1gEBAJYCACHXAUAAlwIAIdgBQACXAgAh2QEBAJYCACHaAQEAlgIAIQMAAAAHACABAABrADAkAABsACADAAAABwAgAQAACAAwAgAACQAgCasBAACSAgAwrAEAAHIAEK0BAACSAgAwrgEBAAAAAbUBQACUAgAhtgFAAJQCACHPAQEAkwIAIdABAQCTAgAh0QFAAJQCACEBAAAAbwAgAQAAAG8AIAmrAQAAkgIAMKwBAAByABCtAQAAkgIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIc8BAQCTAgAh0AEBAJMCACHRAUAAlAIAIQADAAAAcgAgAQAAcwAwAgAAbwAgAwAAAHIAIAEAAHMAMAIAAG8AIAMAAAByACABAABzADACAABvACAGrgEBAAAAAbUBQAAAAAG2AUAAAAABzwEBAAAAAdABAQAAAAHRAUAAAAABARgAAHcAIAauAQEAAAABtQFAAAAAAbYBQAAAAAHPAQEAAAAB0AEBAAAAAdEBQAAAAAEBGAAAeQAwARgAAHkAMAauAQEAvwIAIbUBQADDAgAhtgFAAMMCACHPAQEAvwIAIdABAQC_AgAh0QFAAMMCACECAAAAbwAgGAAAfAAgBq4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIc8BAQC_AgAh0AEBAL8CACHRAUAAwwIAIQIAAAByACAYAAB-ACACAAAAcgAgGAAAfgAgAwAAAG8AIB8AAHcAICAAAHwAIAEAAABvACABAAAAcgAgAwcAALEDACAlAACzAwAgJgAAsgMAIAmrAQAAkQIAMKwBAACFAQAQrQEAAJECADCuAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHPAQEA9wEAIdABAQD3AQAh0QFAAPsBACEDAAAAcgAgAQAAhAEAMCQAAIUBACADAAAAcgAgAQAAcwAwAgAAbwAgAQAAABcAIAEAAAAXACADAAAAFQAgAQAAFgAwAgAAFwAgAwAAABUAIAEAABYAMAIAABcAIAMAAAAVACABAAAWADACAAAXACAJCQAAsAMAIK4BAQAAAAG1AUAAAAABtgFAAAAAAcMBAQAAAAHIAQEAAAAByQEBAAAAAc0BAgAAAAHOASAAAAABARgAAI0BACAIrgEBAAAAAbUBQAAAAAG2AUAAAAABwwEBAAAAAcgBAQAAAAHJAQEAAAABzQECAAAAAc4BIAAAAAEBGAAAjwEAMAEYAACPAQAwCQkAAK8DACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHDAQEAvwIAIcgBAQC_AgAhyQEBAL8CACHNAQIAwgIAIc4BIAD7AgAhAgAAABcAIBgAAJIBACAIrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhwwEBAL8CACHIAQEAvwIAIckBAQC_AgAhzQECAMICACHOASAA-wIAIQIAAAAVACAYAACUAQAgAgAAABUAIBgAAJQBACADAAAAFwAgHwAAjQEAICAAAJIBACABAAAAFwAgAQAAABUAIAUHAACqAwAgJQAArQMAICYAAKwDACBnAACrAwAgaAAArgMAIAurAQAAjQIAMKwBAACbAQAQrQEAAI0CADCuAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHDAQEA9wEAIcgBAQD3AQAhyQEBAPcBACHNAQIA-gEAIc4BIACOAgAhAwAAABUAIAEAAJoBADAkAACbAQAgAwAAABUAIAEAABYAMAIAABcAIAEAAAAbACABAAAAGwAgAwAAABkAIAEAABoAMAIAABsAIAMAAAAZACABAAAaADACAAAbACADAAAAGQAgAQAAGgAwAgAAGwAgDQkAAKkDACALAADvAgAgDQAA8AIAIK4BAQAAAAG1AUAAAAABtgFAAAAAAcMBAQAAAAHEAQEAAAABxwFAAAAAAcgBAQAAAAHJAQEAAAABygECAAAAAcwBAAAAzAECARgAAKMBACAKrgEBAAAAAbUBQAAAAAG2AUAAAAABwwEBAAAAAcQBAQAAAAHHAUAAAAAByAEBAAAAAckBAQAAAAHKAQIAAAABzAEAAADMAQIBGAAApQEAMAEYAAClAQAwDQkAAKgDACALAADlAgAgDQAA5gIAIK4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIcMBAQC_AgAhxAEBAL8CACHHAUAAwwIAIcgBAQC_AgAhyQEBAL8CACHKAQIAwgIAIcwBAADjAswBIgIAAAAbACAYAACoAQAgCq4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIcMBAQC_AgAhxAEBAL8CACHHAUAAwwIAIcgBAQC_AgAhyQEBAL8CACHKAQIAwgIAIcwBAADjAswBIgIAAAAZACAYAACqAQAgAgAAABkAIBgAAKoBACADAAAAGwAgHwAAowEAICAAAKgBACABAAAAGwAgAQAAABkAIAUHAACjAwAgJQAApgMAICYAAKUDACBnAACkAwAgaAAApwMAIA2rAQAAiQIAMKwBAACxAQAQrQEAAIkCADCuAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHDAQEA9wEAIcQBAQD3AQAhxwFAAPsBACHIAQEA9wEAIckBAQD3AQAhygECAPoBACHMAQAAigLMASIDAAAAGQAgAQAAsAEAMCQAALEBACADAAAAGQAgAQAAGgAwAgAAGwAgAQAAAA8AIAEAAAAPACADAAAADQAgAQAADgAwAgAADwAgAwAAAA0AIAEAAA4AMAIAAA8AIAMAAAANACABAAAOADACAAAPACAFBgAAogMAIK4BAQAAAAG1AUAAAAABtgFAAAAAAcYBAQAAAAEBGAAAuQEAIASuAQEAAAABtQFAAAAAAbYBQAAAAAHGAQEAAAABARgAALsBADABGAAAuwEAMAUGAACWAwAgrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxgEBAL8CACECAAAADwAgGAAAvgEAIASuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIQIAAAANACAYAADAAQAgAgAAAA0AIBgAAMABACADAAAADwAgHwAAuQEAICAAAL4BACABAAAADwAgAQAAAA0AIAMHAACTAwAgJQAAlQMAICYAAJQDACAHqwEAAIgCADCsAQAAxwEAEK0BAACIAgAwrgEBAPcBACG1AUAA-wEAIbYBQAD7AQAhxgEBAPcBACEDAAAADQAgAQAAxgEAMCQAAMcBACADAAAADQAgAQAADgAwAgAADwAgAQAAACAAIAEAAAAgACADAAAAHQAgAQAAHwAwAgAAIAAgAwAAAB0AIAEAAB8AMAIAACAAIAMAAAAdACABAAAfADACAAAgACALCQAA7QIAIAsAANcCACAMAADYAgAgrgEBAAAAAbQBAgAAAAG1AUAAAAABtgFAAAAAAcIBAQAAAAHDAQEAAAABxAEBAAAAAcUBAQAAAAEBGAAAzwEAIAiuAQEAAAABtAECAAAAAbUBQAAAAAG2AUAAAAABwgEBAAAAAcMBAQAAAAHEAQEAAAABxQEBAAAAAQEYAADRAQAwARgAANEBADALCQAA7AIAIAsAANQCACAMAADVAgAgrgEBAL8CACG0AQIAwgIAIbUBQADDAgAhtgFAAMMCACHCAQEAvwIAIcMBAQC_AgAhxAEBAL8CACHFAQEAvwIAIQIAAAAgACAYAADUAQAgCK4BAQC_AgAhtAECAMICACG1AUAAwwIAIbYBQADDAgAhwgEBAL8CACHDAQEAvwIAIcQBAQC_AgAhxQEBAL8CACECAAAAHQAgGAAA1gEAIAIAAAAdACAYAADWAQAgAwAAACAAIB8AAM8BACAgAADUAQAgAQAAACAAIAEAAAAdACAFBwAAjgMAICUAAJEDACAmAACQAwAgZwAAjwMAIGgAAJIDACALqwEAAIcCADCsAQAA3QEAEK0BAACHAgAwrgEBAPcBACG0AQIA-gEAIbUBQAD7AQAhtgFAAPsBACHCAQEA9wEAIcMBAQD3AQAhxAEBAPcBACHFAQEA9wEAIQMAAAAdACABAADcAQAwJAAA3QEAIAMAAAAdACABAAAfADACAAAgACABAAAAEgAgAQAAABIAIAMAAAALACABAAARADACAAASACADAAAACwAgAQAAEQAwAgAAEgAgAwAAAAsAIAEAABEAMAIAABIAIA4DAACJAwAgCAAAigMAIAoAAIsDACAOAACMAwAgDwAAjQMAIK4BAQAAAAGvAQEAAAABsAEBAAAAAbEBCAAAAAGyAQgAAAABswECAAAAAbQBCAAAAAG1AUAAAAABtgFAAAAAAQEYAADlAQAgCa4BAQAAAAGvAQEAAAABsAEBAAAAAbEBCAAAAAGyAQgAAAABswECAAAAAbQBCAAAAAG1AUAAAAABtgFAAAAAAQEYAADnAQAwARgAAOcBADAOAwAAxAIAIAgAAMUCACAKAADGAgAgDgAAxwIAIA8AAMgCACCuAQEAvwIAIa8BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACECAAAAEgAgGAAA6gEAIAmuAQEAvwIAIa8BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACECAAAACwAgGAAA7AEAIAIAAAALACAYAADsAQAgAwAAABIAIB8AAOUBACAgAADqAQAgAQAAABIAIAEAAAALACAGBwAAugIAICUAAL0CACAmAAC8AgAgZwAAuwIAIGgAAL4CACCyAQAAuQIAIAyrAQAA9gEAMKwBAADzAQAQrQEAAPYBADCuAQEA9wEAIa8BAQD3AQAhsAEBAPcBACGxAQgA-AEAIbIBCAD5AQAhswECAPoBACG0AQgA-AEAIbUBQAD7AQAhtgFAAPsBACEDAAAACwAgAQAA8gEAMCQAAPMBACADAAAACwAgAQAAEQAwAgAAEgAgDKsBAAD2AQAwrAEAAPMBABCtAQAA9gEAMK4BAQD3AQAhrwEBAPcBACGwAQEA9wEAIbEBCAD4AQAhsgEIAPkBACGzAQIA-gEAIbQBCAD4AQAhtQFAAPsBACG2AUAA-wEAIQ4HAAD9AQAgJQAAhgIAICYAAIYCACC3AQEAAAABuAEBAAAABLkBAQAAAAS6AQEAAAABuwEBAAAAAbwBAQAAAAG9AQEAAAABvgEBAIUCACG_AQEAAAABwAEBAAAAAcEBAQAAAAENBwAA_QEAICUAAIACACAmAACAAgAgZwAAgAIAIGgAAIACACC3AQgAAAABuAEIAAAABLkBCAAAAAS6AQgAAAABuwEIAAAAAbwBCAAAAAG9AQgAAAABvgEIAIQCACENBwAAggIAICUAAIMCACAmAACDAgAgZwAAgwIAIGgAAIMCACC3AQgAAAABuAEIAAAABbkBCAAAAAW6AQgAAAABuwEIAAAAAbwBCAAAAAG9AQgAAAABvgEIAIECACENBwAA_QEAICUAAP0BACAmAAD9AQAgZwAAgAIAIGgAAP0BACC3AQIAAAABuAECAAAABLkBAgAAAAS6AQIAAAABuwECAAAAAbwBAgAAAAG9AQIAAAABvgECAP8BACELBwAA_QEAICUAAP4BACAmAAD-AQAgtwFAAAAAAbgBQAAAAAS5AUAAAAAEugFAAAAAAbsBQAAAAAG8AUAAAAABvQFAAAAAAb4BQAD8AQAhCwcAAP0BACAlAAD-AQAgJgAA_gEAILcBQAAAAAG4AUAAAAAEuQFAAAAABLoBQAAAAAG7AUAAAAABvAFAAAAAAb0BQAAAAAG-AUAA_AEAIQi3AQIAAAABuAECAAAABLkBAgAAAAS6AQIAAAABuwECAAAAAbwBAgAAAAG9AQIAAAABvgECAP0BACEItwFAAAAAAbgBQAAAAAS5AUAAAAAEugFAAAAAAbsBQAAAAAG8AUAAAAABvQFAAAAAAb4BQAD-AQAhDQcAAP0BACAlAAD9AQAgJgAA_QEAIGcAAIACACBoAAD9AQAgtwECAAAAAbgBAgAAAAS5AQIAAAAEugECAAAAAbsBAgAAAAG8AQIAAAABvQECAAAAAb4BAgD_AQAhCLcBCAAAAAG4AQgAAAAEuQEIAAAABLoBCAAAAAG7AQgAAAABvAEIAAAAAb0BCAAAAAG-AQgAgAIAIQ0HAACCAgAgJQAAgwIAICYAAIMCACBnAACDAgAgaAAAgwIAILcBCAAAAAG4AQgAAAAFuQEIAAAABboBCAAAAAG7AQgAAAABvAEIAAAAAb0BCAAAAAG-AQgAgQIAIQi3AQIAAAABuAECAAAABbkBAgAAAAW6AQIAAAABuwECAAAAAbwBAgAAAAG9AQIAAAABvgECAIICACEItwEIAAAAAbgBCAAAAAW5AQgAAAAFugEIAAAAAbsBCAAAAAG8AQgAAAABvQEIAAAAAb4BCACDAgAhDQcAAP0BACAlAACAAgAgJgAAgAIAIGcAAIACACBoAACAAgAgtwEIAAAAAbgBCAAAAAS5AQgAAAAEugEIAAAAAbsBCAAAAAG8AQgAAAABvQEIAAAAAb4BCACEAgAhDgcAAP0BACAlAACGAgAgJgAAhgIAILcBAQAAAAG4AQEAAAAEuQEBAAAABLoBAQAAAAG7AQEAAAABvAEBAAAAAb0BAQAAAAG-AQEAhQIAIb8BAQAAAAHAAQEAAAABwQEBAAAAAQu3AQEAAAABuAEBAAAABLkBAQAAAAS6AQEAAAABuwEBAAAAAbwBAQAAAAG9AQEAAAABvgEBAIYCACG_AQEAAAABwAEBAAAAAcEBAQAAAAELqwEAAIcCADCsAQAA3QEAEK0BAACHAgAwrgEBAPcBACG0AQIA-gEAIbUBQAD7AQAhtgFAAPsBACHCAQEA9wEAIcMBAQD3AQAhxAEBAPcBACHFAQEA9wEAIQerAQAAiAIAMKwBAADHAQAQrQEAAIgCADCuAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHGAQEA9wEAIQ2rAQAAiQIAMKwBAACxAQAQrQEAAIkCADCuAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHDAQEA9wEAIcQBAQD3AQAhxwFAAPsBACHIAQEA9wEAIckBAQD3AQAhygECAPoBACHMAQAAigLMASIHBwAA_QEAICUAAIwCACAmAACMAgAgtwEAAADMAQK4AQAAAMwBCLkBAAAAzAEIvgEAAIsCzAEiBwcAAP0BACAlAACMAgAgJgAAjAIAILcBAAAAzAECuAEAAADMAQi5AQAAAMwBCL4BAACLAswBIgS3AQAAAMwBArgBAAAAzAEIuQEAAADMAQi-AQAAjALMASILqwEAAI0CADCsAQAAmwEAEK0BAACNAgAwrgEBAPcBACG1AUAA-wEAIbYBQAD7AQAhwwEBAPcBACHIAQEA9wEAIckBAQD3AQAhzQECAPoBACHOASAAjgIAIQUHAAD9AQAgJQAAkAIAICYAAJACACC3ASAAAAABvgEgAI8CACEFBwAA_QEAICUAAJACACAmAACQAgAgtwEgAAAAAb4BIACPAgAhArcBIAAAAAG-ASAAkAIAIQmrAQAAkQIAMKwBAACFAQAQrQEAAJECADCuAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHPAQEA9wEAIdABAQD3AQAh0QFAAPsBACEJqwEAAJICADCsAQAAcgAQrQEAAJICADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHPAQEAkwIAIdABAQCTAgAh0QFAAJQCACELtwEBAAAAAbgBAQAAAAS5AQEAAAAEugEBAAAAAbsBAQAAAAG8AQEAAAABvQEBAAAAAb4BAQCGAgAhvwEBAAAAAcABAQAAAAHBAQEAAAABCLcBQAAAAAG4AUAAAAAEuQFAAAAABLoBQAAAAAG7AUAAAAABvAFAAAAAAb0BQAAAAAG-AUAA_gEAIRCrAQAAlQIAMKwBAABsABCtAQAAlQIAMK4BAQD3AQAhrwEBAPcBACG1AUAA-wEAIbYBQAD7AQAh0gEBAPcBACHTAQEA9wEAIdQBAQCWAgAh1QEBAJYCACHWAQEAlgIAIdcBQACXAgAh2AFAAJcCACHZAQEAlgIAIdoBAQCWAgAhDgcAAIICACAlAACbAgAgJgAAmwIAILcBAQAAAAG4AQEAAAAFuQEBAAAABboBAQAAAAG7AQEAAAABvAEBAAAAAb0BAQAAAAG-AQEAmgIAIb8BAQAAAAHAAQEAAAABwQEBAAAAAQsHAACCAgAgJQAAmQIAICYAAJkCACC3AUAAAAABuAFAAAAABbkBQAAAAAW6AUAAAAABuwFAAAAAAbwBQAAAAAG9AUAAAAABvgFAAJgCACELBwAAggIAICUAAJkCACAmAACZAgAgtwFAAAAAAbgBQAAAAAW5AUAAAAAFugFAAAAAAbsBQAAAAAG8AUAAAAABvQFAAAAAAb4BQACYAgAhCLcBQAAAAAG4AUAAAAAFuQFAAAAABboBQAAAAAG7AUAAAAABvAFAAAAAAb0BQAAAAAG-AUAAmQIAIQ4HAACCAgAgJQAAmwIAICYAAJsCACC3AQEAAAABuAEBAAAABbkBAQAAAAW6AQEAAAABuwEBAAAAAbwBAQAAAAG9AQEAAAABvgEBAJoCACG_AQEAAAABwAEBAAAAAcEBAQAAAAELtwEBAAAAAbgBAQAAAAW5AQEAAAAFugEBAAAAAbsBAQAAAAG8AQEAAAABvQEBAAAAAb4BAQCbAgAhvwEBAAAAAcABAQAAAAHBAQEAAAABC6sBAACcAgAwrAEAAFYAEK0BAACcAgAwrgEBAPcBACGvAQEA9wEAIbUBQAD7AQAhtgFAAPsBACHRAUAA-wEAIdsBAQD3AQAh3AEBAJYCACHdAQEAlgIAIQ2rAQAAnQIAMKwBAABAABCtAQAAnQIAMK4BAQD3AQAhtQFAAPsBACG2AUAA-wEAIcYBAQD3AQAhzAEBAJYCACHeAQEA9wEAId8BIACOAgAh4AEBAJYCACHhAQEAlgIAIeIBAQCWAgAhEgQAAKECACAFAACiAgAgEAAAowIAIBEAAKQCACASAAClAgAgqwEAAJ4CADCsAQAALQAQrQEAAJ4CADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHGAQEAkwIAIcwBAQCgAgAh3gEBAJMCACHfASAAnwIAIeABAQCgAgAh4QEBAKACACHiAQEAoAIAIQK3ASAAAAABvgEgAJACACELtwEBAAAAAbgBAQAAAAW5AQEAAAAFugEBAAAAAbsBAQAAAAG8AQEAAAABvQEBAAAAAb4BAQCbAgAhvwEBAAAAAcABAQAAAAHBAQEAAAABA-MBAAADACDkAQAAAwAg5QEAAAMAIAPjAQAABwAg5AEAAAcAIOUBAAAHACATAwAAqQIAIAgAALICACAKAACzAgAgDgAApAIAIA8AAKUCACCrAQAArwIAMKwBAAALABCtAQAArwIAMK4BAQCTAgAhrwEBAJMCACGwAQEAkwIAIbEBCACwAgAhsgEIALECACGzAQIApwIAIbQBCACwAgAhtQFAAJQCACG2AUAAlAIAIeYBAAALACDnAQAACwAgA-MBAAAZACDkAQAAGQAg5QEAABkAIAPjAQAAHQAg5AEAAB0AIOUBAAAdACAOCQAAqAIAIAsAAKkCACAMAACqAgAgqwEAAKYCADCsAQAAHQAQrQEAAKYCADCuAQEAkwIAIbQBAgCnAgAhtQFAAJQCACG2AUAAlAIAIcIBAQCTAgAhwwEBAJMCACHEAQEAkwIAIcUBAQCTAgAhCLcBAgAAAAG4AQIAAAAEuQECAAAABLoBAgAAAAG7AQIAAAABvAECAAAAAb0BAgAAAAG-AQIA_QEAIRMDAACpAgAgCAAAsgIAIAoAALMCACAOAACkAgAgDwAApQIAIKsBAACvAgAwrAEAAAsAEK0BAACvAgAwrgEBAJMCACGvAQEAkwIAIbABAQCTAgAhsQEIALACACGyAQgAsQIAIbMBAgCnAgAhtAEIALACACG1AUAAlAIAIbYBQACUAgAh5gEAAAsAIOcBAAALACAUBAAAoQIAIAUAAKICACAQAACjAgAgEQAApAIAIBIAAKUCACCrAQAAngIAMKwBAAAtABCtAQAAngIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIcYBAQCTAgAhzAEBAKACACHeAQEAkwIAId8BIACfAgAh4AEBAKACACHhAQEAoAIAIeIBAQCgAgAh5gEAAC0AIOcBAAAtACASCQAAqAIAIAsAAKkCACANAACtAgAgqwEAAKsCADCsAQAAGQAQrQEAAKsCADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHDAQEAkwIAIcQBAQCTAgAhxwFAAJQCACHIAQEAkwIAIckBAQCTAgAhygECAKcCACHMAQAArALMASLmAQAAGQAg5wEAABkAIBAJAACoAgAgCwAAqQIAIA0AAK0CACCrAQAAqwIAMKwBAAAZABCtAQAAqwIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIcMBAQCTAgAhxAEBAJMCACHHAUAAlAIAIcgBAQCTAgAhyQEBAJMCACHKAQIApwIAIcwBAACsAswBIgS3AQAAAMwBArgBAAAAzAEIuQEAAADMAQi-AQAAjALMASIQCQAAqAIAIAsAAKkCACAMAACqAgAgqwEAAKYCADCsAQAAHQAQrQEAAKYCADCuAQEAkwIAIbQBAgCnAgAhtQFAAJQCACG2AUAAlAIAIcIBAQCTAgAhwwEBAJMCACHEAQEAkwIAIcUBAQCTAgAh5gEAAB0AIOcBAAAdACAMCQAAqAIAIKsBAACuAgAwrAEAABUAEK0BAACuAgAwrgEBAJMCACG1AUAAlAIAIbYBQACUAgAhwwEBAJMCACHIAQEAkwIAIckBAQCTAgAhzQECAKcCACHOASAAnwIAIREDAACpAgAgCAAAsgIAIAoAALMCACAOAACkAgAgDwAApQIAIKsBAACvAgAwrAEAAAsAEK0BAACvAgAwrgEBAJMCACGvAQEAkwIAIbABAQCTAgAhsQEIALACACGyAQgAsQIAIbMBAgCnAgAhtAEIALACACG1AUAAlAIAIbYBQACUAgAhCLcBCAAAAAG4AQgAAAAEuQEIAAAABLoBCAAAAAG7AQgAAAABvAEIAAAAAb0BCAAAAAG-AQgAgAIAIQi3AQgAAAABuAEIAAAABbkBCAAAAAW6AQgAAAABuwEIAAAAAbwBCAAAAAG9AQgAAAABvgEIAIMCACED4wEAAA0AIOQBAAANACDlAQAADQAgA-MBAAAVACDkAQAAFQAg5QEAABUAIAgGAAC1AgAgqwEAALQCADCsAQAADQAQrQEAALQCADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHGAQEAkwIAIQPjAQAACwAg5AEAAAsAIOUBAAALACARAwAAqQIAIKsBAAC2AgAwrAEAAAcAEK0BAAC2AgAwrgEBAJMCACGvAQEAkwIAIbUBQACUAgAhtgFAAJQCACHSAQEAkwIAIdMBAQCTAgAh1AEBAKACACHVAQEAoAIAIdYBAQCgAgAh1wFAALcCACHYAUAAtwIAIdkBAQCgAgAh2gEBAKACACEItwFAAAAAAbgBQAAAAAW5AUAAAAAFugFAAAAAAbsBQAAAAAG8AUAAAAABvQFAAAAAAb4BQACZAgAhDAMAAKkCACCrAQAAuAIAMKwBAAADABCtAQAAuAIAMK4BAQCTAgAhrwEBAJMCACG1AUAAlAIAIbYBQACUAgAh0QFAAJQCACHbAQEAkwIAIdwBAQCgAgAh3QEBAKACACEAAAAAAAAB6wEBAAAAAQXrAQgAAAAB8QEIAAAAAfIBCAAAAAHzAQgAAAAB9AEIAAAAAQXrAQgAAAAB8QEIAAAAAfIBCAAAAAHzAQgAAAAB9AEIAAAAAQXrAQIAAAAB8QECAAAAAfIBAgAAAAHzAQIAAAAB9AECAAAAAQHrAUAAAAABBR8AAJ8EACAgAAC5BAAg6AEAAKAEACDpAQAAuAQAIO4BAAABACAKHwAA_gIAMCAAAIIDADDoAQAA_wIAMOkBAACAAwAw6wEAAIEDADDsAQAAgQMAMO0BAACBAwAw7gEAAIEDADDvAQAAgwMAMPABAACEAwAwCx8AAPECADAgAAD2AgAw6AEAAPICADDpAQAA8wIAMOoBAAD0AgAg6wEAAPUCADDsAQAA9QIAMO0BAAD1AgAw7gEAAPUCADDvAQAA9wIAMPABAAD4AgAwCx8AANkCADAgAADeAgAw6AEAANoCADDpAQAA2wIAMOoBAADcAgAg6wEAAN0CADDsAQAA3QIAMO0BAADdAgAw7gEAAN0CADDvAQAA3wIAMPABAADgAgAwCx8AAMkCADAgAADOAgAw6AEAAMoCADDpAQAAywIAMOoBAADMAgAg6wEAAM0CADDsAQAAzQIAMO0BAADNAgAw7gEAAM0CADDvAQAAzwIAMPABAADQAgAwCQsAANcCACAMAADYAgAgrgEBAAAAAbQBAgAAAAG1AUAAAAABtgFAAAAAAcIBAQAAAAHEAQEAAAABxQEBAAAAAQIAAAAgACAfAADWAgAgAwAAACAAIB8AANYCACAgAADTAgAgARgAALcEADAOCQAAqAIAIAsAAKkCACAMAACqAgAgqwEAAKYCADCsAQAAHQAQrQEAAKYCADCuAQEAAAABtAECAKcCACG1AUAAlAIAIbYBQACUAgAhwgEBAJMCACHDAQEAkwIAIcQBAQCTAgAhxQEBAAAAAQIAAAAgACAYAADTAgAgAgAAANECACAYAADSAgAgC6sBAADQAgAwrAEAANECABCtAQAA0AIAMK4BAQCTAgAhtAECAKcCACG1AUAAlAIAIbYBQACUAgAhwgEBAJMCACHDAQEAkwIAIcQBAQCTAgAhxQEBAJMCACELqwEAANACADCsAQAA0QIAEK0BAADQAgAwrgEBAJMCACG0AQIApwIAIbUBQACUAgAhtgFAAJQCACHCAQEAkwIAIcMBAQCTAgAhxAEBAJMCACHFAQEAkwIAIQeuAQEAvwIAIbQBAgDCAgAhtQFAAMMCACG2AUAAwwIAIcIBAQC_AgAhxAEBAL8CACHFAQEAvwIAIQkLAADUAgAgDAAA1QIAIK4BAQC_AgAhtAECAMICACG1AUAAwwIAIbYBQADDAgAhwgEBAL8CACHEAQEAvwIAIcUBAQC_AgAhBR8AAK8EACAgAAC1BAAg6AEAALAEACDpAQAAtAQAIO4BAAABACAFHwAArQQAICAAALIEACDoAQAArgQAIOkBAACxBAAg7gEAABsAIAkLAADXAgAgDAAA2AIAIK4BAQAAAAG0AQIAAAABtQFAAAAAAbYBQAAAAAHCAQEAAAABxAEBAAAAAcUBAQAAAAEDHwAArwQAIOgBAACwBAAg7gEAAAEAIAMfAACtBAAg6AEAAK4EACDuAQAAGwAgCwsAAO8CACANAADwAgAgrgEBAAAAAbUBQAAAAAG2AUAAAAABxAEBAAAAAccBQAAAAAHIAQEAAAAByQEBAAAAAcoBAgAAAAHMAQAAAMwBAgIAAAAbACAfAADuAgAgAwAAABsAIB8AAO4CACAgAADkAgAgARgAAKwEADAQCQAAqAIAIAsAAKkCACANAACtAgAgqwEAAKsCADCsAQAAGQAQrQEAAKsCADCuAQEAAAABtQFAAJQCACG2AUAAlAIAIcMBAQCTAgAhxAEBAJMCACHHAUAAlAIAIcgBAQCTAgAhyQEBAJMCACHKAQIApwIAIcwBAACsAswBIgIAAAAbACAYAADkAgAgAgAAAOECACAYAADiAgAgDasBAADgAgAwrAEAAOECABCtAQAA4AIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIcMBAQCTAgAhxAEBAJMCACHHAUAAlAIAIcgBAQCTAgAhyQEBAJMCACHKAQIApwIAIcwBAACsAswBIg2rAQAA4AIAMKwBAADhAgAQrQEAAOACADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHDAQEAkwIAIcQBAQCTAgAhxwFAAJQCACHIAQEAkwIAIckBAQCTAgAhygECAKcCACHMAQAArALMASIJrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxAEBAL8CACHHAUAAwwIAIcgBAQC_AgAhyQEBAL8CACHKAQIAwgIAIcwBAADjAswBIgHrAQAAAMwBAgsLAADlAgAgDQAA5gIAIK4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIcQBAQC_AgAhxwFAAMMCACHIAQEAvwIAIckBAQC_AgAhygECAMICACHMAQAA4wLMASIFHwAAogQAICAAAKoEACDoAQAAowQAIOkBAACpBAAg7gEAAAEAIAcfAADnAgAgIAAA6gIAIOgBAADoAgAg6QEAAOkCACDsAQAAHQAg7QEAAB0AIO4BAAAgACAJCQAA7QIAIAsAANcCACCuAQEAAAABtAECAAAAAbUBQAAAAAG2AUAAAAABwgEBAAAAAcMBAQAAAAHEAQEAAAABAgAAACAAIB8AAOcCACADAAAAHQAgHwAA5wIAICAAAOsCACALAAAAHQAgCQAA7AIAIAsAANQCACAYAADrAgAgrgEBAL8CACG0AQIAwgIAIbUBQADDAgAhtgFAAMMCACHCAQEAvwIAIcMBAQC_AgAhxAEBAL8CACEJCQAA7AIAIAsAANQCACCuAQEAvwIAIbQBAgDCAgAhtQFAAMMCACG2AUAAwwIAIcIBAQC_AgAhwwEBAL8CACHEAQEAvwIAIQUfAACkBAAgIAAApwQAIOgBAAClBAAg6QEAAKYEACDuAQAAEgAgAx8AAKQEACDoAQAApQQAIO4BAAASACALCwAA7wIAIA0AAPACACCuAQEAAAABtQFAAAAAAbYBQAAAAAHEAQEAAAABxwFAAAAAAcgBAQAAAAHJAQEAAAABygECAAAAAcwBAAAAzAECAx8AAKIEACDoAQAAowQAIO4BAAABACADHwAA5wIAIOgBAADoAgAg7gEAACAAIAeuAQEAAAABtQFAAAAAAbYBQAAAAAHIAQEAAAAByQEBAAAAAc0BAgAAAAHOASAAAAABAgAAABcAIB8AAP0CACADAAAAFwAgHwAA_QIAICAAAPwCACABGAAAoQQAMAwJAACoAgAgqwEAAK4CADCsAQAAFQAQrQEAAK4CADCuAQEAAAABtQFAAJQCACG2AUAAlAIAIcMBAQCTAgAhyAEBAJMCACHJAQEAkwIAIc0BAgCnAgAhzgEgAJ8CACECAAAAFwAgGAAA_AIAIAIAAAD5AgAgGAAA-gIAIAurAQAA-AIAMKwBAAD5AgAQrQEAAPgCADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHDAQEAkwIAIcgBAQCTAgAhyQEBAJMCACHNAQIApwIAIc4BIACfAgAhC6sBAAD4AgAwrAEAAPkCABCtAQAA-AIAMK4BAQCTAgAhtQFAAJQCACG2AUAAlAIAIcMBAQCTAgAhyAEBAJMCACHJAQEAkwIAIc0BAgCnAgAhzgEgAJ8CACEHrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhyAEBAL8CACHJAQEAvwIAIc0BAgDCAgAhzgEgAPsCACEB6wEgAAAAAQeuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHIAQEAvwIAIckBAQC_AgAhzQECAMICACHOASAA-wIAIQeuAQEAAAABtQFAAAAAAbYBQAAAAAHIAQEAAAAByQEBAAAAAc0BAgAAAAHOASAAAAABBK4BAQAAAAG1AUAAAAABtgFAAAAAAcYBAQAAAAECAAAADwAgHwAAiAMAIAMAAAAPACAfAACIAwAgIAAAhwMAIAgGAAC1AgAgqwEAALQCADCsAQAADQAQrQEAALQCADCuAQEAAAABtQFAAJQCACG2AUAAlAIAIcYBAQAAAAECAAAADwAgGAAAhwMAIAIAAACFAwAgGAAAhgMAIAerAQAAhAMAMKwBAACFAwAQrQEAAIQDADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHGAQEAkwIAIQerAQAAhAMAMKwBAACFAwAQrQEAAIQDADCuAQEAkwIAIbUBQACUAgAhtgFAAJQCACHGAQEAkwIAIQSuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIQSuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIQSuAQEAAAABtQFAAAAAAbYBQAAAAAHGAQEAAAABAx8AAJ8EACDoAQAAoAQAIO4BAAABACADHwAA_gIAMOgBAAD_AgAw7gEAAIEDADAEHwAA8QIAMOgBAADyAgAw6gEAAPQCACDuAQAA9QIAMAQfAADZAgAw6AEAANoCADDqAQAA3AIAIO4BAADdAgAwBB8AAMkCADDoAQAAygIAMOoBAADMAgAg7gEAAM0CADAAAAAAAAAAAAofAACXAwAwIAAAmwMAMOgBAACYAwAw6QEAAJkDADDrAQAAmgMAMOwBAACaAwAw7QEAAJoDADDuAQAAmgMAMO8BAACcAwAw8AEAAJ0DADANAwAAiQMAIAoAAIsDACAOAACMAwAgDwAAjQMAIK4BAQAAAAGvAQEAAAABsAEBAAAAAbEBCAAAAAGyAQgAAAABswECAAAAAbQBCAAAAAG1AUAAAAABtgFAAAAAAQIAAAASACAfAAChAwAgAwAAABIAIB8AAKEDACAgAACgAwAgEQMAAKkCACAIAACyAgAgCgAAswIAIA4AAKQCACAPAAClAgAgqwEAAK8CADCsAQAACwAQrQEAAK8CADCuAQEAAAABrwEBAAAAAbABAQCTAgAhsQEIALACACGyAQgAsQIAIbMBAgCnAgAhtAEIALACACG1AUAAlAIAIbYBQACUAgAhAgAAABIAIBgAAKADACACAAAAngMAIBgAAJ8DACAMqwEAAJ0DADCsAQAAngMAEK0BAACdAwAwrgEBAJMCACGvAQEAkwIAIbABAQCTAgAhsQEIALACACGyAQgAsQIAIbMBAgCnAgAhtAEIALACACG1AUAAlAIAIbYBQACUAgAhDKsBAACdAwAwrAEAAJ4DABCtAQAAnQMAMK4BAQCTAgAhrwEBAJMCACGwAQEAkwIAIbEBCACwAgAhsgEIALECACGzAQIApwIAIbQBCACwAgAhtQFAAJQCACG2AUAAlAIAIQmuAQEAvwIAIa8BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACENAwAAxAIAIAoAAMYCACAOAADHAgAgDwAAyAIAIK4BAQC_AgAhrwEBAL8CACGwAQEAvwIAIbEBCADAAgAhsgEIAMECACGzAQIAwgIAIbQBCADAAgAhtQFAAMMCACG2AUAAwwIAIQ0DAACJAwAgCgAAiwMAIA4AAIwDACAPAACNAwAgrgEBAAAAAa8BAQAAAAGwAQEAAAABsQEIAAAAAbIBCAAAAAGzAQIAAAABtAEIAAAAAbUBQAAAAAG2AUAAAAABAx8AAJcDADDoAQAAmAMAMO4BAACaAwAwAAAAAAAFHwAAmgQAICAAAJ0EACDoAQAAmwQAIOkBAACcBAAg7gEAABIAIAMfAACaBAAg6AEAAJsEACDuAQAAEgAgAAAAAAAFHwAAlQQAICAAAJgEACDoAQAAlgQAIOkBAACXBAAg7gEAABIAIAMfAACVBAAg6AEAAJYEACDuAQAAEgAgAAAAAAAAAesBAQAAAAEB6wFAAAAAAQUfAACQBAAgIAAAkwQAIOgBAACRBAAg6QEAAJIEACDuAQAAAQAgAx8AAJAEACDoAQAAkQQAIO4BAAABACAAAAAFHwAAiwQAICAAAI4EACDoAQAAjAQAIOkBAACNBAAg7gEAAAEAIAMfAACLBAAg6AEAAIwEACDuAQAAAQAgAAAACx8AAOsDADAgAADwAwAw6AEAAOwDADDpAQAA7QMAMOoBAADuAwAg6wEAAO8DADDsAQAA7wMAMO0BAADvAwAw7gEAAO8DADDvAQAA8QMAMPABAADyAwAwCx8AAN8DADAgAADkAwAw6AEAAOADADDpAQAA4QMAMOoBAADiAwAg6wEAAOMDADDsAQAA4wMAMO0BAADjAwAw7gEAAOMDADDvAQAA5QMAMPABAADmAwAwBx8AANoDACAgAADdAwAg6AEAANsDACDpAQAA3AMAIOwBAAALACDtAQAACwAg7gEAABIAIAsfAADRAwAwIAAA1QMAMOgBAADSAwAw6QEAANMDADDqAQAA1AMAIOsBAADdAgAw7AEAAN0CADDtAQAA3QIAMO4BAADdAgAw7wEAANYDADDwAQAA4AIAMAsfAADIAwAwIAAAzAMAMOgBAADJAwAw6QEAAMoDADDqAQAAywMAIOsBAADNAgAw7AEAAM0CADDtAQAAzQIAMO4BAADNAgAw7wEAAM0DADDwAQAA0AIAMAkJAADtAgAgDAAA2AIAIK4BAQAAAAG0AQIAAAABtQFAAAAAAbYBQAAAAAHCAQEAAAABwwEBAAAAAcUBAQAAAAECAAAAIAAgHwAA0AMAIAMAAAAgACAfAADQAwAgIAAAzwMAIAEYAACKBAAwAgAAACAAIBgAAM8DACACAAAA0QIAIBgAAM4DACAHrgEBAL8CACG0AQIAwgIAIbUBQADDAgAhtgFAAMMCACHCAQEAvwIAIcMBAQC_AgAhxQEBAL8CACEJCQAA7AIAIAwAANUCACCuAQEAvwIAIbQBAgDCAgAhtQFAAMMCACG2AUAAwwIAIcIBAQC_AgAhwwEBAL8CACHFAQEAvwIAIQkJAADtAgAgDAAA2AIAIK4BAQAAAAG0AQIAAAABtQFAAAAAAbYBQAAAAAHCAQEAAAABwwEBAAAAAcUBAQAAAAELCQAAqQMAIA0AAPACACCuAQEAAAABtQFAAAAAAbYBQAAAAAHDAQEAAAABxwFAAAAAAcgBAQAAAAHJAQEAAAABygECAAAAAcwBAAAAzAECAgAAABsAIB8AANkDACADAAAAGwAgHwAA2QMAICAAANgDACABGAAAiQQAMAIAAAAbACAYAADYAwAgAgAAAOECACAYAADXAwAgCa4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIcMBAQC_AgAhxwFAAMMCACHIAQEAvwIAIckBAQC_AgAhygECAMICACHMAQAA4wLMASILCQAAqAMAIA0AAOYCACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHDAQEAvwIAIccBQADDAgAhyAEBAL8CACHJAQEAvwIAIcoBAgDCAgAhzAEAAOMCzAEiCwkAAKkDACANAADwAgAgrgEBAAAAAbUBQAAAAAG2AUAAAAABwwEBAAAAAccBQAAAAAHIAQEAAAAByQEBAAAAAcoBAgAAAAHMAQAAAMwBAgwIAACKAwAgCgAAiwMAIA4AAIwDACAPAACNAwAgrgEBAAAAAbABAQAAAAGxAQgAAAABsgEIAAAAAbMBAgAAAAG0AQgAAAABtQFAAAAAAbYBQAAAAAECAAAAEgAgHwAA2gMAIAMAAAALACAfAADaAwAgIAAA3gMAIA4AAAALACAIAADFAgAgCgAAxgIAIA4AAMcCACAPAADIAgAgGAAA3gMAIK4BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACEMCAAAxQIAIAoAAMYCACAOAADHAgAgDwAAyAIAIK4BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACEMrgEBAAAAAbUBQAAAAAG2AUAAAAAB0gEBAAAAAdMBAQAAAAHUAQEAAAAB1QEBAAAAAdYBAQAAAAHXAUAAAAAB2AFAAAAAAdkBAQAAAAHaAQEAAAABAgAAAAkAIB8AAOoDACADAAAACQAgHwAA6gMAICAAAOkDACABGAAAiAQAMBEDAACpAgAgqwEAALYCADCsAQAABwAQrQEAALYCADCuAQEAAAABrwEBAJMCACG1AUAAlAIAIbYBQACUAgAh0gEBAJMCACHTAQEAkwIAIdQBAQCgAgAh1QEBAKACACHWAQEAoAIAIdcBQAC3AgAh2AFAALcCACHZAQEAoAIAIdoBAQCgAgAhAgAAAAkAIBgAAOkDACACAAAA5wMAIBgAAOgDACAQqwEAAOYDADCsAQAA5wMAEK0BAADmAwAwrgEBAJMCACGvAQEAkwIAIbUBQACUAgAhtgFAAJQCACHSAQEAkwIAIdMBAQCTAgAh1AEBAKACACHVAQEAoAIAIdYBAQCgAgAh1wFAALcCACHYAUAAtwIAIdkBAQCgAgAh2gEBAKACACEQqwEAAOYDADCsAQAA5wMAEK0BAADmAwAwrgEBAJMCACGvAQEAkwIAIbUBQACUAgAhtgFAAJQCACHSAQEAkwIAIdMBAQCTAgAh1AEBAKACACHVAQEAoAIAIdYBAQCgAgAh1wFAALcCACHYAUAAtwIAIdkBAQCgAgAh2gEBAKACACEMrgEBAL8CACG1AUAAwwIAIbYBQADDAgAh0gEBAL8CACHTAQEAvwIAIdQBAQC3AwAh1QEBALcDACHWAQEAtwMAIdcBQAC4AwAh2AFAALgDACHZAQEAtwMAIdoBAQC3AwAhDK4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIdIBAQC_AgAh0wEBAL8CACHUAQEAtwMAIdUBAQC3AwAh1gEBALcDACHXAUAAuAMAIdgBQAC4AwAh2QEBALcDACHaAQEAtwMAIQyuAQEAAAABtQFAAAAAAbYBQAAAAAHSAQEAAAAB0wEBAAAAAdQBAQAAAAHVAQEAAAAB1gEBAAAAAdcBQAAAAAHYAUAAAAAB2QEBAAAAAdoBAQAAAAEHrgEBAAAAAbUBQAAAAAG2AUAAAAAB0QFAAAAAAdsBAQAAAAHcAQEAAAAB3QEBAAAAAQIAAAAFACAfAAD2AwAgAwAAAAUAIB8AAPYDACAgAAD1AwAgARgAAIcEADAMAwAAqQIAIKsBAAC4AgAwrAEAAAMAEK0BAAC4AgAwrgEBAAAAAa8BAQCTAgAhtQFAAJQCACG2AUAAlAIAIdEBQACUAgAh2wEBAAAAAdwBAQCgAgAh3QEBAKACACECAAAABQAgGAAA9QMAIAIAAADzAwAgGAAA9AMAIAurAQAA8gMAMKwBAADzAwAQrQEAAPIDADCuAQEAkwIAIa8BAQCTAgAhtQFAAJQCACG2AUAAlAIAIdEBQACUAgAh2wEBAJMCACHcAQEAoAIAId0BAQCgAgAhC6sBAADyAwAwrAEAAPMDABCtAQAA8gMAMK4BAQCTAgAhrwEBAJMCACG1AUAAlAIAIbYBQACUAgAh0QFAAJQCACHbAQEAkwIAIdwBAQCgAgAh3QEBAKACACEHrgEBAL8CACG1AUAAwwIAIbYBQADDAgAh0QFAAMMCACHbAQEAvwIAIdwBAQC3AwAh3QEBALcDACEHrgEBAL8CACG1AUAAwwIAIbYBQADDAgAh0QFAAMMCACHbAQEAvwIAIdwBAQC3AwAh3QEBALcDACEHrgEBAAAAAbUBQAAAAAG2AUAAAAAB0QFAAAAAAdsBAQAAAAHcAQEAAAAB3QEBAAAAAQQfAADrAwAw6AEAAOwDADDqAQAA7gMAIO4BAADvAwAwBB8AAN8DADDoAQAA4AMAMOoBAADiAwAg7gEAAOMDADADHwAA2gMAIOgBAADbAwAg7gEAABIAIAQfAADRAwAw6AEAANIDADDqAQAA1AMAIO4BAADdAgAwBB8AAMgDADDoAQAAyQMAMOoBAADLAwAg7gEAAM0CADAAAAYDAACBBAAgCAAAhAQAIAoAAIUEACAOAAD_AwAgDwAAgAQAILIBAAC5AgAgAAAJBAAA_AMAIAUAAP0DACAQAAD-AwAgEQAA_wMAIBIAAIAEACDMAQAAuQIAIOABAAC5AgAg4QEAALkCACDiAQAAuQIAIAMJAAD-AwAgCwAAgQQAIA0AAIMEACADCQAA_gMAIAsAAIEEACAMAACCBAAgAAAAB64BAQAAAAG1AUAAAAABtgFAAAAAAdEBQAAAAAHbAQEAAAAB3AEBAAAAAd0BAQAAAAEMrgEBAAAAAbUBQAAAAAG2AUAAAAAB0gEBAAAAAdMBAQAAAAHUAQEAAAAB1QEBAAAAAdYBAQAAAAHXAUAAAAAB2AFAAAAAAdkBAQAAAAHaAQEAAAABCa4BAQAAAAG1AUAAAAABtgFAAAAAAcMBAQAAAAHHAUAAAAAByAEBAAAAAckBAQAAAAHKAQIAAAABzAEAAADMAQIHrgEBAAAAAbQBAgAAAAG1AUAAAAABtgFAAAAAAcIBAQAAAAHDAQEAAAABxQEBAAAAAQ4FAAD4AwAgEAAA-QMAIBEAAPoDACASAAD7AwAgrgEBAAAAAbUBQAAAAAG2AUAAAAABxgEBAAAAAcwBAQAAAAHeAQEAAAAB3wEgAAAAAeABAQAAAAHhAQEAAAAB4gEBAAAAAQIAAAABACAfAACLBAAgAwAAAC0AIB8AAIsEACAgAACPBAAgEAAAAC0AIAUAAMQDACAQAADFAwAgEQAAxgMAIBIAAMcDACAYAACPBAAgrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxgEBAL8CACHMAQEAtwMAId4BAQC_AgAh3wEgAPsCACHgAQEAtwMAIeEBAQC3AwAh4gEBALcDACEOBQAAxAMAIBAAAMUDACARAADGAwAgEgAAxwMAIK4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIcYBAQC_AgAhzAEBALcDACHeAQEAvwIAId8BIAD7AgAh4AEBALcDACHhAQEAtwMAIeIBAQC3AwAhDgQAAPcDACAQAAD5AwAgEQAA-gMAIBIAAPsDACCuAQEAAAABtQFAAAAAAbYBQAAAAAHGAQEAAAABzAEBAAAAAd4BAQAAAAHfASAAAAAB4AEBAAAAAeEBAQAAAAHiAQEAAAABAgAAAAEAIB8AAJAEACADAAAALQAgHwAAkAQAICAAAJQEACAQAAAALQAgBAAAwwMAIBAAAMUDACARAADGAwAgEgAAxwMAIBgAAJQEACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIcwBAQC3AwAh3gEBAL8CACHfASAA-wIAIeABAQC3AwAh4QEBALcDACHiAQEAtwMAIQ4EAADDAwAgEAAAxQMAIBEAAMYDACASAADHAwAgrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxgEBAL8CACHMAQEAtwMAId4BAQC_AgAh3wEgAPsCACHgAQEAtwMAIeEBAQC3AwAh4gEBALcDACENAwAAiQMAIAgAAIoDACAOAACMAwAgDwAAjQMAIK4BAQAAAAGvAQEAAAABsAEBAAAAAbEBCAAAAAGyAQgAAAABswECAAAAAbQBCAAAAAG1AUAAAAABtgFAAAAAAQIAAAASACAfAACVBAAgAwAAAAsAIB8AAJUEACAgAACZBAAgDwAAAAsAIAMAAMQCACAIAADFAgAgDgAAxwIAIA8AAMgCACAYAACZBAAgrgEBAL8CACGvAQEAvwIAIbABAQC_AgAhsQEIAMACACGyAQgAwQIAIbMBAgDCAgAhtAEIAMACACG1AUAAwwIAIbYBQADDAgAhDQMAAMQCACAIAADFAgAgDgAAxwIAIA8AAMgCACCuAQEAvwIAIa8BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACENAwAAiQMAIAgAAIoDACAKAACLAwAgDwAAjQMAIK4BAQAAAAGvAQEAAAABsAEBAAAAAbEBCAAAAAGyAQgAAAABswECAAAAAbQBCAAAAAG1AUAAAAABtgFAAAAAAQIAAAASACAfAACaBAAgAwAAAAsAIB8AAJoEACAgAACeBAAgDwAAAAsAIAMAAMQCACAIAADFAgAgCgAAxgIAIA8AAMgCACAYAACeBAAgrgEBAL8CACGvAQEAvwIAIbABAQC_AgAhsQEIAMACACGyAQgAwQIAIbMBAgDCAgAhtAEIAMACACG1AUAAwwIAIbYBQADDAgAhDQMAAMQCACAIAADFAgAgCgAAxgIAIA8AAMgCACCuAQEAvwIAIa8BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACEOBAAA9wMAIAUAAPgDACARAAD6AwAgEgAA-wMAIK4BAQAAAAG1AUAAAAABtgFAAAAAAcYBAQAAAAHMAQEAAAAB3gEBAAAAAd8BIAAAAAHgAQEAAAAB4QEBAAAAAeIBAQAAAAECAAAAAQAgHwAAnwQAIAeuAQEAAAABtQFAAAAAAbYBQAAAAAHIAQEAAAAByQEBAAAAAc0BAgAAAAHOASAAAAABDgQAAPcDACAFAAD4AwAgEAAA-QMAIBIAAPsDACCuAQEAAAABtQFAAAAAAbYBQAAAAAHGAQEAAAABzAEBAAAAAd4BAQAAAAHfASAAAAAB4AEBAAAAAeEBAQAAAAHiAQEAAAABAgAAAAEAIB8AAKIEACANAwAAiQMAIAgAAIoDACAKAACLAwAgDgAAjAMAIK4BAQAAAAGvAQEAAAABsAEBAAAAAbEBCAAAAAGyAQgAAAABswECAAAAAbQBCAAAAAG1AUAAAAABtgFAAAAAAQIAAAASACAfAACkBAAgAwAAAAsAIB8AAKQEACAgAACoBAAgDwAAAAsAIAMAAMQCACAIAADFAgAgCgAAxgIAIA4AAMcCACAYAACoBAAgrgEBAL8CACGvAQEAvwIAIbABAQC_AgAhsQEIAMACACGyAQgAwQIAIbMBAgDCAgAhtAEIAMACACG1AUAAwwIAIbYBQADDAgAhDQMAAMQCACAIAADFAgAgCgAAxgIAIA4AAMcCACCuAQEAvwIAIa8BAQC_AgAhsAEBAL8CACGxAQgAwAIAIbIBCADBAgAhswECAMICACG0AQgAwAIAIbUBQADDAgAhtgFAAMMCACEDAAAALQAgHwAAogQAICAAAKsEACAQAAAALQAgBAAAwwMAIAUAAMQDACAQAADFAwAgEgAAxwMAIBgAAKsEACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIcwBAQC3AwAh3gEBAL8CACHfASAA-wIAIeABAQC3AwAh4QEBALcDACHiAQEAtwMAIQ4EAADDAwAgBQAAxAMAIBAAAMUDACASAADHAwAgrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxgEBAL8CACHMAQEAtwMAId4BAQC_AgAh3wEgAPsCACHgAQEAtwMAIeEBAQC3AwAh4gEBALcDACEJrgEBAAAAAbUBQAAAAAG2AUAAAAABxAEBAAAAAccBQAAAAAHIAQEAAAAByQEBAAAAAcoBAgAAAAHMAQAAAMwBAgwJAACpAwAgCwAA7wIAIK4BAQAAAAG1AUAAAAABtgFAAAAAAcMBAQAAAAHEAQEAAAABxwFAAAAAAcgBAQAAAAHJAQEAAAABygECAAAAAcwBAAAAzAECAgAAABsAIB8AAK0EACAOBAAA9wMAIAUAAPgDACAQAAD5AwAgEQAA-gMAIK4BAQAAAAG1AUAAAAABtgFAAAAAAcYBAQAAAAHMAQEAAAAB3gEBAAAAAd8BIAAAAAHgAQEAAAAB4QEBAAAAAeIBAQAAAAECAAAAAQAgHwAArwQAIAMAAAAZACAfAACtBAAgIAAAswQAIA4AAAAZACAJAACoAwAgCwAA5QIAIBgAALMEACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHDAQEAvwIAIcQBAQC_AgAhxwFAAMMCACHIAQEAvwIAIckBAQC_AgAhygECAMICACHMAQAA4wLMASIMCQAAqAMAIAsAAOUCACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHDAQEAvwIAIcQBAQC_AgAhxwFAAMMCACHIAQEAvwIAIckBAQC_AgAhygECAMICACHMAQAA4wLMASIDAAAALQAgHwAArwQAICAAALYEACAQAAAALQAgBAAAwwMAIAUAAMQDACAQAADFAwAgEQAAxgMAIBgAALYEACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIcwBAQC3AwAh3gEBAL8CACHfASAA-wIAIeABAQC3AwAh4QEBALcDACHiAQEAtwMAIQ4EAADDAwAgBQAAxAMAIBAAAMUDACARAADGAwAgrgEBAL8CACG1AUAAwwIAIbYBQADDAgAhxgEBAL8CACHMAQEAtwMAId4BAQC_AgAh3wEgAPsCACHgAQEAtwMAIeEBAQC3AwAh4gEBALcDACEHrgEBAAAAAbQBAgAAAAG1AUAAAAABtgFAAAAAAcIBAQAAAAHEAQEAAAABxQEBAAAAAQMAAAAtACAfAACfBAAgIAAAugQAIBAAAAAtACAEAADDAwAgBQAAxAMAIBEAAMYDACASAADHAwAgGAAAugQAIK4BAQC_AgAhtQFAAMMCACG2AUAAwwIAIcYBAQC_AgAhzAEBALcDACHeAQEAvwIAId8BIAD7AgAh4AEBALcDACHhAQEAtwMAIeIBAQC3AwAhDgQAAMMDACAFAADEAwAgEQAAxgMAIBIAAMcDACCuAQEAvwIAIbUBQADDAgAhtgFAAMMCACHGAQEAvwIAIcwBAQC3AwAh3gEBAL8CACHfASAA-wIAIeABAQC3AwAh4QEBALcDACHiAQEAtwMAIQYEBgIFCgMHAAsQDAQRJggSJwkBAwABAQMAAQYDAAEHAAoIEAUKGAcOHAgPIQkCBhMEBwAGAQYUAAEJAAQDCQAECwABDR4JAwkABAsAAQwACAQIIgAKIwAOJAAPJQAEBCgABSkAESoAEisAAAAAAwcAECUAESYAEgAAAAMHABAlABEmABIBAwABAQMAAQMHABclABgmABkAAAADBwAXJQAYJgAZAQMAAQEDAAEDBwAeJQAfJgAgAAAAAwcAHiUAHyYAIAAAAAMHACYlACcmACgAAAADBwAmJQAnJgAoAQkABAEJAAQFBwAtJQAwJgAxZwAuaAAvAAAAAAAFBwAtJQAwJgAxZwAuaAAvAgkABAsAAQIJAAQLAAEFBwA2JQA5JgA6ZwA3aAA4AAAAAAAFBwA2JQA5JgA6ZwA3aAA4AAADBwA_JQBAJgBBAAAAAwcAPyUAQCYAQQMJAAQLAAEMAAgDCQAECwABDAAIBQcARiUASSYASmcAR2gASAAAAAAABQcARiUASSYASmcAR2gASAEDAAEBAwABBQcATyUAUiYAU2cAUGgAUQAAAAAABQcATyUAUiYAU2cAUGgAURMCARQsARUvARYwARcxARkzARo1DBs2DRw4AR06DB47DiE8ASI9ASM-DCdBDyhCEylDAipEAitFAixGAi1HAi5JAi9LDDBMFDFOAjJQDDNRFTRSAjVTAjZUDDdXFjhYGjlZAzpaAztbAzxcAz1dAz5fAz9hDEBiG0FkA0JmDENnHERoA0VpA0ZqDEdtHUhuIUlwIkpxIkt0Ikx1Ik12Ik54Ik96DFB7I1F9IlJ_DFOAASRUgQEiVYIBIlaDAQxXhgElWIcBKVmIAQdaiQEHW4oBB1yLAQddjAEHXo4BB1-QAQxgkQEqYZMBB2KVAQxjlgErZJcBB2WYAQdmmQEMaZwBLGqdATJrngEIbJ8BCG2gAQhuoQEIb6IBCHCkAQhxpgEMcqcBM3OpAQh0qwEMdawBNHatAQh3rgEIeK8BDHmyATV6swE7e7QBBXy1AQV9tgEFfrcBBX-4AQWAAboBBYEBvAEMggG9ATyDAb8BBYQBwQEMhQHCAT2GAcMBBYcBxAEFiAHFAQyJAcgBPooByQFCiwHKAQmMAcsBCY0BzAEJjgHNAQmPAc4BCZAB0AEJkQHSAQySAdMBQ5MB1QEJlAHXAQyVAdgBRJYB2QEJlwHaAQmYAdsBDJkB3gFFmgHfAUubAeABBJwB4QEEnQHiAQSeAeMBBJ8B5AEEoAHmAQShAegBDKIB6QFMowHrAQSkAe0BDKUB7gFNpgHvAQSnAfABBKgB8QEMqQH0AU6qAfUBVA"
};
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

// src/generated/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  AvailabilityScalarFieldEnum: () => AvailabilityScalarFieldEnum,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
var runtime2 = __toESM(require("@prisma/client/runtime/client"), 1);
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
  client: "7.5.0",
  engine: "280c870be64f457428992c43c1f6d557fab6e29e"
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
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Availability: "Availability",
  Booking: "Booking",
  Category: "Category",
  Review: "Review",
  TutorProfile: "TutorProfile"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var AvailabilityScalarFieldEnum = {
  id: "id",
  tutorId: "tutorId",
  dayOfWeek: "dayOfWeek",
  startTime: "startTime",
  endTime: "endTime",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  studentId: "studentId",
  tutorId: "tutorId",
  date: "date",
  startTime: "startTime",
  endTime: "endTime",
  duration: "duration",
  status: "status",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  tutorId: "tutorId",
  studentId: "studentId",
  bookingId: "bookingId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  bio: "bio",
  hourlyFee: "hourlyFee",
  monthlyFee: "monthlyFee",
  experience: "experience",
  rating: "rating",
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

// src/generated/enums.ts
var UserStatus = {
  ACTIVE: "ACTIVE",
  BANNED: "BANNED"
};
var BookingStatus = {
  BOOKED: "BOOKED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED"
};

// src/generated/client.ts
var import_meta = {};
globalThis["__dirname"] = path.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var import_config = require("dotenv/config");
var import_adapter_pg = require("@prisma/adapter-pg");
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new import_adapter_pg.PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/booking/booking.service.ts
var createBooking = async (data, userId) => {
  const result = await prisma.booking.create({
    data: {
      ...data,
      studentId: userId
    }
  });
  return result;
};
var getAllBooking = async ({
  search,
  status,
  tutorId: tutorId2,
  studentId,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          student: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        },
        {
          tutor: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (status) {
    andConditions.push({
      status
    });
  }
  if (tutorId2) {
    andConditions.push({
      tutorId: tutorId2
    });
  }
  if (studentId) {
    andConditions.push({
      studentId
    });
  }
  const where = andConditions.length > 0 ? { AND: andConditions } : {};
  const allBookings = await prisma.booking.findMany({
    take: limit,
    skip,
    where,
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      student: true,
      tutor: true,
      review: true
    }
  });
  const total = await prisma.booking.count({
    where
  });
  return {
    data: allBookings,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var createBookingIntoDB = async (payload) => {
  const { tutorId: tutorId2, date, startTime, studentId, endTime, duration } = payload;
  const existingBooking = await prisma.booking.findFirst({
    where: {
      tutorId: tutorId2,
      date: new Date(date),
      // নিশ্চিত করুন এটা Date অবজেক্ট
      startTime,
      status: {
        not: BookingStatus.CANCELLED
      }
    }
  });
  if (existingBooking) {
    throw new Error("This time slot is already booked for this tutor.");
  }
  const result = await prisma.booking.create({
    data: {
      date: new Date(date),
      startTime,
      endTime,
      duration: Number(duration),
      // নিশ্চিত করুন এটা Number
      status: BookingStatus.BOOKED,
      // রিলেশন হ্যান্ডেল করার সঠিক উপায়
      student: {
        connect: { id: studentId }
      },
      tutor: {
        connect: { id: tutorId2 }
      }
    },
    // চাইলে রিটার্ন ডাটাতে স্টুডেন্ট বা টিউটরের ডিটেইলস ইনক্লুড করতে পারেন
    include: {
      tutor: true,
      student: true
    }
  });
  return result;
};
var getMyBookingsFromDB = async (userId, role) => {
  let whereCondition = {};
  if (role === "STUDENT") {
    whereCondition = { studentId: userId };
  } else if (role === "TUTOR") {
    whereCondition = {
      tutor: {
        userId
      }
    };
  }
  const result = await prisma.booking.findMany({
    where: whereCondition,
    include: {
      tutor: {
        include: { user: true }
      },
      student: true
    },
    orderBy: { date: "asc" }
  });
  return result;
};
var cancelBookingFromDB = async (bookingId, userId, role) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { tutor: true }
  });
  if (!booking) {
    throw new Error("Booking not found!");
  }
  const isStudent = booking.studentId === userId;
  const isTutor = booking.tutor.userId === userId;
  if (!isStudent && !isTutor) {
    throw new Error("You are not authorized to cancel this booking!");
  }
  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.CANCELLED
    }
  });
  return result;
};
var updateBookingFromDB = async (bookingId, userId, role) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { tutor: true }
  });
  if (!booking) {
    throw new Error("Booking not found!");
  }
  const isStudent = booking.studentId === userId;
  const isTutor = booking.tutor.userId === userId;
  if (!isStudent && !isTutor) {
    throw new Error("You are not authorized to cancel this booking!");
  }
  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: BookingStatus.COMPLETED
    }
  });
  return result;
};
var autoUpdateBookingStatus = async () => {
  const currentTime = /* @__PURE__ */ new Date();
  const result = await prisma.booking.updateMany({
    where: {
      status: BookingStatus.BOOKED,
      date: {
        lt: currentTime
        // বর্তমান সময়ের চেয়ে কম (অতীতের তারিখ)
      }
    },
    data: {
      status: BookingStatus.COMPLETED
    }
  });
  return result;
};
var isTutorOwner = async (tutorProfileId, loggedInUserId) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: {
      userId: tutorProfileId
    },
    select: {
      id: true
      // টিউটর প্রোফাইল টেবিল থেকে userId নিচ্ছি
    }
  });
  console.log("tutorProfileId", tutorProfileId);
  console.log("tutor.id", tutor?.id);
  console.log("loggedInUserId", loggedInUserId);
  return tutor?.id;
};
var getTutorSessionsbyIdFromDB = async (id) => {
  return await prisma.booking.findMany({
    where: {
      tutorId: id
      // এখানে টিউটর প্রোফাইল আইডি ব্যবহার হচ্ছে
    },
    include: {
      student: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    },
    orderBy: {
      date: "desc"
    }
  });
};
var bookingService = {
  createBooking,
  getAllBooking,
  createBookingIntoDB,
  getMyBookingsFromDB,
  cancelBookingFromDB,
  autoUpdateBookingStatus,
  getTutorSessionsbyIdFromDB,
  isTutorOwner,
  updateBookingFromDB
};

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/booking/booking.controller.ts
var createBooking2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "unauthorized"
      });
    }
    const result = await bookingService.createBooking(req.body, user.id);
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Booking creation failed",
      details: e
    });
  }
};
var getAllBooking2 = async (req, res) => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search : void 0;
    const status = req.query.status;
    const tutorId2 = req.query.tutorId;
    const studentId = req.query.studentId;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    const result = await bookingService.getAllBooking({
      search,
      status,
      tutorId: tutorId2,
      studentId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Booking retrieval failed",
      details: e
    });
  }
};
var createBookingIntoDB2 = async (req, res) => {
  try {
    const bookingData = req.body;
    const result = await bookingService.createBookingIntoDB(bookingData);
    return res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      data: result
    });
  } catch (error) {
    const statusCode = error.message.includes("already booked") ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
var getMyBookingsFromDB2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    if (!userId || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please login again."
      });
    }
    const result = await bookingService.getMyBookingsFromDB(userId, role);
    return res.status(200).json({
      success: true,
      message: `Successfully retrieved bookings for ${role.toLowerCase()}`,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
var cancelBookingFromDB2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const role = req.user?.role;
    console.log("concel", id);
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Booking ID"
      });
    }
    if (!userId || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please login again."
      });
    }
    const result = await bookingService.cancelBookingFromDB(
      id,
      userId,
      role
    );
    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to cancel booking"
    });
  }
};
var updateBookingFromDB2 = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const role = req.user?.role;
    console.log("concel", id);
    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid Booking ID"
      });
    }
    if (!userId || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please login again."
      });
    }
    const result = await bookingService.updateBookingFromDB(
      id,
      userId,
      role
    );
    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to cancel booking"
    });
  }
};
var getTutorSessionsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (user.role !== "ADMIN" && user.id !== id) {
      res.status(403).json({
        success: false,
        message: "Forbidden: You can only access your own sessions"
      });
      return;
    }
    const tutorid = await bookingService.isTutorOwner(id, user.id);
    const result = await bookingService.getTutorSessionsbyIdFromDB(tutorid);
    res.status(200).json({
      success: true,
      message: "Tutor sessions retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
var BookingController = {
  createBooking: createBooking2,
  getAllBooking: getAllBooking2,
  createBookingIntoDB: createBookingIntoDB2,
  getMyBookingsFromDB: getMyBookingsFromDB2,
  cancelBookingFromDB: cancelBookingFromDB2,
  getTutorSessionsByID,
  updateBookingFromDB: updateBookingFromDB2
};

// src/lib/auth.ts
var import_better_auth = require("better-auth");
var import_prisma2 = require("better-auth/adapters/prisma");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_plugins = require("better-auth/plugins");
var transporter = import_nodemailer.default.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var auth = (0, import_better_auth.betterAuth)({
  database: (0, import_prisma2.prismaAdapter)(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  baseURL: process.env.APP_URL,
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "STUDENT",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"SkilBridge" <team@skillBridge.email>',
          to: user.email,
          subject: "Verify your email \u2714",
          text: "Hello world?",
          // Plain-text version of the message
          html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td align="center" style="background:#2563eb; padding:24px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px;">
                  SkillBridge
                </h1>
                <p style="margin:8px 0 0; color:#e0e7ff; font-size:14px;">
                  Find the right tutor. Learn with confidence.
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px; color:#333333;">
                <h2 style="margin-top:0;">${user.name}Verify your email address</h2>

                <p style="font-size:15px; line-height:1.6;">
                  Welcome to <strong>SkillBridge</strong> \u{1F393} <br />
                  You're just one step away from connecting with expert tutors and starting your learning journey.
                </p>

                <p style="font-size:15px; line-height:1.6;">
                  Please confirm your email address by clicking the button below:
                </p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
                  <tr>
                    <td align="center">
                      <a href="${verificationUrl}"
                         style="
                           background:#2563eb;
                           color:#ffffff;
                           text-decoration:none;
                           padding:14px 28px;
                           border-radius:6px;
                           font-size:16px;
                           font-weight:bold;
                           display:inline-block;
                         ">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:14px; color:#555;">
                  If the button doesn\u2019t work, copy and paste this link into your browser:
                </p>

                <p style="font-size:13px; word-break:break-all; color:#2563eb;">
                  ${verificationUrl}
                </p>

                <p style="font-size:14px; color:#777; margin-top:32px;">
                  If you did not create an account on SkillBridge, you can safely ignore this email.
                </p>

                <p style="font-size:14px; margin-top:24px;">
                  Happy learning! \u{1F4D8}<br />
                  <strong>\u2014 The SkillBridge Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f1f5f9; padding:16px; font-size:12px; color:#777;">
                \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} SkillBridge. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
        });
        console.log("Message sent:", info.messageId);
      } catch (err) {
        console.error("Error sending verification email:", err);
        throw err;
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  },
  // account: { skipStateCookieCheck: true }, // solved redirect issue
  advanced: {
    cookies: {
      session_token: {
        name: "session_token",
        // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      },
      state: {
        name: "session_token",
        // Force this exact name
        attributes: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          partitioned: true
        }
      }
    }
  },
  plugins: [(0, import_plugins.oAuthProxy)()]
});

// src/middleware/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
      }
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required"
        });
      }
      ;
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!! You don't have enough permission to access this resource."
        });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
var auth_default = auth2;

// src/modules/booking/booking.router.ts
var router = import_express.default.Router();
router.get(
  "/",
  auth_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */),
  BookingController.getMyBookingsFromDB
);
router.get(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */),
  BookingController.getTutorSessionsByID
);
router.post(
  "/",
  auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */),
  BookingController.createBookingIntoDB
);
router.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */),
  BookingController.cancelBookingFromDB
);
router.patch(
  "/complete/:id",
  auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */),
  BookingController.updateBookingFromDB
);
var bookingRouter = router;

// src/app.ts
var import_node = require("better-auth/node");
var import_cors = __toESM(require("cors"), 1);

// src/modules/tutorProfile/tutorProfile.router.ts
var import_express2 = __toESM(require("express"), 1);

// src/modules/tutorProfile/tutorProfile.sevice.ts
var createTutorProfile = async (data) => {
  const result = await prisma.tutorProfile.create({
    data
  });
  return result;
};
var getAllTutorProfile = async (payload) => {
  const { search, categoryId, maxPrice, minRating } = payload;
  const where = {};
  if (categoryId && categoryId !== "undefined") {
    where.categories = {
      some: {
        id: categoryId
      }
    };
  }
  if (search && search !== "undefined") {
    where.OR = [
      { bio: { contains: search, mode: "insensitive" } },
      { user: { name: { contains: search, mode: "insensitive" } } }
    ];
  }
  const andConditions = [];
  if (maxPrice && !isNaN(Number(maxPrice))) {
    andConditions.push({ hourlyFee: { lte: Number(maxPrice) } });
  }
  if (minRating && !isNaN(Number(minRating))) {
    andConditions.push({ rating: { gte: Number(minRating) } });
  }
  if (andConditions.length > 0) {
    where.AND = andConditions;
  }
  const result = await prisma.tutorProfile.findMany({
    where,
    // এখানে তৈরি করা dynamic object-টি পাস করুন
    include: {
      user: { select: { id: true, name: true, email: true, image: true } },
      categories: true,
      reviews: true
    },
    orderBy: { rating: "desc" }
  });
  return result;
};
var getSingleTutorProfileById = async (id) => {
  const result = await prisma.tutorProfile.findUnique({
    where: { userId: id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      },
      categories: true,
      availability: true,
      bookings: true,
      reviews: true
    }
  });
  return result;
};
var getAllTutorUser = async (payload) => {
  const whereCondition = { role: "TUTOR" };
  if (payload.search) {
    whereCondition.name = {
      contains: payload.search,
      mode: "insensitive"
    };
  }
  const result = await prisma.user.findMany({
    where: whereCondition,
    include: { tutorProfile: true }
  });
  return result;
};
var updateTutorProfile = async (userId, data, isAdmin) => {
  if (!isAdmin) {
    throw new Error("You are unauthorized!");
  }
  const { categoryIds, ...profileData } = data;
  const result = await prisma.tutorProfile.upsert({
    where: {
      userId
    },
    update: {
      ...profileData,
      // Sync categories: This removes old ones and adds the new ones
      categories: {
        set: categoryIds?.map((id) => ({ id })) || []
      }
    },
    create: {
      ...profileData,
      userId,
      // Connect categories on creation
      categories: {
        connect: categoryIds?.map((id) => ({ id })) || []
      }
    }
  });
  return result;
};
var getSingleTutorUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  });
};
var updateTutorUserProfileInDBbyId = async (userId, updateData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...updateData },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        status: true
      }
    });
    return updatedUser;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("User not found.");
    }
    throw new Error(error.message || "Failed to update user profile.");
  }
};
var tutorProfileService = {
  createTutorProfile,
  getAllTutorProfile,
  getSingleTutorProfileById,
  getAllTutorUser,
  updateTutorProfile,
  getSingleTutorUserById,
  updateTutorUserProfileInDBbyId
};

// src/modules/tutorProfile/tutorProfile.controller.ts
var createTutorProfile2 = async (req, res) => {
  try {
    const result = await tutorProfileService.createTutorProfile(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
    console.log("Tutor Profile created successfully", result);
  } catch (e) {
    res.status(400).json({
      error: "Tutor Profile creation failed",
      details: e
    });
  }
};
var getAllTutorProfile2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const result = await tutorProfileService.getAllTutorProfile({ search: searchString });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch tutor profiles",
      details: e
    });
  }
};
var getSingleTutorProfileById2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required!");
    }
    const result = await tutorProfileService.getSingleTutorProfileById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e
    });
  }
};
var getAllTutorUser2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const result = await tutorProfileService.getAllTutorUser({ search: searchString });
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch tutor profiles",
      message: e instanceof Error ? e.message : "Unknown error"
    });
  }
};
var updateTutorProfile2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { id } = req.params;
    const isAdmin = user.role === "TUTOR" /* TUTOR */;
    const result = await tutorProfileService.updateTutorProfile(id, req.body, isAdmin);
    res.status(200).json({
      success: true,
      message: "Tutor profile updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "Tutor profile update failed",
      details: e
    });
  }
};
var getSingleTutorUserById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (loggedInUser.role !== "ADMIN" && loggedInUser.id !== id) {
      return res.status(403).json({
        error: "Forbidden",
        message: "You can only view your own profile."
      });
    }
    const result = await tutorProfileService.getSingleTutorUserById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Fetch failed",
      details: e.message
    });
  }
};
var updateTutorUserProfileInDBbyId2 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please login first"
      });
    }
    if (!id) {
      throw new Error("User ID is required");
    }
    if (loggedInUser.role !== "ADMIN" && loggedInUser.id !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You can only update your own profile"
      });
    }
    const result = await tutorProfileService.updateTutorUserProfileInDBbyId(id, updateData);
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while updating profile"
    });
  }
};
var tutorProfileController = {
  createTutorProfile: createTutorProfile2,
  getAllTutorProfile: getAllTutorProfile2,
  getSingleTutorProfileById: getSingleTutorProfileById2,
  getAllTutorUser: getAllTutorUser2,
  updateTutorProfile: updateTutorProfile2,
  getSingleTutorUserById: getSingleTutorUserById2,
  updateTutorUserProfileInDBbyId: updateTutorUserProfileInDBbyId2
};

// src/modules/tutorProfile/tutorProfile.router.ts
var router2 = import_express2.default.Router();
router2.get(
  "/",
  tutorProfileController.getAllTutorProfile
);
router2.get(
  "/:id",
  tutorProfileController.getSingleTutorProfileById
);
router2.get(
  "/user/:id",
  auth_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */),
  tutorProfileController.getSingleTutorUserById
);
router2.post(
  "/",
  tutorProfileController.createTutorProfile
);
router2.get(
  "/",
  tutorProfileController.getAllTutorUser
);
router2.patch(
  "/:id",
  auth_default("TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */),
  tutorProfileController.updateTutorProfile
);
router2.patch(
  "/user/:id",
  auth_default("TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */),
  tutorProfileController.updateTutorUserProfileInDBbyId
);
var tutorProfileRouter = router2;

// src/modules/category/category.router.ts
var import_express3 = __toESM(require("express"), 1);

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      tutorProfiles: true
    }
  });
};
var deleteCategory = async (id, isAdmin) => {
  const postData = await prisma.category.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  return await prisma.category.delete({
    where: {
      id
    }
  });
};
var updateCategory = async (postId, data, isAdmin) => {
  const postData = await prisma.category.findUniqueOrThrow({
    where: {
      id: postId
    },
    select: {
      id: true
    }
  });
  if (!isAdmin) {
    throw new Error("You are unauthorized!");
  }
  const result = await prisma.category.update({
    where: {
      id: postData.id
    },
    data
  });
  return result;
};
var getSingleCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      tutorProfiles: true
    }
  });
};
var categoryService = {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
  getSingleCategoryById
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json(result);
    console.log("Category created successfully", result);
  } catch (e) {
    next(e);
  }
};
var getAllCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Category fetched failed",
      details: e
    });
  }
};
var deleteCategory2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    if ("ADMIN" /* ADMIN */ !== user?.role) {
      throw new Error("You don't have permission to delete this category!");
    }
    const { id } = req.params;
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await categoryService.deleteCategory(id, isAdmin);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Category delete failed!";
    res.status(400).json({
      error: errorMessage,
      details: e
    });
  }
};
var updateCategory2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { id } = req.params;
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await categoryService.updateCategory(id, req.body, isAdmin);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "Category update failed",
      details: e
    });
  }
};
var getSingleCategoryById2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Category ID is required");
    }
    const result = await categoryService.getSingleCategoryById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Category fetched failed",
      details: e
    });
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategory,
  deleteCategory: deleteCategory2,
  updateCategory: updateCategory2,
  getSingleCategoryById: getSingleCategoryById2
};

// src/modules/category/category.router.ts
var router3 = import_express3.default.Router();
router3.post(
  "/",
  categoryController.createCategory
);
router3.get(
  "/",
  categoryController.getAllCategory
);
router3.get(
  "/:id",
  categoryController.getSingleCategoryById
);
router3.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  categoryController.deleteCategory
);
router3.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  categoryController.updateCategory
);
var categoryRouter = router3;

// src/modules/availability/availability.router.ts
var import_express4 = __toESM(require("express"), 1);

// src/modules/availability/availability.service.ts
var createAvailability = async (data) => {
  const result = await prisma.availability.create({
    data
  });
  return result;
};
var getAvailabilityById = async (id) => {
  const result = await prisma.availability.findMany({
    where: { tutorId: id },
    include: {
      tutor: {
        select: {
          id: true,
          userId: true,
          bio: true,
          hourlyFee: true,
          monthlyFee: true,
          experience: true,
          rating: true
        }
      }
    }
  });
  return result;
};
var deleteAvailabilityBYid = async (id, isTutor) => {
  const postData = await prisma.availability.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  return await prisma.availability.delete({
    where: {
      id
    }
  });
};
var availabilityService = {
  createAvailability,
  getAvailabilityById,
  deleteAvailabilityBYid
};

// src/modules/availability/availability.controller.ts
var createAvailability2 = async (req, res) => {
  try {
    const result = await availabilityService.createAvailability(req.body);
    res.status(201).json(result);
    console.log("Availability created successfully", result);
  } catch (e) {
    res.status(400).json({
      error: "Availability creation failed",
      details: e
    });
  }
};
var getAvailabilityById2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required!");
    }
    const result = await availabilityService.getAvailabilityById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Post creation failed",
      details: e
    });
  }
};
var deleteAvailabilityBYid2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    if ("TUTOR" /* TUTOR */ !== user?.role) {
      throw new Error("You don't have permission to delete this class!");
    }
    const { id } = req.params;
    const isTutor = user.role === "TUTOR" /* TUTOR */;
    const result = await availabilityService.deleteAvailabilityBYid(id, isTutor);
    res.status(200).json({
      success: true,
      message: "Availiability deleted successfully",
      data: result
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Availiability delete failed!";
    res.status(400).json({
      error: errorMessage,
      details: e
    });
  }
};
var availabilityController = {
  createAvailability: createAvailability2,
  getAvailabilityById: getAvailabilityById2,
  deleteAvailabilityBYid: deleteAvailabilityBYid2
};

// src/modules/availability/availability.router.ts
var router4 = import_express4.default.Router();
router4.post(
  "/",
  availabilityController.createAvailability
);
router4.get(
  "/:id",
  availabilityController.getAvailabilityById
);
router4.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */),
  availabilityController.deleteAvailabilityBYid
);
var availabilityRouter = router4;

// src/modules/review/review.router.ts
var import_express5 = __toESM(require("express"), 1);

// src/modules/review/review.service.ts
var createReview = async (data) => {
  const result = await prisma.review.create({
    data
  });
  return result;
};
var createReviewIntoDB = async (payload) => {
  const { rating, comment, tutorId: tutorId2, studentId, bookingId } = payload;
  const isAlreadyReviewed = await prisma.review.findUnique({
    where: { bookingId }
  });
  if (isAlreadyReviewed) {
    throw new Error("You have already submitted a review for this booking.");
  }
  const result = await prisma.$transaction(async (tx) => {
    const newReview = await tx.review.create({
      data: {
        rating,
        comment,
        tutorId: tutorId2,
        studentId,
        bookingId
      }
    });
    const stats = await tx.review.aggregate({
      where: {
        tutorId: tutorId2
      },
      _avg: {
        rating: true
      }
    });
    const averageRating = stats._avg.rating || 0;
    await tx.tutorProfile.update({
      where: {
        id: tutorId2
      },
      data: {
        rating: parseFloat(averageRating.toFixed(1))
        // ১ দশমিক ঘর পর্যন্ত রাখা (যেমন: 4.5)
      }
    });
    await tx.booking.update({
      where: { id: bookingId },
      data: {
        status: "COMPLETED"
      }
    });
    return newReview;
  });
  return result;
};
var tutorId = async (tutorProfileId, loggedInUserId) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: {
      userId: tutorProfileId
    },
    select: {
      id: true
      // টিউটর প্রোফাইল টেবিল থেকে userId নিচ্ছি
    }
  });
  return tutor?.id;
};
var getTutorReviewsFromDB = async (tutorProfileId) => {
  const reviews = await prisma.review.findMany({
    where: {
      tutorId: tutorProfileId
    },
    include: {
      student: {
        select: {
          name: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews : 0;
  return {
    rating: Number(averageRating.toFixed(1)),
    // দশমিকের পর ১ ঘর পর্যন্ত রাখা
    reviews: reviews.map((rev) => ({
      id: rev.id,
      rating: rev.rating,
      comment: rev.comment,
      createdAt: rev.createdAt,
      student: {
        name: rev.student.name,
        image: rev.student.image
      }
    }))
  };
};
var reviewService = {
  createReview,
  createReviewIntoDB,
  getTutorReviewsFromDB,
  tutorId
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const result = await reviewService.createReview(req.body);
    res.status(201).json(result);
    console.log("Review created successfully", result);
  } catch (e) {
    res.status(400).json({
      error: "Review creation failed",
      details: e
    });
  }
};
var createReviewIntoDB2 = async (req, res) => {
  try {
    const reviewData = req.body;
    const userId = req.user?.id;
    if (!userId || userId !== reviewData.studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! You can only review your own bookings."
      });
    }
    const result = await reviewService.createReviewIntoDB(reviewData);
    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: result
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to submit review"
    });
  }
};
var getTutorReviewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const tutorId2 = await reviewService.tutorId(id, user.id);
    const result = await reviewService.getTutorReviewsFromDB(tutorId2);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Tutor profile not found"
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Tutor reviews retrieved successfully",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
var reviewController = {
  createReview: createReview2,
  createReviewIntoDB: createReviewIntoDB2,
  getTutorReviewsById
};

// src/modules/review/review.router.ts
var router5 = import_express5.default.Router();
router5.get(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */),
  reviewController.getTutorReviewsById
);
router5.post(
  "/",
  auth_default("STUDENT" /* STUDENT */),
  reviewController.createReviewIntoDB
);
var reviewRouter = router5;

// src/middleware/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields!";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation failed because it depends on one or more records that were required but not found.";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication failed. Please check your creditials!";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Can't reach database server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/modules/users/user.router.ts
var import_express6 = __toESM(require("express"), 1);

// src/modules/users/user.service.ts
var getAlluser = async ({
  search,
  status,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const whereCondition = {};
  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } }
    ];
  }
  if (status) {
    whereCondition.status = status;
  }
  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder
      },
      // You can also include related data here
      include: {
        tutorProfile: true
      }
    }),
    prisma.user.count({ where: whereCondition })
  ]);
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var updateUser = async (postId, data, isAdmin) => {
  const updateData = await prisma.user.findUniqueOrThrow({
    where: {
      id: postId
    },
    select: {
      id: true
    }
  });
  if (!isAdmin) {
    throw new Error("You are unauthorized!");
  }
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== void 0 && value !== "")
  );
  if (Object.keys(filteredData).length === 0) {
    throw new Error("No valid data provided for update.");
  }
  const result = await prisma.user.update({
    where: {
      id: updateData.id
    },
    data: filteredData
    // শুধু যেগুলোতে ভ্যালু আছে সেগুলোই আপডেট হবে
  });
  return result;
};
var deleteuser = async (id, isAdmin) => {
  const postData = await prisma.user.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true
    }
  });
  return await prisma.user.delete({
    where: {
      id
    }
  });
};
var getSingleStudentById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id
    }
  });
};
var updateUserInDBbyId = async (userId, updateData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { ...updateData },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        phone: true,
        role: true,
        status: true
      }
    });
    return updatedUser;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("User not found.");
    }
    throw new Error(error.message || "Failed to update user profile.");
  }
};
var getAdminAnalyticsFromDB = async () => {
  const [
    totalUser,
    totalTutor,
    totalCategory,
    totalReview,
    bookings,
    totalBanUser
  ] = await Promise.all([
    prisma.user.count(),
    prisma.tutorProfile.count(),
    prisma.category.count(),
    prisma.review.count(),
    prisma.booking.findMany({
      select: {
        status: true,
        duration: true,
        tutor: { select: { hourlyFee: true } }
      }
    }),
    prisma.user.count({ where: { status: UserStatus.BANNED } })
  ]);
  const totalBooking = bookings.length;
  const completed = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelled = bookings.filter((b) => b.status === "CANCELLED").length;
  const active = bookings.filter((b) => b.status === "BOOKED").length;
  const totalRevenue = bookings.filter((b) => b.status === "COMPLETED").reduce((acc, curr) => acc + curr.duration / 60 * (curr.tutor?.hourlyFee || 0), 0);
  return {
    totalUser,
    totalTutor,
    totalStudent: totalUser - totalTutor,
    totalBooking,
    completed,
    cancelled,
    active,
    totalReview,
    totalCategory,
    totalBanUser,
    totalRevenue: Math.round(totalRevenue)
  };
};
var userService = {
  getAlluser,
  updateUser,
  deleteuser,
  getSingleStudentById,
  updateUserInDBbyId,
  getAdminAnalyticsFromDB
};

// src/modules/users/user..controller.ts
var getAllUser = async (req, res) => {
  try {
    const { search, status } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const userStatus = Object.values(UserStatus).includes(status) ? status : void 0;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    const result = await userService.getAlluser({
      search: searchString,
      status: userStatus,
      // This solves the missing property error
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      ...result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch users",
      details: e instanceof Error ? e.message : e
    });
  }
};
var updateUser2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    const { id } = req.params;
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await userService.updateUser(id, req.body, isAdmin);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "User update failed",
      details: e
    });
  }
};
var deleteUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are unauthorized!");
    }
    console.log("User info from request:", user);
    if ("ADMIN" /* ADMIN */ !== user?.role) {
      throw new Error("You don't have permission to delete this class!");
    }
    const { id } = req.params;
    const isAdmin = user.role === "ADMIN" /* ADMIN */;
    const result = await userService.deleteuser(id, isAdmin);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "User delete failed!";
    res.status(400).json({
      error: errorMessage,
      details: e
    });
  }
};
var getSingleStudentById2 = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("User ID is required");
    }
    const result = await userService.getSingleStudentById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Category fetched failed",
      details: e
    });
  }
};
var updateUserInDBbyId2 = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log("from update student profile", id);
    if (!id) {
      throw new Error("User ID is required");
    }
    console.log("userId", id);
    const result = await userService.updateUserInDBbyId(id, updateData);
    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "An error occurred while updating profile"
    });
  }
};
var getAdminAnalytics = async (req, res) => {
  try {
    const result = await userService.getAdminAnalyticsFromDB();
    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch analytics",
      details: e instanceof Error ? e.message : e
    });
  }
};
var userController = {
  getAllUser,
  updateUser: updateUser2,
  deleteUser,
  getSingleStudentById: getSingleStudentById2,
  updateUserInDBbyId: updateUserInDBbyId2,
  getAdminAnalytics
};

// src/modules/users/user.router.ts
var router6 = import_express6.default.Router();
router6.get(
  "/",
  auth_default("ADMIN" /* ADMIN */),
  userController.getAllUser
);
router6.get(
  "/analytics",
  // auth(UserRole.ADMIN),
  userController.getAdminAnalytics
);
router6.get(
  "/:id",
  auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */),
  userController.getSingleStudentById
);
router6.delete(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  userController.deleteUser
);
router6.patch(
  "/:id",
  auth_default("ADMIN" /* ADMIN */),
  userController.updateUser
);
router6.patch(
  "/student/:id",
  auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */),
  userController.updateUserInDBbyId
);
var userRouter = router6;

// src/app.ts
var app = (0, import_express7.default)();
app.use((0, import_cors.default)({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  // allowedHeaders: [["Content-Type", "Authorization", "Cookie"],
}));
app.all("/api/auth/*splat", (0, import_node.toNodeHandler)(auth));
app.use(import_express7.default.json());
app.use(import_express7.default.urlencoded({ extended: true }));
app.use("/dashboard/booking", bookingRouter);
app.use(
  "/dashboard/user",
  userRouter
);
app.use("/tutors/tutors-profile", tutorProfileRouter);
app.use("/tutors/category", categoryRouter);
app.use("/category", categoryRouter);
app.use("/tutor/availability", availabilityRouter);
app.use("/tutors/review", reviewRouter);
app.use(globalErrorHandler_default);
app.get("/", (req, res) => {
  res.send("Hello world!");
});
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 3e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.cjs.map