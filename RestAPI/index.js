const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
//hateoasLinker=require('express-hateoas-links');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'laboratoryy',
  password: 'laboratoryy',
  database: 'laboratory_db'
});
 //connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//show all alat
app.get('/api/alats',(req, res) => {
  let sql = "SELECT * FROM alat";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/alats"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/alats/:kode"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/alats"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/alats/:kode",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/alats"
      }
    ]

  }));
    });
});
 
//show single alat
app.get('/api/alats/:kode',(req, res) => {
  let sql = "SELECT * FROM alat WHERE kode="+req.params.kode;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"get",
        "href":"localhost:3000/api/alats"
      },
      {
        "rel":"insert",
        "method":"POST",
        "href":"localhost:3000/api/alats/:kode"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/alats"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/alats/:kode",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/alats/:kode"
      }
    ]}));
  });
});
 
//add new alat
app.post('/api/alats',(req, res) => {
  let data = {kode:req.body.kode, nama_alat: req.body.nama_alat, jumlah: req.body.jumlah, nomor_rak: req.body.nomor_rak, status_alat: req.body.status_alat};
  let sql = "INSERT INTO alat SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"post",
        "href":"localhost:3000/api/alats"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/alats/:kode"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/alats/:kode"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/alats/",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/alats/:kode"
      }
    ]}));
  });
});
 
//update alat
app.put('/api/alats/:kode',(req, res) => {
  let sql = "UPDATE alat SET nama_alat='"+req.body.nama_alat+"', jumlah='"+req.body.jumlah+"',nomor_rak='"+req.nomor_rak+"', status_alat='"+req.body.status_alat+"' WHERE kode="+req.params.kode;
  let query = conn.query(sql, (err, results,) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"PUT",
        "href":"localhost:3000/api/alats/:kode"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/alats/:kode"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/alats"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/alats/",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/alats"
      }
    ]}));
  });
});
 
//Delete alat
app.delete('/api/alats/:kode',(req, res) => {
  let sql = "DELETE FROM alat WHERE kode="+req.params.kode+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
        {
          "rel":"self",
          "method":"delete",
          "href":"localhost:3000/api/alats/:kode"
        },
        {
          "rel":"find",
          "method":"GET",
          "href":"localhost:3000/api/alats/:kode"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/alats"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/alats/:kode",
        },
        {
          "rel":"show",
          "method":"GET",
          "href":"localhost:3000/api/alats"
        }
      ]}));
  });
});
 
//show all ruangan
app.get('/api/rooms',(req, res) => {
  let sql = "SELECT * FROM ruangan";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/rooms/:id_ruangan"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/rooms/:id_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/rooms"
      }
    ]
    }));
    });
  });
 
//show single ruangan
app.get('/api/rooms/:id_ruangan',(req, res) => {
  let sql = "SELECT * FROM ruangan WHERE id_ruangan="+req.params.id_ruangan;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/rooms/:id_ruangan"
      },
      {
        "rel":"show",
        "method":"GET",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/rooms/:id_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/rooms"
      }
    ]}));
  });
});
 
//add new ruangan
app.post('/api/rooms',(req, res) => {
  let data = {id_ruangan: req.body.id_ruangan,nama_ruangan: req.body.nama_ruangan, status: req.body.status, fasilitas: req.body.fasilitas};
  let sql = "INSERT INTO ruangan SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"post",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/rooms/:id_ruangan"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/rooms/:id_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/rooms"
      }
    ]
  }));
  });
});
 
//update ruangan
app.put('/api/rooms/:id_ruangan',(req, res) => {
  let sql = "UPDATE ruangan SET id_ruangan='"+req.body.id_ruangan+"',nama_ruangan='"+req.body.nama_ruangan+"', status='"+req.body.status+"',fasilitas='"+req.body.fasilitas+"'WHERE id_ruangan="+req.params.id_ruangan;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"put",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/rooms/:id_ruangan"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/rooms"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/rooms/:id_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/rooms"
      }
    ]}));
  });
});
 
//Delete ruangan
app.delete('/api/rooms/:id_ruangan',(req, res) => {
  let sql = "DELETE FROM ruangan WHERE id_ruangan="+req.params.id_ruangan+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
     {
      "rel":"self",
       "method":"delete",
      "href":"localhost:3000/api/room/"
      },
        {
          "rel":"find",
          "method":"GET",
          "href":"localhost:3000/api/rooms/:id_ruangan"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/rooms"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/rooms/:id_ruangan",
        },
        {
          "rel":"delete",
          "method":"delete",
          "href":"localhost:3000/api/rooms/:id_ruangan"}
      ]
        }));
     });
});

//show all detail peminjaman alat
app.get('/api/peminjaman-alat',(req, res) => {
    let sql = "SELECT * FROM details_peminjaman_alat";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
        {
          "rel":"self",
          "method":"GET",
          "href":"localhost:3000/api/peminjaman-alat"
        },
        {
          "rel":"find",
          "method":"GET",
          "href":"localhost:3000/api/rooms/:id_peminjaman_alat"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/peminjaman"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat",
        },
        {
          "rel":"delete",
          "method":"DELETE",
          "href":"localhost:3000/api/peminjaman/"
        }
      ]
      }));
      });
    });
   
  //show single detail peminjaman alat
  app.get('/api/peminjaman-alat/:id_peminjaman_alat',(req, res) => {
    let sql = "SELECT * FROM details_peminjaman_alat WHERE id_peminjaman_alat="+req.params.id_peminjaman_alat;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
        {
          "rel":"self",
          "method":"GET",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat"
        },
        {
          "rel":"show",
          "method":"GET",
          "href":"localhost:3000/api/peminjaman"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/peminjaman"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat",
        },
        {
          "rel":"delete",
          "method":"DELETE",
          "href":"localhost:3000/api/peminjaman"
        }
      ]}));
    });
  });
   
  //tambahkan detail peminjaman alat baru
  app.post('/api/peminjaman-alat',(req, res) => {
    let data = {id_peminjaman_alat: req.body.id_peminjaman_alat, id_pegawai: req.body.id_pegawai, id_peminjam: req.body.id_peminjam, id_alat: req.body.id_alat, tanggal_pemakaian: req.body.tanggal_pemakaian, tanggal_selesai:req.body.tanggal_selesai, tanggal_kembali:req.body.tanggal_kembali};
    let sql = "INSERT INTO details_peminjaman_alat SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
        {
          "rel":"self",
          "method":"post",
          "href":"localhost:3000/api/peminjaman"
        },
        {
          "rel":"find",
          "method":"GET",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat"
        },
        {
          "rel":"show",
          "method":"get",
          "href":"localhost:3000/api/peminjaman"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat",
        },
        {
          "rel":"delete",
          "method":"DELETE",
          "href":"localhost:3000/api/peminjaman"
        }
      ]
    }));
    });
  });
   
  //update peminjaman alat
  app.put('/api/peminjaman-alat/:id_peminjaman_alat',(req, res) => {
    let sql = "UPDATE details_peminjaman_alat SET id_peminjaman_alat='"+req.body.id_peminjaman_alat+"',id_pegawai='"+req.body.id_pegawai+"',id_peminjam='"+req.body.id_peminjam+"', id_alat='"+req.body.id_alat+"',tanggal_pemakaian='"+req.body.tanggal_pemakaian+"', tanggal_selesai='"+req.body.tanggal_selesai+"',tanggal_kembali='"+req.body.tanggal_kembali+"' WHERE id_peminjaman_alat="+req.params.id_peminjaman_alat;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
        {
          "rel":"self",
          "method":"put",
          "href":"localhost:3000/api/peminjaman-alat"
        },
        {
          "rel":"find",
          "method":"GET",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/peminjaman"
        },
        {
          "rel":"show",
          "method":"get",
          "href":"localhost:3000/api/peminjaman/:id_ruangan",
        },
        {
          "rel":"delete",
          "method":"DELETE",
          "href":"localhost:3000/api/peminjaman"
        }
      ]}));
    });
  });
   
  //Delete detail peminjaman alat
  app.delete('/api/peminjaman-alat/:id_peminjaman_alat',(req, res) => {
    let sql = "DELETE FROM details_peminjaman_alat WHERE id_peminjaman_alat="+req.params.id_peminjaman_alat+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results,
        "links":[
       {
        "rel":"self",
         "method":"delete",
        "href":"localhost:3000/api/peminjaman"
        },
          {
            "rel":"find",
            "method":"GET",
            "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat"
          },
          {
            "rel":"insert",
            "method":"post",
            "href":"localhost:3000/api/peminjaman"
          },
          {
            "rel":"update",
            "method":"put",
            "href":"localhost:3000/api/rooms/:id_peminjaman_alat",
          },
          {
            "rel":"delete",
            "method":"delete",
            "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat"}
        ]
          }));
       });
  });

  //show all detail peminjaman ruangan
app.get('/api/peminjaman-ruangan',(req, res) => {
  let sql = "SELECT * FROM details_peminjaman_ruangan";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/peminjaman-ruangan"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/peminjaman-ruangan/:id_peminjaman_ruangan"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/peminjaman-ruangan"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/peminjaman-ruangan:id_peminjaman_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/peminjaman-ruangan"
      }
    ]
    }));
    });
  });
 
//show single detail peminjaman ruangan
app.get('/api/peminjaman-ruangan/:id_peminjaman_ruangan',(req, res) => {
  let sql = "SELECT * FROM details_peminjaman_ruangan WHERE id_peminjaman_ruangan="+req.params.id_peminjaman_ruangan;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/peminjaman-ruangan/:id_peminjaman_ruangan"
      },
      {
        "rel":"show",
        "method":"GET",
        "href":"localhost:3000/api/peminjaman-ruangan"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/peminjaman-ruangan"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/peminjaman-ruangan/:id_peminjaman_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/peminjaman-ruangan"
      }
    ]}));
  });
});
 
//tambahkan detail peminjaman ruangan baru
app.post('/api/peminjaman-ruangan',(req, res) => {
  let data = {id_peminjaman_ruangan: req.body.id_peminjaman_ruangan, id_pegawai: req.body.id_pegawai, id_peminjam: req.body.id_peminjam, id_ruangan: req.body.id_ruangan, tanggal_pemakaian:req.body.tanggal_pemakaian, tanggal_selesai:req.body.tanggal_selesai, tanggal_kembali:req.body.tanggal_kembali};
  let sql = "INSERT INTO details_peminjaman_ruangan SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"post",
        "href":"localhost:3000/api/peminjaman-ruangan/"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/peminjaman-ruangan/:id_peminjaman_ruangan"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/peminjaman-ruangan/"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/peminjaman-ruangan/:id_peminjaman_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/peminjaman-ruangan/"
      }
    ]
  }));
  });
});
 
//update peminjaman ruangan
app.put('/api/peminjaman-ruangan/:id_peminjaman_ruangan',(req, res) => {
  let sql = "UPDATE details_peminjaman_ruangan SET id_peminjaman_ruangan='"+req.body.id_peminjaman_ruangan+"',id_pegawai='"+req.body.id_pegawai+"',id_peminjam='"+req.body.id_peminjam+"', id_ruangan='"+req.body.id_ruangan+"',tanggal_pemakaian='"+req.body.tanggal_pemakaian+"',tanggal_selesai='"+req.body.tanggal_selesai+"', tanggal_kembali='"+req.body.tanggal_kembali+"' WHERE id_peminjaman_ruangan="+req.params.id_peminjaman_ruangan;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"put",
        "href":"localhost:3000/api/peminjaman/"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/peminjaman/:id_peminjaman_alat"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/peminjaman/"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/peminjaman/:id_ruangan",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/peminjaman/"
      }
    ]}));
  });
});
 
//Delete detail peminjaman ruangan
app.delete('/api/peminjaman-ruangan/:id_peminjaman_ruangan',(req, res) => {
  let sql = "DELETE FROM details_peminjaman_ruangan WHERE id_peminjaman_ruangan="+req.params.id_peminjaman_ruangan+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
     {
      "rel":"self",
       "method":"delete",
      "href":"localhost:3000/api/peminjaman-ruangan/"
      },
      {
          "href":"localhost:3000/api/peminjaman-ruangan/:id_peminjaman_ruangan/",
          "rel":"find",
          "method":"GET"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/peminjaman-ruangan/"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/rooms/:id_peminjaman_ruangan",
        },
        {
          "rel":"delete",
          "method":"delete",
          "href":"localhost:3000/api/peminjaman/:id_peminjaman_ruangan"}
      ]
        }));
     });
});
  

//show all detail pegawai
app.get('/api/pegawai',(req, res) => {
  let sql = "SELECT * FROM pegawai";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/rooms/:id_pegawai"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/pegawai/:id_pegawai",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/pegawai/"
      }
    ]
    }));
    });
  });
 
//show single detail pegawai
app.get('/api/pegawai/:id_pegawai',(req, res) => {
  let sql = "SELECT * FROM pegawai WHERE id_pegawai="+req.params.id_pegawai;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"GET",
        "href":"localhost:3000/api/pegawai/:id_pegawai"
      },
      {
        "rel":"show",
        "method":"GET",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/pegawai/:id_pegawai",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/pegawai/"
      }
    ]}));
  });
});
 
//tambahkan detail pegawai
app.post('/api/pegawai',(req, res) => {
  let data = {id_pegawai: req.body.id_pegawai, nama: req.body.nama, jenis_kelamin: req.body.jenis_kelamin, username: req.body.username, password:req.body.password};
  let sql = "INSERT INTO pegawai SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"post",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/pegawai/:id_pegawai"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/pegawai/:id_pegawai",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/pegawai/"
      }
    ]
  }));
  });
});
 
//update pegawai
app.put('/api/pegawai/:id_pegawai',(req, res) => {
  let sql = "UPDATE pegawai SET id_pegawai='"+req.body.id_pegawai+"',nama='"+req.body.nama+"', jenis_kelamin='"+req.body.jenis_kelamin+"',username='"+req.body.username+"', password='"+req.body.password+"' WHERE id_pegawai="+req.params.id_pegawai;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
      {
        "rel":"self",
        "method":"put",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/pegawai/:id_pegawai"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/pegawai/"
      },
      {
        "rel":"show",
        "method":"get",
        "href":"localhost:3000/api/pegawai/:id_pegawai",
      },
      {
        "rel":"delete",
        "method":"DELETE",
        "href":"localhost:3000/api/pegawai/"
      }
    ]}));
  });
});
 
//Delete detail pegawai
app.delete('/api/pegawai/:id_pegawai',(req, res) => {
  let sql = "DELETE FROM pegawai WHERE id_pegawai="+req.params.id_pegawai+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results,
      "links":[
     {
      "rel":"self",
       "method":"delete",
      "href":"localhost:3000/api/pegawai/"
      },
        {
          "rel":"find",
          "method":"GET",
          "href":"localhost:3000/api/pegawai/:id_pegawai"
        },
        {
          "rel":"insert",
          "method":"post",
          "href":"localhost:3000/api/pegawai/"
        },
        {
          "rel":"update",
          "method":"put",
          "href":"localhost:3000/api/pegawai/:id_pegawai",
        },
        {
          "rel":"delete",
          "method":"delete",
          "href":"localhost:3000/api/pegawai/:id_pegawai"}
      ]
        }));
     });
});

//show all detail peminjam
app.get('/api/peminjam',(req, res) => {
let sql = "SELECT * FROM peminjam";
let query = conn.query(sql, (err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results,
  "links":[
    {
      "rel":"self",
      "method":"GET",
      "href":"localhost:3000/api/peminjam/"
    },
    {
      "rel":"find",
      "method":"GET",
      "href":"localhost:3000/api/peminjam/:id_peminjam"
    },
    {
      "rel":"insert",
      "method":"post",
      "href":"localhost:3000/api/peminjam/"
    },
    {
      "rel":"update",
      "method":"put",
      "href":"localhost:3000/api/peminjam/:id_peminjam",
    },
    {
      "rel":"delete",
      "method":"DELETE",
      "href":"localhost:3000/api/peminjam/"
    }
  ]
  }));
  });
});

//show single detail peminjaman 
app.get('/api/peminjam/:id_peminjam',(req, res) => {
let sql = "SELECT * FROM peminjam WHERE id_peminjam="+req.params.id_peminjam;
let query = conn.query(sql, (err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results,
  "links":[
    {
      "rel":"self",
      "method":"GET",
      "href":"localhost:3000/api/peminjam/:id_peminjam"
    },
    {
      "rel":"show",
      "method":"GET",
      "href":"localhost:3000/api/peminjam"
    },
    {
      "rel":"insert",
      "method":"post",
      "href":"localhost:3000/api/peminjam"
    },
    {
      "rel":"update",
      "method":"put",
      "href":"localhost:3000/api/peminjam/:id_peminjam",
    },
    {
      "rel":"delete",
      "method":"DELETE",
      "href":"localhost:3000/api/peminjam/"
    }
  ]}));
});
});

//tambahkan detail peminjaman 
app.post('/api/peminjam',(req, res) => {
let data = {id_peminjam: req.body.id_peminjam, nama_peminjam: req.body.nama_peminjam, jenis_kelamin: req.body.jenis_kelamin };
let sql = "INSERT INTO peminjam SET ?";
let query = conn.query(sql, data,(err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results,
  "links":[
    {
      "rel":"self",
      "method":"post",
      "href":"localhost:3000/api/peminjam/"
    },
    {
      "rel":"find",
      "method":"GET",
      "href":"localhost:3000/api/peminjam/:id_peminjam"
    },
    {
      "rel":"show",
      "method":"get",
      "href":"localhost:3000/api/peminjam/"
    },
    {
      "rel":"update",
      "method":"put",
      "href":"localhost:3000/api/peminjam/:id_peminjam",
    },
    {
      "rel":"delete",
      "method":"DELETE",
      "href":"localhost:3000/api/peminjam/id_peminjam"
    }
  ]
}));
});
});

//update peminjan
app.put('/api/peminjam/:id_peminjam',(req, res) => {
let sql = "UPDATE peminjam SET id_peminjam='"+req.body.id_peminjam+"',nama_peminjam='"+req.body.nama_peminjam+"',jenis_kelamin='"+req.body.jenis_kelamin+"' WHERE id_peminjam ="+req.params.id_peminjam;
let query = conn.query(sql, (err, results) => {
  if(err) throw err;
  res.send(JSON.stringify({"status": 200, "error": null, "response": results,
  "links":[
    {
      "rel":"self",
      "method":"put",
      "href":"localhost:3000/api/peminjam/"
    },
    {
      "rel":"find",
      "method":"GET",
      "href":"localhost:3000/api/peminjam/:id_peminjam"
    },
    {
      "rel":"insert",
      "method":"post",
      "href":"localhost:3000/api/peminjaman/"
    },
    {
      "rel":"show",
      "method":"get",
      "href":"localhost:3000/api/peminjaman/:id_peminjam",
    },
    {
      "rel":"delete",
      "method":"DELETE",
      "href":"localhost:3000/api/peminjam/id_peminjam"
    }
  ]}));
});
});

//Delete detail peminjam
app.delete('/api/peminjam/:id_peminjam',(req, res) => {
let sql = "DELETE FROM peminjam WHERE id_peminjam="+req.params.id_peminjam+"";
let query = conn.query(sql, (err, results) => {
  if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results,
    "links":[
   {
    "rel":"self",
     "method":"delete",
    "href":"localhost:3000/api/peminjam/"
    },
      {
        "rel":"find",
        "method":"GET",
        "href":"localhost:3000/api/peminjam/:id_peminjam"
      },
      {
        "rel":"insert",
        "method":"post",
        "href":"localhost:3000/api/peminjam/"
      },
      {
        "rel":"update",
        "method":"put",
        "href":"localhost:3000/api/rooms/:id_peminjam",
      },
      {
        "rel":"delete",
        "method":"delete",
        "href":"localhost:3000/api/peminjaman/:id_peminjam"}
    ]
      }));
   });
});

//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});


