const controller = {};

controller.list = (req, res) => {
  if(req.session.loggedin){
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM logUser', (err, logUsers) => {
     if (err) {
      res.json(err);
     }
     res.render('admin/adm_viewLogUser', {
        data: logUsers
     });
    });
  });
}else{
  res.redirect('/');
}
};


module.exports = controller;
