const express = require("express");
const router = express.Router();

const product_controller = require("../controllers/user.controller");
const referendum_controller = require("../controllers/votreferendum.controller");
const candidat_controller = require("../controllers/candidat.controller");
const votmultiplu_controller = require("../controllers/votmultiplu.controller");
const partid_controller = require("../controllers/partid.controller");

//For User // -------------------------------------------------------
router.get("/test", product_controller.test);

router.get("/userList", product_controller.showAllUsers);

router.post("/create", product_controller.product_create);

router.get("/:id", product_controller.product_details);

router.patch("/:id/update", product_controller.product_update);

router.delete("/:id/delete", product_controller.product_delete);

router.post("/login", product_controller.login);

//For PARTID //------------------------------------------------------
router.get("/partid/listaPartide", partid_controller.showAllPartide);

router.post("/partid/createPartid", partid_controller.createPartid);

router.post("/partid/:id/addMembru", partid_controller.addMembru);

router.delete("/partid/:id/delete", partid_controller.deletePartid);

//For CANDIDAT // ---------------------------------------------------
router.get("/candidat/listaCandidati", candidat_controller.showAllCandidati);

router.post("/candidat/create", candidat_controller.candidat_create);

router.get("/candidat/:id/detalii", candidat_controller.detalii_candidat);

router.delete("/candidat/:id/delete", candidat_controller.candidat_delete);

//For VOT REFERENDUM //----------------------------------------------
router.get(
  "/referendum/referendumList",
  referendum_controller.showAllReferendums
);

router.post(
  "/referendum/createVotReferendum",
  referendum_controller.referendumCreate
);

router.post("/referendum/:id/votYES", referendum_controller.votYES);

router.post("/referendum/:id/votNO", referendum_controller.votNO);

router.post("/referendum/:id/start", referendum_controller.startVot);

router.post("/referendum/:id/stop", referendum_controller.stopVot);

router.delete("/referendum/:id/delete", referendum_controller.delete);

//For VOT MULTIPLU //----------------------------------------------

router.post("/vot/createVote", votmultiplu_controller.create_vote);

router.get("/vot/votList", votmultiplu_controller.showAllVotes);

router.post("/vot/:id/addCandidat", votmultiplu_controller.addCandidat);

router.post("/vot/:id/addPartid", votmultiplu_controller.addPartid);

router.post("/vot/:id/voteaza", votmultiplu_controller.voteaza);

router.post("/vot/:id/start", votmultiplu_controller.startVot);

router.post("/vot/:id/stop", votmultiplu_controller.stopVot);

router.delete("/vot/:id/delete", votmultiplu_controller.deleteVotMultiplu);

module.exports = router;
