// Libraries
import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateResult = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).send(errors);
	}

	next();
};

export default validateResult;
