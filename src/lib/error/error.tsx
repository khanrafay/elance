export const hasErrors = (errorElement: any) => {
  return errorElement !== undefined;
};

export const getErrors = (errorElemnt: any) => {
  return (
    <>
      {errorElemnt && (
        <div className="invalid-feedback">
          {errorElemnt.message}
        </div>
      )}
    </>
  );
};

export const getErrorClass = (errorElement: any) => {
  return hasErrors(errorElement) ? 'is-invalid' : '';
};