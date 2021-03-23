export namespace Maybe {
	export function wrap<T>(a: T): Maybe<NonNullable<T>> {
		if (a == null) { return new Nothing<NonNullable<T>>(); }
		return new Just<NonNullable<T>>(a as NonNullable<T>);
	};

	export type Maybe<T> = Just<T> | Nothing<T>;

	export class Just<T> {
		constructor(private value: T) { }

		map<U>(f: (a: T) => U): Maybe<NonNullable<U>> {
			return wrap(f(this.value));
		}

		forEach(f: (a: T) => void): void {
			f(this.value);
		}

		flatMap<U>(f: (a: T) => Maybe<U>): Maybe<U> {
			return f(this.value);
		}

		then<U>(f: () => Maybe<U>): Maybe<U> {
			return f();
		}

		isJust(): this is Just<T> { return true; }
		isNothing(): this is Nothing<T> { return false; }
		unsafeGet(): T { return this.value; }
		throwableGet(msg?: string): T { return this.value; }
	}

	export class Nothing<T> {
		constructor(value?: T) { }

		map<U>(f: (a: T) => U): Nothing<NonNullable<U>> {
			return new Nothing();
		}

		forEach(f: (a: T) => void): void { }

		flatMap<U>(f: (a: T) => Maybe<U>): Maybe<U> {
			return new Nothing();
		}

		then<U>(f: () => Maybe<U>): Maybe<U> {
			return new Nothing();
		}

		isJust(): this is Just<T> { return false; }
		isNothing(): this is Nothing<T> { return true; }
		unsafeGet(): null { return null; }
		throwableGet(msg?: string): never { throw new Error(msg ?? 'GetValueFromNothingObjectError'); }
	}
};