/* eslint-disable */
import * as Long from 'long'
import * as _m0 from 'protobufjs/minimal'

export const protobufPackage = 'auth'

export interface RegisterRequest {
  email: string
  password: string
}

export interface RegisterResponse {
  status: number
  error: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  status: number
  error: string
  token: string
}

export interface ValidateRequest {
  token: string
}

export interface ValidateResponse {
  status: number
  error: string
  userId: number
}

function createBaseRegisterRequest(): RegisterRequest {
  return { email: '', password: '' }
}

export const RegisterRequest = {
  encode(
    message: RegisterRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.email !== '') {
      writer.uint32(10).string(message.email)
    }
    if (message.password !== '') {
      writer.uint32(18).string(message.password)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRegisterRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string()
          break
        case 2:
          message.password = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RegisterRequest {
    return {
      email: isSet(object.email) ? String(object.email) : '',
      password: isSet(object.password) ? String(object.password) : '',
    }
  },

  toJSON(message: RegisterRequest): unknown {
    const obj: any = {}
    message.email !== undefined && (obj.email = message.email)
    message.password !== undefined && (obj.password = message.password)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<RegisterRequest>, I>>(
    object: I,
  ): RegisterRequest {
    const message = createBaseRegisterRequest()
    message.email = object.email ?? ''
    message.password = object.password ?? ''
    return message
  },
}

function createBaseRegisterResponse(): RegisterResponse {
  return { status: 0, error: '' }
}

export const RegisterResponse = {
  encode(
    message: RegisterResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int64(message.status)
    }
    if (message.error !== '') {
      writer.uint32(18).string(message.error)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegisterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseRegisterResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.status = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.error = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): RegisterResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: isSet(object.error) ? String(object.error) : '',
    }
  },

  toJSON(message: RegisterResponse): unknown {
    const obj: any = {}
    message.status !== undefined && (obj.status = Math.round(message.status))
    message.error !== undefined && (obj.error = message.error)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<RegisterResponse>, I>>(
    object: I,
  ): RegisterResponse {
    const message = createBaseRegisterResponse()
    message.status = object.status ?? 0
    message.error = object.error ?? ''
    return message
  },
}

function createBaseLoginRequest(): LoginRequest {
  return { email: '', password: '' }
}

export const LoginRequest = {
  encode(
    message: LoginRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.email !== '') {
      writer.uint32(10).string(message.email)
    }
    if (message.password !== '') {
      writer.uint32(18).string(message.password)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseLoginRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string()
          break
        case 2:
          message.password = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LoginRequest {
    return {
      email: isSet(object.email) ? String(object.email) : '',
      password: isSet(object.password) ? String(object.password) : '',
    }
  },

  toJSON(message: LoginRequest): unknown {
    const obj: any = {}
    message.email !== undefined && (obj.email = message.email)
    message.password !== undefined && (obj.password = message.password)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<LoginRequest>, I>>(
    object: I,
  ): LoginRequest {
    const message = createBaseLoginRequest()
    message.email = object.email ?? ''
    message.password = object.password ?? ''
    return message
  },
}

function createBaseLoginResponse(): LoginResponse {
  return { status: 0, error: '', token: '' }
}

export const LoginResponse = {
  encode(
    message: LoginResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int64(message.status)
    }
    if (message.error !== '') {
      writer.uint32(18).string(message.error)
    }
    if (message.token !== '') {
      writer.uint32(26).string(message.token)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LoginResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseLoginResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.status = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.error = reader.string()
          break
        case 3:
          message.token = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): LoginResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: isSet(object.error) ? String(object.error) : '',
      token: isSet(object.token) ? String(object.token) : '',
    }
  },

  toJSON(message: LoginResponse): unknown {
    const obj: any = {}
    message.status !== undefined && (obj.status = Math.round(message.status))
    message.error !== undefined && (obj.error = message.error)
    message.token !== undefined && (obj.token = message.token)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<LoginResponse>, I>>(
    object: I,
  ): LoginResponse {
    const message = createBaseLoginResponse()
    message.status = object.status ?? 0
    message.error = object.error ?? ''
    message.token = object.token ?? ''
    return message
  },
}

function createBaseValidateRequest(): ValidateRequest {
  return { token: '' }
}

export const ValidateRequest = {
  encode(
    message: ValidateRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.token !== '') {
      writer.uint32(10).string(message.token)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseValidateRequest()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.token = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ValidateRequest {
    return {
      token: isSet(object.token) ? String(object.token) : '',
    }
  },

  toJSON(message: ValidateRequest): unknown {
    const obj: any = {}
    message.token !== undefined && (obj.token = message.token)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<ValidateRequest>, I>>(
    object: I,
  ): ValidateRequest {
    const message = createBaseValidateRequest()
    message.token = object.token ?? ''
    return message
  },
}

function createBaseValidateResponse(): ValidateResponse {
  return { status: 0, error: '', userId: 0 }
}

export const ValidateResponse = {
  encode(
    message: ValidateResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.status !== 0) {
      writer.uint32(8).int64(message.status)
    }
    if (message.error !== '') {
      writer.uint32(18).string(message.error)
    }
    if (message.userId !== 0) {
      writer.uint32(24).int64(message.userId)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseValidateResponse()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.status = longToNumber(reader.int64() as Long)
          break
        case 2:
          message.error = reader.string()
          break
        case 3:
          message.userId = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ValidateResponse {
    return {
      status: isSet(object.status) ? Number(object.status) : 0,
      error: isSet(object.error) ? String(object.error) : '',
      userId: isSet(object.userId) ? Number(object.userId) : 0,
    }
  },

  toJSON(message: ValidateResponse): unknown {
    const obj: any = {}
    message.status !== undefined && (obj.status = Math.round(message.status))
    message.error !== undefined && (obj.error = message.error)
    message.userId !== undefined && (obj.userId = Math.round(message.userId))
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<ValidateResponse>, I>>(
    object: I,
  ): ValidateResponse {
    const message = createBaseValidateResponse()
    message.status = object.status ?? 0
    message.error = object.error ?? ''
    message.userId = object.userId ?? 0
    return message
  },
}

export interface AuthService {
  Register(request: RegisterRequest): Promise<RegisterResponse>
  Login(request: LoginRequest): Promise<LoginResponse>
  Validate(request: ValidateRequest): Promise<ValidateResponse>
}

export class AuthServiceClientImpl implements AuthService {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
    this.Register = this.Register.bind(this)
    this.Login = this.Login.bind(this)
    this.Validate = this.Validate.bind(this)
  }
  Register(request: RegisterRequest): Promise<RegisterResponse> {
    const data = RegisterRequest.encode(request).finish()
    const promise = this.rpc.request('auth.AuthService', 'Register', data)
    return promise.then(data => RegisterResponse.decode(new _m0.Reader(data)))
  }

  Login(request: LoginRequest): Promise<LoginResponse> {
    const data = LoginRequest.encode(request).finish()
    const promise = this.rpc.request('auth.AuthService', 'Login', data)
    return promise.then(data => LoginResponse.decode(new _m0.Reader(data)))
  }

  Validate(request: ValidateRequest): Promise<ValidateResponse> {
    const data = ValidateRequest.encode(request).finish()
    const promise = this.rpc.request('auth.AuthService', 'Validate', data)
    return promise.then(data => ValidateResponse.decode(new _m0.Reader(data)))
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
declare var global: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

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
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never
    }

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any
  _m0.configure()
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
