export const errorHandler = (err, req, res, next) => {
    console.error(err.message);
  
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(status).json({
      success: false,
      error: message
    });
  };
  