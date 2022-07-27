/**
 * @fileoverview gRPC-Web generated client stub for bookStorePackage
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as bookStore_pb from './bookStore_pb';


export class BookClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorcreateBook = new grpcWeb.MethodDescriptor(
    '/bookStorePackage.Book/createBook',
    grpcWeb.MethodType.UNARY,
    bookStore_pb.BookItem,
    bookStore_pb.BookItem,
    (request: bookStore_pb.BookItem) => {
      return request.serializeBinary();
    },
    bookStore_pb.BookItem.deserializeBinary
  );

  createBook(
    request: bookStore_pb.BookItem,
    metadata: grpcWeb.Metadata | null): Promise<bookStore_pb.BookItem>;

  createBook(
    request: bookStore_pb.BookItem,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: bookStore_pb.BookItem) => void): grpcWeb.ClientReadableStream<bookStore_pb.BookItem>;

  createBook(
    request: bookStore_pb.BookItem,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: bookStore_pb.BookItem) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/bookStorePackage.Book/createBook',
        request,
        metadata || {},
        this.methodDescriptorcreateBook,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/bookStorePackage.Book/createBook',
    request,
    metadata || {},
    this.methodDescriptorcreateBook);
  }

  methodDescriptorreadBook = new grpcWeb.MethodDescriptor(
    '/bookStorePackage.Book/readBook',
    grpcWeb.MethodType.UNARY,
    bookStore_pb.BookRequest,
    bookStore_pb.BookItem,
    (request: bookStore_pb.BookRequest) => {
      return request.serializeBinary();
    },
    bookStore_pb.BookItem.deserializeBinary
  );

  readBook(
    request: bookStore_pb.BookRequest,
    metadata: grpcWeb.Metadata | null): Promise<bookStore_pb.BookItem>;

  readBook(
    request: bookStore_pb.BookRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: bookStore_pb.BookItem) => void): grpcWeb.ClientReadableStream<bookStore_pb.BookItem>;

  readBook(
    request: bookStore_pb.BookRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: bookStore_pb.BookItem) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/bookStorePackage.Book/readBook',
        request,
        metadata || {},
        this.methodDescriptorreadBook,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/bookStorePackage.Book/readBook',
    request,
    metadata || {},
    this.methodDescriptorreadBook);
  }

  methodDescriptorreadBooks = new grpcWeb.MethodDescriptor(
    '/bookStorePackage.Book/readBooks',
    grpcWeb.MethodType.UNARY,
    bookStore_pb.Empty,
    bookStore_pb.BookList,
    (request: bookStore_pb.Empty) => {
      return request.serializeBinary();
    },
    bookStore_pb.BookList.deserializeBinary
  );

  readBooks(
    request: bookStore_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<bookStore_pb.BookList>;

  readBooks(
    request: bookStore_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: bookStore_pb.BookList) => void): grpcWeb.ClientReadableStream<bookStore_pb.BookList>;

  readBooks(
    request: bookStore_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: bookStore_pb.BookList) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/bookStorePackage.Book/readBooks',
        request,
        metadata || {},
        this.methodDescriptorreadBooks,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/bookStorePackage.Book/readBooks',
    request,
    metadata || {},
    this.methodDescriptorreadBooks);
  }

}

