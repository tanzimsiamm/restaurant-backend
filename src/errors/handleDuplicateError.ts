interface ErrorSource {
  path: string | number;
  message: string;
}

interface HandleDuplicateErrorReturn {
  statusCode: number;
  message: string;
  errorSources: ErrorSource[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (error: any): HandleDuplicateErrorReturn => {
  // Extract value within double quotes using regex
  const match = error.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];

  const errorSources: ErrorSource[] = [
    {
      path: '',
      message: `${extractedMessage} already exists`,
    },
  ];

  return {
    statusCode: 400,
    message: 'Duplicate Entry',
    errorSources,
  };
};

export default handleDuplicateError;