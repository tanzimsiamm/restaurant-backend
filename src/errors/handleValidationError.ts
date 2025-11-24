import mongoose from 'mongoose';

interface ErrorSource {
  path: string | number;
  message: string;
}

interface HandleValidationErrorReturn {
  statusCode: number;
  message: string;
  errorSources: ErrorSource[];
}

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): HandleValidationErrorReturn => {
  const errorSources: ErrorSource[] = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    },
  );

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;