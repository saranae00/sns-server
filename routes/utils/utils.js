// 비동기 함수의 에러를 처리할 미들웨어
exports.wrapAsync = asyncFn => {
  return (req, res, next) => {
    try {
      return asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
