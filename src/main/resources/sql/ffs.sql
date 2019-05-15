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

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `category` */

insert  into `category`(`id`,`name`) values (1,'爱情鲜花'),(2,'百合'),(3,'玫瑰');

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `goodsId` int(32) DEFAULT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `createTime` varchar(30) DEFAULT NULL,
  `createUser` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `comment` */

insert  into `comment`(`id`,`goodsId`,`comment`,`createTime`,`createUser`) values (1,2,'fffffffff','1557482846371','kuirons');

/*Table structure for table `ffsorder` */

DROP TABLE IF EXISTS `ffsorder`;

CREATE TABLE `ffsorder` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userName` varchar(64) DEFAULT NULL,
  `items` varchar(300) DEFAULT NULL,
  `payChannel` varchar(32) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `amount` int(32) DEFAULT NULL,
  `status` varchar(8) DEFAULT NULL,
  `deliveryStatus` varchar(20) DEFAULT '未发货',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `ffsorder` */

insert  into `ffsorder`(`id`,`userName`,`items`,`payChannel`,`address`,`amount`,`status`,`deliveryStatus`) values (1,'kuirons','[{\"amount\":123,\"ware_id\":4},{\"amount\":456,\"ware_id\":5},{\"amount\":345,\"ware_id\":6}]','alipay','山西省朔州市朔城区德玛西亚',924,'1','未发货'),(2,'kuirons','[{\"amount\":200,\"ware_id\":1},{\"amount\":9000,\"ware_id\":2}]','alipay','山西省朔州市朔城区德玛西亚',9200,'-2','未发货'),(3,'kuirons','[{\"amount\":9000,\"ware_id\":2}]','alipay','山西省朔州市朔城区德玛西亚',9000,'1','未发货'),(4,'kuirons','[{\"amount\":9000,\"ware_id\":2}]','alipay','山西省朔州市朔城区德玛西亚',9000,'0','已收货'),(5,'kuirons','[{\"amount\":9000,\"ware_id\":2}]','alipay','山西省朔州市朔城区德玛西亚',9000,'-2','未发货'),(6,'kuirons','[{\"amount\":200,\"ware_id\":1}]','alipay','山西省朔州市朔城区德玛西亚',200,'-2','未发货'),(7,'kuirons','[{\"amount\":200,\"ware_id\":1}]','alipay','山西省朔州市朔城区德玛西亚',200,'0','已收货'),(8,'kuirons','[{\"amount\":200,\"ware_id\":1}]','alipay','山西省朔州市朔城区德玛西亚',200,'1','未发货'),(9,'kuirons','[{\"amount\":600,\"ware_id\":3}]','alipay','山西省朔州市朔城区德玛西亚',600,'1','未发货'),(10,'kuirons','[{\"amount\":200,\"ware_id\":1}]','alipay','山西省朔州市朔城区德玛西亚',200,'1','未发货'),(11,'kuirons','[{\"amount\":1,\"ware_id\":3},{\"amount\":6,\"ware_id\":4}]','alipay','山西省朔州市朔城区德玛西亚',1338,'1','未发货'),(12,'kuirons','[{\"amount\":5,\"ware_id\":2},{\"amount\":1,\"ware_id\":8}]','alipay','山西省朔州市朔城区德玛西亚',45123,'1','未发货'),(13,'kuirons','[{\"amount\":5,\"ware_id\":2},{\"amount\":1,\"ware_id\":8}]','alipay','山西省朔州市朔城区德玛西亚',45123,'1','未发货');

/*Table structure for table `ffsuser` */

DROP TABLE IF EXISTS `ffsuser`;

CREATE TABLE `ffsuser` (
  `userName` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `type` int(32) NOT NULL DEFAULT '1',
  `logo_url` varchar(500) DEFAULT NULL,
  `money` int(32) DEFAULT NULL,
  PRIMARY KEY (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ffsuser` */

insert  into `ffsuser`(`userName`,`password`,`type`,`logo_url`,`money`) values ('kuirons','123456',1,NULL,9907215);

/*Table structure for table `goodsinfo` */

DROP TABLE IF EXISTS `goodsinfo`;

CREATE TABLE `goodsinfo` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `imgUrl` varchar(200) NOT NULL,
  `belong2Title` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `goodsinfo` */

insert  into `goodsinfo`(`id`,`title`,`imgUrl`,`belong2Title`) values (1,'测试','http://192.168.43.252:8090/首页1.jpg','特价专区'),(2,'测试','http://192.168.43.252:8090/首页2.jpg','特价专区'),(3,'测试','http://192.168.43.252:8090/首页3.jpg','特价专区'),(4,'测试','http://192.168.43.252:8090/首页4.jpg','高端混搭'),(5,'测试','http://192.168.43.252:8090/首页5.jpg','高端混搭'),(6,'测试','http://192.168.43.252:8090/首页6.jpg','高端混搭'),(7,'测试','http://192.168.43.252:8090/首页7.jpg','创意新品'),(8,'测试','http://192.168.43.252:8090/首页8.jpg','创意新品'),(9,'测试','http://192.168.43.252:8090/首页9.jpg','创意新品');

/*Table structure for table `goodsitem` */

DROP TABLE IF EXISTS `goodsitem`;

CREATE TABLE `goodsitem` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `categoryid` int(32) DEFAULT '-1',
  `campaignid` int(32) DEFAULT '-1',
  `name` varchar(500) DEFAULT NULL,
  `imgurl` varchar(500) DEFAULT NULL,
  `price` double(64,8) DEFAULT NULL,
  `sale` int(32) DEFAULT NULL,
  `vendor` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `goodsitem` */

insert  into `goodsitem`(`id`,`categoryid`,`campaignid`,`name`,`imgurl`,`price`,`sale`,`vendor`) values (1,1,1,'列表测试1','http://192.168.43.252:8090/爱情鲜花/a-1.png',200.00000000,500,NULL),(2,1,1,'列表测试2','http://192.168.43.252:8090/爱情鲜花/a-2.jpg',9000.00000000,100,NULL),(3,1,1,'测试3','http://192.168.43.252:8090/爱情鲜花/a-3.jpg',600.00000000,400,NULL),(4,2,2,'测试4','http://192.168.43.252:8090/百合/b-1.png',123.00000000,244,NULL),(5,2,2,'测试5','http://192.168.43.252:8090/百合/b-2.png',456.00000000,856,NULL),(6,2,2,'test6','http://192.168.43.252:8090/百合/b-3.png',345.00000000,234,NULL),(7,3,3,'test7','http://192.168.43.252:8090/玫瑰/m-1.jpg',346.00000000,412,NULL),(8,3,3,'test8','http://192.168.43.252:8090/玫瑰/m-2.jpg',123.00000000,425,NULL),(9,3,3,'test9','http://192.168.43.252:8090/玫瑰/m-3.png',5634.00000000,234,NULL);

/*Table structure for table `goodsrcategory` */

DROP TABLE IF EXISTS `goodsrcategory`;

CREATE TABLE `goodsrcategory` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `goodsrcategory` */

insert  into `goodsrcategory`(`id`,`title`) values (1,'特价专区'),(2,'高端混搭'),(3,'创意新品');

/*Table structure for table `goodsritemimg` */

DROP TABLE IF EXISTS `goodsritemimg`;

CREATE TABLE `goodsritemimg` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `goodsitemid` int(32) DEFAULT NULL,
  `imgurl` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `goodsritemimg` */

insert  into `goodsritemimg`(`id`,`goodsitemid`,`imgurl`) values (1,1,'http://192.168.43.252:8090/d1.jpg'),(2,1,'http://192.168.43.252:8090/d2.jpg');

/*Table structure for table `orderrvendor` */

DROP TABLE IF EXISTS `orderrvendor`;

CREATE TABLE `orderrvendor` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `orderId` int(32) DEFAULT NULL,
  `vendor` varchar(50) DEFAULT NULL,
  `status` int(32) DEFAULT '-1',
  `buyUser` varchar(50) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `amount` int(32) DEFAULT NULL,
  `payChannel` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `orderrvendor` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
