import { Router } from "express";
import { login,addTechstack,addProject,addCertificate } from "../controllers/allController.js";
import { verifyJWT } from "../middlewares/auth.middlerware.js";
import { upload } from "../middlewares/multer.middlerware.js";
// import { verifyJWT } from "../middlewares/auth.middlerware.js";
const router= Router();

router.route("/login").post(login);
router.route("/addTechstack").post(verifyJWT,addTechstack);
router.route("/addProject").post(verifyJWT,upload.fields([
    {name:"image",maxCount:1},
]),addProject);
router.route("/addCertificate").post(verifyJWT,upload.fields([
    {
        name:"image",maxCount:1
    }
]),addCertificate)
export default router;