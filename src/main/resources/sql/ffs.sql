/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.25 : Database - fss
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`fss` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `fss`;

/*Table structure for table `banner` */

DROP TABLE IF EXISTS `banner`;

CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `imgurl` varchar(500) NOT NULL,
  `type` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `banner` */

insert  into `banner`(`id`,`name`,`imgurl`,`type`) values (13,'测试图片','http://192.168.43.252:8090/花1.jpg',1),(14,'测试图片','http://192.168.43.252:8090/花2.jpg',1),(15,'测试图片','http://192.168.43.252:8090/花3.jpg',1),(16,'测试图片','http://192.168.43.252:8090/花4.jpg',1),(17,'测试图片','http://192.168.43.252:8090/花5.jpg',1);

/*Table structure for table `goodsinfo` */

DROP TABLE IF EXISTS `goodsinfo`;

CREATE TABLE `goodsinfo` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `imgUrl` varchar(200) NOT NULL,
  `belong2Title` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `goodsinfo` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
