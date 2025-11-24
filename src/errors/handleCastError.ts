import mongoose from 'mongoose';

interface ErrorSource {
  path: string | number;
  message: string;
}

interface HandleCastErrorReturn {
  statusCode: number;
  message: string;
  errorSources: ErrorSource[];
}

const handleCastError = (
  error: mongoose.Error.CastError,
): HandleCastErrorReturn => {
  const errorSources: ErrorSource[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;