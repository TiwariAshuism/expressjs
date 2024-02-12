import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
    response.cookie("hello","world",{maxAge:60000*60*2,signed:true},)
	if (request.signedCookies.hello && request.signedCookies.hello === "world")
		return response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);

	return response
		.status(403)
		.send({ msg: "Sorry. You need the correct cookie" });
});

export default router;