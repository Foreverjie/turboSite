/* eslint-disable */
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = 'bookStorePackage'

export interface BookItem {
  id: number
  book: string
}

export interface BookRequest {
  id: number
}

export interface BookList {
  books: BookItem[]
}

export interface Empty {}

function createBaseBookItem(): BookItem {
  return { id: 0, book: '' }
}

export const BookItem = {
  encode(
    message: BookItem,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id)
    }
    if (message.book !== '') {
      writer.uint32(18).string(message.book)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBookItem()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32()
          break
        case 2:
          message.book = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BookItem {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      book: isSet(object.book) ? String(object.book) : '',
    }
  },

  toJSON(message: BookItem): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = Math.round(message.id))
    message.book !== undefined && (obj.book = message.book)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BookItem>, I>>(object: I): BookItem {
    const message = createBaseBookItem()
    message.id = object.id ?? 0
    message.book = object.book ?? ''
    return message
  },
}

function createBaseBookRequest(): BookRequest {
  return { id: 0 }
}

export const BookRequest = {
  encode(
    message: BookRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBookRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BookRequest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
    }
  },

  toJSON(message: BookRequest): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = Math.round(message.id))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BookRequest>, I>>(
    object: I,
  ): BookRequest {
    const message = createBaseBookRequest()
    message.id = object.id ?? 0
    return message
  },
}

function createBaseBookList(): BookList {
  return { books: [] }
}

export const BookList = {
  encode(
    message: BookList,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    for (const v of message.books) {
      BookItem.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BookList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseBookList()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.books.push(BookItem.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): BookList {
    return {
      books: Array.isArray(object?.books)
        ? object.books.map((e: any) => BookItem.fromJSON(e))
        : [],
    }
  },

  toJSON(message: BookList): unknown {
    const obj: any = {}
    if (message.books) {
      obj.books = message.books.map(e => (e ? BookItem.toJSON(e) : undefined))
    } else {
      obj.books = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<BookList>, I>>(object: I): BookList {
    const message = createBaseBookList()
    message.books = object.books?.map(e => BookItem.fromPartial(e)) || []
    return message
  },
}

function createBaseEmpty(): Empty {
  return {}
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseEmpty()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): Empty {
    return {}
  },

  toJSON(_: Empty): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty()
    return message
  },
}

export interface Book {
  createBook(request: BookItem): Promise<BookItem>
  readBook(request: BookRequest): Promise<BookItem>
  readBooks(request: Empty): Promise<BookList>
}

export class BookClientImpl implements Book {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.createBook = this.createBook.bind(this)
    this.readBook = this.readBook.bind(this)
    this.readBooks = this.readBooks.bind(this)
  }
  createBook(request: BookItem): Promise<BookItem> {
    const data = BookItem.encode(request).finish()
    const promise = this.rpc.request(
      'bookStorePackage.Book',
      'createBook',
      data,
    )
    return promise.then(data => BookItem.decode(new _m0.Reader(data)))
  }

  readBook(request: BookRequest): Promise<BookItem> {
    const data = BookRequest.encode(request).finish()
    const promise = this.rpc.request('bookStorePackage.Book', 'readBook', data)
    return promise.then(data => BookItem.decode(new _m0.Reader(data)))
  }

  readBooks(request: Empty): Promise<BookList> {
    const data = Empty.encode(request).finish()
    const promise = this.rpc.request('bookStorePackage.Book', 'readBooks', data)
    return promise.then(data => BookList.decode(new _m0.Reader(data)))
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
