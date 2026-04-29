import type { H3Error } from "h3";
import type { AppErrorCode } from "../../shared/errors";

export type { AppErrorCode };

export interface AppErrorData {
	code: AppErrorCode;
}

export function throwAppError(
	code: AppErrorCode,
	statusCode: number,
	statusMessage: string,
): never {
	throw createError({
		statusCode,
		statusMessage,
		data: { code } satisfies AppErrorData,
	});
}

export function isAppError(
	err: unknown,
): err is H3Error<AppErrorData> & { data: AppErrorData } {
	return (
		typeof err === "object"
		&& err !== null
		&& "data" in err
		&& typeof (err as { data?: AppErrorData }).data?.code === "string"
	);
}
