/*
SQLyog Community v13.1.1 (64 bit)
MySQL - 10.1.35-MariaDB : Database - laboratory_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`laboratory_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `laboratory_db`;

/*Table structure for table `alat` */

DROP TABLE IF EXISTS `alat`;

CREATE TABLE `alat` (
  `kode` varchar(20) NOT NULL,
  `nama_alat` varchar(60) NOT NULL,
  `jumlah` int(20) NOT NULL,
  `nomor_rak` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`kode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `alat` */

insert  into `alat`(`kode`,`nama_alat`,`jumlah`,`nomor_rak`,`status`) values 
('10','Termometer',12,'123','available'),
('100','Kondensor',5,'127','available'),
('11','Proyektor',5,'130','available'),
('12','Neraca',10,'129','available'),
('13','Tabung reaksi',20,'131','available'),
('14','Gelas beker',10,'132','available'),
('15','Pipet tetes',20,'134','available'),
('16','Pipet ukur',30,'133','available'),
('17','Pipet volum',30,'135','available'),
('18','Penjepit tabung reaksi',35,'136','available'),
('19','Kaki tiga',10,'138','available'),
('20','Kawat kasa',18,'137','available'),
('21','Labu ukur',13,'301','available'),
('22','Labu destilasi',22,'302','not available'),
('230','timbangan',10,'102','available'),
('4','OHP',2,'124','not available'),
('5','Loop',3,'122','available'),
('6','Erlenmeyer',6,'125','not available'),
('8','Gelas ukur',10,'126','available'),
('9','Barometer',5,'127','available');

/*Table structure for table `details_peminjaman_alat` */

DROP TABLE IF EXISTS `details_peminjaman_alat`;

CREATE TABLE `details_peminjaman_alat` (
  `id_peminjaman_alat` varchar(20) NOT NULL,
  `id_peminjam` varchar(20) NOT NULL,
  `id_alat` varchar(20) NOT NULL,
  `tanggal_pemakaian` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  `id_pegawai` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_peminjaman_alat`),
  KEY `peminjam_id` (`id_peminjam`),
  KEY `kode_alat` (`id_alat`),
  KEY `pegawai_id` (`id_pegawai`),
  CONSTRAINT `kode_alat` FOREIGN KEY (`id_alat`) REFERENCES `alat` (`kode`),
  CONSTRAINT `pegawai_id` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai` (`id_pegawai`),
  CONSTRAINT `peminjam_id` FOREIGN KEY (`id_peminjam`) REFERENCES `peminjam` (`id_peminjam`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `details_peminjaman_alat` */

insert  into `details_peminjaman_alat`(`id_peminjaman_alat`,`id_peminjam`,`id_alat`,`tanggal_pemakaian`,`tanggal_selesai`,`tanggal_kembali`,`id_pegawai`) values 
('111','12S17014','11','2020-01-16','2020-01-23',NULL,'12S'),
('122','12S17014','4','2020-01-16','2020-01-21',NULL,'13S'),
('1234','12S17014','13','2020-01-18','2020-01-25',NULL,'12S'),
('21S','12S17014','10','2020-01-16','2020-01-23',NULL,'12S');

/*Table structure for table `details_peminjaman_ruangan` */

DROP TABLE IF EXISTS `details_peminjaman_ruangan`;

CREATE TABLE `details_peminjaman_ruangan` (
  `id_peminjaman_ruangan` varchar(20) NOT NULL,
  `id_pegawai` varchar(20) NOT NULL,
  `id_peminjam` varchar(20) NOT NULL,
  `id_ruangan` varchar(20) NOT NULL,
  `tanggal_pemakaian` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `tanggal_kembali` date DEFAULT NULL,
  PRIMARY KEY (`id_peminjaman_ruangan`),
  KEY `id_pegawai` (`id_pegawai`),
  KEY `id_peminjam` (`id_peminjam`),
  KEY `id_ruangan` (`id_ruangan`),
  CONSTRAINT `id_pegawai` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai` (`id_pegawai`),
  CONSTRAINT `id_peminjam` FOREIGN KEY (`id_peminjam`) REFERENCES `peminjam` (`id_peminjam`),
  CONSTRAINT `id_ruangan` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan` (`id_ruangan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `details_peminjaman_ruangan` */

insert  into `details_peminjaman_ruangan`(`id_peminjaman_ruangan`,`id_pegawai`,`id_peminjam`,`id_ruangan`,`tanggal_pemakaian`,`tanggal_selesai`,`tanggal_kembali`) values 
('112','12S','12S17014','515','2020-01-16','2020-01-23',NULL),
('113','12S','12S17014','411','2020-01-16','2020-01-23',NULL),
('11S1','13S','12S17014','722','2020-01-15','2020-01-17',NULL),
('123','12S','12S17014','513','2020-01-18','2020-01-25',NULL),
('12S1','13s','12S17014','722','2020-01-16','2020-01-23',NULL),
('13S1','12S','12S17014','722','2020-01-16','2020-01-23',NULL);

/*Table structure for table `pegawai` */

DROP TABLE IF EXISTS `pegawai`;

CREATE TABLE `pegawai` (
  `id_pegawai` varchar(20) NOT NULL,
  `nama` varchar(60) NOT NULL,
  `jenis_kelamin` char(1) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id_pegawai`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `pegawai` */

insert  into `pegawai`(`id_pegawai`,`nama`,`jenis_kelamin`,`username`,`password`) values 
('12S','Heppy Simanungkalit','P','heppy','heppy'),
('13S','Yolanda Manurung','P','yol','yol');

/*Table structure for table `peminjam` */

DROP TABLE IF EXISTS `peminjam`;

CREATE TABLE `peminjam` (
  `id_peminjam` varchar(20) NOT NULL,
  `nama_peminjam` varchar(60) NOT NULL,
  `jenis_kelamin` varchar(1) NOT NULL,
  PRIMARY KEY (`id_peminjam`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `peminjam` */

insert  into `peminjam`(`id_peminjam`,`nama_peminjam`,`jenis_kelamin`) values 
('12S17000','Maria S','P'),
('12S17014','David Simamora','L'),
('12S17041','Yeni Panjaitan','P'),
('13S17016','Dewi ','L');

/*Table structure for table `ruangan` */

DROP TABLE IF EXISTS `ruangan`;

CREATE TABLE `ruangan` (
  `id_ruangan` varchar(20) NOT NULL,
  `nama_ruangan` varchar(60) NOT NULL,
  `status` varchar(20) NOT NULL,
  `fasilitas` varchar(100) NOT NULL,
  PRIMARY KEY (`id_ruangan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ruangan` */

insert  into `ruangan`(`id_ruangan`,`nama_ruangan`,`status`,`fasilitas`) values 
('411','Ruangan Laboratorium ','available','proyektor: 1; meja: 3; kursi: 10; whiteboard:1'),
('513','Ruangan Rapat','not available','Meja: 10 ; kursi: 30 ; proyektor: 2 ; AC: 1'),
('515','Ruangan Rapat','available','Meja: 10 ; kursi: 30 ; proyektor: 1'),
('522','Ruangan Presentasi','available','proyektor: 1; meja: 3; kursi: 10; whiteboard:1'),
('713','Lab. Komputer-3','available','Komputer PC:1 ; Whiteboard:1 ; Proyektor: 1 ; AC:1'),
('722','Lab. Komputer-1','available','Komputer PC:1 ; Whiteboard:1 ; Proyektor: 1 ; AC:1'),
('723','Lab. Komputer-1','not available','Komputer PC:1 ; Whiteboard:1 ; Proyektor: 1 ; CCTV:1'),
('813','Lab Kimia Dasar 1','available','Meja: 10 ; kursi: 30 ; proyektor: 2 ; AC: 1'),
('818','Ruangan Rapat','not available','Meja: 10 ; kursi: 30 ; proyektor: 1'),
('822','Lab Kimia 2','available','proyektor: 1; meja: 3; kursi: 10; whiteboard:1'),
('823','Lab. Praktikum Kimia Dasar','available','proyektor: 1; meja: 3; kursi: 10; whiteboard:1'),
('914','Lab Fisika Teknik Elektro 1','available','proyektor: 1; meja: 3; kursi: 10; whiteboard:1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
