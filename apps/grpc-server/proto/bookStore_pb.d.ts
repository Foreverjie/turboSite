import * as jspb from 'google-protobuf'



export class BookItem extends jspb.Message {
  getId(): number;
  setId(value: number): BookItem;

  getBook(): string;
  setBook(value: string): BookItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookItem.AsObject;
  static toObject(includeInstance: boolean, msg: BookItem): BookItem.AsObject;
  static serializeBinaryToWriter(message: BookItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookItem;
  static deserializeBinaryFromReader(message: BookItem, reader: jspb.BinaryReader): BookItem;
}

export namespace BookItem {
  export type AsObject = {
    id: number,
    book: string,
  }
}

export class BookRequest extends jspb.Message {
  getId(): number;
  setId(value: number): BookRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookRequest): BookRequest.AsObject;
  static serializeBinaryToWriter(message: BookRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookRequest;
  static deserializeBinaryFromReader(message: BookRequest, reader: jspb.BinaryReader): BookRequest;
}

export namespace BookRequest {
  export type AsObject = {
    id: number,
  }
}

export class BookList extends jspb.Message {
  getBooksList(): Array<BookItem>;
  setBooksList(value: Array<BookItem>): BookList;
  clearBooksList(): BookList;
  addBooks(value?: BookItem, index?: number): BookItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookList.AsObject;
  static toObject(includeInstance: boolean, msg: BookList): BookList.AsObject;
  static serializeBinaryToWriter(message: BookList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookList;
  static deserializeBinaryFromReader(message: BookList, reader: jspb.BinaryReader): BookList;
}

export namespace BookList {
  export type AsObject = {
    booksList: Array<BookItem.AsObject>,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

