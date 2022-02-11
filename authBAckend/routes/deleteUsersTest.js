const admin = require("firebase-admin");
const router = require("express").Router();
router.get("/", async (req,res) => {
  function deleteUser(uid) {
    admin
      .auth()
      .deleteUser(uid)
      .then(function () {
        console.log("Successfully deleted user", uid);
      })
      .catch(function (error) {
        console.log("Error deleting user:", error);
      });
  }

  async function getAllUsers(nextPageToken) {
    admin
      .auth()
      .listUsers(100, nextPageToken)
      .then(function (listUsersResult) {
        listUsersResult.users.forEach(function (userRecord) {
          uid = userRecord.toJSON().uid;
          deleteUser(uid);
        });
        if (listUsersResult.pageToken) {
          getAllUsers(listUsersResult.pageToken);
        }
      })
      .catch(function (error) {
        console.log("Error listing users:", error);
      });
  }
  await getAllUsers()

  res.send("ook")
});
module.exports = router;
