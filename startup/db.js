const db = require("../models");

module.exports = (app) => {
  db.sequelize.sync().then(function () {
    const PORT = process.env.PORT || 3800;
    app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`));
  });
};
