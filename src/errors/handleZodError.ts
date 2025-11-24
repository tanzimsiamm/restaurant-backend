import { ZodError, ZodIssue } from 'zod';

interface ErrorSource {
  path: string | number;
  message: string;
}

interface HandleZodErrorReturn {
  statusCode: number;
  message: string;
  errorSources: ErrorSource[];
}

const handleZodError = (error: ZodError): HandleZodErrorReturn => {
  const errorSources: ErrorSource[] = error.issues.map((issue: ZodIssue) => {
    const raw = issue.path[issue.path.length - 1];
    const path: string | number =
      raw === undefined ? '' : typeof raw === 'symbol' ? raw.toString() : (raw as string | number);
    return {
      path,
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;