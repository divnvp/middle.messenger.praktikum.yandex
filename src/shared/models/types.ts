import Block from '@/shared/utils/block';
import { IMessage } from '@/shared/models/message.interface';
import { Indexed } from '@/shared/models/indexed.type';
import { PlainObject } from '@/shared/models/plain-object.type';
import Route from '@/shared/router/route';

export type EventOrRecord<T> = T | Record<string, () => void>;
export type BlockOrBlockArray = Block | Block[];
export type PlainObjectOrArray = PlainObject | [];
export type MessageOrArray = IMessage | [];
export type IndexedOrUnknown = Indexed | unknown;
export type RouteOrNull = Route | null;
export type DocumentOrRequestBodyOrNull = Document | XMLHttpRequestBodyInit | null | undefined;
export type BlockOrNull = Block | null;
export type ReturnPromise = ReturnType<() => Promise<XMLHttpRequest>>;
